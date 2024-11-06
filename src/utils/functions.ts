import { inspect } from "util";
import { CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX, BASE_URL, OTHER_APPLICATION_COMMAND_NAMING_REGEX } from "./constants";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ApplicationFlags, RateLimitScopes, UserFlags } from "./enums/other";
import { ApplicationCommandParams, Client, RateLimit, SessionStartLimit } from "./interfaces/other";
import { WebSocket } from "ws";
import { readdir } from "fs";
import { token } from "../config.json";
import { APIApplicationCommand, APIApplicationCommandOption, ApplicationCommandOption } from "./types";
import { APIApplcationCommandParams, APIApplicationCommandOptionChoice, APIApplicationCommandSubCommandGroupOption, APIApplicationCommandSubCommandOption } from "./interfaces/api/other";

export function isRateLimitScope(scope: string): scope is RateLimitScopes { return scope == RateLimitScopes.Global || scope == RateLimitScopes.Shared || scope == RateLimitScopes.User; };

export function flagsToArray<Enum extends typeof ApplicationFlags | typeof UserFlags>(flags: number, flagsEnum: Enum): (keyof Enum)[] {
	const res: (keyof Enum)[] = [], values: (keyof Enum | number)[] = Object.values(flagsEnum)

	Object.values(flagsEnum).slice(Object.values(flagsEnum).length / 2).forEach((val, i) => {
		const key = values[i]
		if ((val & flags) == val && typeof key == "string") res.push(key)
	})

	return res
};

export function sendWebsocketMessage(client: Client, data: any) {
	const rateLimit = client.rateLimits["gateway"];

	if (!rateLimit || rateLimit.remaining >= 1 || rateLimit.reset < Date.now()) {
		client.ws.send(JSON.stringify(data));

		if (!rateLimit) client.rateLimits["gateway"] = {
			bucket: "gateway",
			global: null,
			limit: 120,
			remaining: 119,
			reset: Date.now() + 60000,
			scope: null
		};
		else if (rateLimit.reset < Date.now()) {
			rateLimit.reset = Date.now() + 60000;
			rateLimit.remaining = 119;
		} else if (rateLimit) rateLimit.remaining--;
	};
};

export function openDiscordWebSocketConnection(token: string, client?: Client) {
	fetch(`${BASE_URL}/gateway/bot`, { headers: { Authorization: `Bot ${token}` } }).then(res => res.json().then((json: {
		/**
		 * WSS URL that can be used for connecting to the Gateway
		 */
		url: string;
		/**
		 * Recommended number of [shards](https://discord.com/developers/docs/topics/gateway#sharding) to use when connecting
		 */
		shards: number;
		/**
		 * Information on the current session start limit
		 */
		session_start_limit: SessionStartLimit;
	} | Error) => {
		const bucket = res.headers.get("x-ratelimit-bucket"),
		limit = res.headers.get("x-ratelimit-limit"),
		remaining = res.headers.get("x-ratelimit-remaining"),
		reset = res.headers.get("x-ratelimit-reset"),
		global = res.headers.get("x-ratelimit-global"),
		scope = res.headers.get("x-ratelimit-scope"),
		rateLimits: Record<string, RateLimit> = {};
	
		if (bucket !== null && limit !== null && remaining !== null && reset !== null) rateLimits["/gateway/bot"] = {
			limit: parseInt(limit),
			remaining: parseInt(remaining),
			reset: parseFloat(reset),
			bucket,
			global,
			scope: scope && isRateLimitScope(scope) ? scope : null
		}
	
		if (res.status >= 400) throw inspect(json, { colors: true, depth: Infinity });
		else if ("url" in json) {
			if (!client) client = {
				rateLimits: rateLimits,
				cache: {
					guilds: {},
					users: {}
				},
				token: token,
				ws: new WebSocket(`${json.url}?v=10&encoding=json`),
				lastSeq: null
			};
			else {
				client.ws = new WebSocket(`${json.url}?v=10&encoding=json`);
				client.lastSeq = null;
			};
			
			client.rateLimits["session"] = {
				bucket: "session",
				global: null,
				limit: json.session_start_limit.total,
				remaining: json.session_start_limit.remaining,
				reset: json.session_start_limit.reset_after + Date.now(),
				scope: null
			};
	
			client.rateLimits["session5s"] = {
				bucket: "session5s",
				global: null,
				limit: json.session_start_limit.max_concurrency,
				remaining: json.session_start_limit.max_concurrency - 1,
				reset: 5000 + Date.now(),
				scope: null
			};
	
			readdir("./dist/wsEvents", (err, files) => {
				if (err) throw err;
				else files.forEach(file => {
					const fileName = file.split(".")[0];				
	
					if (fileName && client) client.ws.on(fileName, require(`../wsEvents/${file}`).default.bind(null, client));
				});
			});
		};
	}));
};

export function verifyApplicationCommandOption(cmdIndex: number, option: ApplicationCommandOption, indexes?: number[]) {
	const prefix = `commands[${cmdIndex}]${indexes ? indexes.map(index => `.options[${index}]`).join("") : ""}:`;

	if (!CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.test(option.name)) throw new SyntaxError(`${prefix} The name of the option must match the following pattern: ${CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
	else if (option.nameLocalizations) Object.entries(option.nameLocalizations).forEach(([locale, name]) => {
		if (!CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.test(name)) throw new SyntaxError(`${prefix} The localized name (${locale}) must match the following pattern: ${CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
	});
	else if (option.description.length < 1 || option.description.length > 100) throw new RangeError(`${prefix} The description must have a length between 1 and 100 characters long.`);
	else if (option.descriptionLocalizations) Object.entries(option.descriptionLocalizations).forEach(([locale, description]) => {
		if (description.length < 1 || description.length > 100) throw new RangeError(`${prefix} The localized description (${locale}) must have a length between 1 and 100 characters long.`);
	});
	else if (option.type == ApplicationCommandOptionTypes.String) {
		if (option.choices) option.choices.forEach((choice, choiceIndex) => {
			if (choice.name.length < 1 || choice.name.length > 100) throw new RangeError(`${prefix.slice(0, -1)}.choices[${choiceIndex}]: The name of the choice must have a length between 1 and 100 characters long.`);
			else if (choice.nameLocalizations) Object.entries(choice.nameLocalizations).forEach(([locale, name]) => {
				if (name.length < 1 || name.length > 100) throw new RangeError(`${prefix.slice(0, -1)}.choices[${choiceIndex}]: The name of the localized choice (${locale}) must have a length between 1 and 100 characters long.`);
			});
			else if (choice.value.length > 100) throw new RangeError(`${prefix.slice(0, -1)}.choices[${choiceIndex}]: The value of the choice must have a length between 1 and 100 characters long.`);
		});
		else if (option.maxLength && (option.maxLength < 1 || option.maxLength > 100)) throw new RangeError(`${prefix} The max length of the option must have a length between 1 and 6000 characters long.`);
		else if (option.minLength && (option.minLength < 0 || option.minLength > 100)) throw new RangeError(`${prefix}. The min length of the option must have a length between 0 and 6000 characters long.`);
	} else if (option.type == ApplicationCommandOptionTypes.Number || option.type == ApplicationCommandOptionTypes.Integer) {
		if (option.choices) option.choices.forEach((choice, choiceIndex) => {
			if (choice.name.length < 1 || choice.name.length > 100) throw new RangeError(`${prefix.slice(0, -1)}.choices[${choiceIndex}]: The name of the choice must have a length between 1 and 100 characters long.`);
			else if (choice.nameLocalizations) Object.entries(choice.nameLocalizations).forEach(([locale, name]) => {
				if (name.length < 1 || name.length > 100) throw new RangeError(`${prefix.slice(0, -1)}.choices[${choiceIndex}]: The name of the localized choice (${locale}) must have a length between 1 and 100 characters long.`);
			});
		});
	} else if (option.type == ApplicationCommandOptionTypes.SubCommand && option.options) {
		if (option.options.length > 25) throw new RangeError(`${prefix.slice(0, -1)}.options: A sub command can have a maximum of 25 options.`);
		else option.options.forEach((opt, subCommandIndex) => verifyApplicationCommandOption(cmdIndex, opt, [...(indexes || []), subCommandIndex]));
	} else if (option.type == ApplicationCommandOptionTypes.SubCommandGroup && option.options) {
		if (option.options.length > 25) throw new RangeError(`A command can have a maximum of 25 options. Reduce the options for the command at index ${cmdIndex}.`);
		else option.options.forEach((opt, subCommandGroupIndex) => verifyApplicationCommandOption(cmdIndex, opt, [...(indexes || []), subCommandGroupIndex]));
	}
};

export function changeApplicationCommandOptionToAPIApplicationCommandOption(opt: ApplicationCommandOption): APIApplicationCommandOption {
	const option: APIApplicationCommandOption = { description: opt.description, name: opt.name, type: opt.type };

	if (
		option.type == ApplicationCommandOptionTypes.Attachment && opt.type == ApplicationCommandOptionTypes.Attachment ||
		(option.type == ApplicationCommandOptionTypes.Boolean && opt.type == ApplicationCommandOptionTypes.Boolean) ||
		(option.type == ApplicationCommandOptionTypes.Mentionable && opt.type == ApplicationCommandOptionTypes.Mentionable) ||
		(option.type == ApplicationCommandOptionTypes.Role && opt.type == ApplicationCommandOptionTypes.Role) ||
		(option.type == ApplicationCommandOptionTypes.User && opt.type == ApplicationCommandOptionTypes.User)
	) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.required) option.required = opt.required;
	} else if (option.type == ApplicationCommandOptionTypes.Channel && opt.type == ApplicationCommandOptionTypes.Channel) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.required) option.required = opt.required;
		if (opt.channelTypes) option.channel_types = opt.channelTypes;
	} else if (option.type == ApplicationCommandOptionTypes.Integer && opt.type == ApplicationCommandOptionTypes.Integer || (option.type == ApplicationCommandOptionTypes.Number && opt.type == ApplicationCommandOptionTypes.Number)) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.required) option.required = opt.required;
		if (opt.autocomplete) option.autocomplete = opt.autocomplete;
		if (opt.choices) {
			option.choices = [];

			opt.choices.forEach(choice => {
				const choiceForBody: APIApplicationCommandOptionChoice<number> = { name: choice.name, value: choice.value };

				if (choice.nameLocalizations) choiceForBody.name_localizations = choice.nameLocalizations;

				option.choices?.push(choiceForBody)
			})
		};
		if (opt.maxValue) option.max_value = opt.maxValue;
		if (opt.minValue) option.min_value = opt.minValue;
	} else if (option.type == ApplicationCommandOptionTypes.String && opt.type == ApplicationCommandOptionTypes.String) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.required) option.required = opt.required;
		if (opt.autocomplete) option.autocomplete = opt.autocomplete;
		if (opt.choices) {
			option.choices = [];

			opt.choices.forEach(choice => {
				const choiceForBody: APIApplicationCommandOptionChoice<string> = { name: choice.name, value: choice.value };

				if (choice.nameLocalizations) choiceForBody.name_localizations = choice.nameLocalizations;

				option.choices?.push(choiceForBody)
			})
		};
		if (opt.maxLength) option.max_length = opt.maxLength;
		if (opt.minLength) option.min_length = opt.minLength;
	} else if (option.type == ApplicationCommandOptionTypes.SubCommand && opt.type == ApplicationCommandOptionTypes.SubCommand) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.options) option.options = opt.options.map(option => changeApplicationCommandOptionToAPIApplicationCommandOption(option)) as Exclude<APIApplicationCommandOption, APIApplicationCommandSubCommandOption | APIApplicationCommandSubCommandGroupOption>[];
	} else if (option.type == ApplicationCommandOptionTypes.SubCommandGroup && opt.type == ApplicationCommandOptionTypes.SubCommandGroup) {
		if (opt.descriptionLocalizations) option.description_localizations = opt.descriptionLocalizations;
		if (opt.nameLocalizations) option.name_localizations = opt.nameLocalizations;
		if (opt.options) option.options = opt.options.map(option => changeApplicationCommandOptionToAPIApplicationCommandOption(option)) as APIApplicationCommandSubCommandOption[];
	}

	return option
}

export function setGlobalApplicationCommands(client: Client, commands: ApplicationCommandParams[]): Promise<APIApplicationCommand[]> {
	commands.forEach((cmd, cmdIndex) => {
		if (!cmd.type || cmd.type == ApplicationCommandTypes.ChatInput) {
			if (!CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.test(cmd.name)) throw new SyntaxError(`commands[${cmdIndex}]: The name of the command must match the following pattern: ${CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
			else if (cmd.nameLocalizations) Object.entries(cmd.nameLocalizations).forEach(([locale, name]) => {
				if (!CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.test(name)) throw new SyntaxError(`commands[${cmdIndex}]: The localized name (${locale}) of the command must match the following pattern: ${CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
			});
		} else if (!OTHER_APPLICATION_COMMAND_NAMING_REGEX.test(cmd.name)) throw new SyntaxError(`commands[${cmdIndex}]: The name of the command must match the following pattern: ${OTHER_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
		else if (cmd.nameLocalizations) Object.entries(cmd.nameLocalizations).forEach(([locale, name]) => {
			if (!OTHER_APPLICATION_COMMAND_NAMING_REGEX.test(name)) throw new SyntaxError(`commands[${cmdIndex}]: The localized name (${locale}) of the command must match the following pattern: ${OTHER_APPLICATION_COMMAND_NAMING_REGEX.toString()}`);
		});
		else if (cmd.description && (cmd.description.length < 1 || cmd.description.length > 100)) throw new RangeError(`commands[${cmdIndex}]: The description of the command must have a length between 1 and 100 characters long.`);
		else if (cmd.descriptionLocalizations) Object.entries(cmd.descriptionLocalizations).forEach(([locale, description]) => {
			if (description.length < 1 || description.length > 100) throw new RangeError(`commands[${cmdIndex}]: The localized description (${locale}) of the command must have a length between 1 and 100 characters long.`);
		});
		else if (cmd.options) {
			if (cmd.options.length > 25) throw new RangeError(`commands[${cmdIndex}].options: A command can have a maximum of 25 options.`);
			else cmd.options.forEach((option, optionIndex) => verifyApplicationCommandOption(cmdIndex, option, [optionIndex]));
		};
	});

	return new Promise((resolve, reject) => {
		if (client.cache.application)  {
			const body: APIApplcationCommandParams[] = [];

			commands.forEach(cmd => {
				const command: APIApplcationCommandParams = { name: cmd.name };

				if (cmd.contexts) command.contexts = cmd.contexts;
				if (cmd.defaultMemberPermissions) command.default_member_permissions = cmd.defaultMemberPermissions.reduce((prev, curr) => prev + curr, 0).toString();
				if (cmd.description) command.description = cmd.description;
				if (cmd.descriptionLocalizations) command.description_localizations = cmd.descriptionLocalizations;
				if (cmd.integrationTypes) command.integration_types = cmd.integrationTypes;
				if (cmd.nameLocalizations) command.name_localizations = cmd.nameLocalizations;
				if (cmd.nsfw) command.nsfw = cmd.nsfw;
				if (cmd.options) command.options = cmd.options.map(option => changeApplicationCommandOptionToAPIApplicationCommandOption(option));
				if (cmd.type) command.type = cmd.type;

				body.push(command);
			});

			fetch(`${BASE_URL}/applications/${client.cache.application.id}/commands`, {
				method: "PUT",
				headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
				body: JSON.stringify(body)
			}).then(res => res.json().then(json => {
				if (res.status == 200) resolve(json);
				else reject(json)
			}));
		}else reject("Application client required")
	});
};
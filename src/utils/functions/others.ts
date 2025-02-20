import { inspect } from "util";
import { CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX, BASE_URL, OTHER_APPLICATION_COMMAND_NAMING_REGEX } from "../constants";
import { WebSocket } from "ws";
import { readdir } from "fs";
import { token } from "../../config.json";
import { ApplicationFlags, BitwisePermissionFlags, GuildMemberFlags, RoleFlags, SystemChannelFlags, UserFlags } from "../enums/flags";
import { RateLimitScopes, VerificationLevels } from "../enums/others";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, MessageComponentTypes } from "../enums/types";
import { APIApplicationCommandOption, APIApplicationCommand, APIInteraction, APIActionRowComponent } from "../types/api";
import { ActionRowComponent, ApplicationCommandOption } from "../types/others";
import { APIApplicationCommandOptionChoice, APIApplicationCommandSubCommandOption, APIApplicationCommandSubCommandGroupOption } from "../interfaces/api/applicationCommandOptions";
import { APINonSelectMenuActionRowComponent, APISelectMenuActionRowComponent, APILinkButtonComponent, APIPremiumButtonComponent, APIBasicButtonComponent, APITextInputComponent, APIChannelSelectMenuComponent, APIStringSelectMenuComponent, APIOtherSelectMenuComponent } from "../interfaces/api/components";
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage, APIEmbedProvider, APIEmbedThumbnail, APIEmbedVideo } from "../interfaces/api/embeds";
import { APIApplcationCommandParams, APISelectOption, APIInteractionCallbackResponse, APIInteractionResponse, APIMessageInteractionCallbackData, APIPollAnswerObject } from "../interfaces/api/others";
import { ApplicationCommandParams } from "../interfaces/applicationCommands";
import { Client, SessionStartLimit, InteractionResponse } from "../interfaces/others";
import { GuildNSFWLevels } from "../enums/guilds";

export function isRateLimitScope(scope: string): scope is RateLimitScopes { return scope == RateLimitScopes.Global || scope == RateLimitScopes.Shared || scope == RateLimitScopes.User; };

export function flagsToArray<Enum extends typeof ApplicationFlags | typeof UserFlags | typeof GuildMemberFlags | typeof RoleFlags | typeof BitwisePermissionFlags | typeof SystemChannelFlags>(flags: string | number, flagsEnum: Enum): (keyof Enum)[] {
	const res: (keyof Enum)[] = [], values: (keyof Enum | number)[] = Object.values(flagsEnum)

	Object.values(flagsEnum).filter(val => typeof val == "number").forEach((val, i) => {		
		const key = values[i];

		if ((BigInt(val) & BigInt(flags)) == BigInt(val) && typeof key == "string") res.push(key)
	})

	return res
};

export function sendWebsocketMessage(client: Client, data: unknown) {
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
	if (client?.rateLimits["/gateway/bot"] && client.rateLimits["/gateway/bot"].remaining <= 0 && client.rateLimits["/gateway/bot"].reset > Date.now()) {
		const delay = Math.max(client.rateLimits["/gateway/bot"].remaining <= 0 ? client.rateLimits["/gateway/bot"].reset : 0) - Date.now();

		console.log(`Fetching data for WebSocket connection in ${delay}ms`);

		setTimeout(() => openDiscordWebSocketConnection(token, client), delay);
	} else fetch(`${BASE_URL}/gateway/bot`, { headers: { Authorization: `Bot ${token}` } }).then(res => res.json().then((json: {
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
		scope = res.headers.get("x-ratelimit-scope");
	
		if (res.status >= 400) throw inspect(json, { colors: true, depth: Infinity });
		else if ("url" in json) {
			if (!client) client = {
				rateLimits: {},
				cache: {
					guilds: new Map(),
					users: new Map(),
					unavailableGuilds: new Map()
				},
				token: token,
				ws: new WebSocket(`${json.url}?v=10&encoding=json`),
				lastSeq: null
			};
			else {
				client.ws = new WebSocket(`${json.url}?v=10&encoding=json`);
				client.lastSeq = null;
			};

			if (bucket !== null && limit !== null && remaining !== null && reset !== null) client.rateLimits["/gateway/bot"] = {
				limit: parseInt(limit),
				remaining: parseInt(remaining),
				reset: parseFloat(reset) * 1000,
				bucket,
				global,
				scope: scope && isRateLimitScope(scope) ? scope : null
			}
			
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
	
					if (fileName && client) client.ws.on(fileName, require(`../../wsEvents/${file}`).default.bind(null, client));
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
		
		if (cmd.description && (cmd.description.length < 1 || cmd.description.length > 100)) throw new RangeError(`commands[${cmdIndex}]: The description of the command must have a length between 1 and 100 characters long.`);
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

			const ratelimitPath = `/applications/${client.cache.application.id}/commands`, rateLimit = client.rateLimits[ratelimitPath];

			if (rateLimit && rateLimit.remaining <= 0 && rateLimit.reset > Date.now()) {
				const delay = Math.max(rateLimit.remaining <= 0 ? rateLimit.reset : 0) - Date.now();
		
				console.log(`Set global application commands in ${delay}ms`);
		
				setTimeout(() => openDiscordWebSocketConnection(token, client), delay);
			} else fetch(`${BASE_URL}/applications/${client.cache.application.id}/commands`, {
				method: "PUT",
				headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
				body: JSON.stringify(body)
			}).then(res => res.json().then(json => {
				const bucket = res.headers.get("x-ratelimit-bucket"),
				limit = res.headers.get("x-ratelimit-limit"),
				remaining = res.headers.get("x-ratelimit-remaining"),
				reset = res.headers.get("x-ratelimit-reset"),
				global = res.headers.get("x-ratelimit-global"),
				scope = res.headers.get("x-ratelimit-scope");

				if (bucket !== null && limit !== null && remaining !== null && reset !== null) client.rateLimits[ratelimitPath] = {
					limit: parseInt(limit),
					remaining: parseInt(remaining),
					reset: parseFloat(reset) * 1000,
					bucket,
					global,
					scope: scope && isRateLimitScope(scope) ? scope : null
				}

				if (res.status == 200) resolve(json);
				else reject(json)
			}));
		} else reject("Application client required")
	});
};

export function componentsToAPiComponents(components: ActionRowComponent[]): APIActionRowComponent[] {
	const apiComponents: APIActionRowComponent[] = [];

	components.forEach(component => {
		const apiNonSelectMenuActionRowComponent: APINonSelectMenuActionRowComponent = { type: component.type, components: [] }, apiSelectMenuActionRowComponent: APISelectMenuActionRowComponent = { type: component.type, components: [] };

		component.components.forEach(subComponent => {
			switch (subComponent.type) {
				case MessageComponentTypes.Button:
					if ("url" in subComponent) {
						const button: APILinkButtonComponent = { type: subComponent.type, style: subComponent.style, url: subComponent.url };

						if (subComponent.disabled !== undefined) button.disabled = subComponent.disabled;
						if (subComponent.label) button.label = subComponent.label;
						if (subComponent.emoji) {
							const emoji: APILinkButtonComponent["emoji"] = { id: subComponent.emoji.id, name: subComponent.emoji.name };

							if (subComponent.emoji.animated !== undefined) emoji.animated = subComponent.emoji.animated;

							button.emoji = emoji;
						}

						apiNonSelectMenuActionRowComponent.components.push(button);
					} else if ("skuId" in subComponent) {
						const button: APIPremiumButtonComponent = { type: subComponent.type, style: subComponent.style, sku_id: subComponent.skuId };

						if (subComponent.disabled !== undefined) button.disabled = subComponent.disabled;

						apiNonSelectMenuActionRowComponent.components.push(button);
					} else {
						const button: APIBasicButtonComponent = { type: subComponent.type, style: subComponent.style };

						if (subComponent.disabled !== undefined) button.disabled = subComponent.disabled;
						if (subComponent.customId) button.custom_id = subComponent.customId;
						if (subComponent.label) button.label = subComponent.label;
						if (subComponent.emoji) {
							const emoji: APILinkButtonComponent["emoji"] = { id: subComponent.emoji.id, name: subComponent.emoji.name };

							if (subComponent.emoji.animated !== undefined) emoji.animated = subComponent.emoji.animated;

							button.emoji = emoji;
						}

						apiNonSelectMenuActionRowComponent.components.push(button);
					}
					break;
				case MessageComponentTypes.TextInput:
					const textInput: APITextInputComponent = { custom_id: subComponent.customId, label: subComponent.label, style: subComponent.style, type: subComponent.type };

					if (subComponent.maxLength) textInput.max_length = subComponent.maxLength;
					if (subComponent.minLength !== undefined) textInput.min_length = subComponent.minLength;
					if (subComponent.placeholder) textInput.placeholder = subComponent.placeholder;
					if (subComponent.value) textInput.value = subComponent.value;

					apiNonSelectMenuActionRowComponent.components.push(textInput);
					break;
				case MessageComponentTypes.ChannelSelect:
					const channelSelect: APIChannelSelectMenuComponent = { custom_id: subComponent.customId, type: subComponent.type };

					if (subComponent.disabled !== undefined) channelSelect.disabled = subComponent.disabled;
					if (subComponent.minValues !== undefined) channelSelect.min_values = subComponent.minValues;
					if (subComponent.maxValues) channelSelect.max_values = subComponent.maxValues;
					if (subComponent.placeholder) channelSelect.placeholder = subComponent.placeholder;
					if (subComponent.defaultValues) channelSelect.default_values = subComponent.defaultValues;
					if (subComponent.channelTypes) channelSelect.channel_types = subComponent.channelTypes;

					apiSelectMenuActionRowComponent.components = [channelSelect];
					break;
				case MessageComponentTypes.StringSelect:
					const stringSelect: APIStringSelectMenuComponent = { custom_id: subComponent.customId, type: subComponent.type, options: [] };

					if (subComponent.disabled !== undefined) stringSelect.disabled = subComponent.disabled;
					if (subComponent.minValues !== undefined) stringSelect.min_values = subComponent.minValues;
					if (subComponent.maxValues) stringSelect.max_values = subComponent.maxValues;
					if (subComponent.placeholder) stringSelect.placeholder = subComponent.placeholder;
					if (subComponent.options) subComponent.options.forEach(option => {
						const apiOption: APISelectOption = { label: option.label, value: option.value };
						
						if (option.default !== undefined) apiOption.default = option.default;
						if (option.description) apiOption.description = option.description;
						if (option.emoji) {
							const emoji: APILinkButtonComponent["emoji"] = { id: option.emoji.id, name: option.emoji.name };

							if (option.emoji.animated !== undefined) emoji.animated = option.emoji.animated;

							apiOption.emoji = emoji;
						};

						stringSelect.options.push(option);
					});

					apiSelectMenuActionRowComponent.components = [stringSelect];
					break;
				default:
					const selectMenu: APIOtherSelectMenuComponent = { custom_id: subComponent.customId, type: subComponent.type };

					if (subComponent.disabled !== undefined) selectMenu.disabled = subComponent.disabled;
					if (subComponent.minValues !== undefined) selectMenu.min_values = subComponent.minValues;
					if (subComponent.maxValues) selectMenu.max_values = subComponent.maxValues;
					if (subComponent.placeholder) selectMenu.placeholder = subComponent.placeholder;
					if (subComponent.defaultValues) selectMenu.default_values = subComponent.defaultValues;

					apiSelectMenuActionRowComponent.components = [selectMenu];
					break;
			};
		});

		if (apiNonSelectMenuActionRowComponent.components.length != 0) apiComponents.push(apiNonSelectMenuActionRowComponent);
		if (apiSelectMenuActionRowComponent.components.length != 0) apiComponents.push(apiSelectMenuActionRowComponent);
	});

	return apiComponents;
};

/**
 * @param withResponse Whether to include an [interaction callback object](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-response-object) as the response
 */
export function createInteractionResponse<WithResponse extends boolean>(interaction: APIInteraction, interactionResponse: InteractionResponse, withResponse?: WithResponse): Promise<APIInteractionCallbackResponse | void> {
	if (interactionResponse.data && "embeds" in interactionResponse.data && interactionResponse.data.embeds.length > 10) throw new RangeError("The maximum number of embeds per message is 10");
	else if (interactionResponse.data && "allowedMentions" in interactionResponse.data && interactionResponse.data.allowedMentions.roles.length > 100) throw new RangeError("The maximum number of role mentions per message is 100");
	else if (interactionResponse.data && "allowedMentions" in interactionResponse.data && interactionResponse.data.allowedMentions.users.length > 100) throw new RangeError("The maximum number of user mentions per message is 100");

	return new Promise((resolve, reject) => {
		const body: APIInteractionResponse = { type: interactionResponse.type };

		if (interactionResponse.data && "customId" in interactionResponse.data) body.data = {
			custom_id: interactionResponse.data.customId,
			title: interactionResponse.data.title,
			components: componentsToAPiComponents(interactionResponse.data.components)
		};
		else if (interactionResponse.data && "choices" in interactionResponse.data) {
			const choices: APIApplicationCommandOptionChoice<string | number>[] = [];

			interactionResponse.data.choices.forEach(choice => {
				const apiChoice: APIApplicationCommandOptionChoice<string | number> = { name: choice.name, value: choice.value };

				if (choice.nameLocalizations) apiChoice.name_localizations = choice.nameLocalizations;

				choices.push(choice);
			});

			body.data = { choices };
		} else if (interactionResponse.data) {
			const message: APIMessageInteractionCallbackData = {};

			if (interactionResponse.data.tts !== undefined) message.tts = interactionResponse.data.tts;
			if (interactionResponse.data.content) message.content = interactionResponse.data.content;
			if (interactionResponse.data.allowedMentions) message.allowed_mentions = {
				parse: interactionResponse.data.allowedMentions.parse,
				replied_user: interactionResponse.data.allowedMentions.repliedUser,
				roles: interactionResponse.data.allowedMentions.roles,
				users: interactionResponse.data.allowedMentions.users
			};
			if (interactionResponse.data.flags) message.flags = interactionResponse.data.flags.reduce((prevVal, nextVal) => prevVal + nextVal, 0);
			if (interactionResponse.data.attachments) {} // Not supported
			if (interactionResponse.data.embeds) message.embeds = interactionResponse.data.embeds.map(embed => {
				const apiEmbed: APIEmbed = {};

				if (embed.author) {
					const author: APIEmbedAuthor = { name: embed.author.name };

					if (embed.author.iconUrl) author.icon_url = embed.author.iconUrl;
					if (embed.author.proxyIconUrl) author.proxy_icon_url = embed.author.proxyIconUrl;
					if (embed.author.url) author.url = embed.author.url;

					apiEmbed.author = author;
				};
				if (embed.color) apiEmbed.color = embed.color;
				if (embed.description) apiEmbed.description = embed.description;
				if (embed.fields) apiEmbed.fields = embed.fields.map(field => {
					const apiField: APIEmbedField = { name: field.name, value: field.value };

					if (field.inline !== undefined) apiField.inline = field.inline;

					return apiField
				});
				if (embed.footer) {
					const footer: APIEmbedFooter = { text: embed.footer.text };

					if (embed.footer.iconUrl) footer.icon_url = embed.footer.iconUrl;
					if (embed.footer.proxyIconUrl) footer.proxy_icon_url = embed.footer.proxyIconUrl;

					apiEmbed.footer = footer;
				};
				if (embed.image) {
					const image: APIEmbedImage = { url: embed.image.url };

					if (embed.image.height) image.height = embed.image.height;
					if (embed.image.proxyUrl) image.proxy_url = embed.image.proxyUrl;
					if (embed.image.width) image.width = embed.image.width;

					apiEmbed.image = image;
				};
				if (embed.provider) {
					const provider: APIEmbedProvider = {};

					if (embed.provider.name) provider.name = embed.provider.name;
					if (embed.provider.url) provider.url = embed.provider.url;

					apiEmbed.provider = provider;
				};
				if (embed.thumbnail) {
					const thumbnail: APIEmbedThumbnail = { url: embed.thumbnail.url };

					if (embed.thumbnail.height) thumbnail.height = embed.thumbnail.height;
					if (embed.thumbnail.proxyUrl) thumbnail.proxy_url = embed.thumbnail.proxyUrl;
					if (embed.thumbnail.width) thumbnail.width = embed.thumbnail.width;

					apiEmbed.thumbnail = thumbnail;
				};
				if (embed.timestamp) apiEmbed.timestamp = embed.timestamp;
				if (embed.title) apiEmbed.title = embed.title;
				if (embed.type) apiEmbed.type = embed.type;
				if (embed.url) apiEmbed.url = embed.url;
				if (embed.video) {
					const video: APIEmbedVideo = {};

					if (embed.video.url) video.url = embed.video.url;
					if (embed.video.height) video.height = embed.video.height;
					if (embed.video.proxyUrl) video.proxy_url = embed.video.proxyUrl;
					if (embed.video.width) video.width = embed.video.width;

					apiEmbed.video = video;
				};

				return apiEmbed;
			});
			if (interactionResponse.data.components) message.components = componentsToAPiComponents(interactionResponse.data.components);
			if (interactionResponse.data.poll) {
				message.poll = {
					answers: interactionResponse.data.poll.answers.map(answer => {
						const apiAnswer: APIPollAnswerObject = { answer_id: answer.answerId, poll_media: {} };

						if (answer.pollMedia.text) apiAnswer.poll_media.text = answer.pollMedia.text;
						if (answer.pollMedia.emoji) apiAnswer.poll_media.emoji = answer.pollMedia.emoji;

						return apiAnswer;
					}),
					question: {}
				}

				if (interactionResponse.data.poll.duration) message.poll.duration = interactionResponse.data.poll.duration;
				if (interactionResponse.data.poll.layoutType) message.poll.layout_type = interactionResponse.data.poll.layoutType;
				if (interactionResponse.data.poll.allowMultiselect) message.poll.allow_multiselect = interactionResponse.data.poll.allowMultiselect;
				if (interactionResponse.data.poll.question.text) message.poll.question.text = interactionResponse.data.poll.question.text;
				if (interactionResponse.data.poll.question.emoji) message.poll.question.emoji = interactionResponse.data.poll.question.emoji;
			};
			
			body.data = message;
		};

		fetch(`${BASE_URL}/interactions/${interaction.id}/${interaction.token}/callback${withResponse !== undefined ? `?with_response=${withResponse}` : ""}`, {
			method: "POST",
			headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify(body)
		}).then(res => {   
			if (res.status == 204) resolve();
			else res.json().then(json => (res.status == 200 ? resolve : reject)(json));
		});
	});
};

export function getGuildNSFWLevelLabel(level: GuildNSFWLevels): string {
	switch (level) {
		case GuildNSFWLevels.Default: return "Default";
		case GuildNSFWLevels.Explicit: return "Explicit";
		case GuildNSFWLevels.Safe: return "Safe";
		case GuildNSFWLevels.AgeRestricted: return "Age restricted";
		default: return "Unknown";
	}
};

export function getVerificationLevelLabel(level: VerificationLevels): string {
	switch (level) {
		case VerificationLevels.None: return "None";
		case VerificationLevels.Low: return "Low";
		case VerificationLevels.Medium: return "Medium";
		case VerificationLevels.High: return "High";
		case VerificationLevels.VeryHigh: return "Very high";
		default: return "Unknown";
	}
};
import { BitwisePermissionFlags } from "../enums/flags";
import { Locales } from "../enums/others";
import { ApplicationIntegrationTypes, InteractionContextTypes, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes } from "../enums/types";
import { ApplicationCommandOption } from "../types/others";

export interface ApplicationCommandParams {
	/**
	 * [Name of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming), 1-32 characters
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	nameLocalizations?: Record<Locales, string> | null;
	/**
	 * 1-100 character description for `CHAT_INPUT` commands
	 */
	description?: string;
	/**
	 * Localization dictionary for the `description` field. Values follow the same restrictions as `description`
	 */
	descriptionLocalizations?: Record<Locales, string> | null;
	/**
	 * the parameters for the command, max of 25
	 */
	options?: ApplicationCommandOption[];
	/**
	 * Set of [permissions](https://discord.com/developers/docs/topics/permissions) represented as a bit set
	 */
	defaultMemberPermissions?: BitwisePermissionFlags[] | null;
	/**
	 * [Installation context(s)](https://discord.com/developers/docs/resources/application#installation-context) where the command is available
	 */
	integrationTypes?: ApplicationIntegrationTypes[];
	/**
	 * [Interaction context(s)](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types) where the command can be used
	 */
	contexts?: InteractionContextTypes[];
	/**
	 * Type of command, defaults `1` if not set
	 */
	type?: ApplicationCommandTypes;
	/**
	 * Indicates whether the command is [age-restricted](https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands)
	 */
	nsfw?: boolean;
};

export interface ApplicationCommandOptionChoice<Value extends string | number> {
	/**
	 * 1-100 character choice name
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	nameLocalizations?: Record<Locales, string> | null;
	/**
	 * Value for the choice, up to 100 characters if string
	 */
	value: Value;
};

export interface ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes;
	/**
	 * [1-32 character name](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	nameLocalizations?: Record<Locales, string> | null;
	/**
	 * 1-100 character description
	 */
	description: string;
	/**
	 * Localization dictionary for the `description` field. Values follow the same restrictions as `description`
	 */
	descriptionLocalizations?: Record<Locales, string> | null;
};

export interface ApplicationCommandAttachmentOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Attachment;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface ApplicationCommandBooleanOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Boolean;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface ApplicationCommandMentionableOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Mentionable;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface ApplicationCommandRoleOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Role;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface ApplicationCommandUserOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.User;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface ApplicationCommandSubCommandOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.SubCommand;
	/**
	 * If the option is a subcommand or subcommand group type, these nested options will be the parameters or subcommands respectively; up to 25
	 */
	options?: Exclude<ApplicationCommandOption, ApplicationCommandSubCommandOption | ApplicationCommandSubCommandGroupOption>[];
};

export interface ApplicationCommandSubCommandGroupOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.SubCommandGroup;
	/**
	 * If the option is a subcommand or subcommand group type, these nested options will be the parameters or subcommands respectively; up to 25
	 */
	options?: ApplicationCommandSubCommandOption[];
};

export interface ApplicationCommandIntegerOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Integer;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
	/**
	 * Choices for the user to pick from, max 25
	 */
	choices?: ApplicationCommandOptionChoice<number>[];
	/**
	 * The minimum value permitted
	 */
	minValue?: number;
	/**
	 * The maximum value permitted
	 */
	maxValue?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface ApplicationCommandNumberOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Number;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
	/**
	 * Choices for the user to pick from, max 25
	 */
	choices?: ApplicationCommandOptionChoice<number>[];
	/**
	 * The minimum value permitted
	 */
	minValue?: number;
	/**
	 * The maximum value permitted
	 */
	maxValue?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface ApplicationCommandStringOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.String;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
	/**
	 * Choices for the user to pick from, max 25
	 */
	choices?: ApplicationCommandOptionChoice<string>[];
	/**
	 * The minimum allowed length (minimum of `0`, maximum of `6000`)
	 */
	minLength?: number;
	/**
	 * The maximum allowed length (minimum of `1`, maximum of `6000`)
	 */
	maxLength?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface ApplicationCommandChannelOption extends ApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Channel;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
	/**
	 * The channels shown will be restricted to these types
	 */
	channelTypes?: ChannelTypes[];
};
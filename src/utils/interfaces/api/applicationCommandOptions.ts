import { Locales } from "../../enums/others";
import { ApplicationCommandOptionTypes, ChannelTypes } from "../../enums/types";
import { APIApplicationCommandOption } from "../../types/api";

export interface APIApplicationCommandOptionChoice<Value extends string | number> {
	/**
	 * 1-100 character choice name
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	name_localizations?: Record<Locales, string> | null;
	/**
	 * Value for the choice, up to 100 characters if string
	 */
	value: Value;
};

export interface APIApplicationCommandBaseOption {
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
	name_localizations?: Record<Locales, string> | null;
	/**
	 * 1-100 character description
	 */
	description: string;
	/**
	 * Localization dictionary for the `description` field. Values follow the same restrictions as `description`
	 */
	description_localizations?: Record<Locales, string> | null;
};

export interface APIApplicationCommandSubCommandOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.SubCommand;
	/**
	 * If the option is a subcommand or subcommand group type, these nested options will be the parameters or subcommands respectively; up to 25
	 */
	options?: Exclude<APIApplicationCommandOption, APIApplicationCommandSubCommandOption | APIApplicationCommandSubCommandGroupOption>[];
};

export interface APIApplicationCommandSubCommandGroupOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.SubCommandGroup;
	/**
	 * If the option is a subcommand or subcommand group type, these nested options will be the parameters or subcommands respectively; up to 25
	 */
	options?: APIApplicationCommandSubCommandOption[];
};

export interface APIApplicationCommandIntegerOption extends APIApplicationCommandBaseOption {
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
	choices?: APIApplicationCommandOptionChoice<number>[];
	/**
	 * The minimum value permitted
	 */
	min_value?: number;
	/**
	 * The maximum value permitted
	 */
	max_value?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface APIApplicationCommandNumberOption extends APIApplicationCommandBaseOption {
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
	choices?: APIApplicationCommandOptionChoice<number>[];
	/**
	 * The minimum value permitted
	 */
	min_value?: number;
	/**
	 * The maximum value permitted
	 */
	max_value?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface APIApplicationCommandStringOption extends APIApplicationCommandBaseOption {
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
	choices?: APIApplicationCommandOptionChoice<string>[];
	/**
	 * The minimum allowed length (minimum of `0`, maximum of `6000`)
	 */
	min_length?: number;
	/**
	 * The maximum allowed length (minimum of `1`, maximum of `6000`)
	 */
	max_length?: number;
	/**
	 * If autocomplete interactions are enabled for this option
	 */
	autocomplete?: boolean;
};

export interface APIApplicationCommandChannelOption extends APIApplicationCommandBaseOption {
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
	channel_types?: ChannelTypes[];
};

export interface APIApplicationCommandAttachmentOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Attachment;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface APIApplicationCommandBooleanOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Boolean;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface APIApplicationCommandMentionableOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Mentionable;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface APIApplicationCommandRoleOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.Role;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};

export interface APIApplicationCommandUserOption extends APIApplicationCommandBaseOption {
	/**
	 * Type of option
	 */
	type: ApplicationCommandOptionTypes.User;
	/**
	 * Whether the parameter is required or optional, default `false`
	 */
	required?: boolean;
};
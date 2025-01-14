import { Locales } from "../../enums/other";
import { InteractionTypes, ApplicationIntegrationTypes, InteractionContextTypes, ApplicationCommandTypes, ApplicationCommandOptionTypes, MessageComponentTypes } from "../../enums/types";
import { APIInteractionData, APIChannel, APIMessageComponentData, APIMessageComponent } from "../../types/api";
import { SelectMenuComponentType, Snowflake } from "../../types/other";
import { APIGuild, APIGuildMember } from "./guilds";
import { APIMessage } from "./messages";
import { APIEntitlement, APIResolvedData, APIUser } from "./other";

export interface APIBaseInteraction {
	/**
	 * ID of the interaction
	 */
	id: Snowflake;
	/**
	 * ID of the application this interaction is for
	 */
	application_id: Snowflake;
	/**
	 * Type of interaction
	 */
	type: InteractionTypes;
	/**
	 * Interaction data payload
	 */
	data?: APIInteractionData;
	/**
	 * Guild that the interaction was sent from
	 */
	guild?: APIGuild;
	/**
	 * Guild that the interaction was sent from
	 */
	guild_id?: Snowflake;
	/**
	 * Channel that the interaction was sent from
	 */
	channel?: APIChannel;
	/**
	 * Channel that the interaction was sent from
	 */
	channel_id?: Snowflake;
	/**
	 * Guild member data for the invoking user, including permissions
	 */
	member?: APIGuildMember & Required<Pick<APIGuildMember, "permissions">>;
	/**
	 * User object for the invoking user, if invoked in a DM
	 */
	user?: APIUser;
	/**
	 * Continuation token for responding to the interaction
	 */
	token: string;
	/**
	 * Read-only property, always `1`
	 */
	version: 1;
	/**
	 * For components, the message they were attached to
	 */
	message?: APIMessage;
	/**
	 * Bitwise set of permissions the app has in the source location of the interaction
	 */
	app_permissions: string;
	/**
	 * Selected [language](https://discord.com/developers/docs/reference#locales) of the invoking user
	 */
	locale?: Locales;
	/**
	 * [Guild's preferred locale](https://discord.com/developers/docs/resources/guild#guild-object), if invoked in a guild
	 */
	guild_locale?: string;
	/**
	 * For [monetized apps](https://discord.com/developers/docs/monetization/overview), any entitlements for the invoking user, representing access to premium [SKUs](https://discord.com/developers/docs/resources/sku)
	 */
	entitlements: APIEntitlement[];
	/**
	 * Mapping of installation contexts that the interaction was authorized for to related user or guild IDs.
	 * See [Authorizing Integration Owners Object](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for details
	 */
	authorizing_integration_owners: Record<ApplicationIntegrationTypes, string>;
	/**
	 * Context where the interaction was triggered from
	 */
	context?: InteractionContextTypes;
};

export interface APIApplicationCommandInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.ApplicationCommand;
	/**
	 * Interaction data payload
	 */
	data: APIApplicationCommandData;
};

export interface APIApplicationCommandAutocompleteInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.ApplicationCommandAutocomplete;
	/**
	 * Interaction data payload
	 */
	data: APIApplicationCommandAutocompleteData;
};

export interface APIMessageComponentInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.MessageComponent;
	/**
	 * Interaction data payload
	 */
	data: APIMessageComponentData;
};

export interface APIModalSubmitInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.ModalSubmit;
	/**
	 * Interaction data payload
	 */
	data: APIModalSubmitData;
};

export interface APIPingInteraction extends Omit<APIBaseInteraction, "data" | "locale"> {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.Ping;
};

export interface APIOtherMessageComponentData {
	/**
	 * [`custom_id`](https://discord.com/developers/docs/interactions/message-components#custom-id) of the component
	 */
	custom_id: string;
	/**
	 * [type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of the component
	 */
	component_type: Exclude<MessageComponentTypes, SelectMenuComponentType>;
	/**
	 * Values the user selected in a [select menu](https://discord.com/developers/docs/interactions/message-components#select-menu-object) component
	 */
	values?: string[];
	/**
	 * Resolved entities from selected options
	 */
	resolved?: APIResolvedData;
};

export interface APISelectMenuComponentData {
	/**
	 * [`custom_id`](https://discord.com/developers/docs/interactions/message-components#custom-id) of the component
	 */
	custom_id: string;
	/**
	 * [type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of the component
	 */
	component_type: SelectMenuComponentType;
	/**
	 * Values the user selected in a [select menu](https://discord.com/developers/docs/interactions/message-components#select-menu-object) component
	 */
	values: string[];
	/**
	 * Resolved entities from selected options
	 */
	resolved?: APIResolvedData;
};

export interface APIModalSubmitData {
	/**
	 * [`custom_id`](https://discord.com/developers/docs/interactions/message-components#custom-id) of the modal
	 */
	custom_id: string;
	/**
	 * Values submitted by the user
	 */
	components: APIMessageComponent[];
};

export interface APIApplicationCommandData {
	/**
	 * [`ID`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	id: Snowflake;
	/**
	 * [`name`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	name: string;
	/**
	 * [`type`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	type: ApplicationCommandTypes;
	/**
	 * Converted users + roles + channels + attachments
	 */
	resolved?: APIResolvedData;
	/**
	 * Params + values from the user
	 */
	options?: (
		APIApplicationCommandInteractionSubCommandGroupDataOption<false> |
		APIApplicationCommandInteractionSubCommandDataOption<false> |
		APIApplicationCommandInteractionDataOption<Exclude<ApplicationCommandOptionTypes, ApplicationCommandOptionTypes.SubCommand | ApplicationCommandOptionTypes.SubCommandGroup>>
	)[];
	/**
	 * ID of the guild the command is registered to
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the user or message targeted by a [user](https://discord.com/developers/docs/interactions/application-commands#user-commands) or [message](https://discord.com/developers/docs/interactions/application-commands#message-commands) command
	 */
	target_id?: Snowflake;
};

export interface APIApplicationCommandAutocompleteData {
	/**
	 * [`ID`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	id: Snowflake;
	/**
	 * [`name`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	name: string;
	/**
	 * [`type`](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure) of the invoked command
	 */
	type: ApplicationCommandTypes;
	/**
	 * Converted users + roles + channels + attachments
	 */
	resolved?: APIResolvedData;
	/**
	 * Params + values from the user
	 */
	options?: (
		APIApplicationCommandInteractionSubCommandGroupDataOption<true> |
		APIApplicationCommandInteractionSubCommandDataOption<true> |
		APIApplicationCommandAutocompleteInteractionDataOption<ApplicationCommandOptionTypes.String | ApplicationCommandOptionTypes.Integer | ApplicationCommandOptionTypes.Number>
	)[];
	/**
	 * ID of the guild the command is registered to
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the user or message targeted by a [user](https://discord.com/developers/docs/interactions/application-commands#user-commands) or [message](https://discord.com/developers/docs/interactions/application-commands#message-commands) command
	 */
	target_id?: Snowflake;
};

export interface APIApplicationCommandInteractionDataOption<T extends Exclude<ApplicationCommandOptionTypes, ApplicationCommandOptionTypes.SubCommand | ApplicationCommandOptionTypes.SubCommandGroup>> {
	/**
	 * Name of the parameter
	 */
	name: string;
	/**
	 * Value of [application command option type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
	 */
	type: T;
	/**
	 * Value of the option resulting from user input
	 */
	value: T extends ApplicationCommandOptionTypes.Boolean ? boolean : T extends (ApplicationCommandOptionTypes.Number | ApplicationCommandOptionTypes.Integer) ? number: string;
	/**
	 * `true` if this option is the currently focused option for autocomplete
	 */
	focused?: boolean;
};

export interface APIApplicationCommandInteractionSubCommandGroupDataOption<Autocomplete extends boolean> {
	/**
	 * Name of the parameter
	 */
	name: string;
	/**
	 * Value of [application command option type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
	 */
	type: ApplicationCommandOptionTypes.SubCommandGroup;
	/**
	 * Present if this option is a group or subcommand
	 */
	options: APIApplicationCommandInteractionSubCommandDataOption<Autocomplete>;
	/**
	 * `true` if this option is the currently focused option for autocomplete
	 */
	focused?: boolean;
};

export interface APIApplicationCommandInteractionSubCommandDataOption<Autocomplete extends boolean> {
	/**
	 * Name of the parameter
	 */
	name: string;
	/**
	 * Value of [application command option type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
	 */
	type: ApplicationCommandOptionTypes.SubCommand;
	/**
	 * Present if this option is a group or subcommand
	 */
	options: Autocomplete extends false ?
	APIApplicationCommandInteractionDataOption<Exclude<ApplicationCommandOptionTypes, ApplicationCommandOptionTypes.SubCommand | ApplicationCommandOptionTypes.SubCommandGroup>> :
	APIApplicationCommandAutocompleteInteractionDataOption<ApplicationCommandOptionTypes.String | ApplicationCommandOptionTypes.Integer | ApplicationCommandOptionTypes.Number>;
	/**
	 * `true` if this option is the currently focused option for autocomplete
	 */
	focused?: boolean;
};

export interface APIApplicationCommandAutocompleteInteractionDataOption<T extends ApplicationCommandOptionTypes.String | ApplicationCommandOptionTypes.Integer | ApplicationCommandOptionTypes.Number> {
	/**
	 * Name of the parameter
	 */
	name: string;
	/**
	 * Value of [application command option type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
	 */
	type: T;
	/**
	 * Value of the option resulting from user input
	 */
	value: T extends ApplicationCommandOptionTypes.String ? string : number;
	/**
	 * `true` if this option is the currently focused option for autocomplete
	 */
	focused?: boolean;
};
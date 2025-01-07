import { Locales, MembershipStates, OAuth2Scopes, TextInputStyles, ButtonStyles, IntegrationExpireBehaviors, PresenceStatus, PrivacyLevels, AuditLogEvents, GatewayEventNames } from "../../enums/other";
import { SubscriptionStatus, InteractionTypes, ApplicationIntegrationTypes, InteractionContextTypes, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes, EmbedTypes, TeamMemberRoleTypes, MessageComponentTypes, SelectDefaultValueTypes, StickerFormatTypes, LayoutTypes, IntegrationTypes, PremiumTypes, ApplicationCommandPermissionTypes, EventTypes, TriggerTypes, KeywordPresetTypes, ActionTypes, OverwriteTypes, EntitlementTypes, StickerTypes, EntryPointCommandHandlerTypes, InteractionCallbackTypes, AllowedMentionsTypes } from "../../enums/types";
import { APIChannel, APIMessageComponent, APISelectMenuComponent, APIActionRowComponent, APIApplicationCommandOption, APIInteractionCallbackData, APIInteraction } from "../../types/api";
import { Snowflake, SelectMenuComponentType } from "../../types/other";
import { APIThreadChannel } from "./channels";
import { APIAutoModerationActionExecutionEventFields, APIChannelPinsUpdateEventFields, APIIntegrationCreateEventAdditionalFields, APIIntegrationDeleteEventFields, APIIntegrationUpdateEventAdditionalFields, APIInviteCreateEventFields, APIInviteDeleteEventFields, APIPresenceUpdateEventFields, APIReadyEventFields, APISoundboardSoundsEventFields, APIThreadListSyncEventFields, APIThreadMembersUpdateEventFields, APIThreadMemberUpdateEventExtaFields, APITypingStartEventFields, APIVoiceChannelEffectSendEventFields, APIVoiceServerUpdateEventFields, APIWebhooksUpdateEventFields } from "./eventFields";
import { APIGuildMember, APIGuild, APIGuildAuditLogEntryCreateExtraFields, APIGuildBanAddEventFields, APIGuildBanRemoveEventFields, APIGuildCreateExtraFields, APIGuildEmojisUpdateEventFields, APIGuildIntegrationsUpdateEventFields, APIGuildMemberAddExtraFields, APIGuildMemberRemoveEventFields, APIGuildMembersChunkEventFields, APIGuildMemberUpdateEventFields, APIGuildRoleCreateEventFields, APIGuildRoleDeleteEventFields, APIGuildRoleUpdateEventFields, APIGuildScheduledEvent, APIGuildScheduledEventUserAddEventFields, APIGuildScheduledEventUserRemoveEventFields, APIGuildSoundboardSoundDeleteEventFields, APIGuildStickersUpdateEventFields } from "./guilds";
import { APIMessage, APIMessageComponentData, APIMessageCreateExtraFields, APIMessageDeleteBulkEventFields, APIMessageDeleteEventFields, APIMessagePollVoteAddFields, APIMessagePollVoteRemoveFields, APIMessageReactionAddEventFields, APIMessageReactionRemoveAllEventFields, APIMessageReactionRemoveEmojiEventFields, APIMessageReactionRemoveEventFields } from "./messages";

export interface APISubscription {
	/**
	 * ID of the subscription
	 */
	id: Snowflake;
	/**
	 * ID of the user who is subscribed
	 */
	user_id: Snowflake;
	/**
	 * List of SKUs subscribed to
	 */
	sku_ids: Snowflake[];
	/**
	 * List of entitlements granted for this subscription
	 */
	entitlement_ids: Snowflake[];
	/**
	 * Start of the current subscription period
	 */
	current_period_start: string;
	/**
	 * End of the current subscription period
	 */
	current_period_end: string;
	/**
	 * Current status of the subscription
	 */
	status: SubscriptionStatus;
	/**
	 * When the subscription was canceled
	 */
	canceled_at: string | null;
	/**
	 * ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription. Missing unless queried with a private OAuth scope.
	 */
	country?: string;
};

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
	member?: APIGuildMember;
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
	/**
	 * Selected [language](https://discord.com/developers/docs/reference#locales) of the invoking user
	 */
	locale?: Locales;
};

export interface APIApplicationCommandAutocompleteInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.ApplicationCommandAutocomplete;
	/**
	 * Interaction data payload
	 */
	data: APIApplicationCommandData;
	/**
	 * Selected [language](https://discord.com/developers/docs/reference#locales) of the invoking user
	 */
	locale?: Locales;
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
	/**
	 * Selected [language](https://discord.com/developers/docs/reference#locales) of the invoking user
	 */
	locale?: Locales;
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
	/**
	 * Selected [language](https://discord.com/developers/docs/reference#locales) of the invoking user
	 */
	locale?: Locales;
};

export interface APIPingInteraction extends APIBaseInteraction {
	/**
	 * Type of interaction
	 */
	type: InteractionTypes.Ping;
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
	options?: APIApplicationCommandInteractionDataOption[];
	/**
	 * ID of the guild the command is registered to
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the user or message targeted by a [user](https://discord.com/developers/docs/interactions/application-commands#user-commands) or [message](https://discord.com/developers/docs/interactions/application-commands#message-commands) command
	 */
	target_id?: Snowflake;
};

export interface APIApplicationCommandInteractionDataOption {
	/**
	 * Name of the parameter
	 */
	name: string;
	/**
	 * Value of [application command option type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)
	 */
	type: ApplicationCommandOptionTypes;
	/**
	 * Value of the option resulting from user input
	 */
	value?: string | number | boolean;
	/**
	 * Present if this option is a group or subcommand
	 */
	options?: APIApplicationCommandInteractionDataOption;
	/**
	 * `true` if this option is the currently focused option for autocomplete
	 */
	focused?: boolean;
};

export interface APIChannelMention {
	/**
	 * id of the channel
	 */
	id: Snowflake;
	/**
	 * id of the guild containing the channel
	 */
	guild_id: Snowflake;
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes;
	/**
	 * the name of the channel
	 */
	name: string;
};

export interface APIEmbed {
	/**
	 * title of embed
	 */
	title?: string;
	/**
	 * [type of embed](https://discord.com/developers/docs/resources/message#embed-object-embed-types) (always "rich" for webhook embeds)
	 */
	type?: EmbedTypes;
	/**
	 * description of embed
	 */
	description?: string;
	/**
	 * url of embed
	 */
	url?: string;
	/**
	 * timestamp of embed content
	 */
	timestamp?: string;
	/**
	 * color code of the embed
	 */
	color?: number;
	/**
	 * footer information
	 */
	footer?: APIEmbedFooter;
	/**
	 * image information
	 */
	image?: APIEmbedImage;
	/**
	 * thumbnail information
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * video information
	 */
	video?: APIEmbedVideo;
	/**
	 * provider information
	 */
	provider?: APIEmbedProvider;
	/**
	 * author information
	 */
	author?: APIEmbedAuthor;
	/**
	 * fields information, max of 25
	 */
	fields?: APIEmbedField[];
};

export interface APIEmbedField {
	/**
	 * name of the field
	 */
	name: string;
	/**
	 * value of the field
	 */
	value: string;
	/**
	 * whether or not this field should display inline
	 */
	inline?: boolean;
};

export interface APIEmbedAuthor {
	/**
	 * name of author
	 */
	name: string;
	/**
	 * url of author (only supports http(s))
	 */
	url?: string;
	/**
	 * url of author icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * a proxied url of author icon
	 */
	proxy_icon_url?: string;
};

export interface APIEmbedProvider {
	/**
	 * name of provider
	 */
	name?: string;
	/**
	 * url of provider
	 */
	url?: string;
};

export interface APIEmbedVideo {
	/**
	 * source url of video
	 */
	url?: string;
	/**
	 * a proxied url of the video
	 */
	proxy_url?: string;
	/**
	 * height of video
	 */
	height?: number;
	/**
	 * width of video
	 */
	width?: number;
};

export interface APIEmbedThumbnail {
	/**
	 * source url of thumbnail (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the thumbnail
	 */
	proxy_url?: string;
	/**
	 * height of thumbnail
	 */
	height?: number;
	/**
	 * width of thumbnail
	 */
	width?: number;
};

export interface APIEmbedImage {
	/**
	 * source url of image (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the image
	 */
	proxy_url?: string;
	/**
	 * height of image
	 */
	height?: number;
	/**
	 * width of image
	 */
	width?: number;
};

export interface APIEmbedFooter {
	/**
	 * footer text
	 */
	text: string;
	/**
	 * url of footer icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * a proxied url of footer icon
	 */
	proxy_icon_url?: string;
};

export interface APIReaction {
	/**
	 * Total number of times this emoji has been used to react (including super reacts)
	 */
	count: number;
	/**
	 * [Reaction count details object](https://discord.com/developers/docs/resources/message#reaction-count-details-object)
	 */
	count_details: APIReactionCountDetails;
	/**
	 * Whether the current user reacted using this emoji
	 */
	me: boolean;
	/**
	 * Whether the current user super-reacted using this emoji
	 */
	me_burst: boolean;
	/**
	 * emoji information
	 */
	emoji: APIEmoji;
	/**
	 * HEX colors used for super reaction
	 */
	burst_colors: string[];
};

export interface APIReactionCountDetails {
	/**
	 * Count of super reactions
	 */
	burst: number;
	/**
	 * Count of normal reactions
	 */
	normal: number;
};

export interface APIApplication {
	/**
	 * ID of the app
	 */
	id: Snowflake;
	/**
	 * Name of the app
	 */
	name: string;
	/**
	 * [Icon hash](https://discord.com/developers/docs/reference#image-formatting) of the app
	 */
	icon: string | null;
	/**
	 * Description of the app
	 */
	description: string;
	/**
	 * List of RPC origin URLs, if RPC is enabled
	 */
	rpc_origins?: string[];
	/**
	 * When `false`, only the app owner can add the app to guilds
	 */
	bot_public: boolean;
	/**
	 * When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow
	 */
	bot_require_code_grant: boolean;
	/**
	 * Partial user object for the bot user associated with the app
	 */
	bot?: APIUser;
	/**
	 * URL of the app's Terms of Service
	 */
	terms_of_service_url?: string;
	/**
	 * URL of the app's Privacy Policy
	 */
	privacy_policy_url?: string;
	/**
	 * Partial user object for the owner of the app
	 */
	owner?: APIUser;
	/**
	 * Hex encoded key for verification in interactions and the GameSDK's [GetTicket](https://github.com/discord/discord-api-docs/blob/legacy-gamesdk/docs/game_sdk/Applications.md#getticket)
	 */
	verify_key: string;
	/**
	 * If the app belongs to a team, this will be a list of the members of that team
	 */
	team: APITeam | null;
	/**
	 * Guild associated with the app. For example, a developer support server.
	 */
	guild_id?: Snowflake;
	/**
	 * Partial object of the associated guild
	 */
	guild?: APIGuild;
	/**
	 * If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
	 */
	primary_sku_id?: Snowflake;
	/**
	 * If this app is a game sold on Discord, this field will be the URL slug that links to the store page
	 */
	slug?: string;
	/**
	 * App's default rich presence invite [cover image hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	cover_image?: string;
	/**
	 * App's public [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags)
	 */
	flags?: number;
	/**
	 * Approximate count of guilds the app has been added to
	 */
	approximate_guild_count?: number;
	/**
	 * Approximate count of users that have installed the app
	 */
	approximate_user_install_count?: number;
	/**
	 * Array of redirect URIs for the app
	 */
	redirect_uris?: string[];
	/**
	 * [Interactions endpoint URL](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) for the app
	 */
	interactions_endpoint_url?: string;
	/**
	 * Role connection verification URL for the app
	 */
	role_connections_verification_url?: string | null;
	/**
	 * List of tags describing the content and functionality of the app. Max of 5 tags.
	 */
	tags?: string[];
	/**
	 * Settings for the app's default in-app authorization link, if enabled
	 */
	install_params?: APIInstallParams;
	/**
	 * Default scopes and permissions for each supported installation context. Value for each key is an [integration type configuration object](https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object)
	 */
	integration_types_config?: Record<ApplicationIntegrationTypes, APIApplicationIntegrationTypeConfigurationObject>;
	/**
	 * Default custom authorization URL for the app, if enabled
	 */
	custom_install_url?: string;
};

export interface APITeam {
	/**
	 * Hash of the image of the team's icon
	 */
	icon: string | null;
	/**
	 * Unique ID of the team
	 */
	id: Snowflake;
	/**
	 * Members of the team
	 */
	members: APITeamMember[];
	/**
	 * Name of the team
	 */
	name: string;
	/**
	 * User ID of the current team owner
	 */
	owner_user_id: Snowflake;
};

export interface APITeamMember {
	/**
	 * User's [membership state](https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum) on the team
	 */
	membership_state: MembershipStates;
	/**
	 * ID of the parent team of which they are a member
	 */
	team_id: Snowflake;
	/**
	 * Avatar, discriminator, ID, and username of the user
	 */
	user: APIUser;
	/**
	 * [Role](https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types) of the team member
	 */
	role: TeamMemberRoleTypes;
};

export interface APIApplicationIntegrationTypeConfigurationObject {
	oauth2_install_params?: APIInstallParams;
};

export interface APIInstallParams {
	/**
	 * [Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) to add the application to the server with
	 */
	scopes: OAuth2Scopes[];
	/**
	 * [Permissions](https://discord.com/developers/docs/topics/permissions) to request for the bot role
	 */
	permissions: string;
};

export interface APITextInputComponent {
	/**
	 * `4` for a text input
	 */
	type: MessageComponentTypes.TextInput;
	/**
	 * Developer-defined identifier for the input; max 100 characters
	 */
	custom_id: string;
	/**
	 * The [Text Input Style](https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles)
	 */
	style: TextInputStyles;
	/**
	 * Label for this component; max 45 characters
	 */
	label: string;
	/**
	 * Minimum input length for a text input; min 0, max 4000
	 */
	min_length?: number;
	/**
	 * Maximum input length for a text input; min 1, max 4000
	 */
	max_length?: number;
	/**
	 * Whether this component is required to be filled (defaults to `true`)
	 */
	required?: boolean;
	/**
	 * Pre-filled value for this component; max 4000 characters
	 */
	value?: string;
	/**
	 * Custom placeholder text if the input is empty; max 100 characters
	 */
	placeholder?: string;
};

export interface APISelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: [] | [APISelectMenuComponent];
};

export interface APINonSelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: Exclude<APIMessageComponent, APISelectMenuComponent | APIActionRowComponent>[];
};

export interface APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: SelectMenuComponentType;
	/**
	 * ID for the select menu; max 100 characters
	 */
	custom_id: string;
	/**
	 * Placeholder text if nothing is selected; max 150 characters
	 */
	placeholder?: string;
	/**
	 * Minimum number of items that must be chosen (defaults to 1); min 0, max 25
	 */
	min_values?: number;
	/**
	 * Maximum number of items that can be chosen (defaults to 1); max 25
	 */
	max_values?: number;
	/**
	 * Whether select menu is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface APIStringSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.StringSelect;
	/**
	 * Specified choices in a select menu (only required and available for string selects (type `3`); max 25
	 */
	options: APISelectOption[];
};

export interface APIChannelSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.ChannelSelect;
	/**
	 * List of channel types to include in the channel select component (type `8`)
	 */
	channel_types?: ChannelTypes[];
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	default_values?: APISelectDefaultValue[];
};

export interface APIOtherSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: Exclude<SelectMenuComponentType, MessageComponentTypes.ActionRow | MessageComponentTypes.Button | MessageComponentTypes.TextInput>;
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	default_values?: APISelectDefaultValue[];
};

export interface APISelectDefaultValue {
	/**
	 * ID of a user, role, or channel
	 */
	id: Snowflake;
	/**
	 * Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"`
	 */
	type: SelectDefaultValueTypes;
};

export interface APISelectOption {
	/**
	 * User-facing name of the option; max 100 characters
	 */
	label: string;
	/**
	 * Dev-defined value of the option; max 100 characters
	 */
	value: string;
	/**
	 * Additional description of the option; max 100 characters
	 */
	description?: string;
	/**
	 * `id`, `name`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * Will show this option as selected by default
	 */
	default?: boolean;
};

export interface APIBaseButtonComponent {
	/**
	 * `2` for a button
	 */
	type: MessageComponentTypes.Button;
	/**
	 * Whether the button is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface APIBasicButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: Exclude<ButtonStyles, ButtonStyles.Link | ButtonStyles.Premium>;
	/**
	 * Text that appears on the button; max 80 characters
	 */
	label?: string;
	/**
	 * `name`, `id`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * Developer-defined identifier for the button; max 100 characters
	 */
	custom_id?: string;
};

export interface APILinkButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: ButtonStyles.Link;
	/**
	 * Text that appears on the button; max 80 characters
	 */
	label?: string;
	/**
	 * `name`, `id`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * URL for link-style buttons
	 */
	url: string;
};

export interface APIPremiumButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: ButtonStyles.Premium;
	/**
	 * Identifier for a purchasable [SKU](https://discord.com/developers/docs/resources/sku#sku-object), only available when using premium-style buttons
	 */
	sku_id: Snowflake;
};

export interface APIStickerItem {
	/**
	 * id of the sticker
	 */
	id: Snowflake;
	/**
	 * name of the sticker
	 */
	name: string;
	/**
	 * [type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)
	 */
	format_type: StickerFormatTypes;
};

export interface APIRoleSubscriptionDataObject {
	/**
	 * the id of the sku and listing that the user is subscribed to
	 */
	role_subscription_listing_id: Snowflake;
	/**
	 * the name of the tier that the user is subscribed to
	 */
	tier_name: string;
	/**
	 * the cumulative number of months that the user has been subscribed for
	 */
	total_months_subscribed: number;
	/**
	 * whether this notification is for a renewal rather than a new purchase
	 */
	is_renewal: boolean;
};

export interface APIResolvedData {
	/**
	 * IDs and User objects
	 */
	users?: Record<Snowflake, APIUser>;
	/**
	 * IDs and partial Member objects
	 */
	members?: Record<Snowflake, APIGuildMember>;
	/**
	 * IDs and Role objects
	 */
	roles?: Record<Snowflake, APIRole>;
	/**
	 * IDs and partial Channel objects
	 */
	channels?: Record<Snowflake, APIChannel>;
	/**
	 * IDs and partial Message objects
	 */
	messages?: Record<Snowflake, APIMessage>;
	/**
	 * IDs and attachment objects
	 */
	attachments?: Record<Snowflake, APIAttachment>;
};

export interface APIAttachment {
	/**
	 * attachment id
	 */
	id: Snowflake;
	/**
	 * name of file attached
	 */
	filename: string;
	/**
	 * the title of the file
	 */
	title?: string;
	/**
	 * description for the file (max 1024 characters)
	 */
	description?: string;
	/**
	 * the attachment's [media type](https://en.wikipedia.org/wiki/Media_type)
	 */
	content_type?: string;
	/**
	 * size of file in bytes
	 */
	size: number;
	/**
	 * source url of file
	 */
	url: string;
	/**
	 * a proxied url of file
	 */
	proxy_url: string;
	/**
	 * height of file (if image)
	 */
	height?: number | null;
	/**
	 * width of file (if image)
	 */
	width?: number | null;
	/**
	 * whether this attachment is ephemeral
	 */
	ephemeral?: boolean;
	/**
	 * the duration of the audio file (currently for voice messages)
	 */
	duration_secs?: number;
	/**
	 * base64 encoded bytearray representing a sampled waveform (currently for voice messages)
	 */
	waveform?: string;
	/**
	 * [attachment flags](https://discord.com/developers/docs/resources/message#attachment-object-attachment-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags?: number;
};

export interface APIPollObject {
	/**
	 * The question of the poll. Only `text` is supported.
	 */
	question: APIPollMediaObject;
	/**
	 * Each of the answers available in the poll.
	 */
	answers: APIPollAnswerObject[];
	/**
	 * The time when the poll ends.
	 */
	expiry: string | null;
	/**
	 * Whether a user can select multiple answers
	 */
	allow_multiselect: boolean;
	/**
	 * The [layout type](https://discord.com/developers/docs/resources/poll#layout-type) of the poll
	 */
	layout_type: LayoutTypes;
	/**
	 * The results of the poll
	 */
	results?: APIPollResultsObject;
};

export interface APIPollAnswerObject {
	/**
	 * The ID of the answer
	 */
	answer_id: number;
	/**
	 * The data of the answer
	 */
	poll_media: APIPollMediaObject;
};

export interface APIPollMediaObject {
	/**
	 * The text of the field
	 */
	text?: string;
	/**
	 * The emoji of the field
	 */
	emoji?: Pick<APIEmoji, "id" | "name">;
};

export interface APIPollResultsObject {
	/**
	 * Whether the votes have been precisely counted
	 */
	is_finalized: boolean;
	/**
	 * The counts for each answer
	 */
	answer_counts: APIPollAnswerCountObject[];
};

export interface APIPollAnswerCountObject {
	/**
	 * The `answer_id`
	 */
	id: number;
	/**
	 * The number of votes for this answer
	 */
	count: number;
	/**
	 * Whether the current user voted for this answer
	 */
	me_voted: boolean;
};

export interface APIIntegration {
	id: Snowflake;
	name: string;
	type: IntegrationTypes;
	enabled: boolean;
	syncing?: boolean;
	role_id?: Snowflake;
	enable_emoticons?: boolean;
	expire_behavior?: IntegrationExpireBehaviors;
	expire_grace_period?: number;
	user?: APIUser;
	account: APIIntegrationAccount;
	synced_at?: string;
	subscriber_count?: number;
	revoked?: boolean;
	application?: APIIntegrationApplication;
	scopes?: OAuth2Scopes[];
};

export interface APIIntegrationAccount {
	/**
	 * id of the account
	 */
	id: string;
	/**
	 * name of the account
	 */
	name: string;
};

export interface APIIntegrationApplication {
	/**
	 * the id of the app
	 */
	id: Snowflake;
	/**
	 * the name of the app
	 */
	name: string;
	/**
	 * the [icon hash](https://discord.com/developers/docs/reference#image-formatting) of the app
	 */
	icon: string | null;
	/**
	 * the description of the app
	 */
	description: string;
	/**
	 * the bot associated with this application
	 */
	bot?: APIUser;
};

export interface APIUser {
	/**
	 * the user's id
	 */
	id: Snowflake;
	/**
	 * the user's username, not unique across the platform
	 */
	username: string;
	/**
	 * the user's Discord-tag
	 */
	discriminator: string;
	/**
	 * the user's display name, if it is set. For bots, this is the application name
	 */
	global_name: string;
	/**
	 * the user's [avatar hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	avatar: string | null;
	/**
	 * whether the user belongs to an OAuth2 application
	 */
	bot?: boolean;
	/**
	 * whether the user is an Official Discord System user (part of the urgent message system)
	 */
	system?: boolean;
	/**
	 * whether the user has two factor enabled on their account
	 */
	mfa_enabled: boolean;
	/**
	 * the user's [banner hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	banner?: string | null;
	/**
	 * the user's banner color encoded as an integer representation of hexadecimal color code
	 */
	accent_color?: number | null;
	/**
	 * the user's chosen [language option](https://discord.com/developers/docs/reference#locales)
	 */
	locale?: Locales;
	/**
	 * the [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	flags?: number;
	/**
	 * whether the email on this account has been verified
	 */
	verified?: boolean;
	/**
	 * the user's email
	 */
	email?: string | null;
	/**
	 * the [type of Nitro subscription](https://discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account
	 */
	premium_type?: PremiumTypes;
	/**
	 * the public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	public_flags?: number;
	/**
	 * data for the user's avatar decoration
	 */
	avatar_decoration_data?: APIAvatarDecorationData | null;
};

/**
 * The data for the user's [avatar decoration](https://support.discord.com/hc/en-us/articles/13410113109911-Avatar-Decorations).
 */
export interface APIAvatarDecorationData {
	/**
	 * the [avatar decoration hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	asset: string;
	/**
	 * id of the avatar decoration's SKU
	 */
	sku_id: Snowflake;
};

/**
 * A partial [guild](https://discord.com/developers/docs/resources/guild#guild-object) object.
 * Represents an Offline Guild, or a Guild whose information has not been provided through [Guild Create](https://discord.com/developers/docs/topics/gateway-events#guild-create) events during the Gateway connect.
 */
export interface APIUnavailableGuild {
	/**
	 * guild id
	 */
	id: Snowflake;
	unavailable: true;
};

/**
 * Application command permissions allow you to enable or disable commands for specific users, roles, or channels within a guild.
 */
export interface APIApplicationCommandPermission {
	/**
	 * ID of the role, user, or channel. It can also be a [permission constant](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants)
	 */
	id: Snowflake;
	/**
	 * role (`1`), user (`2`), or channel (`3`)
	 */
	type: ApplicationCommandPermissionTypes;
	/**
	 * `true` to allow, `false`, to disallow
	 */
	permission: boolean;
};

export interface APIAutoModerationRule {
	/**
	 * the id of this rule
	 */
	id: Snowflake;
	/**
	 * the id of the guild which this rule belongs to
	 */
	guild_id: Snowflake;
	/**
	 * the rule name
	 */
	name: string;
	/**
	 * the user which first created this rule
	 */
	creator_id: Snowflake;
	/**
	 * the rule [event type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types)
	 */
	event_type: EventTypes;
	/**
	 * the rule [trigger type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types)
	 */
	trigger_type: TriggerTypes;
	/**
	 * the rule [trigger metadata](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata)
	 */
	trigger_metadata: APITriggerMetadata;
	/**
	 * the actions which will execute when the rule is triggered
	 */
	actions: APIAutoModerationAction[];
	/**
	 * whether the rule is enabled
	 */
	enabled: boolean;
	/**
	 * the role ids that should not be affected by the rule (Maximum of 20)
	 */
	exempt_roles: Snowflake[];
	/**
	 * the channel ids that should not be affected by the rule (Maximum of 50)
	 */
	exempt_channels: Snowflake[];
};

/**
 * Additional data used to determine whether a rule should be triggered. Different fields are relevant based on the value of [trigger_type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types).

 */
export interface APITriggerMetadata {
	/**
	 * substrings which will be searched for in content (Maximum of 1000) (Associated trigger types: KEYWORD, MEMBER_PROFILE)
	 */
	keyword_filter: string[];
	/**
	 * regular expression patterns which will be matched against content (Maximum of 10) (Associated trigger types: KEYWORD, MEMBER_PROFILE)
	 */
	regex_patterns: string[];
	/**
	 * the internally pre-defined wordsets which will be searched for in content (Associated trigger types: KEYWORD_PRESET)
	 */
	presets: KeywordPresetTypes;
	/**
	 * substrings which should not trigger the rule (Maximum of 100 or 1000) (Associated trigger types: KEYWORD, KEYWORD_PRESET, MEMBER_PROFILE)
	 */
	allow_list: string[];
	/**
	 * total number of unique role and user mentions allowed per message (Maximum of 50) (Associated trigger types: MENTION_SPAM)
	 */
	mentionTotalLimit: number;
	/**
	 * whether to automatically detect mention raids (Associated trigger types: MENTION_SPAM)
	 */
	mentionRaidProtectionEnabled: boolean;
};

/**
 * An action which will execute whenever a rule is triggered.
 */
export interface APIAutoModerationAction {
	/**
	 * the type of action
	 */
	type: ActionTypes;
	/**
	 * additional metadata needed during execution for this specific action type
	 */
	metadata?: APIActionMetadata;
};

/**
 * Additional data used when an action is executed. Different fields are relevant based on the value of [action type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types).
 */
export interface APIActionMetadata {
	/**
	 * channel to which user content should be logged	(Associated action types: SEND_ALERT_MESSAGE) (Constraints: existing channel)
	 */
	channel_id: Snowflake;
	/**
	 * timeout duration in seconds (Associated action types: TIMEOUT) (Constraints: maximum of 2419200 seconds (4 weeks))
	 */
	duration_seconds: number;
	/**
	 * additional explanation that will be shown to members whenever their message is blocked (Associated action types: BLOCK_MESSAGE) (Constraints: maximum of 150 characters)
	 */
	custom_message? :string;
};

export interface APIOverwrite {
	/**
	 * role or user id
	 */
	id: Snowflake;
	/**
	 * either 0 (role) or 1 (member)
	 */
	type: OverwriteTypes;
	/**
	 * permission bit set
	 */
	allow: string;
	/**
	 * permission bit set
	 */
	deny: string;
};

export interface APIVoiceRegion {
	/**
	 * unique ID for the region
	 */
	id: string;
	/**
	 * name of the region
	 */
	name: string;
	/**
	 * true for a single server that is closest to the current user's client
	 */
	optimal: boolean;
	/**
	 * whether this is a deprecated voice region (avoid switching to these)
	 */
	deprecated: boolean;
	/**
	 * whether this is a custom voice region (used for events/etc)
	 */
	custom: boolean;
};

export interface APIThreadMetadata {
	/**
	 * whether the thread is archived
	 */
	archived: boolean;
	/**
	 * the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080
	 */
	auto_archive_duration: 60 | 1440 | 4320 | 10080;
	/**
	 * timestamp when the thread's archive status was last changed, used for calculating recent activity
	 */
	archive_timestamp: string;
	/**
	 * whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it
	 */
	locked: boolean;
	/**
	 * whether non-moderators can add other non-moderators to a thread; only available on private threads
	 */
	invitable?: boolean;
	/**
	 * timestamp when the thread was created; only populated for threads created after 2022-01-09
	 */
	create_timestamp?: string | null;
};

export interface APIThreadMember {
	/**
	 * ID of the thread
	 */
	id?: Snowflake;
	/**
	 * ID of the user
	 */
	user_id?: Snowflake;
	/**
	 * Time the user last joined the thread
	 */
	join_timestamp: string;
	/**
	 * Any user-thread settings, currently only used for notifications
	 */
	flags: number;
	/**
	 * Additional information about the user
	 */
	member?: APIGuildMember;
};

export interface APIForumTag {
	/**
	 * the id of the tag
	 */
	id: Snowflake;
	/**
	 * the name of the tag (0-20 characters)
	 */
	name: string;
	/**
	 * whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission
	 */
	moderated: boolean;
	/**
	 * the id of a guild's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of the emoji
	 */
	emoji_name: string | null;
};

export interface APIDefaultReaction {
	/**
	 * the id of a guild's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of the emoji
	 */
	name: string | null;
};

export interface APIEntitlement {
	/**
	 * ID of the entitlement
	 */
	id: Snowflake;
	/**
	 * ID of the SKU
	 */
	sku_id: Snowflake;
	/**
	 * ID of the parent application
	 */
	application_id: Snowflake;
	/**
	 * ID of the user that is granted access to the entitlement's sku
	 */
	user_id?: Snowflake;
	/**
	 * [Type of entitlement](https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-types)
	 */
	type: EntitlementTypes;
	/**
	 * Entitlement was deleted
	 */
	deleted: boolean;
	/**
	 * Start date at which the entitlement is valid. Not present when using test entitlements.
	 */
	starts_at?: string;
	/**
	 * Date at which the entitlement is no longer valid. Not present when using test entitlements.
	 */
	ends_at?: string;
	/**
	 * ID of the guild that is granted access to the entitlement's sku
	 */
	guild_id?: Snowflake;
	/**
	 * For consumable items, whether or not the entitlement has been consumed
	 */
	consumed?: boolean;
};

export interface APIVoiceState {
	/**
	 * the guild id this voice state is for
	 */
	guild_id?: Snowflake;
	/**
	 * the channel id this user is connected to
	 */
	channel_id: Snowflake;
	/**
	 * the user id this voice state is for
	 */
	user_id: Snowflake;
	/**
	 * the guild member this voice state is for
	 */
	member?: APIGuildMember;
	/**
	 * the session id for this voice state
	 */
	session_id: string;
	/**
	 * whether this user is deafened by the server
	 */
	deaf: boolean;
	/**
	 * whether this user is muted by the server
	 */
	mute: boolean;
	/**
	 * whether this user is locally deafened
	 */
	self_deaf: boolean;
	/**
	 * whether this user is locally muted
	 */
	self_mute: boolean;
	/**
	 * whether this user is streaming using "Go Live"
	 */
	self_stream?: boolean;
	/**
	 * whether this user's camera is enabled
	 */
	self_video: boolean;
	/**
	 * whether this user's permission to speak is denied
	 */
	suppress: boolean;
	/**
	 * the time at which the user requested to speak
	 */
	request_to_speak_timestamp: string | null;
};

/**
 * Active sessions are indicated with an "online", "idle", or "dnd" string per platform. If a user is offline or invisible, the corresponding field is not present.
 */
export interface APIClientStatus {
	/**
	 * User's status set for an active desktop (Windows, Linux, Mac) application session
	 */
	desktop?: PresenceStatus;
	/**
	 * User's status set for an active mobile (iOS, Android) application session
	 */
	mobile?: PresenceStatus;
	/**
	 * User's status set for an active web (browser, bot user) application session
	 */
	web?: PresenceStatus;
};

export interface APIStageInstance {
	/**
	 * The id of this Stage instance
	 */
	id: Snowflake;
	/**
	 * The guild id of the associated Stage channel
	 */
	guild_id: Snowflake;
	/**
	 * The id of the associated Stage channel
	 */
	channel_id: Snowflake;
	/**
	 * The topic of the Stage instance (1-120 characters)
	 */
	topic: string;
	/**
	 * The [privacy level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance
	 */
	privacy_level: PrivacyLevels;
	/**
	 * Whether or not Stage Discovery is disabled (deprecated)
	 */
	discoverable_disabled: boolean;
	/**
	 * The id of the scheduled event for this Stage instance
	 */
	guild_scheduled_event_id: Snowflake | null;
};

export interface APISoundboardSound {
	/**
	 * the name of this sound
	 */
	name: string;
	/**
	 * the id of this sound
	 */
	sound_id: Snowflake;
	/**
	 * the volume of this sound, from 0 to 1
	 */
	volume: number;
	/**
	 * the id of this sound's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of this sound's standard emoji
	 */
	emoji_name: string | null;
	/**
	 * the id of the guild this sound is in
	 */
	guild_id?: Snowflake;
	/**
	 * whether this sound can be used, may be false due to loss of Server Boosts
	 */
	available: boolean;
	/**
	 * the user who created this sound
	 */
	user?: APIUser;
};

export interface APIRole {
	/**
	 * role id
	 */
	id: Snowflake;
	/**
	 * role name
	 */
	name: string;
	/**
	 * integer representation of hexadecimal color code
	 */
	color: number;
	/**
	 * if this role is pinned in the user listing
	 */
	hoist: boolean;
	/**
	 * role [icon hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	icon?: string | null;
	/**
	 * role unicode emoji
	 */
	unicode_emoji?: string | null;
	/**
	 * position of this role (roles with the same position are sorted by id)
	 */
	position: number;
	/**
	 * permission bit set
	 */
	permissions: string;
	/**
	 * whether this role is managed by an integration
	 */
	managed: boolean;
	/**
	 * whether this role is mentionable
	 */
	mentionable: boolean;
	/**
	 * the tags this role has
	 */
	tags?: APIRoleTags;
	/**
	 * [role flags](https://discord.com/developers/docs/topics/permissions#role-object-role-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags: number;
};

/**
 * Tags with type `null` represent booleans. They will be present and set to `null` if they are "true", and will be not present if they are "false".

 */
export interface APIRoleTags {
	/**
	 * the id of the bot this role belongs to
	 */
	bot_id?: Snowflake;
	/**
	 * the id of the integration this role belongs to
	 */
	integration_id?: Snowflake;
	/**
	 * whether this is the guild's Booster role
	 */
	premium_subscriber?: null;
	/**
	 * the id of this role's subscription sku and listing
	 */
	subscription_listing_id?: Snowflake;
	/**
	 * whether this role is available for purchase
	 */
	available_for_purchase?: null;
	/**
	 * whether this role is a guild's linked role
	 */
	guild_connections?: null;
};

export interface APIEmoji {
	/**
	 * [emoji id](https://discord.com/developers/docs/reference#image-formatting)
	 */
	id: Snowflake | null;
	/**
	 * emoji name
	 */
	name: string | null;
	/**
	 * roles allowed to use this emoji
	 */
	roles?: string[];
	/**
	 * user that created this emoji
	 */
	user?: APIUser;
	/**
	 * whether this emoji must be wrapped in colons
	 */
	require_colons?: boolean;
	/**
	 * whether this emoji is managed
	 */
	managed?: boolean;
	/**
	 * whether this emoji is animated
	 */
	animated?: boolean;
	/**
	 * whether this emoji can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
};

export interface APIWelcomeScreen {
	/**
	 * the server description shown in the welcome screen
	 */
	description: string;
	/**
	 * the channels shown in the welcome screen, up to 5
	 */
	welcome_channels: APIWelcomeScreenChannel[];
};

export interface APIWelcomeScreenChannel {
	/**
	 * the channel's id
	 */
	channel_id: Snowflake;
	/**
	 * the description shown for the channel
	 */
	description: string;
	/**
	 * the [emoji id](https://discord.com/developers/docs/reference#image-formatting), if the emoji is custom
	 */
	emoji_id: Snowflake | null;
	/**
	 * the emoji name if custom, the unicode character if standard, or `null` if no emoji is set
	 */
	emoji_name: string | null;
};

export interface APISticker {
	/**
	 * [id of the sticker](https://discord.com/developers/docs/reference#image-formatting)
	 */
	id: Snowflake;
	/**
	 * for standard stickers, id of the pack the sticker is from
	 */
	pack_id?: Snowflake;
	/**
	 * name of the sticker
	 */
	name: string;
	/**
	 * description of the sticker
	 */
	description: string | null;
	/**
	 * autocomplete/suggestion tags for the sticker (max 200 characters)
	 */
	tags: string;
	/**
	 * [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)
	 */
	type: StickerTypes;
	/**
	 * [type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)
	 */
	format_type: StickerFormatTypes;
	/**
	 * whether this guild sticker can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
	/**
	 * id of the guild that owns this sticker
	 */
	guild_id?: Snowflake;
	/**
	 * the user that uploaded the guild sticker
	 */
	user?: APIUser;
	/**
	 * the standard sticker's sort order within its pack
	 */
	sort_value?: number;
};

export interface APIAuditLogEntry {
	/**
	 * ID of the affected entity (webhook, user, role, etc.)
	 */
	target_id: string | null;
	/**
	 * Changes made to the target_id
	 */
	changes: APIAuditLogChange[];
	/**
	 * User or app that made the changes
	 */
	user_id: Snowflake | null;
	/**
	 * ID of the entry
	 */
	id: Snowflake;
	/**
	 * Type of action that occurred
	 */
	action_type: AuditLogEvents;
	/**
	 * Additional info for certain event types
	 */
	options?: APIOptionalAuditEntryInfo;
	/**
	 * Reason for the change (1-512 characters)
	 */
	reason?: string;
};

export interface APIAuditLogChange {
	/**
	 * New value of the key
	 */
	new_value?: string;
	/**
	 * Old value of the key
	 */
	old_value?: string;
	/**
	 * Name of the changed entity, with a few [exceptions](https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions)
	 */
	key: string;
};

export interface APIOptionalAuditEntryInfo {
	/**
	 * ID of the app whose permissions were targeted
	 */
	application_id: Snowflake;
	/**
	 * Name of the Auto Moderation rule that was triggered
	 */
	auto_moderation_rule_name: string;
	/**
	 * Trigger type of the Auto Moderation rule that was triggered
	 */
	auto_moderation_rule_trigger_type: string;
	/**
	 * Channel in which the entities were targeted
	 */
	channel_id: Snowflake;
	/**
	 * Number of entities that were targeted
	 */
	count: string;
	/**
	 * ID of the overwritten entity
	 */
	delete_member_days: string;
	/**
	 * ID of the overwritten entity
	 */
	id: Snowflake;
	/**
	 * Number of members removed by the prune
	 */
	members_removed: string;
	/**
	 * ID of the message that was targeted
	 */
	message_id: Snowflake;
	/**
	 * Name of the role if type is `"0"` (not present if type is `"1"`)
	 */
	role_name: string;
	/**
	 * Type of overwritten entity - role (`"0"`) or member (`"1"`)
	 */
	type: string;
	/**
	 * The type of integration which performed the action
	 */
	integration_type: string;
};

export interface APIBaseApplicationCommand {
	/**
	 * Unique ID of command
	 */
	id: Snowflake;
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type?: ApplicationCommandTypes;
	/**
	 * ID of the parent application
	 */
	application_id: Snowflake;
	/**
	 * Guild ID of the command, if not global
	 */
	guild_id?: Snowflake;
	/**
	 * [Name of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming), 1-32 characters
	 */
	name: string;
	/**
	 * Localization dictionary for `name` field. Values follow the same restrictions as `name`
	 */
	name_localizations?: Record<Locales, string> | null;
	/**
	 * Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands
	 */
	description: string;
	/**
	 * Localization dictionary for `description` field. Values follow the same restrictions as `description`
	 */
	description_localizations?: Record<Locales, string> | null;
	/**
	 * Set of [permissions](https://discord.com/developers/docs/topics/permissions) represented as a bit set
	 */
	default_member_permissions: string | null;
	/**
	 * Indicates whether the command is [age-restricted](https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands), defaults to `false`
	 */
	nsfw?: boolean;
	/**
	 * [Installation contexts](https://discord.com/developers/docs/resources/application#installation-context) where the command is available, only for globally-scoped commands.
	 * Defaults to your app's [configured contexts](https://discord.com/developers/docs/resources/application#installation-context)
	 */
	integration_types?: IntegrationTypes[];
	/**
	 * [Interaction context(s)](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types) where the command can be used, only for globally-scoped commands.
	 * By default, all interaction context types included for new commands.
	 */
	contexts?: InteractionContextTypes[] | null;
	/**
	 * Autoincrementing version identifier updated during substantial record changes
	 */
	version: Snowflake;
};

export interface APIMessageApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.Message;
};

export interface APIUserApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.User;
};

export interface APIPrimaryEntryPointApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.PrimaryEntryPoint;
	/**
	 * Determines whether the interaction is handled by the app's interactions handler or by Discord
	 */
	handler?: EntryPointCommandHandlerTypes;
};

export interface APIChatInputApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type?: ApplicationCommandTypes.ChatInput;
	/**
	 * Parameters for the command, max of 25
	 */
	options?: APIApplicationCommandOption[];
};

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

export interface APIApplcationCommandParams {
	/**
	 * [Name of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming), 1-32 characters
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	name_localizations?: Record<Locales, string> | null;
	/**
	 * 1-100 character description for `CHAT_INPUT` commands
	 */
	description?: string;
	/**
	 * Localization dictionary for the `description` field. Values follow the same restrictions as `description`
	 */
	description_localizations?: Record<Locales, string> | null;
	/**
	 * the parameters for the command, max of 25
	 */
	options?: APIApplicationCommandOption[];
	/**
	 * Set of [permissions](https://discord.com/developers/docs/topics/permissions) represented as a bit set
	 */
	default_member_permissions?: string | null;
	/**
	 * [Installation context(s)](https://discord.com/developers/docs/resources/application#installation-context) where the command is available
	 */
	integration_types?: ApplicationIntegrationTypes[];
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

export interface APIInteractionCallbackResponse {
	/**
	 * The interaction object associated with the interaction response.
	 */
	interaction: APIInteractionCallback;
	/**
	 * The resource that was created by the interaction response.
	 */
	resource?: APIInteractionResource;
};

export interface APIInteractionResource {
	/**
	 * [Interaction callback type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)
	 */
	type: InteractionCallbackTypes;
	/**
	 * Represents the Activity launched by this interaction.
	 */
	activity_instance?: APIInteractionCallbackActivityInstanceResource;
	/**
	 * Message created by the interaction.
	 */
	message?: APIMessage;
};

export interface APIInteractionCallback {
	/**
	 * ID of the interaction
	 */
	id: Snowflake;
	/**
	 * [Interaction type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type)
	 */
	type: InteractionTypes;
	/**
	 * Instance ID of the Activity if one was launched or joined
	 */
	activity_instance_id?: string;
	/**
	 * ID of the message that was created by the interaction
	 */
	response_message_id?: Snowflake;
	/**
	 * Whether or not the message is in a loading state
	 */
	response_message_loading?: boolean;
	/**
	 * Whether or not the response message was ephemeral
	 */
	response_message_ephemeral?: boolean;
};

export interface APIInteractionCallbackActivityInstanceResource {
	/**
	 * Instance ID of the Activity if one was launched or joined.
	 */
	id: string;
};

export interface APIInteractionResponse {
	/**
	 * Type of response
	 */
	type: InteractionCallbackTypes;
	/**
	 * An optional response message
	 */
	data?: APIInteractionCallbackData;
};

export interface APIAllowedMentions {
	/**
	 * An array of [allowed mention types](https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types) to parse from the content.
	 */
	parse: AllowedMentionsTypes[];
	/**
	 * Array of role_ids to mention (Max size of 100)
	 */
	roles: Snowflake[];
	/**
	 * Array of user_ids to mention (Max size of 100)
	 */
	users: Snowflake[];
	/**
	 * For replies, whether to mention the author of the message being replied to (default false)
	 */
	replied_user: boolean;
};

/**
 * Not all message fields are currently supported.
 */
export interface APIMessageInteractionCallbackData {
	/**
	 * Whether the response is TTS
	 */
	tts?: boolean;
	/**
	 * Message content
	 */
	content?: string;
	/**
	 * Supports up to 10 embeds
	 */
	embeds?: APIEmbed[];
	/**
	 * [Allowed mentions](https://discord.com/developers/docs/resources/message#allowed-mentions-object) object
	 */
	allowed_mentions?: APIAllowedMentions;
	/**
	 * [Message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS`, `EPHEMERAL`, and `SUPPRESS_NOTIFICATIONS` can be set)
	 */
	flags?: number;
	/**
	 * Message components
	 */
	components?: APIActionRowComponent[];
	/**
	 * Attachment objects with filename and description
	 */
	attachments?: APIAttachment[];
	/**
	 * Details about the poll
	 */
	poll?: APIPollCreateRequestObject;
};

export interface APIAutocompleteInteractionCallbackData {
	/**
	 * autocomplete choices (max of 25 choices)
	 */
	choices: APIApplicationCommandOptionChoice<string | number>[];
};

export interface APIModalInteractionCallbackData {
	/**
	 * Developer-defined identifier for the modal, max 100 characters
	 */
	custom_id: string;
	/**
	 * Title of the popup modal, max 45 characters
	 */
	title: string;
	/**
	 * Between 1 and 5 (inclusive) components that make up the modal
	 */
	components: APIActionRowComponent[];
};

export interface APIPollCreateRequestObject {
	/**
	 * The question of the poll. Only `text` is supported.
	 */
	question: APIPollMediaObject;
	/**
	 * Each of the answers available in the poll, up to 10
	 */
	answers: APIPollAnswerObject[];
	/**
	 * Number of hours the poll should be open for, up to 32 days. Defaults to 24
	 */
	duration?: number;
	/**
	 * Whether a user can select multiple answers. Defaults to false
	 */
	allow_multiselect?: boolean;
	/**
	 * The [layout type](https://discord.com/developers/docs/resources/poll#layout-type) of the poll. Defaults to... DEFAULT!
	 */
	layout_type?: LayoutTypes;
};

export interface ApiGatewayEvents {
	[GatewayEventNames.Ready]: [d: APIReadyEventFields, s: number | null, t: string | null];
	[GatewayEventNames.Resumed]: [];
	[GatewayEventNames.ApplicationCommandPermissionsUpdate]: [d: ApplicationCommandPermissionTypes, s: number | null, t: string | null];
	[GatewayEventNames.AutoModerationRuleCreate]: [d: APIAutoModerationRule, s: number | null, t: string | null];
	[GatewayEventNames.AutoModerationRuleUpdate]: [d: APIAutoModerationRule, s: number | null, t: string | null];
	[GatewayEventNames.AutoModerationRuleDelete]: [d: APIAutoModerationRule, s: number | null, t: string | null];
	[GatewayEventNames.AutoModerationActionExecution]: [d: APIAutoModerationActionExecutionEventFields, s: number | null, t: string | null];
	[GatewayEventNames.ChannelCreate]: [d: APIChannel, s: number | null, t: string | null];
	[GatewayEventNames.ChannelUpdate]: [d: APIChannel, s: number | null, t: string | null];
	[GatewayEventNames.ChannelDelete]: [d: APIChannel, s: number | null, t: string | null];
	[GatewayEventNames.ChannelPinsUpdate]: [d: APIChannelPinsUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.ThreadCreate]: [d: APIThreadChannel, s: number | null, t: string | null];
	[GatewayEventNames.ThreadUpdate]: [d: APIThreadChannel, s: number | null, t: string | null];
	[GatewayEventNames.ThreadDelete]: [d: APIThreadChannel, s: number | null, t: string | null];
	[GatewayEventNames.ThreadListSync]: [d: APIThreadListSyncEventFields, s: number | null, t: string | null];
	[GatewayEventNames.ThreadMemberUpdate]: [d: APIThreadChannel & APIThreadMemberUpdateEventExtaFields, s: number | null, t: string | null];
	[GatewayEventNames.ThreadMembersUpdate]: [d: APIThreadMembersUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.EntitlementCreate]: [d: APIEntitlement, s: number | null, t: string | null];
	[GatewayEventNames.EntitlementUpdate]: [d: APIEntitlement, s: number | null, t: string | null];
	[GatewayEventNames.EntitlementDelete]: [d: APIEntitlement, s: number | null, t: string | null];
	[GatewayEventNames.GuildCreate]: [d: (APIGuild & APIGuildCreateExtraFields) | APIUnavailableGuild, s: number | null, t: string | null];
	[GatewayEventNames.GuildUpdate]: [d: APIGuild, s: number | null, t: string | null];
	[GatewayEventNames.GuildDelete]: [d: APIUnavailableGuild, s: number | null, t: string | null];
	[GatewayEventNames.GuildAuditLogEntryCreate]: [d: APIAuditLogEntry & APIGuildAuditLogEntryCreateExtraFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildBanAdd]: [d: APIGuildBanAddEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildBanRemove]: [d: APIGuildBanRemoveEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildEmojisUpdate]: [d: APIGuildEmojisUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildStickersUpdate]: [d: APIGuildStickersUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildIntegrationsUpdate]: [d: APIGuildIntegrationsUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildMemberAdd]: [d: APIGuildMember & APIGuildMemberAddExtraFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildMemberRemove]: [d: APIGuildMemberRemoveEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildMemberUpdate]: [d: APIGuildMemberUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildMembersChunk]: [d: APIGuildMembersChunkEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildRoleCreate]: [d: APIGuildRoleCreateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildRoleUpdate]: [d: APIGuildRoleUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildRoleDelete]: [d: APIGuildRoleDeleteEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildScheduledEventCreate]: [d: APIGuildScheduledEvent, s: number | null, t: string | null];
	[GatewayEventNames.GuildScheduledEventUpdate]: [d: APIGuildScheduledEvent, s: number | null, t: string | null];
	[GatewayEventNames.GuildScheduledEventDelete]: [d: APIGuildScheduledEvent, s: number | null, t: string | null];
	[GatewayEventNames.GuildScheduledEventUserAdd]: [d: APIGuildScheduledEventUserAddEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildScheduledEventUserRemove]: [d: APIGuildScheduledEventUserRemoveEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildSoundboardSoundCreate]: [d: APISoundboardSound, s: number | null, t: string | null];
	[GatewayEventNames.GuildSoundboardSoundUpdate]: [d: APISoundboardSound, s: number | null, t: string | null];
	[GatewayEventNames.GuildSoundboardSoundDelete]: [d: APIGuildSoundboardSoundDeleteEventFields, s: number | null, t: string | null];
	[GatewayEventNames.GuildSoundboardSoundsUpdate]: [d: APISoundboardSound[], s: number | null, t: string | null];
	[GatewayEventNames.SoundboardSounds]: [d: APISoundboardSoundsEventFields, s: number | null, t: string | null];
	[GatewayEventNames.IntegrationCreate]: [d: APIIntegration & APIIntegrationCreateEventAdditionalFields, s: number | null, t: string | null];
	[GatewayEventNames.IntegrationUpdate]: [d: APIIntegration & APIIntegrationUpdateEventAdditionalFields, s: number | null, t: string | null];
	[GatewayEventNames.IntegrationDelete]: [d: APIIntegrationDeleteEventFields, s: number | null, t: string | null];
	[GatewayEventNames.InteractionCreate]: [d: APIInteraction, s: number | null, t: string | null];
	[GatewayEventNames.InviteCreate]: [d: APIInviteCreateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.InviteDelete]: [d: APIInviteDeleteEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageCreate]: [d: APIMessage & APIMessageCreateExtraFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageUpdate]: [d: APIMessage & APIMessageCreateExtraFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageDelete]: [d: APIMessageDeleteEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageDeleteBulk]: [d: APIMessageDeleteBulkEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageReactionAdd]: [d: APIMessageReactionAddEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageReactionRemove]: [d: APIMessageReactionRemoveEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageReactionRemoveAll]: [d: APIMessageReactionRemoveAllEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessageReactionRemoveEmoji]: [d: APIMessageReactionRemoveEmojiEventFields, s: number | null, t: string | null];
	[GatewayEventNames.PresenceUpdate]: [d: APIPresenceUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.StageInstanceCreate]: [d: APIStageInstance, s: number | null, t: string | null];
	[GatewayEventNames.StageInstanceUpdate]: [d: APIStageInstance, s: number | null, t: string | null];
	[GatewayEventNames.StageInstanceDelete]: [d: APIStageInstance, s: number | null, t: string | null];
	[GatewayEventNames.SubscriptionCreate]: [d: APISubscription, s: number | null, t: string | null];
	[GatewayEventNames.SubscriptionUpdate]: [d: APISubscription, s: number | null, t: string | null];
	[GatewayEventNames.SubscriptionDelete]: [d: APISubscription, s: number | null, t: string | null];
	[GatewayEventNames.TypingStart]: [d: APITypingStartEventFields, s: number | null, t: string | null];
	[GatewayEventNames.UserUpdate]: [d: APIUser, s: number | null, t: string | null];
	[GatewayEventNames.VoiceChannelEffectSend]: [d: APIVoiceChannelEffectSendEventFields, s: number | null, t: string | null];
	[GatewayEventNames.VoiceStateUpdate]: [d: APIVoiceState, s: number | null, t: string | null];
	[GatewayEventNames.VoiceServerUpdate]: [d: APIVoiceServerUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.WebhooksUpdate]: [d: APIWebhooksUpdateEventFields, s: number | null, t: string | null];
	[GatewayEventNames.MessagePollVoteAdd]: [d: APIMessagePollVoteAddFields, s: number | null, t: string | null];
	[GatewayEventNames.MessagePollVoteRemove]: [d: APIMessagePollVoteRemoveFields, s: number | null, t: string | null];
};
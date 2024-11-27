import WebSocket = require("ws");
import { AllowedMentionsTypes, ApplicationCommandOptionTypes, ApplicationCommandTypes, ApplicationFlags, ApplicationIntegrationTypes, AttachmentFlag, BitwisePermissionFlags, ButtonStyles, ChannelTypes, EmbedTypes, GatewayOpcodes, InteractionCallbackTypes, InteractionContextTypes, LayoutTypes, Locales, MessageComponentTypes, MessageFlags, PremiumTypes, RateLimitScopes, SelectDefaultValueTypes, TextInputStyles, UserFlags } from "../enums/other";
import { ActionRowComponent, ApplicationCommandOption, InteractionCallbackData, MessageComponent, SelectMenuComponent, SelectMenuComponentType, Snowflake } from "../types";
import { ClientRequest, IncomingMessage } from "http";

export interface Cache {
	users: Record<string, User>;
	guilds: Record<string,  UnvailableGuild>;
	application?: PartialApplication;
	sessionId?: string;
	resumeGatewayUrl?: string;
}

/**
 * A partial [guild](https://discord.com/developers/docs/resources/guild#guild-object) object.
 * Represents an Offline Guild, or a Guild whose information has not been provided through [Guild Create](https://discord.com/developers/docs/topics/gateway-events#guild-create) events during the Gateway connect.
 */
export interface UnvailableGuild {
	/**
	 * guild id
	 */
	id: string;
	unavailable: true;
};

export interface SessionStartLimit {
	/**
	 * Total number of session starts the current user is allowed
	 */
	total: number;
	/**
	 * Remaining number of session starts the current user is allowed
	 */
	remaining: number;
	/**
	 * Number of milliseconds after which the limit resets
	 */
	reset_after: number;
	/**
	 * Number of identify requests allowed per 5 seconds
	 */
	max_concurrency: number;
};

export interface RateLimit {
	limit: number;
	remaining: number;
	reset: number;
	bucket: string;
	global: any | null;
	scope: RateLimitScopes | null;
};

export interface Error {
	code: number;
	message: string;
	errors: {};
};

export interface User {
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
	globalName: string;
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
	mfaEnabled: boolean;
	/**
	 * the user's [banner hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	banner?: string | null;
	/**
	 * the user's banner color encoded as an integer representation of hexadecimal color code
	 */
	accentColor?: number | null;
	/**
	 * the user's chosen [language option](https://discord.com/developers/docs/reference#locales)
	 */
	locale?: Locales;
	/**
	 * the [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	flags?: (keyof typeof UserFlags)[];
	/**
	 * the [type of Nitro subscription](https://discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account
	 */
	premiumType?: PremiumTypes;
	/**
	 * the public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	publicFlags?: (keyof typeof UserFlags)[];
	/**
	 * data for the user's avatar decoration
	 */
	avatarDecorationData?: AvatarDecorationData | null;
};

/**
 * The data for the user's [avatar decoration](https://support.discord.com/hc/en-us/articles/13410113109911-Avatar-Decorations).
 */
export interface AvatarDecorationData {
	/**
	 * the [avatar decoration hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	asset: string;
	/**
	 * id of the avatar decoration's SKU
	 */
	skuId: Snowflake;
};

export interface PartialApplication {
	id: Snowflake;
	flags: (keyof typeof ApplicationFlags)[];
};

export interface Client {
	rateLimits: Record<string, RateLimit>;
	cache: Cache;
	token: string;
	ws: WebSocket;
	lastSeq: number | null;
};

export interface WsEvents {
	close: [code: number, reason: Buffer];
	error: [err: Error];
	upgrade: [request: IncomingMessage];
	message: [data: WebSocket.RawData, isBinary: boolean];
	open: [];
	ping: [data: Buffer];
	pong: [data: Buffer];
	"unexpected-response": [request: ClientRequest, response: IncomingMessage];
};

export interface Opcodes {
	[GatewayOpcodes.Dispatch]: [d: any | null, s: number | null, t: string | null],
	[GatewayOpcodes.Heartbeat]: [d: number | null, s: null, t: null],
	[GatewayOpcodes.HeartbeatACK]: [d: any | null, s: null, t: null],
	[GatewayOpcodes.Hello]: [d: {
		/**
		 * Interval (in milliseconds) an app should heartbeat with
		 */
		heartbeat_interval: number;
	} | null, s: null, t: null],
	[GatewayOpcodes.InvalidSession]: [d: boolean, s: null, t: null],
	[GatewayOpcodes.Reconnect]: [d: any | null, s: null, t: null],
	[GatewayOpcodes.Resume]: [d: any | null, s: null, t: null]
};

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

export interface Embed {
	/**
	 * title of embed
	 */
	tiitle?: string;
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
	footer?: EmbedFooter;
	/**
	 * image information
	 */
	image?: EmbedImage;
	/**
	 * thumbnail information
	 */
	thumbnail?: EmbedThumbnail;
	/**
	 * video information
	 */
	video?: EmbedVideo;
	/**
	 * provider information
	 */
	provider?: EmbedProvider;
	/**
	 * author information
	 */
	author?: EmbedAuthor;
	/**
	 * fields information, max of 25
	 */
	fields?: EmbedField[];
};

export interface EmbedField {
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

export interface EmbedAuthor {
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
	iconUrl?: string;
	/**
	 * a proxied url of author icon
	 */
	proxyIconUrl?: string;
};

export interface EmbedProvider {
	/**
	 * name of provider
	 */
	name?: string;
	/**
	 * url of provider
	 */
	url?: string;
};

export interface EmbedVideo {
	/**
	 * source url of video
	 */
	url?: string;
	/**
	 * a proxied url of the video
	 */
	proxyUrl?: string;
	/**
	 * height of video
	 */
	height?: number;
	/**
	 * width of video
	 */
	width?: number;
};

export interface EmbedThumbnail {
	/**
	 * source url of thumbnail (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the thumbnail
	 */
	proxyUrl?: string;
	/**
	 * height of thumbnail
	 */
	height?: number;
	/**
	 * width of thumbnail
	 */
	width?: number;
};

export interface EmbedImage {
	/**
	 * source url of image (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the image
	 */
	proxyUrl?: string;
	/**
	 * height of image
	 */
	height?: number;
	/**
	 * width of image
	 */
	width?: number;
};

export interface EmbedFooter {
	/**
	 * footer text
	 */
	text: string;
	/**
	 * url of footer icon (only supports http(s) and attachments)
	 */
	iconUrl?: string;
	/**
	 * a proxied url of footer icon
	 */
	proxyIconUrl?: string;
};

export interface InteractionResponse {
	/**
	 * Type of response
	 */
	type: InteractionCallbackTypes;
	/**
	 * An optional response message
	 */
	data?: InteractionCallbackData;
};

/**
 * Not all message fields are currently supported.
 */
export interface MessageInteractionCallbackData {
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
	embeds?: Embed[];
	/**
	 * [Allowed mentions](https://discord.com/developers/docs/resources/message#allowed-mentions-object) object
	 */
	allowedMentions?: AllowedMentions;
	/**
	 * [Message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS`, `EPHEMERAL`, and `SUPPRESS_NOTIFICATIONS` can be set)
	 */
	flags?: Extract<MessageFlags, MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.SuppressNotifications>[];
	/**
	 * Message components
	 */
	components?: ActionRowComponent[];
	/**
	 * Attachment objects with filename and description
	 */
	attachments?: Attachment[];
	/**
	 * Details about the poll
	 */
	poll?: PollCreateRequestObject;
};

export interface AutocompleteInteractionCallbackData {
	/**
	 * autocomplete choices (max of 25 choices)
	 */
	choices: ApplicationCommandOptionChoice<string | number>[];
};

export interface ModalInteractionCallbackData {
	/**
	 * Developer-defined identifier for the modal, max 100 characters
	 */
	customId: string;
	/**
	 * Title of the popup modal, max 45 characters
	 */
	title: string;
	/**
	 * Between 1 and 5 (inclusive) components that make up the modal
	 */
	components: ActionRowComponent[];
};

export interface PollCreateRequestObject {
	/**
	 * The question of the poll. Only `text` is supported.
	 */
	question: PollMediaObject;
	/**
	 * Each of the answers available in the poll, up to 10
	 */
	answers: PollAnswerObject[];
	/**
	 * Number of hours the poll should be open for, up to 32 days. Defaults to 24
	 */
	duration?: number;
	/**
	 * Whether a user can select multiple answers. Defaults to false
	 */
	allowMultiselect?: boolean;
	/**
	 * The [layout type](https://discord.com/developers/docs/resources/poll#layout-type) of the poll. Defaults to... DEFAULT!
	 */
	layoutType?: LayoutTypes;
};

export interface PollAnswerObject {
	/**
	 * The ID of the answer
	 */
	answerId: number;
	/**
	 * The data of the answer
	 */
	pollMedia: PollMediaObject;
};

export interface PollMediaObject {
	/**
	 * The text of the field
	 */
	text?: string;
	/**
	 * The emoji of the field
	 */
	emoji?: Pick<Emoji, "id"> | Pick<Emoji, "name">;
};

export interface Attachment {
	id: Snowflake;
	filename: string;
	title?: string;
	description?: string;
	contentType?: string;
	size: number;
	url: string;
	proxyUrl: string;
	height?: number | null;
	width?: number | null;
	ephemeral?: boolean
	durationSecs?: number;
	waveform?: string;
	flags?: AttachmentFlag[];
};

export interface AllowedMentions {
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
	repliedUser: boolean;
};

export interface TextInputComponent {
	/**
	 * `4` for a text input
	 */
	type: MessageComponentTypes.TextInput;
	/**
	 * Developer-defined identifier for the input; max 100 characters
	 */
	customId: string;
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
	minLength?: number;
	/**
	 * Maximum input length for a text input; min 1, max 4000
	 */
	maxLength?: number;
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

export interface SelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: [SelectMenuComponent];
};

export interface NonSelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: Exclude<MessageComponent, SelectMenuComponent | ActionRowComponent>[];
};

export interface BaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: SelectMenuComponentType;
	/**
	 * ID for the select menu; max 100 characters
	 */
	customId: string;
	/**
	 * Placeholder text if nothing is selected; max 150 characters
	 */
	placeholder?: string;
	/**
	 * Minimum number of items that must be chosen (defaults to 1); min 0, max 25
	 */
	minValue?: number;
	/**
	 * Maximum number of items that can be chosen (defaults to 1); max 25
	 */
	maxValue?: number;
	/**
	 * Whether select menu is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface StringSelectMenuComponent extends BaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.StringSelect;
	/**
	 * Specified choices in a select menu (only required and available for string selects (type `3`); max 25
	 */
	options: SelectOption[];
};

export interface ChannelSelectMenuComponent extends BaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.ChannelSelect;
	/**
	 * List of channel types to include in the channel select component (type `8`)
	 */
	channelTypes?: ChannelTypes[];
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	defaultValues?: SelectDefaultValue[];
};

export interface OtherSelectMenuComponent extends BaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: Exclude<SelectMenuComponentType, MessageComponentTypes.ActionRow | MessageComponentTypes.Button | MessageComponentTypes.TextInput | MessageComponentTypes.ChannelSelect | MessageComponentTypes.StringSelect>;
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	defaultValues?: SelectDefaultValue[];
};

export interface SelectDefaultValue {
	/**
	 * ID of a user, role, or channel
	 */
	id: Snowflake;
	/**
	 * Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"`
	 */
	type: SelectDefaultValueTypes;
};

export interface SelectOption {
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
	emoji?: Pick<Emoji, "name" | "id" | "animated">;
	/**
	 * Will show this option as selected by default
	 */
	default?: boolean;
};

export interface Emoji {
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
	roles: Snowflake[];
	/**
	 * user that created this emoji
	 */
	user?: User;
	/**
	 * whether this emoji must be wrapped in colons
	 */
	requireColons?: boolean;
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

export interface BaseButtonComponent {
	/**
	 * `2` for a button
	 */
	type: MessageComponentTypes.Button;
	/**
	 * Whether the button is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface BasicButtonComponent extends BaseButtonComponent {
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
	emoji?: Pick<Emoji, "name" | "id" | "animated">;
	/**
	 * Developer-defined identifier for the button; max 100 characters
	 */
	customId?: string;
};

export interface LinkButtonComponent extends BaseButtonComponent {
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
	emoji?: Pick<Emoji, "name" | "id" | "animated">;
	/**
	 * URL for link-style buttons
	 */
	url: string;
};

export interface PremiumButtonComponent extends BaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: ButtonStyles.Premium;
	/**
	 * Identifier for a purchasable [SKU](https://discord.com/developers/docs/resources/sku#sku-object), only available when using premium-style buttons
	 */
	skuId: Snowflake;
};
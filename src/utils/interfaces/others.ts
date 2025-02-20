import WebSocket = require("ws");
import { ActionRowComponent, InteractionCallbackData, Snowflake } from "../types/others";
import { ClientRequest, IncomingMessage } from "http";
import { UserFlags, ApplicationFlags, BitwisePermissionFlags, MessageFlags, AttachmentFlags, RoleFlags } from "../enums/flags";
import { RateLimitScopes, Locales, GatewayOpcodes, PrivacyLevels, PresenceStatus } from "../enums/others";
import { PremiumTypes, InteractionCallbackTypes, LayoutTypes, AllowedMentionsTypes, SelectDefaultValueTypes, StickerFormatTypes, StickerTypes, OverwriteTypes } from "../enums/types";
import { APIApplicationCommandAutocompleteInteraction, APIApplicationCommandInteraction } from "./api/interactions";
import { Activity } from "./activities";
import { Embed } from "./emebds";
import { Guild, GuildCreateExtraFields, GuildMember, UnavailableGuild } from "./guilds";
import { ApplicationCommandOptionChoice, ApplicationCommandParams } from "./applicationCommands";

export interface Cache {
	users: Map<Snowflake, User>;
	guilds: Map<Snowflake, Guild & GuildCreateExtraFields>;
	unavailableGuilds: Map<Snowflake, UnavailableGuild>;
	application?: PartialApplication;
	sessionId?: string;
	resumeGatewayUrl?: string;
}

export interface VoiceRegion {
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

export interface Overwrite {
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

export interface ThreadMetadata {
	/**
	 * whether the thread is archived
	 */
	archived: boolean;
	/**
	 * the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080
	 */
	autoArchiveDuration: 60 | 1440 | 4320 | 10080;
	/**
	 * timestamp when the thread's archive status was last changed, used for calculating recent activity
	 */
	archiveTimestamp: string;
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
	createTimestamp?: string | null;
};

export interface ThreadMember {
	/**
	 * ID of the thread
	 */
	id?: Snowflake;
	/**
	 * ID of the user
	 */
	userId?: Snowflake;
	/**
	 * Time the user last joined the thread
	 */
	joinTimestamp: string;
	/**
	 * Any user-thread settings, currently only used for notifications
	 */
	flags: number;
	/**
	 * Additional information about the user
	 */
	member?: GuildMember;
};

export interface DefaultReaction {
	/**
	 * the id of a guild's custom emoji
	 */
	emojiId: Snowflake | null;
	/**
	 * the unicode character of the emoji
	 */
	emojiName: string | null;
};

export interface PresenceUpdateEventFields {
	/**
	 * User whose presence is being updated
	 */
	user: Partial<User> & { id: string; };
	/**
	 * ID of the guild
	 */
	guildId: Snowflake;
	/**
	 * Either "idle", "dnd", "online", or "offline"
	 */
	status: PresenceStatus;
	/**
	 * User's current activities
	 */
	activities: Activity[];
	/**
	 * User's platform-dependent status
	 */
	clientStatus: ClientStatus;
};

/**
 * Active sessions are indicated with an "online", "idle", or "dnd" string per platform. If a user is offline or invisible, the corresponding field is not present.
 */
export interface ClientStatus {
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

export interface StageInstance {
	/**
	 * The id of this Stage instance
	 */
	id: Snowflake;
	/**
	 * The guild id of the associated Stage channel
	 */
	guildId: Snowflake;
	/**
	 * The id of the associated Stage channel
	 */
	channelId: Snowflake;
	/**
	 * The topic of the Stage instance (1-120 characters)
	 */
	topic: string;
	/**
	 * The [privacy level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance
	 */
	privacyLevel: PrivacyLevels;
	/**
	 * Whether or not Stage Discovery is disabled (deprecated)
	 */
	discoverableDisabled: boolean;
	/**
	 * The id of the scheduled event for this Stage instance
	 */
	guildScheduledEventId: Snowflake | null;
};

export interface SoundboardSound {
	/**
	 * the name of this sound
	 */
	name: string;
	/**
	 * the id of this sound
	 */
	soundId: Snowflake;
	/**
	 * the volume of this sound, from 0 to 1
	 */
	volume: number;
	/**
	 * the id of this sound's custom emoji
	 */
	emojiId: Snowflake | null;
	/**
	 * the unicode character of this sound's standard emoji
	 */
	emojiName: string | null;
	/**
	 * the id of the guild this sound is in
	 */
	guildId?: Snowflake;
	/**
	 * whether this sound can be used, may be false due to loss of Server Boosts
	 */
	available: boolean;
	/**
	 * the user who created this sound
	 */
	user?: User;
};

export interface VoiceState {
	/**
	 * the guild id this voice state is for
	 */
	guildId?: Snowflake;
	/**
	 * the channel id this user is connected to
	 */
	channelId: Snowflake;
	/**
	 * the user id this voice state is for
	 */
	userId: Snowflake;
	/**
	 * the guild member this voice state is for
	 */
	member?: GuildMember;
	/**
	 * the session id for this voice state
	 */
	sessionId: string;
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
	selfDeaf: boolean;
	/**
	 * whether this user is locally muted
	 */
	selfMute: boolean;
	/**
	 * whether this user is streaming using "Go Live"
	 */
	selfStream?: boolean;
	/**
	 * whether this user's camera is enabled
	 */
	selfVideo: boolean;
	/**
	 * whether this user's permission to speak is denied
	 */
	suppress: boolean;
	/**
	 * the time at which the user requested to speak
	 */
	requestToSpeakTimestamp: string | null;
};

export interface WelcomeScreen {
	/**
	 * the server description shown in the welcome screen
	 */
	description: string;
	/**
	 * the channels shown in the welcome screen, up to 5
	 */
	welcomeChannels: WelcomeScreenChannel[];
};

export interface WelcomeScreenChannel {
	/**
	 * the channel's id
	 */
	channelId: Snowflake;
	/**
	 * the description shown for the channel
	 */
	description: string;
	/**
	 * the [emoji id](https://discord.com/developers/docs/reference#image-formatting), if the emoji is custom
	 */
	emojiId: Snowflake | null;
	/**
	 * the emoji name if custom, the unicode character if standard, or `null` if no emoji is set
	 */
	emojiName: string | null;
};

export interface Sticker {
	/**
	 * [id of the sticker](https://discord.com/developers/docs/reference#image-formatting)
	 */
	id: Snowflake;
	/**
	 * for standard stickers, id of the pack the sticker is from
	 */
	packId?: Snowflake;
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
	formatType: StickerFormatTypes;
	/**
	 * whether this guild sticker can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
	/**
	 * id of the guild that owns this sticker
	 */
	guildId?: Snowflake;
	/**
	 * the user that uploaded the guild sticker
	 */
	user?: User;
	/**
	 * the standard sticker's sort order within its pack
	 */
	sortValue?: number;
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

export interface Role {
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
	unicodeEmoji?: string | null;
	/**
	 * position of this role (roles with the same position are sorted by id)
	 */
	position: number;
	/**
	 * permission bit set
	 */
	permissions: (keyof typeof BitwisePermissionFlags)[];
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
	tags?: RoleTags;
	/**
	 * [role flags](https://discord.com/developers/docs/topics/permissions#role-object-role-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags: (keyof typeof RoleFlags)[];
};

/**
 * Tags with type `null` represent booleans. They will be present and set to `null` if they are "true", and will be not present if they are "false".

 */
export interface RoleTags {
	/**
	 * the id of the bot this role belongs to
	 */
	botId?: Snowflake;
	/**
	 * the id of the integration this role belongs to
	 */
	integrationId?: Snowflake;
	/**
	 * whether this is the guild's Booster role
	 */
	premiumSubscriber?: null;
	/**
	 * the id of this role's subscription sku and listing
	 */
	subscriptionListingId?: Snowflake;
	/**
	 * whether this role is available for purchase
	 */
	availableForPurchase?: null;
	/**
	 * whether this role is a guild's linked role
	 */
	guildConnections?: null;
};

export interface RateLimit {
	limit: number;
	remaining: number;
	reset: number;
	bucket: string;
	global: unknown | null;
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
	[GatewayOpcodes.Dispatch]: [d: unknown | null, s: number | null, t: string | null],
	[GatewayOpcodes.Heartbeat]: [d: number | null, s: null, t: null],
	[GatewayOpcodes.HeartbeatACK]: [d: unknown | null, s: null, t: null],
	[GatewayOpcodes.Hello]: [d: {
		/**
		 * Interval (in milliseconds) an app should heartbeat with
		 */
		heartbeat_interval: number;
	} | null, s: null, t: null],
	[GatewayOpcodes.InvalidSession]: [d: boolean, s: null, t: null],
	[GatewayOpcodes.Reconnect]: [d: unknown | null, s: null, t: null],
	[GatewayOpcodes.Resume]: [d: unknown | null, s: null, t: null]
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
	emoji?: Pick<Emoji, "id" | "name">;
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
	flags?: AttachmentFlags[];
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
	roles?: Snowflake[];
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

export interface Command extends ApplicationCommandParams {
	run: (client: Client, interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction) => void
};

export interface SubCommand {
	name: string;
	run: (client: Client, interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction) => void;
};
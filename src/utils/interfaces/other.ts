import WebSocket = require("ws");
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ApplicationFlags, ApplicationIntegrationTypes, BitwisePermissionFlags, ChannelTypes, GatewayEventNames, GatewayOpcodes, InteractionContextTypes, Locales, PremiumTypes, RateLimitScopes, UserFlags } from "../enums/other";
import { APIChannel, ApplicationCommandOption, Snowflake } from "../types";
import { ClientRequest, IncomingMessage } from "http";
import { APIReadyEventFields, APIAutoModerationRule, APIAutoModerationActionExecutionEventFields, APIChannelPinsUpdateEventFields, APIThreadListSyncEventFields, APIThreadMemberUpdateEventExtaFields, APIThreadMembersUpdateEventFields, APIEntitlement, APIUnavailableGuild, APIAuditLogEntry, APISoundboardSound, APISoundboardSoundsEventFields, APIIntegration, APIIntegrationCreateEventAdditionalFields, APIIntegrationUpdateEventAdditionalFields, APIIntegrationDeleteEventFields, APIInteraction, APIInviteCreateEventFields, APIInviteDeleteEventFields, APIPresenceUpdateEventFields, APIStageInstance, APISubscription, APITypingStartEventFields, APIUser, APIVoiceChannelEffectSendEventFields, APIVoiceState, APIVoiceServerUpdateEventFields, APIWebhooksUpdateEventFields } from "./api/other";
import { APIThreadChannel } from "./api/channels";
import { APIMessage, APIMessageCreateExtraFields, APIMessageDeleteEventFields, APIMessageDeleteBulkEventFields, APIMessageReactionAddEventFields, APIMessageReactionRemoveEventFields, APIMessageReactionRemoveAllEventFields, APIMessageReactionRemoveEmojiEventFields, APIMessagePollVoteAddFields, APIMessagePollVoteRemoveFields } from "./api/messages";
import { APIGuildApplicationCommandPermissions, APIGuild, APIGuildCreateExtraFields, APIGuildAuditLogEntryCreateExtraFields, APIGuildBanAddEventFields, APIGuildBanRemoveEventFields, APIGuildEmojisUpdateEventFields, APIGuildStickersUpdateEventFields, APIGuildIntegrationsUpdateEventFields, APIGuildMember, APIGuildMemberAddExtraFields, APIGuildMemberRemoveEventFields, APIGuildMemberUpdateEventFields, APIGuildMembersChunkEventFields, APIGuildRoleCreateEventFields, APIGuildRoleUpdateEventFields, APIGuildRoleDeleteEventFields, APIGuildScheduledEvent, APIGuildScheduledEventUserAddEventFields, APIGuildScheduledEventUserRemoveEventFields, APIGuildSoundboardSoundDeleteEventFields } from "./api/guilds";

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

export interface GatewayEvents {
	[GatewayEventNames.Ready]: [d: APIReadyEventFields, s: number | null, t: string | null];
	[GatewayEventNames.Resumed]: [];
	[GatewayEventNames.ApplicationCommandPermissionsUpdate]: [d: APIGuildApplicationCommandPermissions, s: number | null, t: string | null];
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
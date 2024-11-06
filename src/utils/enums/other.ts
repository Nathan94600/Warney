export enum RateLimitScopes {
	User = "user",
	Global = "global",
	Shared = "shared"
};

export enum Locales {
	Indonesian = "id",
	Danish = "da",
	German = "de",
	"English, UK" = "en-GB",
	"English, US" = "en-US",
	Spanish = "es-ES",
	"Spanish, LATAM" = "es-419",
	French = "fr",
	Croatian = "hr",
	Italian = "it",
	Lithuanian = "lt",
	Hungarian = "hu",
	Dutch = "nl",
	Norwegian = "no",
	Polish = "pl",
	"Portuguese, Brazilian" = "pt-BR",
	"Romanian, Romania" = "ro",
	Finnish = "fi",
	Swedish = "sv-SE",
	Vietnamese = "vl",
	Turkish = "re",
	Czech = "cs",
	Greek = "el",
	Bulgarian = "bg",
	Russian = "ru",
	Ukrainian = "uk",
	Hindi = "hi",
	Thai = "th",
	"Chinese, China" = "zh-CN",
	Japanese = "ja",
	"Chinese, Taiwan" = "zh-TW",
	Korean = "ko"
};

export enum UserFlags {
	/**
	 * Discord Employee
	 */
	Staff = 1 << 0,
	/**
	 * Partnered Server Owner
	 */
	Partner = 1 << 1,
	/**
	 * HypeSquad Events Member
	 */
	Hypesquad = 1 << 2,
	/**
	 * Bug Hunter Level 1
	 */
	BugHunterLevel1 = 1 << 3,
	/**
	 * House Bravery Member
	 */
	HypesquadOnlineHouse1 = 1 << 6,
	/**
	 * House Brilliance Member
	 */
	HypesquadOnlineHouse2 = 1 << 7,
	/**
	 * House Balance Member
	 */
	HypesquadOnlineHouse3 = 1 << 8,
	/**
	 * Early Nitro Supporter
	 */
	PremiumEarlySupporter = 1 << 9,
	/**
	 * User is a [team](https://discord.com/developers/docs/topics/teams)
	 */
	TeamPseudoUser = 1 << 10,
	/**
	 * Bug Hunter Level 2
	 */
	BugHunterLevel2 = 1 << 14,
	/**
	 * Verified Bot
	 */
	VerifiedBot = 1 << 16,
	/**
	 * Early Verified Bot Developer
	 */
	VerifiedDeveloper = 1 << 17,
	/**
	 * Moderator Programs Alumni
	 */
	CertifiedModerator = 1 << 18,
	/**
	 * Bot uses only [HTTP interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list
	 */
	BotHttpInteractions = 1 << 19,
	/**
	 * User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447)
	 */
	ActiveDeveloper = 1 << 22,
};

/**
 * Premium types denote the level of premium a user has. Visit the [Nitro](https://discord.com/nitro) page to learn more about the premium plans we currently offer.
 */
export enum PremiumTypes {
	None = 0,
	"Nitro Classic" = 1,
	Nitro = 2,
	"Nitro Basic" = 3
};

export enum ApplicationFlags {
	/**
	 * Indicates if an app uses the [Auto Moderation API](https://discord.com/developers/docs/resources/auto-moderation)
	 */
	ApplicationAutoModerationRulCreateBadge = 1 << 6,
	/**
	 * Intent required for bots in **100 or more servers** to receive [`presence_update`](https://discord.com/developers/docs/topics/gateway-events#presence-update) [events](https://discord.com/developers/docs/topics/gateway-events#presence-update)
	 */
	GatewayPresence = 1 << 12,
	/**
	 * Intent required for bots in under 100 servers to receive [`presence_update`](https://discord.com/developers/docs/topics/gateway-events#presence-update) [events](https://discord.com/developers/docs/topics/gateway-events#presence-update),
	 * found on the **Bot** page in your app's settings
	 */
	GatewayPresenceLimited = 1 << 13,
	/**
	 * Intent required for bots in **100 or more servers** to receive member-related events like guild_member_add.
	 * See the list of member-related events [under](https://discord.com/developers/docs/topics/gateway#list-of-intents) [`GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
	 */
	GatewayGuildMembers = 1 << 14,
	/**
	 * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found on the **Bot** page in your app's settings.
	 * See the list of member-related events [under](https://discord.com/developers/docs/topics/gateway#list-of-intents) [`GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
	 */
	GatewayGuildMembersLimited = 1 << 15,
	/**
	 * Indicates unusual growth of an app that prevents verification
	 */
	VerificationPendingGuildLimit = 1 << 16,
	/**
	 * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
	 */
	Embedded = 1 << 17,
	/**
	 * Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)
	 */
	GatewayMessageContent = 1 << 18,
	/**
	 * Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found on the **Bot** page in your app's settings
	 */
	GatewayMessageContentLimited = 1 << 19,
	/**
	 * Indicates if an app has registered global [application commands](https://discord.com/developers/docs/interactions/application-commands)
	 */
	ApplicationCommandBadge = 1 << 23
};

export enum GatewayOpcodes {
	/**
	 * An event was dispatched. (Receive)
	 */
	Dispatch = 0,
	/**
	 * Fired periodically by the client to keep the connection alive. (Send/Receive)
	 */
	Heartbeat = 1,
	/**
	 * Starts a new session during the initial handshake. (Send)
	 */
	Identify = 2,
	/**
	 * Update the client's presence. (Send)
	 */
	PresenceUpdate = 3,
	/**
	 * Used to join/leave or move between voice channels. (Send)
	 */
	VoiceStateUpdate = 4,
	/**
	 * Resume a previous session that was disconnected. (Send)
	 */
	Resume = 6,
	/**
	 * You should attempt to reconnect and resume immediately. (Receive)
	 */
	Reconnect = 7,
	/**
	 * Request information about offline guild members in a large guild. (Send)
	 */
	RequestGuildMembers = 8,
	/**
	 * The session has been invalidated. You should reconnect and identify/resume accordingly. (Receive)
	 */
	InvalidSession = 9,
	/**
	 * Sent immediately after connecting, contains the `heartbeat_interval` to use. (Receive)
	 */
	Hello = 10,
	/**
	 * Sent in response to receiving a heartbeat to acknowledge that it has been received. (Receive)
	 */
	HeartbeatACK = 11,
	/**
	 * Request information about soundboard sounds in a set of guilds. (Send)
	 */
	RequestSoundboardSounds = 31
};

export enum GatewayEventNames {
	/**
	 * Contains the initial state information
	 */
	Ready = "READY",
	/**
	 * Response to [Resume](https://discord.com/developers/docs/events/gateway-events#resume)
	 */
	Resumed = "RESUMED",
	/**
	 * Application command permission was updated
	 */
	ApplicationCommandPermissionsUpdate = "APPLICATION_COMMAND_PERMISSIONS_UPDATE",
	/**
	 * Auto Moderation rule was created
	 */
	AutoModerationRuleCreate = "AUTO_MODERATION_RULE_CREATE",
	/**
	 * Auto Moderation rule was updated
	 */
	AutoModerationRuleUpdate = "AUTO_MODERATION_RULE_UPDATE",
	/**
	 * Auto Moderation rule was deleted
	 */
	AutoModerationRuleDelete = "AUTO_MODERATION_RULE_DELETE",
	/**
	 * Auto Moderation rule was triggered and an action was executed (e.g. a message was blocked)
	 */
	AutoModerationActionExecution = "AUTO_MODERATION_ACTION_EXECUTION",
	/**
	 * New guild channel created
	 */
	ChannelCreate = "CHANNEL_CREATE",
	/**
	 * Channel was updated
	 */
	ChannelUpdate = "CHANNEL_UPDATE",
	/**
	 * Channel was deleted
	 */
	ChannelDelete = "CHANNEL_DELETE",
	/**
	 * Message was pinned or unpinned
	 */
	ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
	/**
	 * Thread created, also sent when being added to a private thread
	 */
	ThreadCreate = "THREAD_CREATE",
	/**
	 * Thread was updated
	 */
	ThreadUpdate = "THREAD_UPDATE",
	/**
	 * Thread was deleted
	 */
	ThreadDelete = "THREAD_DELETE",
	/**
	 * Sent when gaining access to a channel, contains all active threads in that channel
	 */
	ThreadListSync = "THREAD_LIST_SYNC",
	/**
	 * [Thread member](https://discord.com/developers/docs/resources/channel#thread-member-object) for the current user was updated
	 */
	ThreadMemberUpdate = "THREAD_MEMBER_UPDATE",
	/**
	 * Some user(s) were added to or removed from a thread
	 */
	ThreadMembersUpdate = "THREAD_MEMBERS_UPDATE",
	/**
	 * Entitlement was created
	 */
	EntitlementCreate = "ENTITLEMENT_CREATE",
	/**
	 * Entitlement was updated or renewed
	 */
	EntitlementUpdate = "ENTITLEMENT_UPDATE",
	/**
	 * Entitlement was deleted
	 */
	EntitlementDelete = "ENTITLEMENT_DELETE",
	/**
	 * Lazy-load for unavailable guild, guild became available, or user joined a new guild
	 */
	GuildCreate = "GUILD_CREATE",
	/**
	 * Guild was updated
	 */
	GuildUpdate = "GUILD_UPDATE",
	/**
	 * Guild became unavailable, or user left/was removed from a guild
	 */
	GuildDelete = "GUILD_DELETE",
	/**
	 * A guild audit log entry was created
	 */
	GuildAuditLogEntryCreate = "GUILD_AUDIT_LOG_ENTRY_CREATE",
	/**
	 * User was banned from a guild
	 */
	GuildBanAdd = "GUILD_BAN_ADD",
	/**
	 * User was unbanned from a guild
	 */
	GuildBanRemove = "GUILD_BAN_REMOVE",
	/**
	 * Guild emojis were updated
	 */
	GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
	/**
	 * Guild stickers were updated
	 */
	GuildStickersUpdate = "GUILD_STICKER_UPDATE",
	/**
	 * Guild integration was updated
	 */
	GuildIntegrationsUpdate = "GUILD_INTEGRATION_UPDATE",
	/**
	 * New user joined a guild
	 */
	GuildMemberAdd = "GUILD_MEMBER_ADD",
	/**
	 * User was removed from a guild
	 */
	GuildMemberRemove = "GUILD_MEMBER_REMOVE",
	/**
	 * Guild member was updated
	 */
	GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
	/**
	 * Response to [Request Guild Members](https://discord.com/developers/docs/topics/gateway-events#request-guild-members)
	 */
	GuildMembersChunk = "GUILD_MEMBERS_CHUNK",
	/**
	 * Guild role was created
	 */
	GuildRoleCreate = "GUILD_ROLE_CREATE",
	/**
	 * Guild role was updated
	 */
	GuildRoleUpdate = "GUILD_ROLE_UPDATE",
	/**
	 * Guild role was deleted
	 */
	GuildRoleDelete = "GUILD_ROLE_DELETE",
	/**
	 * Guild scheduled event was created
	 */
	GuildScheduledEventCreate = "GUILD_SCHEDULED_EVENT_CREATE",
	/**
	 * Guild scheduled event was updated
	 */
	GuildScheduledEventUpdate = "GUILD_SCHEDULED_EVENT_UPDATE",
	/**
	 * Guild scheduled event was deleted
	 */
	GuildScheduledEventDelete = "GUILD_SCHEDULED_EVENT_DELETE",
	/**
	 * User subscribed to a guild scheduled event
	 */
	GuildScheduledEventUserAdd = "GUILD_SCHEDULED_EVENT_USER_ADD",
	/**
	 * User unsubscribed from a guild scheduled event
	 */
	GuildScheduledEventUserRemove = "GUILD_SCHEDULED_EVENT_USER_REMOVE",
	/**
	 * Guild soundboard sound was created
	 */
	GuildSoundboardSoundCreate = "GUILD_SOUNDBOARD_SOUND_CREATE",
	/**
	 * Guild soundboard sound was updated
	 */
	GuildSoundboardSoundUpdate = "GUILD_SOUNDBOARD_SOUND_UPDATE",
	/**
	 * Guild soundboard sound was deleted
	 */
	GuildSoundboardSoundDelete = "GUILD_SOUNDBOARD_SOUND_DELETE",
	/**
	 * Guild soundboard sounds were updated
	 */
	GuildSoundboardSoundsUpdate = "GUILD_SOUNDBOARD_SOUNDS_UPDATE",
	/**
	 * Response to [Request Soundboard Sounds](https://discord.com/developers/docs/topics/gateway-events#request-soundboard-sounds)
	 */
	SoundboardSounds = "SOUNDBOARD_SOUNDS",
	/**
	 * Guild integration was created
	 */
	IntegrationCreate = "INTEGRATION_CREATE",
	/**
	 * Guild integration was updated
	 */
	IntegrationUpdate = "INTEGRATION_UPDATE",
	/**
	 * Guild integration was deleted
	 */
	IntegrationDelete = "INTEGRATION_DELETE",
	/**
	 * User used an interaction, such as an [Application Command](https://discord.com/developers/docs/interactions/application-commands)
	 */
	InteractionCreate = "INTERACTION_CREATE",
	/**
	 * Invite to a channel was created
	 */
	InviteCreate = "INVITE_CREATE",
	/**
	 * Invite to a channel was deleted
	 */
	InviteDelete = "INVITE_DELETE",
	/**
	 * Message was created
	 */
	MessageCreate = "MESSAGE_CREATE",
	/**
	 * Message was edited
	 */
	MessageUpdate = "MESSAGE_UPDATE",
	/**
	 * Message was deleted
	 */
	MessageDelete = "MESSAGE_DELETE",
	/**
	 * Multiple messages were deleted at once
	 */
	MessageDeleteBulk = "MESSAGE_DELETE_BULK",
	/**
	 * User reacted to a message
	 */
	MessageReactionAdd = "MESSAGE_REACTION_ADD",
	/**
	 * User removed a reaction from a message
	 */
	MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
	/**
	 * All reactions were explicitly removed from a message
	 */
	MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
	/**
	 * All reactions for a given emoji were explicitly removed from a message
	 */
	MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
	/**
	 * User was updated
	 */
	PresenceUpdate = "PRESENCE_UPDATE",
	/**
	 * Stage instance was created
	 */
	StageInstanceCreate = "STAGE_INSTANCE_CREATE",
	/**
	 * Stage instance was updated
	 */
	StageInstanceUpdate = "STAGE_INSTANCE_UPDATE",
	/**
	 * Stage instance was deleted or closed
	 */
	StageInstanceDelete = "STAGE_INSTANCE_DELETE",
	/**
	 * Premium App Subscription was created
	 */
	SubscriptionCreate = "SUBSCRIPTION_CREATE",
	/**
	 * Premium App Subscription was updated
	 */
	SubscriptionUpdate = "SUBSCRIPTION_UPDATE",
	/**
	 * Premium App Subscription was deleted
	 */
	SubscriptionDelete = "SUBSCRIPTION_DELETE",
	/**
	 * User started typing in a channel
	 */
	TypingStart = "TYPING_START",
	/**
	 * Properties about the user changed
	 */
	UserUpdate = "USER_UPDATE",
	/**
	 * Someone sent an effect in a voice channel the current user is connected to
	 */
	VoiceChannelEffectSend = "VOICE_CHANNEL_EFFECT_SEND",
	/**
	 * Someone joined, left, or moved a voice channel
	 */
	VoiceStateUpdate = "VOICE_STATE_UPDATE",
	/**
	 * Guild's voice server was updated
	 */
	VoiceServerUpdate = "VOICE_SERVER_UPDATE",
	/**
	 * Guild channel webhook was created, update, or deleted
	 */
	WebhooksUpdate = "WEBHOOKS_UPDATE",
	/**
	 * User voted on a poll
	 */
	MessagePollVoteAdd = "MESSAGE_POLL_VOTE_ADD",
	/**
	 * User removed a vote on a poll
	 */
	MessagePollVoteRemove = "MESSAGE_POLL_VOTE_REMOVE"
};

export enum ApplicationCommandPermissionTypes {
	Role = 1,
	User = 2,
	Channel = 3
};

/**
 * Indicates in what event context a rule should be checked.
 */
export enum EventTypes {
	/**
	 * when a member sends or edits a message in the guild
	 */
	MessageSend = 1,
	/**
	 * when a member edits their profile
	 */
	MemberUpdate = 2
};

/**
 * Characterizes the type of content which can trigger the rule.
 */
export enum TriggerTypes {
	/**
	 * check if content contains words from a user defined list of keywords	(max per guild: 6)
	 */
	Keyword = 1,
	/**
	 * check if content represents generic spam (max per guild: 1)
	 */
	Spam = 3,
	/**
	 * check if content contains words from internal pre-defined wordsets	(max per guild: 1)
	 */
	KeywordPreset = 4,
	/**
	 * check if content contains more unique mentions than allowed (max per guild: 1)
	 */
	MentionSpam = 5,
	/**
	 * check if member profile contains words from a user defined list of keywords (max per guild: 1)
	 */
	MemberProfile = 6,
};

export enum KeywordPresetTypes {
	/**
	 * words that may be considered forms of swearing or cursing
	 */
	Profanity = 1,
	/**
	 * words that refer to sexually explicit behavior or activity
	 */
	SexualContent = 2,
	/**
	 * personal insults or words that may be considered hate speech
	 */
	Slurs = 3
};

export enum ActionTypes {
	/**
	 * blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked.
	 */
	BlockMessage = 1,
	/**
	 * logs user content to a specified channel
	 */
	SendAlertMessage = 2,
	/**
	 * timeout user for a specified duration (A `TIMEOUT` action can only be set up for `KEYWORD` and `MENTION_SPAM` rules. The `MODERATE_MEMBERS` permission is required to use the `TIMEOUT` action type.)
	 */
	Timeout = 3,
	/**
	 * prevents a member from using text, voice, or other interactions
	 */
	BlockMemberInteraction = 4
};

export enum ChannelTypes {
	/**
	 * a text channel within a server
	 */
	GuildText = 0,
	/**
	 * a direct message between users
	 */
	Dm = 1,
	/**
	 * a voice channel within a server
	 */
	GuildVoice = 2,
	/**
	 * a direct message between multiple users
	 */
	GroupDm = 3,
	/**
	 * an [organizational category](https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101) that contains up to 50 channels
	 */
	GuildCategory = 4,
	/**
	 * a channel that [users can follow and crosspost into their own server](https://support.discord.com/hc/en-us/articles/360032008192) (formerly news channels)
	 */
	GuildAnnouncement = 5,
	/**
	 * a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
	 */
	AnnouncementThread = 10,
	/**
	 * a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
	 */
	PublicThread = 11,
	/**
	 * a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
	 */
	PrivateThread = 12,
	/**
	 * a voice channel for [hosting events with an audience](https://support.discord.com/hc/en-us/articles/1500005513722)
	 */
	GuildStageVoice = 13,
	/**
	 * the channel in a [hub](https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ) containing the listed servers
	 */
	GuildDirectory = 14,
	/**
	 * Channel that can only contain threads
	 */
	GuildForum = 15,
	/**
	 * Channel that can only contain threads, similar to `GUILD_FORUM` channels
	 */
	GuildMedia = 16
};

export enum OverwriteTypes {
	Role = 0,
	Member = 1
};

export enum VideoQualityModes {
	/**
	 * Discord chooses the quality for optimal performance
	 */
	Auto = 1,
	/**
	 * 720p
	 */
	Full = 2
};

export enum SortOrderTypes {
	/**
	 * Sort forum posts by activity
	 */
	LatestActivity = 0,
	/**
	 * Sort forum posts by creation time (from most recent to oldest)
	 */
	CreationDate = 1
};

export enum ForumLayoutTypes {
	/**
	 * No default has been set for forum channel
	 */
	NotSet = 0,
	/**
	 * Display posts as a list
	 */
	ListView = 1,
	/**
	 * Display posts as a collection of tiles
	 */
	GalleryView = 2
};

export enum EntitlementTypes {
	Purchase = 1,
	PremiumSubscription = 2,
	DeveloperGift = 3,
	TestModePurchase = 4,
	FreePurchase = 5,
	UserGift = 6,
	PremiumPurchase = 7,
	ApplicationSubscription = 8
};

export enum PresenceStatus {
	Idle = "idle",
	Dnd = "dnd",
	Online = "online",
	Offline = "offline",
};

export enum ActivityTypes {
	/**
	 * - Format: Playing {name}	
	 * - Example: "Playing Rocket League"
	 */
	Playing = 0,
	/**
	 * - Format: Streaming {details}	
	 * - Example: "Streaming Rocket League"
	 */
	Streaming = 1,
	/**
	 * - Format: Listening to {name}	
	 * - Example: ""Listening to Spotify"
	 */
	Listening = 2,
	/**
	 * - Format: Watching {name}	
	 * - Example: "Watching YouTube Together"
	 */
	Watching = 3,
	/**
	 * - Format: {emoji} {name}	
	 * - Example: ":smiley: I am cool"
	 */
	Custom = 4,
	/**
	 * - Format: Competing in {name}	
	 * - Example: "Competing in Arena World Champions"
	 */
	Competing = 5
};

export enum PrivacyLevels {
	/**
	 * @deprecated
	 * The Stage instance is visible publicly. (deprecated)
	 */
	Public = 0,
	/**
	 * The Stage instance is visible to only guild members.
	 */
	GuildOnly = 1
};

export enum VerificationLevels {
	/**
	 * unrestricted
	 */
	None = 0,
	/**
	 * must be registered on Discord for longer than 5 minutes
	 */
	Low = 1,
	/**
	 * must be registered on Discord for longer than 5 minutes
	 */
	Medium = 2,
	/**
	 * must be a member of the server for longer than 10 minutes
	 */
	High = 3,
	/**
	 * must have a verified phone number
	 */
	VeryHigh = 4
};

export enum DefaultMessageNotificationLevels {
	/**
	 * members will receive notifications only for messages that \@mention them by default
	 */
	AllMessages = 0,
	/**
	 * members will receive notifications only for messages that \@mention them by default
	 */
	OnlyMentions = 1 
};

export enum ExplicitContentFilterLevels {
	/**
	 * media content will not be scanned
	 */
	Disabled = 0,
	/**
	 * media content sent by members without roles will be scanned
	 */
	MembersWithoutRoles = 1,
	/**
	 * media content sent by all members will be scanned
	 */
	AllMembers = 2
};

export enum MFALevels {
	/**
	 * guild has no MFA/2FA requirement for moderation actions
	 */
	None = 0,
	/**
	 * guild has a 2FA requirement for moderation actions
	 */
	Elevated = 1
};

export enum StickerTypes {
	/**
	 * an official sticker in a pack
	 */
	Standard = 1,
	/**
	 * a sticker uploaded to a guild for the guild's members
	 */
	Guild = 2
};

export enum StickerFormatTypes {
	Png = 1,
	Apng = 2,
	Lottie = 3,
	Gif = 4,
};

export enum AuditLogEvents {
	/**
	 * Server settings were updated (Object changed: [Guild](https://discord.com/developers/docs/resources/guild#guild-object))
	 */
	GuildUpdate = 1,
	/**
	 * Channel was created (Object changed: [Channel](https://discord.com/developers/docs/resources/channel#channel-object))
	 */
	ChannelCreate = 10,
	/**
	 * Channel settings were updated (Object changed: [Channel](https://discord.com/developers/docs/resources/channel#channel-object))
	 */
	ChannelUpdate = 11,
	/**
	 * Channel was deleted (Object changed: [Channel](https://discord.com/developers/docs/resources/channel#channel-object))
	 */
	ChannelDelete = 12,
	/**
	 * Permission overwrite was added to a channel (Object changed: [Channel Overwrite](https://discord.com/developers/docs/resources/channel#overwrite-object))
	 */
	ChannelOverwriteCreate = 13,
	/**
	 * Permission overwrite was updated for a channel	(Object changed: [Channel Overwrite](https://discord.com/developers/docs/resources/channel#overwrite-object))
	 */
	ChannelOverwriteUpdate = 14,
	/**
	 * Permission overwrite was deleted from a channel (Object changed: [Channel Overwrite](https://discord.com/developers/docs/resources/channel#overwrite-object))
	 */
	ChannelOverwriteDelete = 15,
	/**
	 * Member was removed from server
	 */
	MemberKick = 20,
	/**
	 * Members were pruned from server
	 */
	MemberPrune = 21,
	/**
	 * Member was banned from server
	 */
	MemberBanAdd = 22,
	/**
	 * Server ban was lifted for a member
	 */
	MemberBanRemove = 23,
	/**
	 * Member was updated in server (Object changed: [Member](https://discord.com/developers/docs/resources/guild#guild-member-object))
	 */
	MemberUpdate = 24,
	/**
	 * Member was added or removed from a role (Object changed: [Partial Role](Partial Role))
	 */
	MemberRoleUpdate = 25,
	/**
	 * Member was moved to a different voice channel
	 */
	MemebrMove = 26,
	/**
	 * Member was disconnected from a voice channel
	 */
	MemberDisconnect = 27,
	/**
	 * Bot user was added to server
	 */
	BotAdd = 28,
	/**
	 * Role was created (Object changed: [Role](https://discord.com/developers/docs/topics/permissions#role-object))
	 */
	RoleCreate = 30,
	/**
	 * Role was edited (Object changed: [Role](https://discord.com/developers/docs/topics/permissions#role-object))
	 */
	RoleUpdate = 31,
	/**
	 * Role was deleted (Object changed: [Role](https://discord.com/developers/docs/topics/permissions#role-object))
	 */
	RoleDelete = 32,
	/**
	 * Server invite was created (Object changed: [Invite](https://discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://discord.com/developers/docs/resources/invite#invite-metadata-object))
	 */
	InviteCreate = 40,
	/**
	 * Server invite was updated (Object changed: [Invite](https://discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://discord.com/developers/docs/resources/invite#invite-metadata-object))
	 */
	InviteUpdate = 41,
	/**
	 * Server invite was deleted (Object changed: [Invite](https://discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://discord.com/developers/docs/resources/invite#invite-metadata-object))
	 */
	InviteDelete = 42,
	/**
	 * Webhook was created (Object changed: [Webhook](https://discord.com/developers/docs/resources/webhook#webhook-object))
	 */
	WebhookCreate = 50,
	/**
	 * Webhook properties or channel were updated	(Object changed: [Webhook](https://discord.com/developers/docs/resources/webhook#webhook-object))
	 */
	WebhookUpdate = 51,
	/**
	 * Webhook was deleted (Object changed: [Webhook](https://discord.com/developers/docs/resources/webhook#webhook-object))
	 */
	WebhookDelete = 52,
	/**
	 * Emoji was created (Object changed: [Emoji](https://discord.com/developers/docs/resources/emoji#emoji-object))
	 */
	EmojiCreate = 60,
	/**
	 * Emoji name was updated (Object changed: [Emoji](https://discord.com/developers/docs/resources/emoji#emoji-object))
	 */
	EmojiUpdate = 61,
	/**
	 * Emoji was deleted (Object changed: [Emoji](https://discord.com/developers/docs/resources/emoji#emoji-object))
	 */
	EmojiDelete = 62,
	/**
	 * Single message was deleted
	 */
	MessageDelete = 72,
	/**
	 * Multiple messages were deleted
	 */
	MessageBulkDelete = 73,
	/**
	 * Message was pinned to a channel
	 */
	MessagePin = 74,
	/**
	 * Message was unpinned from a channel
	 */
	MessageUnpin = 75,
	/**
	 * App was added to server (Object changed: [Integration](https://discord.com/developers/docs/resources/guild#integration-object))
	 */
	IntegrationCreate = 80,
	/**
	 * App was updated (as an example, its scopes were updated) (Object changed: [Integration](https://discord.com/developers/docs/resources/guild#integration-object))
	 */
	IntegrationUpdate = 81,
	/**
	 * App was removed from server (Object changed: [Integration](https://discord.com/developers/docs/resources/guild#integration-object))
	 */
	IntegrationDelete = 82,
	/**
	 * Stage instance was created (stage channel becomes live) (Object changed: [Stage Instance](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object))
	 */
	StageInstanceCreate = 83,
	/**
	 * Stage instance details were updated (Object changed: [Stage Instance](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object))
	 */
	StageInstanceUpdate = 84,
	/**
	 * Stage instance was deleted (stage channel no longer live) (Object changed: [Stage Instance](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object))
	 */
	StageInstanceDelete = 85,
	/**
	 * Sticker was created (Object changed: [Sticker](https://discord.com/developers/docs/resources/sticker#sticker-object))
	 */
	StickerCreate = 90,
	/**
	 * Sticker details were updated (Object changed: [Sticker](https://discord.com/developers/docs/resources/sticker#sticker-object))
	 */
	StickerUpdate = 91,
	/**
	 * Sticker was deleted (Object changed: [Sticker](https://discord.com/developers/docs/resources/sticker#sticker-object))
	 */
	StickerDelete = 92,
	/**
	 * Event was created (Object changed: [Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object))
	 */
	GuildScheduledEventCreate = 100,
	/**
	 * Event was updated (Object changed: [Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object))
	 */
	GuildScheduledEventUpdate = 101,
	/**
	 * Event was cancelled (Object changed: [Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object))
	 */
	GuildScheduledEventDelete = 102,
	/**
	 * Thread was created (Object changed: [Thread](https://discord.com/developers/docs/resources/channel#thread-metadata-object))
	 */
	ThreadCreate = 110,
	/**
	 * Thread was updated (Object changed: [Thread](https://discord.com/developers/docs/resources/channel#thread-metadata-object))
	 */
	ThreadUpdate = 111,
	/**
	 * Thread was deleted (Object changed: [Thread](https://discord.com/developers/docs/resources/channel#thread-metadata-object))
	 */
	ThreadDelete = 112,
	/**
	 * Permissions were updated for a command (Object changed: [Command Permission](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure))
	 */
	ApplicationCommandPermissionUpdate = 121,
	/**
	 * Soundboard sound was created	(Object changed: [Soundboard Sound](https://discord.com/developers/docs/resources/soundboard#soundboard-sound-object))
	 */
	SoundboardSoundCreate = 130,
	/**
	 * Soundboard sound was updated	(Object changed: [Soundboard Sound](https://discord.com/developers/docs/resources/soundboard#soundboard-sound-object))
	 */
	SoundboardSoundUpdate = 131,
	/**
	 * Soundboard sound was deleted	(Object changed: [Soundboard Sound](https://discord.com/developers/docs/resources/soundboard#soundboard-sound-object))
	 */
	SoundboardSoundDelete = 132,
	/**
	 * Auto Moderation rule was created	(Object changed: [Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object))
	 */
	AutoModerationRuleCreate = 140,
	/**
	 * Auto Moderation rule was updated	(Object changed: [Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object))
	 */
	AutoModerationRuleUpdate = 141,
	/**
	 * Auto Moderation rule was deleted	(Object changed: [Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object))
	 */
	AutoModerationRuleDelete = 142,
	/**
	 * Message was blocked by Auto Moderation
	 */
	AutoModerationBlockMessage = 143,
	/**
	 * Message was flagged by Auto Moderation
	 */
	AutoModerationFlagToChannel = 144,
	/**
	 * Member was timed out by Auto Moderation
	 */
	AutoModerationUserCommunicationDisabled = 145,
	/**
	 * Creator monetization request was created
	 */
	CreatorMonetizationRequestCreated = 150,
	/**
	 * Creator monetization terms were accepted
	 */
	CreatorMonetizationTermsAccepted = 151,
	/**
	 * Guild Onboarding Question was created (Object changed: [Onboarding Prompt Structure](https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure))
	 */
	OnboardingPromptCreate = 163,
	/**
	 * Guild Onboarding Question was updated (Object changed: [Onboarding Prompt Structure](https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure))
	 */
	OnboardingPromptUpdate = 164,
	/**
	 * Guild Onboarding Question was deleted (Object changed: [Onboarding Prompt Structure](https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure))
	 */
	OnboardingPromptDelete = 165,
	/**
	 * Guild Onboarding was created (Object changed: [Guild Onboarding](https://discord.com/developers/docs/resources/guild#guild-onboarding-object))
	 */
	OnboardingCreate = 166,
	/**
	 * Guild Onboarding was updated (Object changed: [Guild Onboarding](https://discord.com/developers/docs/resources/guild#guild-onboarding-object))
	 */
	OnboardingUpdate = 167,
	/**
	 * Guild Server Guide was created
	 */
	HomeSettingsCreate = 190,
	/**
	 * Guild Server Guide was updated
	 */
	HomeSettingsUpdate = 191
};

/**
 * These are a list of all the OAuth2 scopes that Discord supports. Some scopes require approval from Discord to use. Requesting them from a user without approval from Discord may cause errors or undocumented behavior in the OAuth2 flow.
 */
export enum OAuth2Scopes {
	/**
	 * allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps
	 */
	ActivitiesRead = "activities.read",
	/**
	 * allows your app to update a user's activity - not currently available for apps (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/developer-tools/game-sdk#activities))
	 */
	ActivitiesWrite = "activities.Write",
	/**
	 * allows your app to read build data for a user's applications
	 */
	ApplicationsBuildsRead = "applications.builds.read",
	/**
	 * allows your app to upload/update builds for a user's applications - requires Discord approval
	 */
	ApplicationsBuildsUpload = "applications.builds.upload",
	/**
	 * allows your app to add [commands](https://discord.com/developers/docs/interactions/application-commands) to a guild - included by default with the `bot` scope
	 */
	ApplicationsCommands = "applications.commands",
	/**
	 * allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only
	 */
	ApplicationsCommandsUpdate = "applications.commands.update",
	/**
	 * allows your app to update [permissions for its commands](https://discord.com/developers/docs/interactions/application-commands#permissions) in a guild a user has permissions to
	 */
	ApplicationsCommandsPermissionsUpdate = "applications.commands.permissions.update",
	/**
	 * allows your app to read entitlements for a user's applications
	 */
	ApplicationsEntitlements = "applications.entitlements",
	/**
	 * allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
	 */
	ApplicationsStoreUpdate = "applications.store.update",
	/**
	 * for oauth2 bots, this puts the bot in the user's selected guild by default
	 */
	Bot = "bot",
	/**
	 * allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-current-user-connections) to return linked third-party accounts
	 */
	Connections = "connections",
	/**
	 * allows your app to see information about the user's DMs and group DMs - requires Discord approval
	 */
	DmChannelsRead = "dm_channels.read",
	/**
	 * enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email`
	 */
	Email = "email",
	/**
	 * allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient)
	 */
	GdmJoin = "gdm.join",
	/**
	 * allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds
	 */
	Guilds = "guilds",
	/**
	 * allows [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild
	 */
	GuildsJoin = "guilds.join",
	/**
	 * allows [/users/@me/guilds/{guild.id}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild
	 */
	GuildsMembersRead = "guilds.members.read",
	/**
	 * allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email`
	 */
	Identify = "identify",
	/**
	 * for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)
	 */
	MessagesRead = "messages.read",
	/**
	 * allows your app to know a user's friends and implicit relationships - requires Discord approval
	 */
	RelationShipsRead = "relationships.read",
	/**
	 * allows your app to update a user's connection and metadata for the app
	 */
	RoleConnectionsWrite = "role_connections.write",
	/**
	 * for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
	 */
	Rpc = "rpc",
	/**
	 * for local rpc server access, this allows you to update a user's activity - requires Discord approval
	 */
	RpcActivitiesWrite = "rpc.activities.write",
	/**
	 * for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval
	 */
	RpcNotificationsRead = "rpc.notifications.read",
	/**
	 * for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval
	 */
	RpcVoiceRead = "rpc.voice.read",
	/**
	 * for local rpc server access, this allows you to update a user's voice settings - requires Discord approval
	 */
	RpcVoiceWrite = "rpc.voice.write",
	/**
	 * allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
	 */
	Voice = "voiec",
	/**
	 * this generates a webhook that is returned in the oauth token response for authorization code grants
	 */
	WebhookIncoming = "webhook.incoming"
};

export enum IntegrationExpireBehaviors {
	RemoveRole = 0,
	Kick = 1
};

export enum IntegrationTypes {
	Twitch = "twitch",
	Youtube = "youtube",
	Discord = "discord",
	GuildSubscription = "guild_subscription"
};

/**
 * Context in Discord where an interaction can be used, or where it was triggered from.
 * Details about using interaction contexts for application commands is in the [commands context documentation](https://discord.com/developers/docs/interactions/application-commands#interaction-contexts).
 */
export enum InteractionContextTypes {
	/**
	 * Interaction can be used within servers
	 */
	Guild = 0,
	/**
	 * Interaction can be used within DMs with the app's bot user
	 */
	BotDm = 1,
	/**
	 * Interaction can be used within Group DMs and DMs other than the app's bot user
	 */
	PrivateChannel = 2
};

/**
 * Where an app can be installed, also called its supported [installation contexts](https://discord.com/developers/docs/resources/application#installation-context).
 */
export enum ApplicationIntegrationTypes {
	/**
	 * App is installable to servers
	 */
	GuildInstall = 0,
	/**
	 * App is installable to users
	 */
	UserInstall = 1
};

/**
 * We might have different layouts for polls in the future. For now though, this number will be 1.
 */
export enum LayoutTypes {
	/**
	 * The, uhm, default layout type.
	 */
	Default = 0
};

export enum MessageComponentTypes {
	/**
	 * Container for other components
	 */
	ActionRow = 1,
	/**
	 * Button object
	 */
	Button = 2,
	/**
	 * Select menu for picking from defined text options
	 */
	StringSelect = 3,
	/**
	 * Text input object
	 */
	TextInput = 4,
	/**
	 * Select menu for users
	 */
	UserSelect = 5,
	/**
	 * Select menu for roles
	 */
	RoleSelect = 6,
	/**
	 * Select menu for mentionables (users and roles)
	 */
	MentionableSelect = 7,
	/**
	 * Select menu for channels
	 */
	ChannelSelect = 8
};

export enum ButtonStyles {
	/**
	 * - Color: blurple
	 * - Required field: `custom_id`
	 */
	Primary = 1,
	/**
	 * - Color: grey
	 * - Required field: `custom_id`
	 */
	Secondary = 2,
	/**
	 * - Color: green
	 * - Required field: `custom_id`
	 */
	Success = 3,
	/**
	 * - Color: red
	 * - Required field: `custom_id`
	 */
	Danger = 4,
	/**
	 * - Color: grey, navigates to a URL	
	 * - Required field: `url`
	 */
	Link = 5,
	/**
	 * - Color: blurple
	 * - Required field: `sku_id`
	 */
	Premium = 6
};

export enum SelectDefaultValueTypes {
	User = "user",
	Role = "role",
	Channel = "channel"
};

export enum TextInputStyles {
	/**
	 * Single-line input
	 */
	Short = 1,
	/**
	 * Multi-line input
	 */
	Paragraph = 2
};

export enum InteractionTypes {
	Ping = 1,
	ApplicationCommand = 2,
	MessageComponent = 3,
	ApplicationCommandAutocomplete = 4,
	ModalSubmit = 5
};

/**
 * Determines how associated data is populated.
 */
export enum MessageReferenceTypes {
	/**
	 * A standard reference used by replies.
	 */
	Default = 0,
	/**
	 * Reference used to point to a message at a point in time.
	 */
	Forward = 1
};

export enum MembershipStates {
	Invited = 1,
	Accepted = 2
};

export enum TeamMemberRoleTypes {
	/**
	 * Owners are the most permissible role, and can take destructive, irreversible actions like deleting team-owned apps or the team itself. Teams are limited to 1 owner.
	 */
	Owner = "",
	/**
	 * Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.
	 */
	Admin = "admin",
	/**
	 * Developers can access information about team-owned apps, like the client secret or public key.
	 * They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token.
	 * Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.
	 */
	Developer = "developer",
	/**
	 * Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.
	 */
	"Read-only" = "read_only"
};

export enum MessageActivityTypes {
	Join = 1, 
	spectate = 2, 
	Listen = 3, 
	JoinRequest = 5 
};

export enum MessageTypes {
	Default = 0,
	RecipientAdd = 1,
	RecipientRemove = 2,
	Call = 3,
	ChannelNameChange = 4,
	ChannelIconChange = 5,
	ChannelPinnedMessage = 6,
	UserJoin = 7,
	GuildBoost = 8,
	GuildBoostTier1 = 9,
	GuildBoostTier2 = 10,
	GuildBoostTier3 = 11,
	ChannelFollowAdd = 12,
	GuildDiscoveryDisqualified = 14,
	GuildDiscoveryRequalified = 15,
	GuildDiscoveryGracePeriodInitialWarning = 16,
	GuildDiscoveryGracePeriodFinalWarning = 17,
	ThreadCreated = 18,
	Reply = 19,
	ChatInputCommand = 20,
	ThreadStarterMessage = 21,
	GuildInviteReminder = 22,
	ContextMenuCommand = 23,
	AutoModerationAction = 24,
	RoleSubscriptionPurchase = 25,
	InteractionPremiumUpsell = 26,
	StageStart = 27,
	StageEnd = 28,
	StageSpeaker = 29,
	StageTopic = 31,
	GuildApplicationPremiumSubscription = 32,
	GuildIncidentAlertModeEnabled = 36,
	GuildIncidentAlertModeDisabled = 37,
	GuildIncidentReportRaid = 38,
	GuildIncidentReportFalseAlarm = 39,
	PurchaseNotification = 44,
	PollResult = 46
};

export enum EmbedTypes {
	/**
	 * generic embed rendered from embed attributes
	 */
	Rich = "rich",
	/**
	 * image embed
	 */
	Image = "image",
	/**
	 * video embed
	 */
	Video = "video",
	/**
	 * animated gif image embed rendered as a video embed
	 */
	Gifv = "gifv",
	/**
	 * article embed
	 */
	Article = "article",
	/**
	 * link embed
	 */
	Link = "link",
	/**
	 * [poll result embed](https://discord.com/developers/docs/resources/message#embed-fields-by-embed-type-poll-result-embed-fields)
	 */
	PollResult = "poll_result"
};

export enum ApplicationCommandTypes {
	/**
	 * Slash commands; a text-based command that shows up when a user types `/`
	 */
	ChatInput = 1,
	/**
	 * A UI-based command that shows up when you right click or tap on a user
	 */
	User = 2,
	/**
	 * A UI-based command that shows up when you right click or tap on a message
	 */
	Message = 3,
	/**
	 * A UI-based command that represents the primary way to invoke an app's [Activity](https://discord.com/developers/docs/activities/overview)
	 */
	PrimaryEntryPoint = 4
};

export enum ApplicationCommandOptionTypes {
	SubCommand = 1,
	SubCommandGroup = 2,
	String = 3,
	/**
	 * Any integer between -2^53 and 2^53
	 */
	Integer = 4,
	Boolean = 5,
	User = 6,
	/**
	 * Includes all channel types + categories
	 */
	Channel = 7,
	Role = 8,
	/**
	 * Includes users and roles
	 */
	Mentionable = 9,
	/**
	 * Any double between -2^53 and 2^53
	 */
	Number = 10,
	/**
	 * [attachment](https://discord.com/developers/docs/resources/message#attachment-object) object
	 */
	Attachment = 11
};

export enum InviteTargetTypes {
	Stream = 1,
	EmbeddedApplication = 2
};

export enum ReactionTypes {
	Normal = 0,
	Burst = 1
};

export enum SubscriptionStatus {
	/**
	 * Subscription is active and scheduled to renew.
	 */
	Active = 0,
	/**
	 * Subscription is active but will not renew.
	 */
	Ending = 1,
	/**
	 * Subscription is inactive and not being charged.
	 */
	Inactive = 2
};

export enum AnimationTypes {
	/**
	 * A fun animation, sent by a Nitro subscriber
	 */
	Premium = 0,
	/**
	 * The standard animation
	 */
	Basic = 1
};

export enum BitwisePermissionFlags {
	/**
	 * Allows creation of instant invites
	 */
	CreateInstantInvite = 2 ** 0,
	/**
	 * Allows kicking members
	 */
	KickMembers = 2 ** 1,
	/**
	 * Allows banning members
	 */
	BanMembers = 2 ** 2,
	/**
	 * Allows all permissions and bypasses channel permission overwrites
	 */
	Administrator = 2 ** 3,
	/**
	 * Allows management and editing of channels
	 */
	ManageChannels = 2 ** 4,
	/**
	 * Allows management and editing of the guild
	 */
	ManageGuild = 2 ** 5,
	/**
	 * Allows for the addition of reactions to messages
	 */
	AddReactions = 2 ** 6,
	/**
	 * Allows for viewing of audit logs
	 */
	ViewAuditLog = 2 ** 7,
	/**
	 * Allows for using priority speaker in a voice channel
	 */
	PrioritySpeaker = 2 ** 8,
	/**
	 * Allows the user to go live
	 */
	Stream = 2 ** 9,
	/**
	 * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
	 */
	ViewChannel = 2 ** 10,
	/**
	 * Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads)
	 */
	SendMessages = 2 ** 11,
	/**
	 * Allows for sending of `/tts` messages
	 */
	SendTTSMessages = 2 ** 12,
	/**
	 * Allows for deletion of other users messages
	 */
	ManageMessages = 2 ** 13,
	/**
	 * Links sent by users with this permission will be auto-embedded
	 */
	EmbedLinks = 2 ** 14,
	/**
	 * Allows for uploading images and files
	 */
	AttachFiles = 2 ** 15,
	/**
	 * Allows for reading of message history
	 */
	ReadMessageHistory = 2 ** 16,
	/**
	 * Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel
	 */
	MentionEveryone = 2 ** 17,
	/**
	 * Allows the usage of custom emojis from other servers
	 */
	UseExternalEmojis = 2 ** 18,
	/**
	 * Allows for viewing guild insights
	 */
	ViewGuildInsights = 2 ** 19,
	/**
	 * Allows for joining of a voice channel
	 */
	Connect = 2 ** 20,
	/**
	 * Allows for speaking in a voice channel
	 */
	Speak = 2 ** 21,
	/**
	 * Allows for muting members in a voice channel
	 */
	MuteMembers = 2 ** 22,
	/**
	 * Allows for deafening of members in a voice channel
	 */
	DeafenMembers = 2 ** 23,
	/**
	 * Allows for moving of members between voice channels
	 */
	MoveMembers = 2 ** 24,
	/**
	 * Allows for using voice-activity-detection in a voice channel
	 */
	USeVAD = 2 ** 25,
	/**
	 * Allows for modification of own nickname
	 */
	ChangeNickname = 2 ** 26,
	/**
	 * Allows for modification of other users nicknames
	 */
	ManageNicknames = 2 ** 27,
	/**
	 * Allows management and editing of roles
	 */
	ManageRoles = 2 ** 28,
	/**
	 * Allows management and editing of webhooks
	 */
	ManageWebhooks = 2 ** 29,
	/**
	 * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
	 */
	ManageGuildExpressions = 2 ** 30,
	/**
	 * Allows members to use application commands, including slash commands and context menu commands.
	 */
	UseApplicationCommands = 2 ** 31,
	/**
	 * Allows for requesting to speak in stage channels. (_This permission is under active development and may be changed or removed._)	
	 */
	RequestToSpeak = 2 ** 32,
	/**
	 * Allows for editing and deleting scheduled events created by all users
	 */
	ManageEvents = 2 ** 33,
	/**
	 * Allows for deleting and archiving threads, and viewing all private threads
	 */
	ManageThreads = 2 ** 34,
	/**
	 * Allows for creating public and announcement threads
	 */
	CreatePublicThreads = 2 ** 35,
	/**
	 * Allows for creating private threads
	 */
	CreatePrivateThreads = 2 ** 36,
	/**
	 * Allows the usage of custom stickers from other servers
	 */
	UseExternalStickers = 2 ** 37,
	/**
	 * Allows for sending messages in threads
	 */
	SendMessageInThreads = 2 ** 38,
	/**
	 * Allows for using Activities (applications with the `EMBEDDED` flag) in a voice channel
	 */
	UseEmbeddedActivities = 2 ** 39,
	/**
	 * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels
	 */
	ModerateMembers = 2 ** 40,
	/**
	 * Allows for viewing role subscription insights
	 */
	ViewCreatorMonetizationAnalytics = 2 ** 41,
	/**
	 * Allows for using soundboard in a voice channel
	 */
	UseSoundboard = 2 ** 42,
	/**
	 * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user.
	 * Not yet available to developers, [see changelog](https://discord.com/developers/docs/change-log#clarification-on-permission-splits-for-expressions-and-events).
	 */
	CreateGuildExpressions = 2 ** 43,
	/**
	 * Allows for creating scheduled events, and editing and deleting those created by the current user. Not yet available to developers, [see changelog](https://discord.com/developers/docs/change-log#clarification-on-permission-splits-for-expressions-and-events).
	 */
	CreateEvents = 2 ** 44,
	/**
	 * Allows the usage of custom soundboard sounds from other servers
	 */
	UseExternalSounds = 2 ** 45,
	/**
	 * Allows sending voice messages
	 */
	SendVoiceMessages = 2 ** 46,
	/**
	 * Allows sending polls
	 */
	SendPolls = 2 ** 49,
	/**
	 * Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server.
	 */
	UseExternalApps = 2 ** 50
};

export enum EntryPointCommandHandlerTypes {
	/**
	 * The app handles the interaction using an interaction token
	 */
	AppHandler = 1,
	/**
	 * Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app
	 */
	DiscordLaunchActivity = 2
};
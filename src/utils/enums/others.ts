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

export enum PresenceStatus {
	Idle = "idle",
	Dnd = "dnd",
	Online = "online",
	Offline = "offline",
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

export enum MembershipStates {
	Invited = 1,
	Accepted = 2
};

export enum GatewayIntents {
	Guilds = 1 << 0,
	GuildMembers = 1 << 1,
	GuildModeration = 1 << 2,
	GuildExpressions = 1 << 3,
	GuildIntegrations = 1 << 4,
	GuildWebhooks = 1 << 5,
	GuildInvites = 1 << 6,
	GuildVoiceStates = 1 << 7,
	GuildPresences = 1 << 8,
	GuildMessages = 1 << 9,
	GuildMessageReactions = 1 << 10,
	GuildMessageTyping = 1 << 11,
	DirectMessages = 1 << 12,
	DirectMessageReactions = 1 << 13,
	DirectMessageTyping = 1 << 14,
	MessageContent = 1 << 15,
	GuildScheduledEvents = 1 << 16,
	AutoModerationConfiguration = 1 << 20,
	AutoModerationExecution = 1 << 21,
	GuildMessagePolls = 1 << 24,
	DirectMessagePolls = 1 << 25,
};

export enum PremiumTiers {
	/**
	 * guild has not unlocked any Server Boost perks
	 */
	None = 0,
	/**
	 * guild has unlocked Server Boost level 1 perks
	 */
	Tier1 = 1,
	/**
	 * guild has unlocked Server Boost level 2 perks
	 */
	Tier2 = 2,
	/**
	 * guild has unlocked Server Boost level 3 perks
	 */
	Tier3 = 3
};
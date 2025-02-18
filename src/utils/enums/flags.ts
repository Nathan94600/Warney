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

export enum MessageFlags {
	/**
	 * this message has been published to subscribed channels (via Channel Following)
	 */
	Crossposted = 1 << 0,
	/**
	 * this message originated from a message in another channel (via Channel Following)
	 */
	IsCrosspost = 1 << 1,
	/**
	 * do not include any embeds when serializing this message
	 */
	SuppressEmbeds = 1 << 2,
	/**
	 * the source message for this crosspost has been deleted (via Channel Following)
	 */
	SourceMessageDeleted = 1 << 3,
	/**
	 * this message came from the urgent message system
	 */
	Urgent = 1 << 4,
	/**
	 * this message has an associated thread, with the same id as the message
	 */
	HasThread = 1 << 5,
	/**
	 * this message is only visible to the user who invoked the Interaction
	 */
	Ephemeral = 1 << 6,
	/**
	 * this message is an Interaction Response and the bot is "thinking"
	 */
	Loading = 1 << 7,
	/**
	 * this message failed to mention some roles and add their members to the thread
	 */
	FailedToMentionSomeRolesInThread = 1 << 8,
	/**
	 * this message will not trigger push and desktop notifications
	 */
	SuppressNotifications = 1 << 12,
	/**
	 * this message is a voice message
	 */
	IsVoiceMessage = 1 << 13
};

export enum AttachmentFlags {
	/**
	 * this attachment has been edited using the remix feature on mobile
	 */
	IsRemix =  1 << 2
};

export enum RoleFlags {
	/**
	 * role can be selected by members in an [onboarding](https://discord.com/developers/docs/resources/guild#guild-onboarding-object) prompt
	 */
	InPrompt = 1 << 0
};

export enum GuildMemberFlags {
	/**
	 * Member has left and rejoined the guild	(editable: false)
	 */
	DidRejoin = 1 << 0,
	/**
	 * Member has completed onboarding (editable: false)
	 */
	CompletedOnboarding = 1 << 1,
	/**
	 * Member is exempt from guild verification requirements (editable: true)
	 */
	BypassVerification = 1 << 2,
	/**
	 * Member has started onboarding (editable: false)
	 */
	StartedOnboarding = 1 << 3,
	/**
	 * Member is a guest and can only access the voice channel they were invited to (editable: false)
	 */
	IsGuest = 1 << 4,
	/**
	 * Member has started Server Guide new member actions (editable: false)
	 */
	StartedHomeActions = 1 << 5,
	/**
	 * Member has completed Server Guide new member actions (editable: false)
	 */
	CompletedHomeActions = 1 << 6,
	/**
	 * Member's username, display name, or nickname is blocked by AutoMod (editable: false)
	 */
	AutomodQuarantinedUsername = 1 << 7,
	/**
	 * Member has dismissed the DM settings upsell (editable: false)
	 */
	DmSettingsUpsellAcknowledged = 1 << 9
};

export enum SystemChannelFlags {
	/**
	 * Suppress member join notifications
	 */
	SuppressJoinNotifications = 1 << 0,
	/**
	 * Suppress server boost notifications
	 */
	SuppressPremiumSubscriptions = 1 << 1,
	/**
	 * Suppress server setup tips
	 */
	SuppressGuildReminderNotifications = 1 << 2,
	/**
	 * Hide member join sticker reply buttons
	 */
	SuppressJoinNotificationReplies = 1 << 3,
	/**
	 * Suppress role subscription purchase and renewal notifications
	 */
	SuppressRoleSubscriptionPurchaseNotifications = 1 << 4,
	/**
	 * Hide role subscription sticker reply buttons
	 */
	SuppressRoleSubscriptionPurchaseNotificationReplies = 1 << 5
};
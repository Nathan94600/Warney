/**
 * Premium types denote the level of premium a user has. Visit the [Nitro](https://discord.com/nitro) page to learn more about the premium plans we currently offer.
 */
export enum PremiumTypes {
	None = 0,
	"Nitro Classic" = 1,
	Nitro = 2,
	"Nitro Basic" = 3
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

export enum SelectDefaultValueTypes {
	User = "user",
	Role = "role",
	Channel = "channel"
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

export enum InteractionCallbackTypes {
	/**
	 * ACK a `Ping`
	 */
	Pong = 1,
	/**
	 * Respond to an interaction with a message
	 */
	ChannelMessageWithSource = 4,
	/**
	 * ACK an interaction and edit a response later, the user sees a loading state
	 */
	DeferedChannelMessageWithSource = 5,
	/**
	 * For components, ACK an interaction and edit the original message later; the user does not see a loading state
	 */
	DeferedUpdateMessage = 6,
	/**
	 * For components, edit the message the component was attached to
	 */
	UpdateMessage = 7,
	/**
	 * Respond to an autocomplete interaction with suggested choices
	 */
	ApplicationCommandAutocompleteResult = 8,
	/**
	 * Respond to an interaction with a popup modal
	 */
	Modal = 9,
	/**
	 * Launch the Activity associated with the app. Only available for apps with [Activities](https://discord.com/developers/docs/activities/overview) enabled
	 */
	LaunchActivity = 12,
};

export enum AllowedMentionsTypes {
	/**
	 * Controls role mentions
	 */
	RoleMentions = "roles",
	/**
	 * Controls user mentions
	 */
	UserMentions = "users",
	/**
	 * Controls @everyone and @here mentions
	 */
	EveryoneMentions = "everyone"
};
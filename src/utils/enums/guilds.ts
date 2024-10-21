export enum GuildScheduledEventPrivacyLevels {
	/**
	 * the scheduled event is only accessible to guild members
	 */
	GuildOnly = 2
};

export enum GuildScheduledEventStatus {
	Scheduled = 1,
	Active = 2,
	Completed = 3,
	Canceled = 4
};

export enum GuildScheduledEventEntityTypes {
	StageInstance = 1,
	Voice = 2,
	External = 3
};

export enum GuildScheduledEventRecurrenceRuleFrequencies {
	Yearly = 0,
	Monthly = 1,
	Weekly = 2,
	Daily = 3
};

export enum GuildScheduledEventRecurrenceRuleWeekdays {
	Monday = 0,
	Tuesday = 1,
	Wednesday = 2,
	Thursday = 3,
	Friday = 4,
	Saturday = 5,
	Sunday = 6
};

export enum GuildScheduledEventRecurrenceRuleMonths {
	January = 1,
	February = 2,
	March = 3,
	April = 4,
	May = 5,
	June = 6,
	July = 7,
	August = 8,
	September = 9,
	October = 10,
	November = 11,
	December = 12
};

export enum GuildFeatures {
	/**
	 * guild has access to set an animated guild banner image
	 */
	AnimatedBanner = "ANIMATED_BANNER",
	/**
	 * guild has access to set an animated guild icon
	 */
	AnimatedIcon = "ANIMATED_ICON",
	/**
	 * guild is using the [old permissions configuration behavior](https://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes)
	 */
	ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
	/**
	 * guild has set up auto moderation rules
	 */
	AutoModeration = "AUTO_MODERATION",
	/**
	 * guild has access to set a guild banner image
	 */
	Banner = "BANNER",
	/**
	 * guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates
	 */
	Community = "COMMUNITY",
	/**
	 * guild has enabled monetization
	 */
	CreatorMonetizableProvisional = "CREATOR_MONETIZABLE_PROVISIONAL",
	/**
	 * guild has enabled the role subscription promo page
	 */
	CreatorStorePage = "CREATOR_STORE_PAGE",
	/**
	 * guild has been set as a support server on the App Directory
	 */
	DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
	/**
	 * guild is able to be discovered in the directory
	 */
	Discoverable = "DISCOVERABLE",
	/**
	 * guild is able to be featured in the directory
	 */
	Featurable = "FEATURABLE",
	/**
	 * guild has paused invites, preventing new users from joining
	 */
	InvitesDisabled = "INVITES_DISABLED",
	/**
	 * guild has access to set an invite splash background
	 */
	InviteSplash = "INVITE_SPLASH",
	/**
	 * guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object)
	 */
	MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
	/**
	 * guild has increased custom soundboard sound slots
	 */
	MoreSoundboard = "MORE_SOUNDBOARD",
	/**
	 * guild has increased custom sticker slots
	 */
	MoreStickers = "MORE_STICKERS",
	/**
	 * guild has access to create announcement channels
	 */
	News = "NEWS",
	/**
	 * guild is partnered
	 */
	Partnered = "PARTNERED",
	/**
	 * guild can be previewed before joining via Membership Screening or the directory
	 */
	PreviewEnabled = "PREVIEW_ENABLED",
	/**
	 * guild has disabled alerts for join raids in the configured safety alerts channel
	 */
	RaidAlertsDisabled = "RAID_ALERTS_DISABLED",
	/**
	 * guild is able to set role icons
	 */
	RoleIcons = "ROLE_ICONS",
	/**
	 * guild has role subscriptions that can be purchased
	 */
	RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
	/**
	 * guild has enabled role subscriptions
	 */
	RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
	/**
	 * guild has created soundboard sounds
	 */
	Soundboard = "SOUNDBOARD",
	/**
	 * guild has enabled ticketed events
	 */
	TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
	/**
	 * guild has access to set a vanity URL
	 */
	VanityUrl = "VANITY_URL",
	/**
	 * guild is verified
	 */
	Verified = "VERIFIED",
	/**
	 * guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
	 */
	VipRegions = "VIP_REGIONS",
	/**
	 * guild has enabled the welcome screen
	 */
	WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED"
};

export enum GuildNSFWLevels {
	Default = 0,
	Explicit = 1,
	Safe = 2,
	AgeRestricted = 3
};
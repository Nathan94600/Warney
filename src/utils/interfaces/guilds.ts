import { BitwisePermissionFlags, GuildMemberFlags } from "../enums/flags";
import { GuildScheduledEventPrivacyLevels, GuildScheduledEventStatus, GuildScheduledEventEntityTypes, GuildScheduledEventRecurrenceRuleFrequencies, GuildScheduledEventRecurrenceRuleWeekdays, GuildScheduledEventRecurrenceRuleMonths, GuildFeatures, GuildNSFWLevels } from "../enums/guilds";
import { VerificationLevels, DefaultMessageNotificationLevels, ExplicitContentFilterLevels, MFALevels, PremiumTiers, Locales } from "../enums/others";
import { GuildChannel, Snowflake } from "../types/others";
import { ThreadChannel } from "./channels";
import { VoiceState, PresenceUpdateEventFields, StageInstance, SoundboardSound, User, Role, Emoji, WelcomeScreen, Sticker, AvatarDecorationData } from "./others";

export interface GuildCreateExtraFields {
	/**
	 * When this guild was joined at
	 */
	joinedAt: string;
	/**
	 * `true` if this is considered a large guild
	 */
	large: boolean;
	/**
	 * `true` if this guild is unavailable due to an outage
	 */
	unavailable?: boolean;
	/**
	 * Total number of members in this guild
	 */
	memberCount: number;
	/**
	 * States of members currently in voice channels; lacks the `guild_id` key
	 */
	voiceStates: VoiceState[];
	/**
	 * Users in the guild
	 */
	members: GuildMember[];
	/**
	 * Channels in the guild
	 */
	channels: GuildChannel[];
	/**
	 * All active threads in the guild that current user has permission to view
	 */
	threads: ThreadChannel[];
	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold`
	 */
	presences: PresenceUpdateEventFields[];
	/**
	 * Stage instances in the guild
	 */
	stageInstances: StageInstance[];
	/**
	 * Scheduled events in the guild
	 */
	guildScheduledEvents: GuildScheduledEvent[];
	/**
	 * Soundboard sounds in the guild
	 */
	soundboardSounds: SoundboardSound[];
};

export interface GuildScheduledEvent {
	/**
	 * the id of the scheduled event
	 */
	id: Snowflake;
	/**
	 * the guild id which the scheduled event belongs to
	 */
	guildId: Snowflake;
	/**
	 * the channel id in which the scheduled event will be hosted, or `null` if [scheduled entity type](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) is `EXTERNAL`
	 */
	channelId: Snowflake | null;
	/**
	 * the id of the user that created the scheduled event
	 */
	creatorId?: Snowflake | null;
	/**
	 * the name of the scheduled event (1-100 characters)
	 */
	name: string;
	/**
	 * the description of the scheduled event (1-1000 characters)
	 */
	description?: string | null;
	/**
	 * the time the scheduled event will start
	 */
	scheduledStartTime: string;
	/**
	 * the time the scheduled event will end, required if entity_type is `EXTERNAL`
	 */
	scheduledEndTime: string | null;
	/**
	 * the privacy level of the scheduled event
	 */
	privacyLevel: GuildScheduledEventPrivacyLevels;
	/**
	 * the status of the scheduled event
	 */
	status: GuildScheduledEventStatus;
	/**
	 * the type of the scheduled event
	 */
	entityType: GuildScheduledEventEntityTypes;
	/**
	 * the id of an entity associated with a guild scheduled event
	 */
	entityId: Snowflake | null;
	/**
	 * additional metadata for the guild scheduled event
	 */
	entityMetadata: GuildScheduledEventEntityMetadata	| null;
	/**
	 * the user that created the scheduled event
	 */
	creator?: User;
	/**
	 * the number of users subscribed to the scheduled event
	 */
	userCount?: number;
	/**
	 * the [cover image hash](https://discord.com/developers/docs/reference#image-formatting) of the scheduled event
	 */
	image?: string | null;
	/**
	 * the definition for how often this event should recur
	 */
	recurrenceRule: GuildScheduledEventRecurrenceRule | null;
};

export interface GuildScheduledEventEntityMetadata {
	/**
	 * location of the event (1-100 characters)
	 */
	location?: string;
};

export interface GuildScheduledEventRecurrenceRule {
	/**
	 * Starting time of the recurrence interval
	 */
	start: string;
	/**
	 * Ending time of the recurrence interval
	 */
	end: string | null;
	/**
	 * How often the event occurs
	 */
	frequency: GuildScheduledEventRecurrenceRuleFrequencies;
	/**
	 * The spacing between the events, defined by `frequency`. For example, `frequency` of `WEEKLY` and an `interval` of `2` would be "every-other week"
	 */
	interval: number;
	/**
	 * Set of specific days within a week for the event to recur on
	 */
	byWeekday: GuildScheduledEventRecurrenceRuleWeekdays[] | null;
	/**
	 * List of specific days within a specific week (1-5) to recur on
	 */
	byNWeekday: GuildScheduledEventRecurrenceRuleNWeekday[] | null;
	/**
	 * Set of specific months to recur on
	 */
	byMonth: GuildScheduledEventRecurrenceRuleMonths[] | null;
	/**
	 * Set of specific dates within a month to recur on
	 */
	byMonthDay: number[] | null;
	/**
	 * Set of days within a year to recur on (1-364)
	 */
	byYearDay: number[] | null;
	/**
	 * The total amount of times that the event is allowed to recur before stopping
	 */
	count: number | null;
};

export interface GuildScheduledEventRecurrenceRuleNWeekday {
	/**
	 * The week to reoccur on. 1 - 5
	 */
	n: number;
	/**
	 * The day within the week to reoccur on
	 */
	day: GuildScheduledEventRecurrenceRuleWeekdays;
};

/**
 * A partial [guild](https://discord.com/developers/docs/resources/guild#guild-object) object.
 * Represents an Offline Guild, or a Guild whose information has not been provided through [Guild Create](https://discord.com/developers/docs/topics/gateway-events#guild-create) events during the Gateway connect.
 */
export interface UnavailableGuild {
	/**
	 * guild id
	 */
	id: string;
	unavailable: true;
};

export interface Guild {
	/**
	 * guild id
	 */
	id: Snowflake;
	/**
	 * guild name (2-100 characters, excluding trailing and leading whitespace)
	 */
	name: string;
	/**
	 * [icon hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	icon: string | null;
	/**
	 * [icon hash](https://discord.com/developers/docs/reference#image-formatting), returned when in the template object
	 */
	iconHash?: string | null;
	/**
	 * [splash hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	splash: string | null;
	/**
	 * [discovery splash hash](https://discord.com/developers/docs/reference#image-formatting); only present for guilds with the "DISCOVERABLE" feature
	 */
	discoverySplash: string | null;
	/**
	 * true if [the user](https://discord.com/developers/docs/resources/user#get-current-user-guilds) is the owner of the guild
	 */
	owner?: boolean;
	/**
	 * id of owner
	 */
	ownerId: Snowflake;
	/**
	 * total permissions for [the user](https://discord.com/developers/docs/resources/user#get-current-user-guilds) in the guild (excludes overwrites and [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions))
	 */
	permissions?: BitwisePermissionFlags[];
	/**
	 * id of afk channel
	 */
	afkChannelId: Snowflake | null;
	/**
	 * afk timeout in seconds
	 */
	afkTimeout: number;
	/**
	 * true if the server widget is enabled
	 */
	widgetEnabled?: boolean;
	/**
	 * the channel id that the widget will generate an invite to, or `null` if set to no invite
	 */
	widgetChannelId?: Snowflake | null;
	/**
	 * [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) required for the guild
	 */
	verificationLevel: VerificationLevels;
	/**
	 * default [message notifications level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level)
	 */
	defaultMessageNotifications: DefaultMessageNotificationLevels;
	/**
	 * [explicit content filter level](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)
	 */
	explicitContentFilter: ExplicitContentFilterLevels;
	/**
	 * roles in the guild
	 */
	roles: Role[];
	/**
	 * custom guild emojis
	 */
	emojis: Emoji[];
	/**
	 * enabled guild features
	 */
	features: GuildFeatures[];
	/**
	 * required [MFA level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) for the guild
	 */
	mfaLevel: MFALevels;
	/**
	 * application id of the guild creator if it is bot-created
	 */
	applicationId: Snowflake | null;
	/**
	 * the id of the channel where guild notices such as welcome messages and boost events are posted
	 */
	systemChannelId: Snowflake | null;
	/**
	 * system channel flags
	 */
	systemChannelFlags: number;
	/**
	 * the id of the channel where Community guilds can display rules and/or guidelines
	 */
	rulesChannelId: Snowflake | null;
	/**
	 * the maximum number of presences for the guild (`null` is always returned, apart from the largest of guilds)
	 */
	maxPresences?: number | null;
	/**
	 * the maximum number of members for the guild
	 */
	maxMembers?: number;
	/**
	 * the vanity url code for the guild
	 */
	vanityUrlCode: string | null;
	/**
	 * the description of a guild
	 */
	description: string | null;
	/**
	 * [banner hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	banner: string | null;
	/**
	 * [premium tier](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier) (Server Boost level)
	 */
	premiumTier: PremiumTiers;
	/**
	 * the number of boosts this guild currently has
	 */
	premiumSubscriptionCount?: number;
	/**
	 * the preferred [locale](https://discord.com/developers/docs/reference#locales) of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
	 */
	preferredLocale: Locales;
	/**
	 * the id of the channel where admins and moderators of Community guilds receive notices from Discord
	 */
	publicUpdatesChannelId: Snowflake | null;
	/**
	 * the maximum amount of users in a video channel
	 */
	maxVideoChannelUsers?: number;
	/**
	 * the maximum amount of users in a stage video channel
	 */
	maxStageVideoChannelUsers?: number;
	/**
	 * approximate number of members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds` endpoints when `with_counts` is `true`
	 */
	approximateMemberCount?: number;
	/**
	 * approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds` endpoints when `with_counts` is `true`
	 */
	approximatePresenceCount?: number;
	/**
	 * the welcome screen of a Community guild, shown to new members, returned in an [Invite](https://discord.com/developers/docs/resources/invite#invite-object)'s guild object
	 */
	welcomeScreen?: WelcomeScreen;
	/**
	 * [guild NSFW level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level)
	 */
	nsfwLevel: GuildNSFWLevels;
	/**
	 * custom guild stickers
	 */
	stickers?: Sticker[];
	/**
	 * whether the guild has the boost progress bar enabled
	 */
	premiumProgressBarEnabled: boolean;
	/**
	 * the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord
	 */
	safetyAlertsChannelId: Snowflake | null;
};

export interface GuildMember {
	/**
	 * the user this guild member represents
	 */
	user: User;
	/**
	 * this user's guild nickname
	 */
	nick?: string | null;
	/**
	 * the member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	avatar?: string | null;
	/**
	 * array of [role](https://discord.com/developers/docs/topics/permissions#role-object) object ids
	 */
	roles: Snowflake[];
	/**
	 * when the user joined the guild
	 */
	joinedAt: string;
	/**
	 * when the user started [boosting](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-) the guild
	 */
	premiumSince?: string | null;
	/**
	 * whether the user is deafened in voice channels
	 */
	deaf: boolean;
	/**
	 * whether the user is muted in voice channels
	 */
	mute: boolean;
	/**
	 * [guild member flags](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags) represented as a bit set, defaults to `0`
	 */
	flags: (keyof typeof GuildMemberFlags)[];
	/**
	 * whether the user has not yet passed the guild's [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) requirements
	 */
	pending?: boolean;
	/**
	 * total permissions of the member in the channel, including overwrites, returned when in the interaction object
	 */
	permissions?: string;
	/**
	 * when the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
	 */
	communicationDisabledUntil?: string | null;
	/**
	 * data for the member's guild avatar decoration
	 */
	avatarDecorationData?: AvatarDecorationData | null;
};
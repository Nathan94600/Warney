import { GuildScheduledEventPrivacyLevels, GuildScheduledEventStatus, GuildScheduledEventEntityTypes, GuildScheduledEventRecurrenceRuleFrequencies, GuildScheduledEventRecurrenceRuleWeekdays, GuildScheduledEventRecurrenceRuleMonths, GuildFeatures, GuildNSFWLevels } from "../../enums/guilds";
import { VerificationLevels, DefaultMessageNotificationLevels, ExplicitContentFilterLevels, MFALevels, Locales } from "../../enums/other";
import { Snowflake, APIChannel } from "../../types";
import { APIDmChannel, APIGroupDmChannel, APIThreadChannel } from "./channels";
import { APIRole, APIPresenceUpdateEventFields, APIUser, APIAvatarDecorationData, APIEmoji, APISticker, APIWelcomeScreen, APIVoiceState, APIStageInstance, APISoundboardSound, APIApplicationCommandPermission } from "./other";

export interface APIGuildSoundboardSoundDeleteEventFields {
	/**
	 * ID of the sound that was deleted
	 */
	sound_id: Snowflake;
	/**
	 * ID of the guild the sound was in
	 */
	guild_id: Snowflake;
};

export interface APIGuildScheduledEventUserRemoveEventFields {
	/**
	 * ID of the guild scheduled event
	 */
	guild_scheduled_event_id: Snowflake;
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildScheduledEventUserAddEventFields {
	/**
	 * ID of the guild scheduled event
	 */
	guild_scheduled_event_id: Snowflake;
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildRoleDeleteEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * ID of the role
	 */
	role_id: Snowflake;
};

export interface APIGuildRoleUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Role that was updated
	 */
	role: APIRole;
};

export interface APIGuildRoleCreateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Role that was created
	 */
	role: APIRole;
};

export interface APIGuildMembersChunkEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Set of guild members
	 */
	members: APIGuildMember[];
	/**
	 * Chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)
	 */
	chunk_index: number;
	/**
	 * Total number of expected chunks for this response
	 */
	chunk_count: number;
	/**
	 * When passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here
	 */
	not_found?: [];
	/**
	 * When passing `true` to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here
	 */
	presences?: APIPresenceUpdateEventFields[];
	/**
	 * Nonce used in the [Guild Members Request](https://discord.com/developers/docs/topics/gateway-events#request-guild-members)
	 */
	nonce?: string;
};

export interface APIGuildMemberUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User role ids
	 */
	roles: Snowflake[];
	/**
	 * User
	 */
	user: APIUser;
	/**
	 * Nickname of the user in the guild
	 */
	nick?: string | null;
	/**
	 * Member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	avatar: string | null;
	/**
	 * When the user joined the guild
	 */
	joined_at: string | null;
	/**
	 * When the user starting [boosting](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-) the guild
	 */
	premium_since?: string | null;
	/**
	 * Whether the user is deafened in voice channels
	 */
	deaf?: boolean;
	/**
	 * Whether the user is muted in voice channels
	 */
	mute?: boolean;
	/**
	 * Whether the user has not yet passed the guild's [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) requirements
	 */
	pending?: boolean;
	/**
	 * When the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
	 */
	communication_disabled_until?: string | null;
	/**
	 * [Guild member flags](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags) represented as a bit set, defaults to 0
	 */
	flasg?: number;
	/**
	 * Data for the member's guild avatar decoration
	 */
	avatar_decoration_data?: APIAvatarDecorationData | null;
};

export interface APIGuildMemberRemoveEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was removed
	 */
	user: APIUser;
};

export interface APIGuildMemberAddExtraFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildAuditLogEntryCreateExtraFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildBanAddEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was banned
	 */
	user: APIUser;
};

export interface APIGuildBanRemoveEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was banned
	 */
	user: APIUser;
};

export interface APIGuildEmojisUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Array of [emojis](https://discord.com/developers/docs/resources/emoji#emoji-object)
	 */
	emojis: APIEmoji[];
};

export interface APIGuildStickersUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Array of [stickers](https://discord.com/developers/docs/resources/sticker#sticker-object)
	 */
	stickers: APISticker[];
};

export interface APIGuildIntegrationsUpdateEventFields {
	/**
	 * ID of the guild whose integrations were updated
	 */
	guild_id: Snowflake;
};

export interface APIGuildScheduledEvent {
	/**
	 * the id of the scheduled event
	 */
	id: Snowflake;
	/**
	 * the guild id which the scheduled event belongs to
	 */
	guild_id: Snowflake;
	/**
	 * the channel id in which the scheduled event will be hosted, or `null` if [scheduled entity type](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) is `EXTERNAL`
	 */
	channel_id: Snowflake | null;
	/**
	 * the id of the user that created the scheduled event
	 */
	creator_id?: Snowflake | null;
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
	scheduled_start_time: string;
	/**
	 * the time the scheduled event will end, required if entity_type is `EXTERNAL`
	 */
	scheduled_end_time: string | null;
	/**
	 * the privacy level of the scheduled event
	 */
	privacy_level: GuildScheduledEventPrivacyLevels;
	/**
	 * the status of the scheduled event
	 */
	status: GuildScheduledEventStatus;
	/**
	 * the type of the scheduled event
	 */
	entity_type: GuildScheduledEventEntityTypes;
	/**
	 * the id of an entity associated with a guild scheduled event
	 */
	entity_id: Snowflake | null;
	/**
	 * additional metadata for the guild scheduled event
	 */
	entity_metadata: APIGuildScheduledEventEntityMetadata	| null;
	/**
	 * the user that created the scheduled event
	 */
	creator?: APIUser;
	/**
	 * the number of users subscribed to the scheduled event
	 */
	user_count?: number;
	/**
	 * the [cover image hash](https://discord.com/developers/docs/reference#image-formatting) of the scheduled event
	 */
	image?: string | null;
	/**
	 * the definition for how often this event should recur
	 */
	recurrence_rule: APIGuildScheduledEventRecurrenceRule | null;
};

export interface APIGuildScheduledEventEntityMetadata {
	/**
	 * location of the event (1-100 characters)
	 */
	location?: string;
};

export interface APIGuildScheduledEventRecurrenceRule {
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
	by_weekday: GuildScheduledEventRecurrenceRuleWeekdays[] | null;
	/**
	 * List of specific days within a specific week (1-5) to recur on
	 */
	by_n_weekday: APIGuildScheduledEventRecurrenceRuleNWeekday[] | null;
	/**
	 * Set of specific months to recur on
	 */
	by_month: GuildScheduledEventRecurrenceRuleMonths[] | null;
	/**
	 * Set of specific dates within a month to recur on
	 */
	by_month_day: number[] | null;
	/**
	 * Set of days within a year to recur on (1-364)
	 */
	by_year_day: number[] | null;
	/**
	 * The total amount of times that the event is allowed to recur before stopping
	 */
	count: number | null;
};

export interface APIGuildScheduledEventRecurrenceRuleNWeekday {
	/**
	 * The week to reoccur on. 1 - 5
	 */
	n: number;
	/**
	 * The day within the week to reoccur on
	 */
	day: GuildScheduledEventRecurrenceRuleWeekdays;
};

export interface APIGuild {
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
	icon_hash?: string | null;
	/**
	 * [splash hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	splash: string | null;
	/**
	 * [discovery splash hash](https://discord.com/developers/docs/reference#image-formatting); only present for guilds with the "DISCOVERABLE" feature
	 */
	discovery_splash: string | null;
	/**
	 * true if [the user](https://discord.com/developers/docs/resources/user#get-current-user-guilds) is the owner of the guild
	 */
	owner?: boolean;
	/**
	 * id of owner
	 */
	owner_id: Snowflake;
	/**
	 * total permissions for [the user](https://discord.com/developers/docs/resources/user#get-current-user-guilds) in the guild (excludes overwrites and [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions))
	 */
	permissions?: string;
	/**
	 * id of afk channel
	 */
	afk_channel_id: Snowflake | null;
	/**
	 * afk timeout in seconds
	 */
	afk_timeout: number;
	/**
	 * true if the server widget is enabled
	 */
	widget_enabled?: boolean;
	/**
	 * the channel id that the widget will generate an invite to, or `null` if set to no invite
	 */
	widget_channel_id?: Snowflake | null;
	/**
	 * [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) required for the guild
	 */
	verification_level: VerificationLevels;
	/**
	 * default [message notifications level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level)
	 */
	default_message_notifications: DefaultMessageNotificationLevels;
	/**
	 * [explicit content filter level](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)
	 */
	explicit_content_filter: ExplicitContentFilterLevels;
	/**
	 * roles in the guild
	 */
	roles: APIRole[];
	/**
	 * custom guild emojis
	 */
	emojis: APIEmoji[];
	/**
	 * enabled guild features
	 */
	features: GuildFeatures[];
	/**
	 * required [MFA level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) for the guild
	 */
	mfa_level: MFALevels;
	/**
	 * application id of the guild creator if it is bot-created
	 */
	application_id: Snowflake | null;
	/**
	 * the id of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id: Snowflake | null;
	/**
	 * system channel flags
	 */
	system_channel_flags: number;
	/**
	 * the id of the channel where Community guilds can display rules and/or guidelines
	 */
	rules_channel_id: Snowflake | null;
	/**
	 * the maximum number of presences for the guild (`null` is always returned, apart from the largest of guilds)
	 */
	max_presences?: number | null;
	/**
	 * the maximum number of members for the guild
	 */
	max_members?: number;
	/**
	 * the vanity url code for the guild
	 */
	vanity_url_code: string | null;
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
	premium_tier: number;
	/**
	 * the number of boosts this guild currently has
	 */
	premium_subscription_count?: number;
	/**
	 * the preferred [locale](https://discord.com/developers/docs/reference#locales) of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
	 */
	preferred_locale: Locales;
	/**
	 * the id of the channel where admins and moderators of Community guilds receive notices from Discord
	 */
	public_updates_channel_id: Snowflake | null;
	/**
	 * the maximum amount of users in a video channel
	 */
	max_video_channel_users?: number;
	/**
	 * the maximum amount of users in a stage video channel
	 */
	max_stage_video_channel_users?: number;
	/**
	 * approximate number of members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds` endpoints when `with_counts` is `true`
	 */
	approximate_member_count?: number;
	/**
	 * approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds` endpoints when `with_counts` is `true`
	 */
	approximate_presence_count?: number;
	/**
	 * the welcome screen of a Community guild, shown to new members, returned in an [Invite](https://discord.com/developers/docs/resources/invite#invite-object)'s guild object
	 */
	welcome_screen?: APIWelcomeScreen;
	/**
	 * [guild NSFW level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level)
	 */
	nsfw_level: GuildNSFWLevels;
	/**
	 * custom guild stickers
	 */
	stickers?: APISticker[];
	/**
	 * whether the guild has the boost progress bar enabled
	 */
	premium_progress_bar_enabled: boolean;
	/**
	 * the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord
	 */
	safety_alerts_channel_id: Snowflake | null;
};

export interface APIGuildCreateExtraFields {
	/**
	 * When this guild was joined at
	 */
	joined_at: string;
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
	member_count: number;
	/**
	 * States of members currently in voice channels; lacks the `guild_id` key
	 */
	voice_states: APIVoiceState[];
	/**
	 * Users in the guild
	 */
	members: APIGuildMember[];
	/**
	 * Channels in the guild
	 */
	channels: Exclude<APIChannel, APIDmChannel | APIGroupDmChannel>[];
	/**
	 * All active threads in the guild that current user has permission to view
	 */
	threads: APIThreadChannel[];
	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold`
	 */
	presences: APIPresenceUpdateEventFields[];
	/**
	 * Stage instances in the guild
	 */
	stage_instances: APIStageInstance[];
	/**
	 * Scheduled events in the guild
	 */
	guild_scheduled_events: APIGuildScheduledEvent[];
	/**
	 * Soundboard sounds in the guild
	 */
	soundboard_sounds: APISoundboardSound[];
};

export interface APIGuildMember {
	/**
	 * the user this guild member represents
	 */
	user?: APIUser;
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
	joined_at: string;
	/**
	 * when the user started [boosting](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-) the guild
	 */
	premium_since?: string | null;
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
	flags: number;
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
	communication_disabled_until?: string | null;
	/**
	 * data for the member's guild avatar decoration
	 */
	avatar_decoration_date?: APIAvatarDecorationData | null;
};

/**
 * Returned when fetching the permissions for an app's command(s) in a guild.
 */
export interface APIGuildApplicationCommandPermissions {
	/**
	 * ID of the command or the application ID
	 */
	id: Snowflake;
	/**
	 * ID of the application the command belongs to
	 */
	application_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Permissions for the command in the guild, max of 100
	 */
	permissions: APIApplicationCommandPermission[];
};
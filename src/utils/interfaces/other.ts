import WebSocket = require("ws");
import { ActionRowComponent, ApplicationCommandOption, Channel, InteractionCallbackData, MessageComponent, SelectMenuComponent, SelectMenuComponentType, Snowflake } from "../types/other";
import { ClientRequest, IncomingMessage } from "http";
import { UserFlags, ApplicationFlags, BitwisePermissionFlags, MessageFlags, AttachmentFlags, RoleFlags, GuildMemberFlags } from "../enums/flags";
import { RateLimitScopes, Locales, GatewayOpcodes, TextInputStyles, ButtonStyles, VerificationLevels, DefaultMessageNotificationLevels, ExplicitContentFilterLevels, MFALevels, PremiumTiers, PrivacyLevels, PresenceStatus, VideoQualityModes } from "../enums/other";
import { PremiumTypes, ApplicationIntegrationTypes, InteractionContextTypes, ApplicationCommandTypes, ApplicationCommandOptionTypes, ChannelTypes, EmbedTypes, InteractionCallbackTypes, LayoutTypes, AllowedMentionsTypes, MessageComponentTypes, SelectDefaultValueTypes, StickerFormatTypes, StickerTypes, ActivityTypes, OverwriteTypes, ForumLayoutTypes, SortOrderTypes } from "../enums/types";
import { APIApplicationCommandAutocompleteInteraction, APIApplicationCommandInteraction } from "./api/interactions";
import { GuildFeatures, GuildNSFWLevels, GuildScheduledEventEntityTypes, GuildScheduledEventPrivacyLevels, GuildScheduledEventRecurrenceRuleFrequencies, GuildScheduledEventRecurrenceRuleMonths, GuildScheduledEventRecurrenceRuleWeekdays, GuildScheduledEventStatus } from "../enums/guilds";

export interface Cache {
	users: Record<string, User>;
	guilds: Record<string, Guild | (Guild & GuildCreateExtraFields)>;
	unavailableGuilds: Record<string, UnavailableGuild>;
	application?: PartialApplication;
	sessionId?: string;
	resumeGatewayUrl?: string;
}

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
	channels: Exclude<Channel, DmChannel | GroupDmChannel>[];
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

export interface GuildTextChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildText;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)
	 */
	topic?: string | null;
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the user limit of the voice channel
	 */
	userLimit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface GuildStageVoiceChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildStageVoice;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	userLimit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * [voice region](https://discord.com/developers/docs/resources/voice#voice-region-object) id for the voice channel, automatic when set to null
	 */
	rtcRegion?: VoiceRegion | null;
	/**
	 * the camera [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present
	 */
	videoQualityMode?: VideoQualityModes;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

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

export interface GuildMediaChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildMedia;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)
	 */
	topic?: string | null;
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * the [default sort order type](https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels.
	 * Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
	 */
	defaultSortOrder?: SortOrderTypes	| null;
};

export interface GuildForumChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildForum;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)
	 */
	topic?: string | null;
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * the [default sort order type](https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels.
	 * Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
	 */
	defaultSortOrder?: SortOrderTypes	| null;
	/**
	 * the [default forum layout view](https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types) used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin
	 */
	defaultForumLayout?: ForumLayoutTypes;
};

export interface GuildDirectoryChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildDirectory;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)
	 */
	topic?: string | null;
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface GuildCategoryChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildCategory;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface GuildAnnouncementChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildAnnouncement;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)
	 */
	topic?: string | null;
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface GuildVoiceChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildVoice;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	userLimit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * [voice region](https://discord.com/developers/docs/resources/voice#voice-region-object) id for the voice channel, automatic when set to null
	 */
	rtcRegion?: VoiceRegion | null;
	/**
	 * the camera [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present
	 */
	videoQualityMode?: VideoQualityModes;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface DmChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.Dm;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the recipients of the DM
	 */
	recipients?: User[];
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
};

export interface GroupDmChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GroupDm;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the recipients of the DM
	 */
	recipients?: User[];
	/**
	 * icon hash of the group DM
	 */
	icon?: string | null;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * application id of the group DM creator if it is bot-created
	 */
	applicationId?: Snowflake;
	/**
	 * for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope
	 */
	managed?: boolean;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
};

export interface ThreadChannel extends BaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.PublicThread | ChannelTypes.PrivateThread | ChannelTypes.AnnouncementThread;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guildId?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permissionOverwrite?: Overwrite[];
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	lastMessageId?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	userLimit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rateLimitPerUser?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	ownerId?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parentId?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	lastPinTimestamp?: string | null;
	/**
	 * number of messages (not including the initial message or deleted messages) in a thread.
	 */
	messageCount?: number;
	/**
	 * an approximate count of users in a thread, stops counting at 50
	 */
	memberCount?: number;
	/**
	 * thread-specific fields not needed by other channels
	 */
	threadMetadata?: ThreadMetadata;
	/**
	 * thread member object for the current user, if they have joined the thread, only included on certain API endpoints
	 */
	member?: ThreadMember;
	/**
	 * default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080
	 */
	defaultAutoArchiveDuration?: 60 | 1440 | 4320 | 10080;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted
	 */
	totalMessageSent?: number;
	/**
	 * the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel
	 */
	appliedTags?: Snowflake[];
	/**
	 * the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel
	 */
	defaultReactionEmoji?: DefaultReaction | null;
	/**
	 * the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
	 */
	defaultThreadRateLimitPerUser?: number;
};

export interface BaseChannel {
	/**
	 * the id of this channel
	 */
	id: Snowflake;
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes;
	/**
	 * the name of the channel (1-100 characters)
	 */
	name?: string | null;
	/**
	 * [channel flags](https://discord.com/developers/docs/resources/channel#channel-object-channel-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags?: number;
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

export interface Activity {
	/**
	 * Activity's name
	 */
	name: string;
	/**
	 * [Activity type](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types)
	 */
	type: ActivityTypes;
	/**
	 * Stream URL, is validated when type is 1
	 */
	url?: string | null;
	/**
	 * Unix timestamp (in milliseconds) of when the activity was added to the user's session
	 */
	createdAt: number;
	/**
	 * Unix timestamps for start and/or end of the game
	 */
	timestamps?: ActivityTimestamps;
	/**
	 * Application ID for the game
	 */
	applicationId?: Snowflake;
	/**
	 * What the player is currently doing
	 */
	details?: string | null;
	/**
	 * User's current party status, or text used for a custom status
	 */
	state?: string | null;
	/**
	 * Emoji used for a custom status
	 */
	emoji?: ActivityEmoji | null;
	/**
	 * Information for the current party of the player
	 */
	party?: ActivityParty;
	/**
	 * Images for the presence and their hover texts
	 */
	assets?: ActivityAssets;
	/**
	 * Secrets for Rich Presence joining and spectating
	 */
	secrets?: ActivitySecrets;
	/**
	 * Whether or not the activity is an instanced game session
	 */
	instance?: boolean;
	/**
	 * [Activity flags](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags) `OR`d together, describes what the payload includes
	 */
	flags?: number;
	/**
	 * Custom buttons shown in the Rich Presence (max 2)
	 */
	buttons?: ActivityButton[];
};

export interface ActivityTimestamps {
	/**
	 * Unix time (in milliseconds) of when the activity started
	 */
	start?: number;
	/**
	 * Unix time (in milliseconds) of when the activity ends
	 */
	end?: number;
};

export interface ActivityEmoji {
	/**
	 * Name of the emoji
	 */
	name: string;
	/**
	 * ID of the emoji
	 */
	id?: Snowflake;
	/**
	 * Whether the emoji is animated
	 */
	animated?: boolean;
};

export interface ActivityParty {
	/**
	 * ID of the party
	 */
	id?: string;
	/**
	 * Used to show the party's current and maximum size
	 */
	size ?: [number, number];
};

export interface ActivityAssets {
	/**
	 * See [Activity Asset Image](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-asset-image)
	 */
	largeImage?: string;
	/**
	 * Text displayed when hovering over the large image of the activity
	 */
	largeText?: string;
	/**
	 * See [Activity Asset Image](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-asset-image)
	 */
	smallImage?: string;
	/**
	 * Text displayed when hovering over the small image of the activity
	 */
	smallText?: string;
};

export interface ActivitySecrets {
	/**
	 * Secret for joining a party
	 */
	join?: string;
	/**
	 * Secret for spectating a game
	 */
	spectate?: string;
	/**
	 * Secret for a specific instanced match
	 */
	match?: string;
};

/**
 * When received over the gateway, the `buttons` field is an array of strings, which are the button labels. Bots cannot access a user's activity button URLs. When sending, the `buttons` field must be an array of the below object:
 */
export interface ActivityButton {
	/**
	 * Text shown on the button (1-32 characters)
	 */
	label: string;
	/**
	 * URL opened when clicking the button (1-512 characters)
	 */
	url: string;
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

export interface GuildMember {
	/**
	 * the user this guild member represents
	 */
	user?: User;
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
	title?: string;
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
	minValues?: number;
	/**
	 * Maximum number of items that can be chosen (defaults to 1); max 25
	 */
	maxValues?: number;
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

export interface Command extends ApplicationCommandParams {
	run: (client: Client, interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction) => void
};
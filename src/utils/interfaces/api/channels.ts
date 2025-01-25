import { ChannelTypes, SortOrderTypes, ForumLayoutTypes } from "../../enums/types";
import { VideoQualityModes } from "../../enums/others";
import { Snowflake } from "../../types/others";
import { APIUser, APIOverwrite, APIThreadMetadata, APIThreadMember, APIDefaultReaction, APIVoiceRegion } from "./others";

export interface APIBaseChannel {
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

export interface APIDmChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.Dm;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * the recipients of the DM
	 */
	recipients?: APIUser[];
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
};

export interface APIGroupDmChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GroupDm;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * the recipients of the DM
	 */
	recipients?: APIUser[];
	/**
	 * icon hash of the group DM
	 */
	icon?: string | null;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * application id of the group DM creator if it is bot-created
	 */
	application_id?: Snowflake;
	/**
	 * for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope
	 */
	managed?: boolean;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
};

export interface APIThreadChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.PublicThread | ChannelTypes.PrivateThread | ChannelTypes.AnnouncementThread;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	user_limit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * number of messages (not including the initial message or deleted messages) in a thread.
	 */
	message_count?: number;
	/**
	 * an approximate count of users in a thread, stops counting at 50
	 */
	member_count?: number;
	/**
	 * thread-specific fields not needed by other channels
	 */
	thread_metadata?: APIThreadMetadata;
	/**
	 * thread member object for the current user, if they have joined the thread, only included on certain API endpoints
	 */
	member?: APIThreadMember;
	/**
	 * default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080
	 */
	default_auto_archive_duration?: 60 | 1440 | 4320 | 10080;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted
	 */
	total_message_sent?: number;
	/**
	 * the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel
	 */
	applied_tags?: Snowflake[];
	/**
	 * the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel
	 */
	default_reaction_emoji?: APIDefaultReaction | null;
	/**
	 * the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
	 */
	default_thread_rate_limit_per_user?: number;
};

export interface APIGuildTextChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildText;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
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
	last_message_id?: Snowflake | null;
	/**
	 * the user limit of the voice channel
	 */
	user_limit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface APIGuildStageVoiceChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildStageVoice;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	user_limit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * [voice region](https://discord.com/developers/docs/resources/voice#voice-region-object) id for the voice channel, automatic when set to null
	 */
	rtc_region?: APIVoiceRegion | null;
	/**
	 * the camera [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present
	 */
	video_quality_mode?: VideoQualityModes;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface APIGuildMediaChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildMedia;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
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
	last_message_id?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * the [default sort order type](https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels.
	 * Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
	 */
	default_sort_order?: SortOrderTypes	| null;
};

export interface APIGuildForumChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildForum;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
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
	last_message_id?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
	/**
	 * the [default sort order type](https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels.
	 * Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
	 */
	default_sort_order?: SortOrderTypes	| null;
	/**
	 * the [default forum layout view](https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types) used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin
	 */
	default_forum_layout?: ForumLayoutTypes;
};

export interface APIGuildDirectoryChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildDirectory;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
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
	last_message_id?: Snowflake | null;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface APIGuildCategoryChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildCategory;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface APIGuildAnnouncementChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildAnnouncement;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
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
	last_message_id?: Snowflake | null;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};

export interface APIGuildVoiceChannel extends APIBaseChannel {
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes.GuildVoice;
	/**
	 * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
	 */
	guild_id?: Snowflake;
	/**
	 * sorting position of the channel (channels with the same position are sorted by id)
	 */
	position?: number;
	/**
	 * explicit permission overwrites for members and roles
	 */
	permission_overwrite?: APIOverwrite[];
	/**
	 * whether the channel is nsfw
	 */
	nsfw?: boolean;
	/**
	 * the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)
	 */
	last_message_id?: Snowflake | null;
	/**
	 * the bitrate (in bits) of the voice channel
	 */
	bitrate?: number;
	/**
	 * the user limit of the voice channel
	 */
	user_limit?: number;
	/**
	 * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;
	/**
	 * id of the creator of the group DM or thread
	 */
	owner_id?: Snowflake;
	/**
	 * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
	 */
	parent_id?: Snowflake | null;
	/**
	 * when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: string | null;
	/**
	 * [voice region](https://discord.com/developers/docs/resources/voice#voice-region-object) id for the voice channel, automatic when set to null
	 */
	rtc_region?: APIVoiceRegion | null;
	/**
	 * the camera [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present
	 */
	video_quality_mode?: VideoQualityModes;
	/**
	 * computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.
	 * This does not include [implicit permissions](https://discord.com/developers/docs/topics/permissions#implicit-permissions), which may need to be checked separately
	 */
	permissions?: string;
};
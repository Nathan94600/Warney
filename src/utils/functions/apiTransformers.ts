import { UserFlags, GuildMemberFlags, RoleFlags, BitwisePermissionFlags } from "../enums/flags";
import { ChannelTypes } from "../enums/types";
import { APIThreadChannel } from "../interfaces/api/channels";
import { APIGuild, APIGuildMember } from "../interfaces/api/guilds/others";
import { APIRole, APIStageInstance, APIThreadMember, APIUser } from "../interfaces/api/others";
import { GuildAnnouncementChannel, GuildCategoryChannel, GuildDirectoryChannel, GuildForumChannel, GuildMediaChannel, GuildStageVoiceChannel, GuildTextChannel, GuildVoiceChannel, ThreadChannel } from "../interfaces/channels";
import { Guild, GuildMember } from "../interfaces/guilds";
import { User, ThreadMember, ThreadMetadata, Role, RoleTags, Emoji, StageInstance } from "../interfaces/others";
import { APIGuildChannel } from "../types/api";
import { GuildChannel } from "../types/others";
import { flagsToArray } from "./others";

export function apiUserToUser(apiUser: APIUser): User {
	const user: User = {
		avatar: apiUser.avatar,
		discriminator: apiUser.discriminator,
		globalName: apiUser.global_name,
		id: apiUser.id,
		mfaEnabled: apiUser.mfa_enabled,
		username: apiUser.username
	};

	if (apiUser.accent_color !== undefined) user.accentColor = apiUser.accent_color;
	if (apiUser.avatar_decoration_data !== undefined) user.avatarDecorationData = apiUser.avatar_decoration_data ? {
		asset: apiUser.avatar_decoration_data.asset,
		skuId: apiUser.avatar_decoration_data.sku_id
	} : apiUser.avatar_decoration_data;
	if (apiUser.banner !== undefined) user.banner = apiUser.banner;
	if (apiUser.bot !== undefined) user.bot = apiUser.bot;
	if (apiUser.flags !== undefined) user.flags = flagsToArray(apiUser.flags, UserFlags);
	if (apiUser.locale !== undefined) user.locale = apiUser.locale;
	if (apiUser.premium_type !== undefined) user.premiumType = apiUser.premium_type;
	if (apiUser.public_flags !== undefined) user.publicFlags = flagsToArray(apiUser.public_flags, UserFlags);
	if (apiUser.system !== undefined) user.system = apiUser.system;

	return user;
};

export function apiGuildMemberToGuildMember(apiMember: APIGuildMember): GuildMember {
	const member: GuildMember = {
		deaf: apiMember.deaf,
		flags: flagsToArray(apiMember.flags, GuildMemberFlags),
		joinedAt: apiMember.joined_at,
		mute: apiMember.mute,
		roles: apiMember.roles,
		user: apiUserToUser(apiMember.user)
	};

	if (apiMember.avatar) member.avatar = apiMember.avatar;
	if (apiMember.avatar_decoration_data) member.avatarDecorationData = apiMember.avatar_decoration_data ? {
		asset: apiMember.avatar_decoration_data.asset,
		skuId: apiMember.avatar_decoration_data.sku_id
	} : apiMember.avatar_decoration_data;
	if (apiMember.communication_disabled_until) member.communicationDisabledUntil = apiMember.communication_disabled_until;
	if (apiMember.nick) member.nick = apiMember.nick;
	if (apiMember.pending) member.pending = apiMember.pending;
	if (apiMember.permissions) member.permissions = apiMember.permissions;
	if (apiMember.premium_since) member.premiumSince = apiMember.premium_since;

	return member;
};

export function apiThreadMemberToThreadMember(apiMember: APIThreadMember): ThreadMember {
	const member: ThreadMember = {
		flags: apiMember.flags,
		joinTimestamp: apiMember.join_timestamp
	};

	if (apiMember.id) member.id = apiMember.id;
	if (apiMember.member) member.member = apiGuildMemberToGuildMember(apiMember.member);
	if (apiMember.user_id) member.userId = apiMember.user_id;

	return member
};

export function apiThreadChannelToThreadChannel(apiThread: APIThreadChannel): ThreadChannel {
	const thread: ThreadChannel = {
		id: apiThread.id,
		type: apiThread.type
	};

	if (apiThread.applied_tags) thread.appliedTags = apiThread.applied_tags;
	if (apiThread.bitrate) thread.bitrate = apiThread.bitrate;
	if (apiThread.default_auto_archive_duration) thread.defaultAutoArchiveDuration = apiThread.default_auto_archive_duration;
	if (apiThread.default_reaction_emoji) thread.defaultReactionEmoji = { emojiId: apiThread.default_reaction_emoji.emoji_id, emojiName: apiThread.default_reaction_emoji.emoji_name };
	if (apiThread.default_thread_rate_limit_per_user) thread.defaultThreadRateLimitPerUser = apiThread.default_thread_rate_limit_per_user;
	if (apiThread.flags) thread.flags = apiThread.flags;
	if (apiThread.guild_id) thread.guildId = apiThread.guild_id;
	if (apiThread.last_message_id) thread.lastMessageId = apiThread.last_message_id;
	if (apiThread.last_pin_timestamp) thread.lastPinTimestamp = apiThread.last_pin_timestamp;
	if (apiThread.member) thread.member = apiThreadMemberToThreadMember(apiThread.member);
	if (apiThread.member_count) thread.memberCount = apiThread.member_count;
	if (apiThread.name) thread.name = apiThread.name;
	if (apiThread.owner_id) thread.ownerId = apiThread.owner_id;
	if (apiThread.parent_id) thread.parentId = apiThread.parent_id;
	if (apiThread.permission_overwrite) thread.permissionOverwrite = apiThread.permission_overwrite;
	if (apiThread.permissions) thread.permissions = apiThread.permissions;
	if (apiThread.position) thread.position = apiThread.position;
	if (apiThread.rate_limit_per_user) thread.rateLimitPerUser = apiThread.rate_limit_per_user;
	if (apiThread.thread_metadata) {
		const threadMetadata: ThreadMetadata = {
			archived: apiThread.thread_metadata.archived,
			archiveTimestamp: apiThread.thread_metadata.archive_timestamp,
			autoArchiveDuration: apiThread.thread_metadata.auto_archive_duration,
			locked: apiThread.thread_metadata.locked
		};

		if (apiThread.thread_metadata.create_timestamp) threadMetadata.createTimestamp = apiThread.thread_metadata.create_timestamp;
		if (apiThread.thread_metadata.invitable) threadMetadata.invitable = apiThread.thread_metadata.invitable;

		thread.threadMetadata = threadMetadata;
	}
	if (apiThread.total_message_sent) thread.totalMessageSent = apiThread.total_message_sent;
	if (apiThread.user_limit) thread.userLimit = apiThread.user_limit;

	return thread;
};

export function apiRoleToRole(apiRole: APIRole): Role {
	const role: Role = {
		color: apiRole.color,
		flags: flagsToArray(apiRole.flags, RoleFlags),
		hoist: apiRole.hoist,
		id: apiRole.id,
		managed: apiRole.managed,
		mentionable: apiRole.mentionable,
		name: apiRole.name,
		permissions: flagsToArray(apiRole.permissions, BitwisePermissionFlags),
		position: apiRole.position
	};

	if (apiRole.icon !== undefined) role.icon = apiRole.icon;
	if (apiRole.tags) {
		const tags: RoleTags = {};

		if (apiRole.tags.available_for_purchase !== undefined) tags.availableForPurchase = apiRole.tags.available_for_purchase;
		if (apiRole.tags.bot_id !== undefined) tags.botId = apiRole.tags.bot_id;
		if (apiRole.tags.guild_connections !== undefined) tags.guildConnections = apiRole.tags.guild_connections;
		if (apiRole.tags.integration_id !== undefined) tags.integrationId = apiRole.tags.integration_id;
		if (apiRole.tags.premium_subscriber !== undefined) tags.premiumSubscriber = apiRole.tags.premium_subscriber;
		if (apiRole.tags.subscription_listing_id !== undefined) tags.subscriptionListingId = apiRole.tags.subscription_listing_id;

		role.tags = tags;
	};
	if (apiRole.unicode_emoji) role.unicodeEmoji = apiRole.unicode_emoji;

	return role;
};

export function apiGuildChannelToGuildhannel(apiChannel: APIGuildChannel): GuildChannel {
	switch (apiChannel.type) {
		case ChannelTypes.GuildAnnouncement:
			const announcementChannel: GuildAnnouncementChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.flags) announcementChannel.flags = apiChannel.flags;
			if (apiChannel.guild_id) announcementChannel.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) announcementChannel.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) announcementChannel.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) announcementChannel.name = apiChannel.name;
			if (apiChannel.nsfw) announcementChannel.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) announcementChannel.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) announcementChannel.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) announcementChannel.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) announcementChannel.permissions = apiChannel.permissions;
			if (apiChannel.position) announcementChannel.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) announcementChannel.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.topic) announcementChannel.topic = apiChannel.topic;

			return announcementChannel
		case ChannelTypes.GuildDirectory:
			const directoryChannel: GuildDirectoryChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.flags) directoryChannel.flags = apiChannel.flags;
			if (apiChannel.guild_id) directoryChannel.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) directoryChannel.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) directoryChannel.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) directoryChannel.name = apiChannel.name;
			if (apiChannel.nsfw) directoryChannel.nsfw = apiChannel.nsfw;
			if (apiChannel.parent_id) directoryChannel.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) directoryChannel.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) directoryChannel.permissions = apiChannel.permissions;
			if (apiChannel.position) directoryChannel.position = apiChannel.position;
			if (apiChannel.topic) directoryChannel.topic = apiChannel.topic;

			return directoryChannel
		case ChannelTypes.GuildCategory:
			const category: GuildCategoryChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.flags) category.flags = apiChannel.flags;
			if (apiChannel.guild_id) category.guildId = apiChannel.guild_id;
			if (apiChannel.name) category.name = apiChannel.name;
			if (apiChannel.permission_overwrite) category.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) category.permissions = apiChannel.permissions;
			if (apiChannel.position) category.position = apiChannel.position;

			return category
		case ChannelTypes.GuildForum:
			const forum: GuildForumChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.default_forum_layout) forum.defaultForumLayout = apiChannel.default_forum_layout;
			if (apiChannel.default_sort_order) forum.defaultSortOrder = apiChannel.default_sort_order;
			if (apiChannel.flags) forum.flags = apiChannel.flags;
			if (apiChannel.guild_id) forum.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) forum.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) forum.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) forum.name = apiChannel.name;
			if (apiChannel.nsfw) forum.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) forum.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) forum.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) forum.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) forum.permissions = apiChannel.permissions;
			if (apiChannel.position) forum.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) forum.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.topic) forum.topic = apiChannel.topic;

			return forum
		case ChannelTypes.GuildMedia:
			const media: GuildMediaChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.default_sort_order) media.defaultSortOrder = apiChannel.default_sort_order;
			if (apiChannel.flags) media.flags = apiChannel.flags;
			if (apiChannel.guild_id) media.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) media.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) media.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) media.name = apiChannel.name;
			if (apiChannel.nsfw) media.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) media.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) media.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) media.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) media.permissions = apiChannel.permissions;
			if (apiChannel.position) media.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) media.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.topic) media.topic = apiChannel.topic;

			return media
		case ChannelTypes.GuildStageVoice:
			const stageVoice: GuildStageVoiceChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.bitrate) stageVoice.bitrate = apiChannel.bitrate;
			if (apiChannel.flags) stageVoice.flags = apiChannel.flags;
			if (apiChannel.guild_id) stageVoice.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) stageVoice.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) stageVoice.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) stageVoice.name = apiChannel.name;
			if (apiChannel.nsfw) stageVoice.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) stageVoice.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) stageVoice.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) stageVoice.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) stageVoice.permissions = apiChannel.permissions;
			if (apiChannel.position) stageVoice.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) stageVoice.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.rtc_region) stageVoice.rtcRegion = apiChannel.rtc_region;
			if (apiChannel.user_limit) stageVoice.userLimit = apiChannel.user_limit;
			if (apiChannel.video_quality_mode) stageVoice.videoQualityMode = apiChannel.video_quality_mode;

			return stageVoice
		case ChannelTypes.GuildText:
			const textChannel: GuildTextChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.flags) textChannel.flags = apiChannel.flags;
			if (apiChannel.guild_id) textChannel.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) textChannel.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) textChannel.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) textChannel.name = apiChannel.name;
			if (apiChannel.nsfw) textChannel.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) textChannel.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) textChannel.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) textChannel.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) textChannel.permissions = apiChannel.permissions;
			if (apiChannel.position) textChannel.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) textChannel.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.topic) textChannel.topic = apiChannel.topic;
			if (apiChannel.user_limit) textChannel.userLimit = apiChannel.user_limit;

			return textChannel
		case ChannelTypes.GuildVoice:
			const voiceChannel: GuildVoiceChannel = { id: apiChannel.id, type: apiChannel.type };

			if (apiChannel.bitrate) voiceChannel.bitrate = apiChannel.bitrate;
			if (apiChannel.flags) voiceChannel.flags = apiChannel.flags;
			if (apiChannel.guild_id) voiceChannel.guildId = apiChannel.guild_id;
			if (apiChannel.last_message_id) voiceChannel.lastMessageId = apiChannel.last_message_id;
			if (apiChannel.last_pin_timestamp) voiceChannel.lastPinTimestamp = apiChannel.last_pin_timestamp;
			if (apiChannel.name) voiceChannel.name = apiChannel.name;
			if (apiChannel.nsfw) voiceChannel.nsfw = apiChannel.nsfw;
			if (apiChannel.owner_id) voiceChannel.ownerId = apiChannel.owner_id;
			if (apiChannel.parent_id) voiceChannel.parentId = apiChannel.parent_id;
			if (apiChannel.permission_overwrite) voiceChannel.permissionOverwrite = apiChannel.permission_overwrite;
			if (apiChannel.permissions) voiceChannel.permissions = apiChannel.permissions;
			if (apiChannel.position) voiceChannel.position = apiChannel.position;
			if (apiChannel.rate_limit_per_user) voiceChannel.rateLimitPerUser = apiChannel.rate_limit_per_user;
			if (apiChannel.rtc_region) voiceChannel.rtcRegion = apiChannel.rtc_region;
			if (apiChannel.user_limit) voiceChannel.userLimit = apiChannel.user_limit;
			if (apiChannel.video_quality_mode) voiceChannel.videoQualityMode = apiChannel.video_quality_mode;

			return voiceChannel
	}
};

export function apiGuildToGuild(apiGuild: APIGuild): Guild {
	return {
		afkChannelId: apiGuild.afk_channel_id,
		afkTimeout: apiGuild.afk_timeout,
		applicationId: apiGuild.afk_channel_id,
		banner: apiGuild.banner,
		defaultMessageNotifications: apiGuild.default_message_notifications,
		description: apiGuild.description,
		discoverySplash: apiGuild.discovery_splash,
		emojis: apiGuild.emojis.map(apiEmoji => {
			const emoji: Emoji = ({ id: apiEmoji.id, name: apiEmoji.name });

			if (apiEmoji.animated !== undefined) emoji.animated = apiEmoji.animated;
			if (apiEmoji.available !== undefined) emoji.available = apiEmoji.available;
			if (apiEmoji.managed !== undefined) emoji.managed = apiEmoji.managed;
			if (apiEmoji.require_colons !== undefined) emoji.requireColons = apiEmoji.require_colons;
			if (apiEmoji.user !== undefined) emoji.user = apiUserToUser(apiEmoji.user);
			if (apiEmoji.roles !== undefined) emoji.roles = apiEmoji.roles;

			return emoji;
		}),
		explicitContentFilter: apiGuild.explicit_content_filter,
		features: apiGuild.features,
		icon: apiGuild.icon,
		id: apiGuild.id,
		mfaLevel: apiGuild.mfa_level,
		name: apiGuild.name,
		nsfwLevel: apiGuild.nsfw_level,
		ownerId: apiGuild.owner_id,
		preferredLocale: apiGuild.preferred_locale,
		premiumProgressBarEnabled: apiGuild.premium_progress_bar_enabled,
		premiumTier: apiGuild.premium_tier,
		publicUpdatesChannelId: apiGuild.public_updates_channel_id,
		roles: new Map(apiGuild.roles.map(apiRole => [apiRole.id, apiRoleToRole(apiRole)])),
		rulesChannelId: apiGuild.rules_channel_id,
		safetyAlertsChannelId: apiGuild.safety_alerts_channel_id,
		splash: apiGuild.splash,
		systemChannelFlags: apiGuild.system_channel_flags,
		systemChannelId: apiGuild.system_channel_id,
		vanityUrlCode: apiGuild.vanity_url_code,
		verificationLevel: apiGuild.verification_level
	};
};

export function apiStageInstanceToStageInstance(apiStageInstance: APIStageInstance): StageInstance {
	return {
		channelId: apiStageInstance.channel_id,
		discoverableDisabled: apiStageInstance.discoverable_disabled,
		guildId: apiStageInstance.guild_id,
		guildScheduledEventId: apiStageInstance.guild_scheduled_event_id,
		id: apiStageInstance.id,
		privacyLevel: apiStageInstance.privacy_level,
		topic: apiStageInstance.topic
	}
};
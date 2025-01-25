import { UserFlags, GuildMemberFlags } from "../enums/flags";
import { APIThreadChannel } from "../interfaces/api/channels";
import { APIGuildMember } from "../interfaces/api/guilds/others";
import { APIUser } from "../interfaces/api/others";
import { ThreadChannel } from "../interfaces/channels";
import { GuildMember } from "../interfaces/guilds";
import { User, ThreadMember, ThreadMetadata } from "../interfaces/others";
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
	if (apiThread.member) {
		const member: ThreadMember = {
			flags: apiThread.member.flags,
			joinTimestamp: apiThread.member.join_timestamp
		};

		if (apiThread.member.id) member.id = apiThread.member.id;
		if (apiThread.member.member) member.member = apiGuildMemberToGuildMember(apiThread.member.member);
		if (apiThread.member.user_id) member.userId = apiThread.member.user_id;

		thread.member = member;
	};
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
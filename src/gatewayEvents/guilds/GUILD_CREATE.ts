import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { UserFlags } from "../../utils/enums/flags";
import { ChannelTypes } from "../../utils/enums/types";
import { Activity, ActivityAssets } from "../../utils/interfaces/activities";
import { GuildAnnouncementChannel, GuildDirectoryChannel, GuildCategoryChannel, GuildForumChannel, GuildMediaChannel, GuildStageVoiceChannel, GuildTextChannel, GuildVoiceChannel } from "../../utils/interfaces/channels";
import { GuildScheduledEvent } from "../../utils/interfaces/guilds";
import { Emoji, PresenceUpdateEventFields, SoundboardSound, VoiceState } from "../../utils/interfaces/others";
import { apiThreadChannelToThreadChannel, apiUserToUser, apiGuildMemberToGuildMember, apiRoleToRole } from "../../utils/functions/apiTransformers";
import { flagsToArray } from "../../utils/functions/others";

export default ((client, guild) => {
	if (guild.unavailable) client.cache.unavailableGuilds[guild.id] = { id: guild.id, unavailable: guild.unavailable };
	else {
		client.cache.guilds[guild.id] = {
			afkChannelId: guild.afk_channel_id,
			afkTimeout: guild.afk_timeout,
			applicationId: guild.afk_channel_id,
			banner: guild.banner,
			channels: guild.channels.map(apiChannel => {
				switch (apiChannel.type) {
					case ChannelTypes.PrivateThread:
					case ChannelTypes.AnnouncementThread:
					case ChannelTypes.PublicThread:
						return apiThreadChannelToThreadChannel(apiChannel)
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
			}),
			defaultMessageNotifications: guild.default_message_notifications,
			description: guild.description,
			discoverySplash: guild.discovery_splash,
			emojis: guild.emojis.map(apiEmoji => {
				const emoji: Emoji = ({ id: apiEmoji.id, name: apiEmoji.name });

				if (apiEmoji.animated !== undefined) emoji.animated = apiEmoji.animated;
				if (apiEmoji.available !== undefined) emoji.available = apiEmoji.available;
				if (apiEmoji.managed !== undefined) emoji.managed = apiEmoji.managed;
				if (apiEmoji.require_colons !== undefined) emoji.requireColons = apiEmoji.require_colons;
				if (apiEmoji.user !== undefined) emoji.user = apiUserToUser(apiEmoji.user);
				if (apiEmoji.roles !== undefined) emoji.roles = apiEmoji.roles;

				return emoji;
			}),
			explicitContentFilter: guild.explicit_content_filter,
			features: guild.features,
			guildScheduledEvents: guild.guild_scheduled_events.map(apiGuildScheduledEvent => {
				const guildScheduledEvent: GuildScheduledEvent = {
					channelId: apiGuildScheduledEvent.channel_id,
					entityId: apiGuildScheduledEvent.entity_id,
					entityMetadata: apiGuildScheduledEvent.entity_metadata,
					entityType: apiGuildScheduledEvent.entity_type,
					guildId: apiGuildScheduledEvent.guild_id,
					id: apiGuildScheduledEvent.id,
					name: apiGuildScheduledEvent.name,
					privacyLevel: apiGuildScheduledEvent.privacy_level,
					scheduledEndTime: apiGuildScheduledEvent.scheduled_end_time,
					scheduledStartTime: apiGuildScheduledEvent.scheduled_start_time,
					status: apiGuildScheduledEvent.status,
					recurrenceRule: apiGuildScheduledEvent.recurrence_rule ? {
						byMonth: apiGuildScheduledEvent.recurrence_rule.by_month,
						byMonthDay: apiGuildScheduledEvent.recurrence_rule.by_month_day,
						byNWeekday: apiGuildScheduledEvent.recurrence_rule.by_n_weekday,
						byWeekday: apiGuildScheduledEvent.recurrence_rule.by_weekday,
						byYearDay: apiGuildScheduledEvent.recurrence_rule.by_year_day,
						count: apiGuildScheduledEvent.recurrence_rule.count,
						end: apiGuildScheduledEvent.recurrence_rule.end,
						frequency: apiGuildScheduledEvent.recurrence_rule.frequency,
						interval: apiGuildScheduledEvent.recurrence_rule.interval,
						start: apiGuildScheduledEvent.recurrence_rule.start
					} : apiGuildScheduledEvent.recurrence_rule
				};

				if (apiGuildScheduledEvent.creator) guildScheduledEvent.creator = apiUserToUser(apiGuildScheduledEvent.creator);
				if (apiGuildScheduledEvent.creator_id) guildScheduledEvent.creatorId = apiGuildScheduledEvent.creator_id;
				if (apiGuildScheduledEvent.image) guildScheduledEvent.image = apiGuildScheduledEvent.image;
				if (apiGuildScheduledEvent.user_count) guildScheduledEvent.userCount = apiGuildScheduledEvent.user_count;

				return guildScheduledEvent;
			}),
			icon: guild.icon,
			id: guild.id,
			joinedAt: guild.joined_at,
			large: guild.large,
			memberCount: guild.member_count,
			members: guild.members.map(member => apiGuildMemberToGuildMember(member)),
			mfaLevel: guild.mfa_level,
			name: guild.name,
			nsfwLevel: guild.nsfw_level,
			ownerId: guild.owner_id,
			preferredLocale: guild.preferred_locale,
			premiumProgressBarEnabled: guild.premium_progress_bar_enabled,
			premiumTier: guild.premium_tier,
			presences: guild.presences.map(apiPresence => {
				const presence: PresenceUpdateEventFields = {
					activities: apiPresence.activities.map(apiActivity => {
						const activity: Activity = {
							createdAt: apiActivity.created_at,
							name: apiActivity.name,
							type: apiActivity.type
						};
	
						if (apiActivity.application_id) activity.applicationId = apiActivity.application_id;
						if (apiActivity.assets) {
							const assets: ActivityAssets = {};
	
							if (apiActivity.assets.large_image) assets.largeImage = apiActivity.assets.large_image;
							if (apiActivity.assets.large_text) assets.largeImage = apiActivity.assets.large_text;
							if (apiActivity.assets.small_image) assets.largeImage = apiActivity.assets.small_image;
							if (apiActivity.assets.small_text) assets.largeImage = apiActivity.assets.small_text;
	
							activity.assets = assets;
						};
						if (apiActivity.buttons) activity.buttons = apiActivity.buttons.map(button => ({ label: button.label, url: button.url }));
						if (apiActivity.details) activity.details = apiActivity.details;
						if (apiActivity.emoji) activity.emoji = apiActivity.emoji;
						if (apiActivity.flags) activity.flags = apiActivity.flags;
						if (apiActivity.instance) activity.instance = apiActivity.instance;
						if (apiActivity.party) activity.party = apiActivity.party;
						if (apiActivity.secrets) activity.secrets = apiActivity.secrets;
						if (apiActivity.state) activity.state = apiActivity.state;
						if (apiActivity.timestamps) activity.timestamps = apiActivity.timestamps;
						if (apiActivity.url) activity.url = apiActivity.url;
	
						return activity;
					}),
					clientStatus: apiPresence.client_status,
					guildId: apiPresence.guild_id,
					status: apiPresence.status,
					user: { id: apiPresence.user.id }
				}, user: PresenceUpdateEventFields["user"] = { id: apiPresence.user.id }

				if (apiPresence.user.accent_color !== undefined) user.accentColor = apiPresence.user.accent_color;
				if (apiPresence.user.avatar !== undefined) user.avatar = apiPresence.user.avatar;
				if (apiPresence.user.avatar_decoration_data !== undefined) user.avatarDecorationData = apiPresence.user.avatar_decoration_data ? {
					asset: apiPresence.user.avatar_decoration_data.asset,
					skuId: apiPresence.user.avatar_decoration_data.sku_id
				} : apiPresence.user.avatar_decoration_data;
				if (apiPresence.user.banner !== undefined) user.banner = apiPresence.user.banner;
				if (apiPresence.user.bot !== undefined) user.bot = apiPresence.user.bot;
				if (apiPresence.user.discriminator !== undefined) user.discriminator = apiPresence.user.discriminator;
				if (apiPresence.user.flags !== undefined) user.flags = flagsToArray(apiPresence.user.flags, UserFlags);
				if (apiPresence.user.global_name !== undefined) user.globalName = apiPresence.user.global_name;
				if (apiPresence.user.locale !== undefined) user.locale = apiPresence.user.locale;
				if (apiPresence.user.mfa_enabled !== undefined) user.mfaEnabled = apiPresence.user.mfa_enabled;
				if (apiPresence.user.premium_type !== undefined) user.premiumType = apiPresence.user.premium_type;
				if (apiPresence.user.public_flags !== undefined) user.publicFlags = flagsToArray(apiPresence.user.public_flags, UserFlags);
				if (apiPresence.user.username !== undefined) user.username = apiPresence.user.username;
				if (apiPresence.user.system !== undefined) user.system = apiPresence.user.system;

				return presence
			}),
			publicUpdatesChannelId: guild.public_updates_channel_id,
			roles: guild.roles.map(apiRole => apiRoleToRole(apiRole)),
			rulesChannelId: guild.rules_channel_id,
			safetyAlertsChannelId: guild.safety_alerts_channel_id,
			soundboardSounds: guild.soundboard_sounds.map(apiSoundBoardSound => {
				const soundBoardSound: SoundboardSound = {
					available: apiSoundBoardSound.available,
					emojiId: apiSoundBoardSound.emoji_id,
					emojiName: apiSoundBoardSound.emoji_name,
					name: apiSoundBoardSound.name,
					soundId: apiSoundBoardSound.sound_id,
					volume: apiSoundBoardSound.volume
				};

				if (apiSoundBoardSound.user) soundBoardSound.user = apiUserToUser(apiSoundBoardSound.user);
				if (apiSoundBoardSound.guild_id) soundBoardSound.guildId = apiSoundBoardSound.guild_id;

				return soundBoardSound;
			}),
			splash: guild.splash,
			stageInstances: guild.stage_instances.map(stageInstance => ({
				channelId: stageInstance.channel_id,
				discoverableDisabled: stageInstance.discoverable_disabled,
				guildId: stageInstance.guild_id,
				guildScheduledEventId: stageInstance.guild_scheduled_event_id,
				id: stageInstance.id,
				privacyLevel: stageInstance.privacy_level,
				topic: stageInstance.topic
			})),
			systemChannelFlags: guild.system_channel_flags,
			systemChannelId: guild.system_channel_id,
			threads: guild.threads.map(thread => apiThreadChannelToThreadChannel(thread)),
			vanityUrlCode: guild.vanity_url_code,
			verificationLevel: guild.verification_level,
			voiceStates: guild.voice_states.map(apiVoiceState => {
				const voiceState: VoiceState = {
					channelId: apiVoiceState.channel_id,
					deaf: apiVoiceState.deaf,
					mute: apiVoiceState.mute,
					requestToSpeakTimestamp: apiVoiceState.request_to_speak_timestamp,
					selfDeaf: apiVoiceState.self_deaf,
					selfMute: apiVoiceState.self_mute,
					selfVideo: apiVoiceState.self_video,
					sessionId: apiVoiceState.session_id,
					suppress: apiVoiceState.suppress,
					userId: apiVoiceState.user_id
				};

				if (apiVoiceState.guild_id) voiceState.guildId = apiVoiceState.guild_id;
				if (apiVoiceState.member) voiceState.member = apiGuildMemberToGuildMember(apiVoiceState.member);
				if (apiVoiceState.self_stream) voiceState.selfStream = apiVoiceState.self_stream;

				return voiceState
			}),
		}
	};
}) satisfies GatewayEvent<GatewayEventNames.GuildCreate>;
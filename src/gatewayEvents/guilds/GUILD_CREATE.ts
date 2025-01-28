import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { UserFlags } from "../../utils/enums/flags";
import { Activity, ActivityAssets } from "../../utils/interfaces/activities";
import { GuildScheduledEvent } from "../../utils/interfaces/guilds";
import { PresenceUpdateEventFields, SoundboardSound, VoiceState } from "../../utils/interfaces/others";
import { apiThreadChannelToThreadChannel, apiUserToUser, apiGuildMemberToGuildMember, apiGuildChannelToGuildhannel, apiGuildToGuild } from "../../utils/functions/apiTransformers";
import { flagsToArray } from "../../utils/functions/others";

export default ((client, guild) => {
	if (guild.unavailable) client.cache.unavailableGuilds[guild.id] = { id: guild.id, unavailable: guild.unavailable };
	else {
		client.cache.guilds[guild.id] = {
			channels: guild.channels.map(channel => apiGuildChannelToGuildhannel(channel)),
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
			joinedAt: guild.joined_at,
			large: guild.large,
			memberCount: guild.member_count,
			members: guild.members.map(member => apiGuildMemberToGuildMember(member)),
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
			stageInstances: guild.stage_instances.map(stageInstance => ({
				channelId: stageInstance.channel_id,
				discoverableDisabled: stageInstance.discoverable_disabled,
				guildId: stageInstance.guild_id,
				guildScheduledEventId: stageInstance.guild_scheduled_event_id,
				id: stageInstance.id,
				privacyLevel: stageInstance.privacy_level,
				topic: stageInstance.topic
			})),
			threads: guild.threads.map(thread => apiThreadChannelToThreadChannel(thread)),
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
			...apiGuildToGuild(guild)
		}
	};
}) satisfies GatewayEvent<GatewayEventNames.GuildCreate>;
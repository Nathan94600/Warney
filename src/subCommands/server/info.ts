import { MessageFlags, SystemChannelFlags } from "../../utils/enums/flags";
import { ChannelTypes, InteractionCallbackTypes, MessageComponentTypes } from "../../utils/enums/types";
import { createInteractionResponse, flagsToArray, getGuildNSFWLevelLabel, getVerificationLevelLabel } from "../../utils/functions/others";
import { SubCommand } from "../../utils/interfaces/others";
import { ButtonStyles, DefaultMessageNotificationLevels, ExplicitContentFilterLevels } from "../../utils/enums/others";
import { DISCORD_EPOCH_IN_SECONDS, IMAGE_BASE_URL } from "../../utils/constants";
import { inspect } from "util";

export default {
	name: "info",
	run(client, interaction) {		
		const guildId = interaction.guild?.id || interaction.guild_id, guild = client.cache.guilds.get(guildId || ""), authorId = (interaction.member?.user || interaction.user)?.id;

		if (!guildId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "You must be in a server", flags: [MessageFlags.Ephemeral] } });
		else if (!guild) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server not found", flags: [MessageFlags.Ephemeral] } });
		else {
			const numberOfSystemChannelFlags = flagsToArray(guild.systemChannelFlags, SystemChannelFlags).length;

			createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: {
				embeds: [{
					author: guild.icon ? { name: `${guild.name} (${guild.id})`, iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}` } : { name: `${guild.name} (${guild.id})` },
					description: guild.description || "`No description`",
					...(guild.banner ? { image: { url: `${IMAGE_BASE_URL}/banners/${guild.id}/${guild.banner}.${guild.banner.startsWith("_a") ? "gif" : "webp"}` } } : {}),
					fields: [
						{ name: "Owner", value: `<@${guild.ownerId}> (**/server owner**)`, inline: true },
						{ name: "AFK timeout", value: `${guild.afkTimeout}s`, inline: true },
						{ name: "Default message notifications", value: `${guild.defaultMessageNotifications == DefaultMessageNotificationLevels.AllMessages ? "All messages" : "Only mentions"}`, inline: true },
						{
							name: "Explicit content filter level", value: `${guild.explicitContentFilter == ExplicitContentFilterLevels.AllMembers ? "All members" : guild.explicitContentFilter == ExplicitContentFilterLevels.Disabled ? "Disabled" : "Members without roles"}`,
							inline: true
						},
						{ name: "Created the", value: `<t:${parseInt(parseInt(guild.id.slice(0, -3)).toString(2).slice(0, -22), 2) + DISCORD_EPOCH_IN_SECONDS}:F>`, inline: true },
						{ name: `Presences (${guild.presences?.length || 0}${guild.maxPresences ? ` | max: ${guild.maxPresences}` : ""})`, value: "(**/server presences**)", inline: true },
						{
							name: `Members (${guild.members.size}${guild.maxMembers ? `/${guild.maxMembers}` : ""})`,
							value: `${guild.maxStageVideoChannelUsers ? `Maximum per stage video channel: ${guild.maxStageVideoChannelUsers}\n` : ""}${guild.maxVideoChannelUsers ? `Maximum per video channel: ${guild.maxVideoChannelUsers}\n` : ""}(**/server members**)`,
							inline: true
						},
						{ name: `Roles (${guild.roles.size})`, value: "(**/server roles**)", inline: true },
						{ name: `Emojis (${guild.emojis.length})`, value: "(**/server emojis**)", inline: true },
						{ name: `Stickers (${guild.stickers?.size || 0})`, value: "(**/server stickers**)", inline: true },
						{ name: `Stage instances (${guild.stageInstances?.size || 0})`, value: "(**/server stage_instances**)", inline: true },
						{ name: `Sound board sounds (${guild.soundboardSounds?.length || 0})`, value: "(**/server sound_board_sounds**)", inline: true },
						{ name: `Voice states (${guild.voiceStates.length})`, value: "(**/server voice_states**)", inline: true },
						{ name: `System channel flags (${flagsToArray(guild.systemChannelFlags, SystemChannelFlags).length})`, value: "(**/server system_channel_flags**)", inline: true },
						{ name: `Scheduled events (${guild.guildScheduledEvents.size})`, value: "(**/server scheduled_events**)", inline: true },
						{ name: `Premium`, value: `Progress bar enabled: ${guild.premiumProgressBarEnabled ? "Yes" : "no"}\nSubscription count: ${guild.premiumSubscriptionCount ?? "Not found"}\nPremium tier: ${guild.premiumTier}`, inline: true },
						{ name: `Levels`, value: `MFA level required for moderation actions: ${guild.mfaLevel ? "Elevated" : "None"}\nNSFW level: ${getGuildNSFWLevelLabel(guild.nsfwLevel)}\nVerification level: ${getVerificationLevelLabel(guild.verificationLevel)}`, inline: true },
						{
							name: `Threads (${guild.threads.size})`,
							value: `Announcement threads: ${guild.threads.filter(thread => thread.type == ChannelTypes.AnnouncementThread).size}` +
							`Public threads: ${guild.threads.filter(thread => thread.type == ChannelTypes.PublicThread).size}` +
							`Private threads: ${guild.threads.filter(thread => thread.type == ChannelTypes.PrivateThread).size}` +
							"\n(**/server threads**)",
							inline: true
						},
						{
							name: `Channels (${guild.channels.size})`, value: (guild.afkChannelId ? `<#${guild.afkChannelId}> (**/server afk_channel**)\n` : "") +
							(guild.publicUpdatesChannelId ? `<#${guild.publicUpdatesChannelId}> (**/server public_updates_channel*)\n` : "") +
							(guild.rulesChannelId ? `<#${guild.rulesChannelId}> (**/server rules_channel**)\n` : "") +
							(guild.safetyAlertsChannelId ? `<#${guild.safetyAlertsChannelId}> (**/server safety_alerts_channel**)\n` : "") +
							(guild.systemChannelId ? `<#${guild.systemChannelId}> (**/server system_channel**)\n` : "") +
							(guild.widgetChannelId ? `<#${guild.widgetChannelId}> (**/server widget_channel**)\n` : "") +
							`Announcement channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildAnnouncement).size}\n` +
							`Category channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildCategory).size}\n` +
							`Forum channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildForum).size}\n` +
							`Media channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildMedia).size}\n` +
							`Stage voice channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildStageVoice).size}\n` +
							`Text channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildText).size}\n` +
							`Voice channels: ${guild.channels.filter(channel => channel.type == ChannelTypes.GuildVoice).size}\n` +
							`\n(**/server channels**)`,
							inline: true
						},
						{
							name: "Other",
							value: (guild.applicationId ? `Application id of the server creator (only if created by a bot): ${guild.applicationId}\n` : "") +
							`Preferred locale: ${guild.preferredLocale}\n` +
							(guild.discoverySplash ? `[Discovery splash URL](${IMAGE_BASE_URL}/discovery-splashes/${guild.id}/${guild.discoverySplash}.webp)` : "") +
							(guild.splash ? `[Splash URL](${IMAGE_BASE_URL}/splashes/${guild.id}/${guild.splash}.webp)` : "") +
							(guild.vanityUrlCode ? `Vainty URL code: ${guild.vanityUrlCode}` : "") +
							(guild.widgetEnabled !== undefined ? `Widget enabled: ${guild.widgetEnabled ? "Yes" : "No"}` : "") +
							"\n(**/server welcome_screen** for informations about welcome screen)",
							inline: true
						}
					]
				}],
				components: [{
					type: MessageComponentTypes.ActionRow,
					components: [
						{ type: MessageComponentTypes.Button, label: `Features (${guild.features.length})`, style: ButtonStyles.Primary, customId: `server_info_features-${authorId}`, disabled: guild.features.length == 0 },
						{ type: MessageComponentTypes.Button, label: `System channel flags (${numberOfSystemChannelFlags})`, style: ButtonStyles.Primary, customId: `server_info_systemChannelFlags-${authorId}`, disabled: numberOfSystemChannelFlags == 0 },
						{ type: MessageComponentTypes.Button, label: `Welcome screen`, style: ButtonStyles.Primary, customId: `server_info_welcomeScreen-${authorId}`, disabled: guild.welcomeScreen === undefined },
					]
				}]
			} }).catch(error => {
				createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });
	
				console.log(`[src/subCommands/info.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
			});
		};
	}
} satisfies SubCommand;
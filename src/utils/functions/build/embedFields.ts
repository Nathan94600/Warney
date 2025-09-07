import {
  channelMention,
  ChannelType,
  EmbedField,
  escapeMarkdown,
  Guild,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMember,
  time,
  TimestampStyles,
} from "discord.js";
import {IMAGE_BASE_URL} from "../../constants";

export function buildGuildFields(guild: Guild): EmbedField[] {
  return [
    {
      name: "Owner",
      value: `<@${guild.ownerId}> (**/server owner**)`,
      inline: true,
    },
    {
      name: "AFK timeout",
      value: `${guild.afkTimeout}s`,
      inline: true,
    },
    {
      name: "Default message notifications",
      value: `${guild.defaultMessageNotifications == GuildDefaultMessageNotifications.AllMessages ? "All messages" : "Only mentions"}`,
      inline: true,
    },
    {
      name: "Explicit content filter level",
      value: `${guild.explicitContentFilter == GuildExplicitContentFilter.AllMembers ? "All members" : guild.explicitContentFilter == GuildExplicitContentFilter.Disabled ? "Disabled" : "Members without roles"}`,
      inline: true,
    },
    {
      name: "Created the",
      value: time(guild.createdAt, TimestampStyles.LongDateTime),
      inline: true,
    },
    {
      name: `Presences (${guild.presences.cache.size}${guild.maximumPresences ? `/${guild.maximumPresences}` : ""})`,
      value: "(**/server presences**)",
      inline: true,
    },
    {
      name: `Members (${guild.members.cache.size}${guild.maximumMembers ? `/${guild.maximumMembers}` : ""})`,
      value: `${guild.maxStageVideoChannelUsers ? `Maximum per stage video channel: ${guild.maxStageVideoChannelUsers}\n` : ""}${guild.maxVideoChannelUsers ? `Maximum per video channel: ${guild.maxVideoChannelUsers}\n` : ""}(**/server members**)`,
      inline: true,
    },
    {
      name: `Roles (${guild.roles.cache.size})`,
      value: "(**/server roles**)",
      inline: true,
    },
    {
      name: `Emojis (${guild.emojis.cache.size})`,
      value: "(**/server emojis**)",
      inline: true,
    },
    {
      name: `Stickers (${guild.stickers.cache.size})`,
      value: "(**/server stickers**)",
      inline: true,
    },
    {
      name: `Stage instances (${guild.stageInstances.cache.size})`,
      value: "(**/server stage_instances**)",
      inline: true,
    },
    {
      name: `Sound board sounds (${guild.soundboardSounds.cache.size})`,
      value: "(**/server sound_board_sounds**)",
      inline: true,
    },
    {
      name: `Voice states (${guild.voiceStates.cache.size})`,
      value: "(**/server voice_states**)",
      inline: true,
    },
    {
      name: `System channel flags (${guild.systemChannelFlags.toArray().length})`,
      value: "(**/server system_channel_flags**)",
      inline: true,
    },
    {
      name: `Scheduled events (${guild.scheduledEvents.cache.size})`,
      value: "(**/server scheduled_events**)",
      inline: true,
    },
    {
      name: `Premium`,
      value: `Progress bar enabled: ${guild.premiumProgressBarEnabled ? "Yes" : "no"}\nSubscription count: ${guild.premiumSubscriptionCount ?? "Not found"}\nPremium tier: ${guild.premiumTier}`,
      inline: true,
    },
    {
      name: `Levels`,
      value: `MFA level required for moderation actions: ${guild.mfaLevel ? "Elevated" : "None"}\nNSFW level: ${guild.nsfwLevel}\nVerification level: ${guild.verificationLevel}`,
      inline: true,
    },
    {
      name: `Threads (${guild.channels.cache.filter((channel) => channel.isThread()).size})`,
      value:
        `Announcement threads: ${guild.channels.cache.filter((thread) => thread.type === ChannelType.AnnouncementThread).size}` +
        `Public threads: ${guild.channels.cache.filter((thread) => thread.type === ChannelType.PublicThread).size}` +
        `Private threads: ${guild.channels.cache.filter((thread) => thread.type === ChannelType.PrivateThread).size}` +
        "\n(**/server threads**)",
      inline: true,
    },
    {
      name: `Channels (${guild.channels.channelCountWithoutThreads})`,
      value:
        (guild.afkChannelId
          ? `${channelMention(guild.afkChannelId)} (**/server afk_channel**)\n`
          : "") +
        (guild.publicUpdatesChannelId
          ? `${channelMention(guild.publicUpdatesChannelId)} (**/server public_updates_channel*)\n`
          : "") +
        (guild.rulesChannelId
          ? `${channelMention(guild.rulesChannelId)} (**/server rules_channel**)\n`
          : "") +
        (guild.safetyAlertsChannelId
          ? `${channelMention(guild.safetyAlertsChannelId)} (**/server safety_alerts_channel**)\n`
          : "") +
        (guild.systemChannelId
          ? `${channelMention(guild.systemChannelId)} (**/server system_channel**)\n`
          : "") +
        (guild.widgetChannelId
          ? `${channelMention(guild.widgetChannelId)} (**/server widget_channel**)\n`
          : "") +
        `Announcement channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildAnnouncement).size}\n` +
        `Category channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildCategory).size}\n` +
        `Forum channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildForum).size}\n` +
        `Media channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildMedia).size}\n` +
        `Stage voice channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildStageVoice).size}\n` +
        `Text channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildText).size}\n` +
        `Voice channels: ${guild.channels.cache.filter((channel) => channel.type == ChannelType.GuildVoice).size}\n` +
        `\n(**/server channels**)`,
      inline: true,
    },
    {
      name: "Other",
      value:
        (guild.applicationId
          ? `Application id of the server creator (only if created by a bot): ${guild.applicationId}\n`
          : "") +
        `Preferred locale: ${guild.preferredLocale}\n` +
        (guild.discoverySplash
          ? `[Discovery splash URL](${IMAGE_BASE_URL}/discovery-splashes/${guild.id}/${guild.discoverySplash}.webp)`
          : "") +
        (guild.splash
          ? `[Splash URL](${IMAGE_BASE_URL}/splashes/${guild.id}/${guild.splash}.webp)`
          : "") +
        (guild.vanityURLCode ? `Vainty URL code: ${guild.vanityURLCode}` : "") +
        (guild.widgetEnabled !== undefined
          ? `Widget enabled: ${guild.widgetEnabled ? "Yes" : "No"}`
          : "") +
        "\n(**/server welcome_screen** for informations about welcome screen)",
      inline: true,
    },
  ];
}

export function buildGuildMemberFields(member: GuildMember): EmbedField[] {
  return [
    {
      name: "Avatar decoration for the server",
      value: member.avatarDecorationData
        ? `Asset: ${member.avatarDecorationData.asset}\nSku ID: ${member.avatarDecorationData.skuId}`
        : "No avatar decoration",
      inline: true,
    },
    {
      name: "Avatar URL for the server",
      value: member.avatar ?? "No avatar",
      inline: true,
    },
    {
      name: "Communication disabled until",
      value: member.communicationDisabledUntil
        ? time(member.communicationDisabledUntil, TimestampStyles.LongDateTime)
        : "Not timed out",
      inline: true,
    },
    {
      name: "Deaf",
      value: `${member.voice.deaf ? "Yes" : "No"}`,
      inline: true,
    },
    {
      name: "Mute",
      value: `${member.voice.mute ? "Yes" : "No"}`,
      inline: true,
    },
    {
      name: "Joined the",
      value: member.joinedAt
        ? time(member.joinedAt, TimestampStyles.LongDateTime)
        : "No information",
      inline: true,
    },
    {
      name: "Nickname",
      value: `${member.nickname ?? "`None`"}`,
      inline: true,
    },
    {
      name: "Pending",
      value: `${typeof member.pending == "boolean" ? (member.pending ? "Yes" : "No") : "Unknown"}`,
      inline: true,
    },
    {
      name: "Premium since",
      value: member.premiumSinceTimestamp
        ? `<t:${member.premiumSinceTimestamp}:F>`
        : "Unknown",
      inline: true,
    },
    {
      name: "User banner color (in hexadecimal)",
      value: member.user.hexAccentColor ?? "Unknown",
      inline: true,
    },
    {
      name: "Avatar URL",
      value: `${member.displayAvatarURL()}`,
      inline: true,
    },
    {
      name: "Avatar decoration",
      value: member.avatarDecorationData
        ? `Asset: ${member.avatarDecorationData.asset}\nSku ID: ${member.avatarDecorationData.skuId}`
        : "No avatar decoration",
      inline: true,
    },
    {
      name: "Is a bot",
      value: member.user.bot ? "Yes" : "No",
      inline: true,
    },
    {
      name: "Username",
      value: `${escapeMarkdown(member.user.username)}${member.user.discriminator == "0" ? "" : `#${member.user.discriminator}`}`,
      inline: true,
    },
    {
      name: "Global name",
      value: `${escapeMarkdown(member.user.displayName)}`,
      inline: true,
    },
    {
      name: "Created the",
      value: time(member.user.createdAt, TimestampStyles.LongDateTime),
      inline: true,
    },
    {
      name: "Official Discord System user (part of the urgent message system)",
      value: `${member.user.system ? "Yes" : "No"}`,
      inline: true,
    },
  ];
}

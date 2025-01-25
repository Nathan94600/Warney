import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { Emoji } from "../../utils/interfaces/others";
import { apiRoleToRole, apiUserToUser } from "../../utils/functions/apiTransformers";

export default ((client, guild) => {
  client.cache.guilds[guild.id] = {
		...client.cache.guilds[guild.id],
    afkChannelId: guild.afk_channel_id,
    afkTimeout: guild.afk_timeout,
    applicationId: guild.afk_channel_id,
    banner: guild.banner,
    defaultMessageNotifications: guild.default_message_notifications,
    description: guild.description,
    discoverySplash: guild.discovery_splash,
    emojis: guild.emojis.map((apiEmoji) => {
      const emoji: Emoji = { id: apiEmoji.id, name: apiEmoji.name };

      if (apiEmoji.animated !== undefined) emoji.animated = apiEmoji.animated;
      if (apiEmoji.available !== undefined)
        emoji.available = apiEmoji.available;
      if (apiEmoji.managed !== undefined) emoji.managed = apiEmoji.managed;
      if (apiEmoji.require_colons !== undefined)
        emoji.requireColons = apiEmoji.require_colons;
      if (apiEmoji.user !== undefined)
        emoji.user = apiUserToUser(apiEmoji.user);
      if (apiEmoji.roles !== undefined) emoji.roles = apiEmoji.roles;

      return emoji;
    }),
    explicitContentFilter: guild.explicit_content_filter,
    features: guild.features,
    icon: guild.icon,
    id: guild.id,
    mfaLevel: guild.mfa_level,
    name: guild.name,
    nsfwLevel: guild.nsfw_level,
    ownerId: guild.owner_id,
    preferredLocale: guild.preferred_locale,
    premiumProgressBarEnabled: guild.premium_progress_bar_enabled,
    premiumTier: guild.premium_tier,
    publicUpdatesChannelId: guild.public_updates_channel_id,
    roles: guild.roles.map(role => apiRoleToRole(role)),
    rulesChannelId: guild.rules_channel_id,
    safetyAlertsChannelId: guild.safety_alerts_channel_id,
    splash: guild.splash,
    systemChannelFlags: guild.system_channel_flags,
    systemChannelId: guild.system_channel_id,
    vanityUrlCode: guild.vanity_url_code,
    verificationLevel: guild.verification_level
  };
}) satisfies GatewayEvent<GatewayEventNames.GuildUpdate>;
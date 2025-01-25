import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { Emoji, Role, RoleTags } from "../../utils/interfaces/others";
import { RoleFlags, BitwisePermissionFlags } from "../../utils/enums/flags";
import { apiUserToUser } from "../../utils/functions/apiTransformers";
import { flagsToArray } from "../../utils/functions/others";

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
    roles: guild.roles.map((apiRole) => {
      const role: Role = {
        color: apiRole.color,
        flags: flagsToArray(apiRole.flags, RoleFlags),
        hoist: apiRole.hoist,
        id: apiRole.id,
        managed: apiRole.managed,
        mentionable: apiRole.mentionable,
        name: apiRole.name,
        permissions: flagsToArray(apiRole.permissions, BitwisePermissionFlags),
        position: apiRole.position,
      };

      if (apiRole.icon) role.icon = apiRole.icon;
      if (apiRole.tags) {
        const tags: RoleTags = {};

        if (apiRole.tags.available_for_purchase !== undefined)
          tags.availableForPurchase = apiRole.tags.available_for_purchase;
        if (apiRole.tags.bot_id !== undefined) tags.botId = apiRole.tags.bot_id;
        if (apiRole.tags.guild_connections !== undefined)
          tags.guildConnections = apiRole.tags.guild_connections;
        if (apiRole.tags.integration_id !== undefined)
          tags.integrationId = apiRole.tags.integration_id;
        if (apiRole.tags.premium_subscriber !== undefined)
          tags.premiumSubscriber = apiRole.tags.premium_subscriber;
        if (apiRole.tags.subscription_listing_id !== undefined)
          tags.subscriptionListingId = apiRole.tags.subscription_listing_id;

        role.tags = tags;
      }
      if (apiRole.unicode_emoji) role.unicodeEmoji = apiRole.unicode_emoji;

      return role;
    }),
    rulesChannelId: guild.rules_channel_id,
    safetyAlertsChannelId: guild.safety_alerts_channel_id,
    splash: guild.splash,
    systemChannelFlags: guild.system_channel_flags,
    systemChannelId: guild.system_channel_id,
    vanityUrlCode: guild.vanity_url_code,
    verificationLevel: guild.verification_level
  };
}) satisfies GatewayEvent<GatewayEventNames.GuildUpdate>;
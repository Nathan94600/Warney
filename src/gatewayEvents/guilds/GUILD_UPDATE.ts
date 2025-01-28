import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { apiGuildToGuild } from "../../utils/functions/apiTransformers";

export default ((client, guild) => {
  const guildInCache = client.cache.guilds.get(guild.id);

  if (guildInCache) client.cache.guilds.set(guild.id, { ...guildInCache, ...apiGuildToGuild(guild) });
}) satisfies GatewayEvent<GatewayEventNames.GuildUpdate>;
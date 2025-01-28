import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, guild) => {
  client.cache.guilds.delete(guild.id);
}) satisfies GatewayEvent<GatewayEventNames.GuildDelete>;
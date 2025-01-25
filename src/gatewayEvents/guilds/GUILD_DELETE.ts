import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, guild) => {
  delete client.cache.guilds[guild.id];
}) satisfies GatewayEvent<GatewayEventNames.GuildDelete>;
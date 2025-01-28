import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, channel) => {
	if ("guild_id" in channel) client.cache.guilds.get(channel.guild_id)?.channels.delete(channel.id);
}) satisfies GatewayEvent<GatewayEventNames.ChannelDelete>;
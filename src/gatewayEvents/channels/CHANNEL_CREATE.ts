import { GatewayEventNames } from "../../utils/enums/others";
import { apiGuildChannelToGuildhannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, channel) => {
	if (channel.guild_id) client.cache.guilds.get(channel.guild_id)?.channels.set(channel.id, apiGuildChannelToGuildhannel(channel));
}) satisfies GatewayEvent<GatewayEventNames.ChannelCreate>;
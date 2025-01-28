import { GatewayEventNames } from "../../utils/enums/others";
import { apiGuildChannelToGuildhannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, channel) => {
	if ("guild_id" in channel) {
		const guild = client.cache.guilds.get(channel.guild_id);
	
		guild?.channels.set(channel.id, { ...guild.channels.get(channel.id), ...apiGuildChannelToGuildhannel(channel) });
	};
}) satisfies GatewayEvent<GatewayEventNames.ChannelUpdate>;
import { GatewayEventNames } from "../../utils/enums/others";
import { ChannelTypes } from "../../utils/enums/types";
import { apiGuildChannelToGuildhannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, channel) => {
	if (channel.type !== ChannelTypes.Dm && channel.type !== ChannelTypes.GroupDm && channel.guild_id) {
		const guild = client.cache.guilds[channel.guild_id], roleIndex = guild?.channels.findIndex(channelInCache => channelInCache.id == channel.id);
	
		if (roleIndex && guild?.channels[roleIndex]) guild.channels[roleIndex] = { ...guild.channels[roleIndex], ...apiGuildChannelToGuildhannel(channel) };
	};
}) satisfies GatewayEvent<GatewayEventNames.ChannelUpdate>;
import { GatewayEventNames } from "../../utils/enums/others";
import { ChannelTypes } from "../../utils/enums/types";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, channel) => {
	if (channel.type != ChannelTypes.Dm && channel.type != ChannelTypes.GroupDm && channel.guild_id) {
		const guild = client.cache.guilds[channel.guild_id];
	
		guild?.channels.splice(guild.channels.findIndex(channelInCache => channelInCache.id == channel.id, 1));
	};
}) satisfies GatewayEvent<GatewayEventNames.ChannelDelete>;
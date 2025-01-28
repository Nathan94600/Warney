import { GatewayEventNames } from "../../utils/enums/others";
import { ChannelTypes } from "../../utils/enums/types";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	if (data.guild_id) {
		const guild = client.cache.guilds.get(data.guild_id), channel = guild?.channels.get(data.channel_id);

		if (channel?.type == ChannelTypes.GuildText && data.last_pin_timestamp !== undefined) channel.lastPinTimestamp = data.last_pin_timestamp;
	};
}) satisfies GatewayEvent<GatewayEventNames.ChannelPinsUpdate>;
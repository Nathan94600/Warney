import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadChannelToThreadChannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) {
		const guild = client.cache.guilds.get(thread.guild_id);
		
		guild?.threads.set(thread.id, { ...guild.threads.get(thread.id), ...apiThreadChannelToThreadChannel(thread) });
	};
}) satisfies GatewayEvent<GatewayEventNames.ThreadUpdate>;
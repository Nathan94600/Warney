import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadChannelToThreadChannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) {
		const guild = client.cache.guilds[thread.guild_id], roleIndex = guild?.threads.findIndex(threadInCache => threadInCache.id == thread.id);
	
		if (roleIndex && guild?.threads[roleIndex]) guild.threads[roleIndex] = { ...guild.threads[roleIndex], ...apiThreadChannelToThreadChannel(thread) };
	};
}) satisfies GatewayEvent<GatewayEventNames.ThreadUpdate>;
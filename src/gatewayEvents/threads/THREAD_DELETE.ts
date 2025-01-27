import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) {
		const guild = client.cache.guilds[thread.guild_id];
	
		guild?.threads.splice(guild.threads.findIndex(threadInCache => threadInCache.id == thread.id, 1));
	};
}) satisfies GatewayEvent<GatewayEventNames.ThreadDelete>;
import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) client.cache.guilds.get(thread.guild_id)?.threads.delete(thread.id);
}) satisfies GatewayEvent<GatewayEventNames.ThreadDelete>;
import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadChannelToThreadChannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) client.cache.guilds[thread.guild_id]?.threads.push(apiThreadChannelToThreadChannel(thread));
}) satisfies GatewayEvent<GatewayEventNames.ThreadCreate>;
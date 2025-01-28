import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadChannelToThreadChannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, thread) => {
	if (thread.guild_id) client.cache.guilds.get(thread.guild_id)?.threads.set(thread.id, apiThreadChannelToThreadChannel(thread));
}) satisfies GatewayEvent<GatewayEventNames.ThreadCreate>;
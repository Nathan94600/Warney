import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	const thread = client.cache.guilds.get(data.guild_id)?.threads.get(data.id);

	if (thread) thread.memberCount = data.member_count;
}) satisfies GatewayEvent<GatewayEventNames.ThreadMembersUpdate>;
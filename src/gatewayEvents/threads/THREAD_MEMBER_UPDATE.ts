import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadMemberToThreadMember } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, member) => {
	const thread = client.cache.guilds.get(member.guild_id)?.threads.get(member.id);
		
	if (thread) thread.member = apiThreadMemberToThreadMember(member);
}) satisfies GatewayEvent<GatewayEventNames.ThreadMemberUpdate>;
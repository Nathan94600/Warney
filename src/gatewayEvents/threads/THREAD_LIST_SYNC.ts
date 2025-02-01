import { GatewayEventNames } from "../../utils/enums/others";
import { apiThreadChannelToThreadChannel } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	const guild = client.cache.guilds.get(data.guild_id);

	if (guild) data.threads.forEach(thread => {
		const member = data.members.find(member => member.id === thread.id);

		if (member) thread.member = { ...thread.member, ...member }; 

		guild.threads.set(thread.id, { ...guild.threads.get(thread.id), ...apiThreadChannelToThreadChannel(thread)});
	})
}) satisfies GatewayEvent<GatewayEventNames.ThreadListSync>;
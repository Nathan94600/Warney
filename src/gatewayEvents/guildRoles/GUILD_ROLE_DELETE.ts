import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {	
	client.cache.guilds.get(data.guild_id)?.roles.delete(data.role_id);
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleDelete>;
import { GatewayEventNames } from "../../utils/enums/others";
import { apiRoleToRole } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	const guild = client.cache.guilds.get(data.guild_id);
	
	guild?.roles.set(data.role.id, { ...guild.roles.get(data.role.id), ...apiRoleToRole(data.role) });
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleCreate>;
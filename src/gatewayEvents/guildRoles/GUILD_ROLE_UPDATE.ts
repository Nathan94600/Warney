import { GatewayEventNames } from "../../utils/enums/others";
import { apiRoleToRole } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	const guild = client.cache.guilds[data.guild_id], roleIndex = guild?.roles.findIndex(role => role.id == data.role.id);
	
	if (roleIndex && guild?.roles[roleIndex]) guild.roles[roleIndex] = { ...guild.roles[roleIndex], ...apiRoleToRole(data.role) };
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleCreate>;
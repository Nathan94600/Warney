import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	const guild = client.cache.guilds[data.guild_id];
	
	guild?.roles.splice(guild.roles.findIndex(role => role.id == data.role.id, 1));
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleCreate>;
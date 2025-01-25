import { GatewayEventNames } from "../../utils/enums/others";
import { apiRoleToRole } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	client.cache.guilds[data.guild_id]?.roles.push(apiRoleToRole(data.role));
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleCreate>;
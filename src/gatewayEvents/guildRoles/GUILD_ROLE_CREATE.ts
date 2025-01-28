import { GatewayEventNames } from "../../utils/enums/others";
import { apiRoleToRole } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, data) => {
	client.cache.guilds.get(data.guild_id)?.roles.set(data.role.id, apiRoleToRole(data.role));
}) satisfies GatewayEvent<GatewayEventNames.GuildRoleCreate>;
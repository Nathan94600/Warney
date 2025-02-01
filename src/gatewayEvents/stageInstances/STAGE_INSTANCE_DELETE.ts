import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, stageInstance) => {
	client.cache.guilds.get(stageInstance.guild_id)?.stageInstances.delete(stageInstance.id);
}) satisfies GatewayEvent<GatewayEventNames.StageInstanceDelete>;
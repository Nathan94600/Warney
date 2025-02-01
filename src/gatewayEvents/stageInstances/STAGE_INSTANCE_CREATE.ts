import { GatewayEventNames } from "../../utils/enums/others";
import { apiStageInstanceToStageInstance } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, stageInstance) => {
	client.cache.guilds.get(stageInstance.guild_id)?.stageInstances.set(stageInstance.id, apiStageInstanceToStageInstance(stageInstance));
}) satisfies GatewayEvent<GatewayEventNames.StageInstanceCreate>;
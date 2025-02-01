import { GatewayEventNames } from "../../utils/enums/others";
import { apiStageInstanceToStageInstance } from "../../utils/functions/apiTransformers";
import { GatewayEvent } from "../../utils/types/others";

export default ((client, stageInstance) => {
	const stageInstanceInCache = client.cache.guilds.get(stageInstance.guild_id)?.stageInstances.get(stageInstance.id);

	client.cache.guilds.get(stageInstance.guild_id)?.stageInstances.set(stageInstance.id, { ...stageInstanceInCache, ...apiStageInstanceToStageInstance(stageInstance) });
}) satisfies GatewayEvent<GatewayEventNames.StageInstanceCreate>;
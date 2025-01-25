import { GatewayEventNames } from "../utils/enums/others";
import { GatewayEvent } from "../utils/types/others";

export default (() => console.log("WebSocket connection resumed")) satisfies GatewayEvent<GatewayEventNames.Resumed>;
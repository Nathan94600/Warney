import { GatewayEventNames } from "../utils/enums/other";
import { GatewayEvent } from "../utils/types";

export default (() => console.log("WebSocket connection resumed")) satisfies GatewayEvent<GatewayEventNames.Resumed>;
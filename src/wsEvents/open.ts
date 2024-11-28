import { WsEvent } from "../utils/types/other";

export default (() => console.log("WebSocket connection opened")) satisfies WsEvent<"open">
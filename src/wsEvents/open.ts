import { WsEvent } from "../utils/types/others";

export default (() => console.log("WebSocket connection opened")) satisfies WsEvent<"open">
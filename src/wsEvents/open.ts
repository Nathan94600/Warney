import { WsEvent } from "../utils/types";

export default (() => console.log("WebSocket connection opened")) satisfies WsEvent<"open">
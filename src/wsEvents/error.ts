import { WsEvent } from "../utils/types/other";

export default ((_client, err) => console.log("Websocket error:", err)) satisfies WsEvent<"error">
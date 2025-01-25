import { WsEvent } from "../utils/types/others";

export default ((_client, err) => console.log("Websocket error:", err)) satisfies WsEvent<"error">
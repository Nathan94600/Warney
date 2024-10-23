import { WsEvent } from "../utils/types";

export default ((_client, code, reason) => console.log("Websocket closed:", code, reason.toString())) satisfies WsEvent<"close">
import { WebSocket } from "ws";
import { GATEWAY_CLOSE_EVENT_RECONNECTABLE_CODES } from "../utils/constants";
import { WsEvent } from "../utils/types";
import { openDiscordWebSocketConnection, sendWebsocketMessage } from "../utils/functions";
import { GatewayOpcodes } from "../utils/enums/other";
import { readdir } from "fs";
import { token } from "../config.json";

export default ((client, code, reason) => {
	client.ws.removeAllListeners();

	if (GATEWAY_CLOSE_EVENT_RECONNECTABLE_CODES.includes(code)) {
		client.ws = new WebSocket(`${client.cache.resumeGatewayUrl}?v=10&encoding=json`);

		client.ws.on("open", () => {
			console.log("WebSocket connection reopened");

			sendWebsocketMessage(client, {
				op: GatewayOpcodes.Resume,
				d: {
					token: client.token,
					session_id: client.cache.sessionId,
					seq: client.lastSeq
				}
			});
	
			readdir("./dist/wsEvents", (err, files) => {
				if (err) throw err;
				else files.forEach(file => {
					const fileName = file.split(".")[0];				
	
					if (fileName) client.ws?.on(fileName, require(`../wsEvents/${file}`).default.bind(null, client));
				});
			});
		});
	} else openDiscordWebSocketConnection(token, client);

	console.log("Websocket closed:", code, reason.toString())
}) satisfies WsEvent<"close">
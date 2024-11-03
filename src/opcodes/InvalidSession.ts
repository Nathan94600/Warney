import { WebSocket } from "ws";
import { GatewayOpcodes } from "../utils/enums/other";
import { Opcode } from "../utils/types";
import { readdir } from "fs";
import { openDiscordWebSocketConnection, sendWebsocketMessage } from "../utils/functions";
import { token } from "../config.json";

export default ((client, resumable) => {
	client.ws.removeAllListeners();

	if (resumable) {
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
	} else openDiscordWebSocketConnection(token, client)
}) satisfies Opcode<GatewayOpcodes.InvalidSession>;
import { WebSocket } from "ws";
import { GatewayOpcodes } from "../utils/enums/others";
import { Opcode } from "../utils/types/others";
import { readdir } from "fs";
import { sendWebsocketMessage } from "../utils/functions/others";

export default (client => {
	client.ws.removeAllListeners();
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
}) satisfies Opcode<GatewayOpcodes.Reconnect>;
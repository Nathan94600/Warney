import { WebSocket } from "ws";
import { GatewayOpcodes } from "../utils/enums/other";
import { Opcode } from "../utils/types";
import { readdir } from "fs";

export default ((client, d) => {
	if (d) {
		client.ws = new WebSocket(`${client.cache.resumeGatewayUrl}?v=10&encoding=json`);

		client.ws.on("open", () => {
			console.log("WebSocket connection reopened");
	
			client.ws.send(JSON.stringify({
				op: GatewayOpcodes.Resume,
				d: {
					token: client.token,
					session_id: client.cache.sessionId,
					seq: client.lastSeq
				}
			}));
	
			readdir("./dist/wsEvents", (err, files) => {
				if (err) throw err;
				else files.forEach(file => {
					const fileName = file.split(".")[0];				
	
					if (fileName) client.ws?.on(fileName, require(`../wsEvents/${file}`).default.bind(null, client));
				});
			});
		});
	};
}) satisfies Opcode<GatewayOpcodes.InvalidSession>;
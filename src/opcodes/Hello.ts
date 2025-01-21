import { GatewayIntents, GatewayOpcodes } from "../utils/enums/other";
import { sendWebsocketMessage } from "../utils/functions";
import { Opcode } from "../utils/types/other";

export default ((client, data) => {
	setInterval(() => sendWebsocketMessage(client, {
		op: GatewayOpcodes.Heartbeat,
		d: client.lastSeq
	}), data?.heartbeat_interval);

	sendWebsocketMessage(client, {
		op: GatewayOpcodes.Identify,
		d: {
			token: client.token,
			properties: {
				os: process.platform,
				browser: "mylib",
				device: "mylib"
			},
			compress: false,
			large_threshold: 250,
			intents: GatewayIntents.Guilds
		}
	});
}) satisfies Opcode<GatewayOpcodes.Hello>;
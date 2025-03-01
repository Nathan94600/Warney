import { GatewayIntents, GatewayOpcodes } from "../utils/enums/others";
import { sendWebsocketMessage } from "../utils/functions/others";
import { Opcode } from "../utils/types/others";

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
			intents: GatewayIntents.Guilds | GatewayIntents.GuildPresences
		}
	});
}) satisfies Opcode<GatewayOpcodes.Hello>;
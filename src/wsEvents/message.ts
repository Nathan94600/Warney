import { GatewayOpcodes } from "../utils/enums/other";
import { inspect } from "util";
import { readdir } from "fs";
import { WsEvent } from "../utils/types";

const opcodes: Record<string, any> = {};

readdir("./dist/opcodes", (err, files) => {
	if (err) throw err;
	else files.forEach(file => {
		const fileName = file.split(".")[0];

		if (fileName) opcodes[fileName] = require(`../opcodes/${file}`).default;
	});
});

export default ((client, msg) => {
	const parsedMsg: {
		/**
		 * [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes), which indicates the payload type
		 */
		op: GatewayOpcodes,
		/**
		 * Event data
		 */
		d: any | null;
		/**
		 * Sequence number of event used for [resuming sessions](https://discord.com/developers/docs/topics/gateway#resuming) and [heartbeating](https://discord.com/developers/docs/topics/gateway#sending-heartbeats)
		 */
		s: number | null;
		/**
		 * Event name
		 */
		t: string | null;
	} = JSON.parse(msg.toString()), opcode = opcodes[parsedMsg.op];

	if (opcode) opcode.bind(null, client)(parsedMsg.d, parsedMsg.s, parsedMsg.t);
	else console.log(`NEW OP: ${parsedMsg.op}`, inspect(parsedMsg, { colors: true, depth: Infinity }));
}) satisfies WsEvent<"message">
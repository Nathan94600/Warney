import { GatewayOpcodes } from "../utils/enums/others";
import { inspect } from "util";
import { readdir } from "fs";
import { WsEvent } from "../utils/types/others";

const opcodeNames: Record<number, string> = {}, opcodes: Record<string, unknown> = {}, opcodeKeys = Object.keys(GatewayOpcodes);

opcodeKeys.slice(0, opcodeKeys.length / 2).forEach((key, i) => {
	const value = opcodeKeys[opcodeKeys.length / 2 + i];	

	if (value) opcodeNames[parseInt(key)] = value
})

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
		d: unknown | null;
		/**
		 * Sequence number of event used for [resuming sessions](https://discord.com/developers/docs/topics/gateway#resuming) and [heartbeating](https://discord.com/developers/docs/topics/gateway#sending-heartbeats)
		 */
		s: number | null;
		/**
		 * Event name
		 */
		t: string | null;
	} = JSON.parse(msg.toString()), opcodeName = opcodeNames[parsedMsg.op];
	
	if (opcodeName) {
		const opcode = opcodes[opcodeName];

		if (typeof opcode == "function") opcode.bind(null, client)(parsedMsg.d, parsedMsg.s, parsedMsg.t);
		else console.log(`NEW OP: ${opcodeName} (${parsedMsg.op})`, inspect(parsedMsg, { colors: true, depth: Infinity }));
	} else console.log(`OPCODE NAME NOT FOUND: ${parsedMsg.op}`);
}) satisfies WsEvent<"message">
import { inspect } from "util";
import { GatewayOpcodes } from "../utils/enums/other";
import { Opcode } from "../utils/types";
import { readdir } from "fs";

const gatewayEvents: Record<string, any> = {};

readdir("./dist/gatewayEvents", (err, files) => {
	if (err) throw err;
	else files.forEach(file => {
		const fileName = file.split(".")[0];

		if (fileName) gatewayEvents[fileName] = require(`../gatewayEvents/${file}`).default;
	});
});

export default ((client, data, s, t) => {
	client.lastSeq = s;

	if (t) {
		const gatewayEvent = gatewayEvents[t];
	
		if (gatewayEvent) gatewayEvent.bind(null, client)(data);
		else console.log(`NEW GATEWAY EVENT: ${t}`, inspect(data, { colors: true, depth: Infinity }));
	}
}) satisfies Opcode<GatewayOpcodes.Dispatch>
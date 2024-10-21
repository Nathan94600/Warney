import { GatewayOpcodes } from "../utils/enums/other";
import { Opcode } from "../utils/types";

export default ((client, data) => {
	setInterval(() => {
		if (!client.rateLimits["gateway"] || client.rateLimits["gateway"].remaining >= 1 || client.rateLimits["gateway"].reset < Date.now()) {		
			client.ws.send(JSON.stringify({ op: 1, d: client.lastSeq }));

			if (!client.rateLimits["gateway"]) client.rateLimits["gateway"] = { bucket: "gateway", global: null, limit: 120, remaining: 119, reset: Date.now() + 60000, scope: null };
			else if (client.rateLimits["gateway"].reset < Date.now()) {
				client.rateLimits["gateway"].reset = Date.now() + 60000;
				client.rateLimits["gateway"].remaining = 119;
			} else client.rateLimits["gateway"].remaining--;
		}
	}, data?.heartbeat_interval);	
	
	if (!client.rateLimits["gateway"] || client.rateLimits["gateway"].remaining >= 1 || client.rateLimits["gateway"].reset < Date.now()) {		
		client.ws.send(JSON.stringify({ op: 2, d: { token: client.token, properties: { os: process.platform, browser: "mylib", device: "mylib" }, compress: false, large_threshold: 250, intents: 0 } }));

		if (!client.rateLimits["gateway"]) client.rateLimits["gateway"] = { bucket: "gateway", global: null, limit: 120, remaining: 119, reset: Date.now() + 60000, scope: null };
		else if (client.rateLimits["gateway"].reset < Date.now()) {
			client.rateLimits["gateway"].reset = Date.now() + 60000;
			client.rateLimits["gateway"].remaining = 119;
		} else client.rateLimits["gateway"].remaining--;
	}
}) satisfies Opcode<GatewayOpcodes.Hello>
import { inspect } from "util";
import { BASE_URL } from "./constants";
import { ApplicationFlags, RateLimitScopes, UserFlags } from "./enums/other";
import { Client, RateLimit, SessionStartLimit } from "./interfaces/other";
import { WebSocket } from "ws";
import { readdir } from "fs";

export function isRateLimitScope(scope: string): scope is RateLimitScopes { return scope == RateLimitScopes.Global || scope == RateLimitScopes.Shared || scope == RateLimitScopes.User; };

export function flagsToArray<Enum extends typeof ApplicationFlags | typeof UserFlags>(flags: number, flagsEnum: Enum): (keyof Enum)[] {
	const res: (keyof Enum)[] = [], values: (keyof Enum | number)[] = Object.values(flagsEnum)

	Object.values(flagsEnum).slice(Object.values(flagsEnum).length / 2).forEach((val, i) => {
		const key = values[i]
		if ((val & flags) == val && typeof key == "string") res.push(key)
	})

	return res
};

export function sendWebsocketMessage(client: Client, data: any) {
	const rateLimit = client.rateLimits["gateway"];

	if (!rateLimit || rateLimit.remaining >= 1 || rateLimit.reset < Date.now()) {
		client.ws.send(JSON.stringify(data));

		if (!rateLimit) client.rateLimits["gateway"] = {
			bucket: "gateway",
			global: null,
			limit: 120,
			remaining: 119,
			reset: Date.now() + 60000,
			scope: null
		};
		else if (rateLimit.reset < Date.now()) {
			rateLimit.reset = Date.now() + 60000;
			rateLimit.remaining = 119;
		} else if (rateLimit) rateLimit.remaining--;
	};
};

export function openDiscordWebSocketConnection(token: string, client?: Client) {
	fetch(`${BASE_URL}/gateway/bot`, { headers: { Authorization: `Bot ${token}` } }).then(res => res.json().then((json: {
		/**
		 * WSS URL that can be used for connecting to the Gateway
		 */
		url: string;
		/**
		 * Recommended number of [shards](https://discord.com/developers/docs/topics/gateway#sharding) to use when connecting
		 */
		shards: number;
		/**
		 * Information on the current session start limit
		 */
		session_start_limit: SessionStartLimit;
	} | Error) => {
		const bucket = res.headers.get("x-ratelimit-bucket"),
		limit = res.headers.get("x-ratelimit-limit"),
		remaining = res.headers.get("x-ratelimit-remaining"),
		reset = res.headers.get("x-ratelimit-reset"),
		global = res.headers.get("x-ratelimit-global"),
		scope = res.headers.get("x-ratelimit-scope"),
		rateLimits: Record<string, RateLimit> = {};
	
		if (bucket !== null && limit !== null && remaining !== null && reset !== null) rateLimits["/gateway/bot"] = {
			limit: parseInt(limit),
			remaining: parseInt(remaining),
			reset: parseFloat(reset),
			bucket,
			global,
			scope: scope && isRateLimitScope(scope) ? scope : null
		}
	
		if (res.status >= 400) throw inspect(json, { colors: true, depth: Infinity });
		else if ("url" in json) {
			if (!client) client = {
				rateLimits: rateLimits,
				cache: {
					guilds: {},
					users: {}
				},
				token: token,
				ws: new WebSocket(`${json.url}?v=10&encoding=json`),
				lastSeq: null
			};
			else {
				client.ws = new WebSocket(`${json.url}?v=10&encoding=json`);
				client.lastSeq = null;
			};
			
			client.rateLimits["session"] = {
				bucket: "session",
				global: null,
				limit: json.session_start_limit.total,
				remaining: json.session_start_limit.remaining,
				reset: json.session_start_limit.reset_after + Date.now(),
				scope: null
			};
	
			client.rateLimits["session5s"] = {
				bucket: "session5s",
				global: null,
				limit: json.session_start_limit.max_concurrency,
				remaining: json.session_start_limit.max_concurrency - 1,
				reset: 5000 + Date.now(),
				scope: null
			};
	
			readdir("./dist/wsEvents", (err, files) => {
				if (err) throw err;
				else files.forEach(file => {
					const fileName = file.split(".")[0];				
	
					if (fileName && client) client.ws.on(fileName, require(`../wsEvents/${file}`).default.bind(null, client));
				});
			});
		};
	}));
};
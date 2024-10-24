import { ApplicationFlags, RateLimitScopes, UserFlags } from "./enums/other";
import { Client } from "./interfaces/other";

export function isRateLimitScope(scope: string): scope is RateLimitScopes { return scope == RateLimitScopes.Global || scope == RateLimitScopes.Shared || scope == RateLimitScopes.User; };

export function flagsToArray<Enum extends typeof ApplicationFlags | typeof UserFlags>(flags: number, flagsEnum: Enum): (keyof Enum)[] {
	const res: (keyof Enum)[] = [], values: (keyof Enum | number)[] = Object.values(flagsEnum)

	Object.values(flagsEnum).slice(Object.values(flagsEnum).length / 2).forEach((val, i) => {
		const key = values[i]
		if ((val & flags) == val && typeof key == "string") res.push(key)
	})

	return res
}

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
import { ApplicationFlags, RateLimitScopes, UserFlags } from "./enums/other";

export function isRateLimitScope(scope: string): scope is RateLimitScopes { return scope == RateLimitScopes.Global || scope == RateLimitScopes.Shared || scope == RateLimitScopes.User; };

export function flagsToArray<Enum extends typeof ApplicationFlags | typeof UserFlags>(flags: number, flagsEnum: Enum): (keyof Enum)[] {
	const res: (keyof Enum)[] = [], values: (keyof Enum | number)[] = Object.values(flagsEnum)

	Object.values(flagsEnum).slice(Object.values(flagsEnum).length / 2).forEach((val, i) => {
		const key = values[i]
		if ((val & flags) == val && typeof key == "string") res.push(key)
	})

	return res
}
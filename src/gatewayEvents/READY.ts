import { UserFlags, ApplicationFlags } from "../utils/enums/flags";
import { GatewayEventNames } from "../utils/enums/other";
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from "../utils/enums/types";
import { flagsToArray, setGlobalApplicationCommands } from "../utils/functions";
import { GatewayEvent } from "../utils/types/other";

export default ((client, data) => {
	const apiUser = data.user;

	client.cache.users[apiUser.id] = {
		id: apiUser.id,
		username: apiUser.username,
		discriminator: apiUser.discriminator,
		globalName: apiUser.global_name,
		avatar: apiUser.avatar,
		mfaEnabled: apiUser.mfa_enabled,
		flags: [],
		publicFlags: []
	};

	client.cache.resumeGatewayUrl = data.resume_gateway_url;
	client.cache.sessionId = data.session_id;

	const user = client.cache.users[apiUser.id];

	if (user) {
		if (apiUser.bot !== undefined) user.bot = apiUser.bot;
		if (apiUser.system !== undefined) user.system = apiUser.system;
		if (apiUser.banner !== undefined) user.banner = apiUser.banner;
		if (apiUser.accent_color !== undefined) user.accentColor = apiUser.accent_color;
		if (apiUser.locale !== undefined) user.locale = apiUser.locale;
		if (apiUser.premium_type !== undefined) user.premiumType = apiUser.premium_type;
		if (apiUser.flags !== undefined) user.flags = flagsToArray(apiUser.flags, UserFlags);
		if (apiUser.public_flags !== undefined) user.publicFlags = flagsToArray(apiUser.public_flags, UserFlags);
		if (apiUser.avatar_decoration_data === null) user.avatarDecorationData = null;
		else if (apiUser.avatar_decoration_data !== undefined) user.avatarDecorationData = {
			asset: apiUser.avatar_decoration_data.asset,
			skuId: apiUser.avatar_decoration_data.sku_id
		};
	};

	client.cache.application = {
		id: data.application.id,
		flags: flagsToArray(data.application.flags, ApplicationFlags)
	};

	setGlobalApplicationCommands(client, [{
		name: "dice",
		description: "Roll a dice with a specified number of sides (6 by default)",
		type: ApplicationCommandTypes.ChatInput,
		options: [{
			name: "sides",
			description: "The number of sides on the dice",
			type: ApplicationCommandOptionTypes.Integer,
			minValue: 2
		}]
	}]);
}) satisfies GatewayEvent<GatewayEventNames.Ready>;
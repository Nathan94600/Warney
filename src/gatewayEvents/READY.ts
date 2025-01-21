import { readdir } from "fs";
import { ApplicationFlags } from "../utils/enums/flags";
import { GatewayEventNames } from "../utils/enums/other";
import { apiUserToUser, flagsToArray, setGlobalApplicationCommands } from "../utils/functions";
import { GatewayEvent } from "../utils/types/other";
import { Command } from "../utils/interfaces/other";

const commands: Command[] = [];

readdir("./dist/commands", (err, fileNames) => {
	if (err) throw err;
	else fileNames.forEach(fileName => {
		const command: Command | undefined = require(`../commands/${fileName}`)?.default

		if (command?.run) commands.push(command);
		else console.log(`src/commands/${fileName}: bad file export`);
	})
})

export default ((client, data) => {
	client.cache.users[data.user.id] = apiUserToUser(data.user);
	client.cache.resumeGatewayUrl = data.resume_gateway_url;
	client.cache.sessionId = data.session_id;

	client.cache.application = {
		id: data.application.id,
		flags: flagsToArray(data.application.flags, ApplicationFlags)
	};

	setGlobalApplicationCommands(client, commands);
}) satisfies GatewayEvent<GatewayEventNames.Ready>;
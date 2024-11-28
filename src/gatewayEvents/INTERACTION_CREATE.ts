import { readdir } from "fs";
import { GatewayEventNames } from "../utils/enums/other";
import { GatewayEvent } from "../utils/types/other";
import { InteractionTypes } from "../utils/enums/types";

const commands: Record<string, any> = {};

readdir("./dist/commands", (err, files) => {
	if (err) throw err;
	else files.forEach(file => {
		const fileName = file.split(".")[0];

		if (fileName) commands[fileName] = require(`../commands/${file}`).default;
	});
});

export default ((client, interaction) => {
	if (interaction.type == InteractionTypes.ApplicationCommand) {
		const command = commands[interaction.data.name];

		if (command) command(client, interaction);
		else console.log(`NEW COMMAND: ${interaction.data.name}`);
	} else console.log(`NEW INTERACTION TYPE: ${interaction.type}`);
}) satisfies GatewayEvent<GatewayEventNames.InteractionCreate>;
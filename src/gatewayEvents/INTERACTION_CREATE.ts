import { readdir } from "fs";
import { GatewayEventNames } from "../utils/enums/other";
import { GatewayEvent } from "../utils/types/other";
import { InteractionTypes } from "../utils/enums/types";
import { Command } from "../utils/interfaces/other";

const commands: Record<string, Command> = {};

readdir("./dist/commands", (err, fileNames) => {
	if (err) throw err;
	else fileNames.forEach(fileName => {
		const command: Command | undefined = require(`../commands/${fileName}`)?.default

		if (command?.run) commands[command.name] = command;
		else console.log(`src/commands/${fileName}: bad file export`);
	})
});

export default ((client, interaction) => {
	if (interaction.type == InteractionTypes.ApplicationCommand) {
		const command = commands[interaction.data.name]?.run;

		if (command) command(client, interaction);
		else console.log(`NEW COMMAND: ${interaction.data.name}`);
	} else console.log(`NEW INTERACTION TYPE: ${interaction.type}`);
}) satisfies GatewayEvent<GatewayEventNames.InteractionCreate>;
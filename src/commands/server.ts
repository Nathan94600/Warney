import { readdir } from "fs";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, InteractionCallbackTypes, InteractionContextTypes } from "../utils/enums/types";
import { Command, SubCommand } from "../utils/interfaces/others";
import { createInteractionResponse } from "../utils/functions/others";
import { MessageFlags } from "../utils/enums/flags";

const subCommands: Record<string, SubCommand> = {};

readdir("./dist/subCommands/server", (err, fileNames) => {
	if (err) throw err;
	else fileNames.forEach(fileName => {
		const subCommand: SubCommand | undefined = require(`../subCommands/server/${fileName}`)?.default

		if (subCommand?.run) subCommands[subCommand.name] = subCommand;
		else console.log(`src/subCommands/server/${fileName}: bad file export`);
	})
});

export default {
	name: "server",
	description: "Get information about multiple things in the server",
	type: ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "info",
			description: "Get information about the server",
			type: ApplicationCommandOptionTypes.SubCommand
		}
	],
	contexts: [InteractionContextTypes.Guild],
	run(client, interaction) {		
		const subCommandName = interaction.data.options?.find(option => option.type == ApplicationCommandOptionTypes.SubCommand)?.name, subCommand = subCommandName ? subCommands[subCommandName] : null;

		if (!subCommand) {
			if (subCommandName) console.log(`[src/commands/server.ts] NEW SUB COMMAND: ${subCommandName}`);

			createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Sub command not found", flags: [MessageFlags.Ephemeral] } })
		} else subCommand.run(client, interaction)
	}
} satisfies Command;
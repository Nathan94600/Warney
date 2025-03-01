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
		{ name: "info", description: "Get information about the server", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "owner", description: "Get information about the owner", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "features", description: "Get information about the features", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "presences", description: "Get information about the presences", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "members", description: "Get information about the members", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "roles", description: "Get information about the roles", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "emojis", description: "Get information about the emojis", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "stickers", description: "Get information about the stickers", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "stage_instances", description: "Get information about the stage instances", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "sound_board_sounds", description: "Get information about the sound board sounds", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "voice_states", description: "Get information about the voice states", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "system_channel_flags", description: "Get information about the system channel flags", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "scheduled_events", description: "Get information about the scheduled events", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "afk_channel", description: "Get information about the afk channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "public_updates_channel", description: "Get information about the public updates channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "rules_channel", description: "Get information about the rules channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "safety_alerts_channel", description: "Get information about the safety alerts channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "system_channel", description: "Get information about the system channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "widget_channel", description: "Get information about the widget channel", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "channels", description: "Get information about the channels", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "threads", description: "Get information about the threads", type: ApplicationCommandOptionTypes.SubCommand },
		{ name: "welcome_screen", description: "Get information about the welcome screen", type: ApplicationCommandOptionTypes.SubCommand },
	],
	contexts: [InteractionContextTypes.Guild],
	run(client, interaction) {		
		const subCommandName = interaction.data.options?.find(option => option.type == ApplicationCommandOptionTypes.SubCommand)?.name, subCommand = subCommandName ? subCommands[subCommandName] : null;

		if (!subCommand) {
			if (subCommandName) console.log(`[src/commands/server.ts] NEW SUB COMMAND: ${subCommandName}`);

			createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Subcommand not found", flags: [MessageFlags.Ephemeral] } })
		} else subCommand.run(client, interaction)
	}
} satisfies Command;
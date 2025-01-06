import { MessageFlags } from "../utils/enums/flags";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, InteractionCallbackTypes } from "../utils/enums/types";
import { createInteractionResponse } from "../utils/functions";
import { Command } from "../utils/interfaces/other";

export default {
	name: "dice",
	description: "Roll dice with a specified number of faces (6 by default)",
	type: ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "faces",
			description: "The number of faces on the dice (6 by default)",
			type: ApplicationCommandOptionTypes.Integer,
			minValue: 2,
			required: false
		},
		{
			name: "number_of_dice",
			description: "The number of dices rolled (1 by default)",
			type: ApplicationCommandOptionTypes.Integer,
			minValue: 1,
			maxValue: 25,
			required: false
		}
	],
	run(_client, interaction) {		
		const faces = interaction.data.options?.find(option => option.name == "faces")?.value || 6, numberOfDice = interaction.data.options?.find(option => option.name == "number_of_dice")?.value || 1;
	
		if (typeof faces == "boolean" || typeof faces == "string") createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `faces` setting, try again", flags: [MessageFlags.Ephemeral] } });
		else if (typeof numberOfDice == "boolean" || typeof numberOfDice == "string") createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `number of dice` setting, try again", flags: [MessageFlags.Ephemeral] }
		});
		else createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource,
			data: {
				embeds: [{
					fields: Array.from({ length: numberOfDice }, () => (Math.floor(Math.random() * faces) + 1)).map((result, i) => ({ name: `N°${i} :`, value: result.toString(), inline: true }))
				}]
			}
		});
	}
} satisfies Command;
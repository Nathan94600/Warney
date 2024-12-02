import { MessageFlags } from "../utils/enums/flags";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, InteractionCallbackTypes } from "../utils/enums/types";
import { createInteractionResponse } from "../utils/functions";
import { Command } from "../utils/interfaces/other";

export default {
	name: "dice",
	description: "Roll dice with a specified number of sides (6 by default)",
	type: ApplicationCommandTypes.ChatInput,
	options: [
		{
			name: "sides",
			description: "The number of sides on the dice (6 by default)",
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
		const sides = interaction.data.options?.find(option => option.name == "sides")?.value || 6, numberOfDice = interaction.data.options?.find(option => option.name == "number_of_dice")?.value || 1;
	
		if (typeof sides == "boolean" || typeof sides == "string") createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `sides` setting, try again", flags: [MessageFlags.Ephemeral] } });
		else if (typeof numberOfDice == "boolean" || typeof numberOfDice == "string") createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `number of dice` setting, try again", flags: [MessageFlags.Ephemeral] }
		});
		else createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource,
			data: {
				embeds: [{
					fields: Array.from({ length: numberOfDice }, () => (Math.floor(Math.random() * sides) + 1)).map((result, i) => ({ name: `N°${i} :`, value: result.toString(), inline: true }))
				}]
			}
		});
	}
} satisfies Command;
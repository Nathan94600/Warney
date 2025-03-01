import { inspect } from "util";
import { MessageFlags } from "../utils/enums/flags";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, InteractionCallbackTypes } from "../utils/enums/types";
import { createInteractionResponse } from "../utils/functions/others";
import { Command } from "../utils/interfaces/others";

export default {
	name: "roll",
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
		const facesOption = interaction.data.options?.find(option => option.name == "faces"), numberOfDiceOption = interaction.data.options?.find(option => option.name == "number_of_dice");

		if (facesOption && facesOption.type != ApplicationCommandOptionTypes.Integer) createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource,
			data: { content: "Problem with the `faces` option, try again", flags: [MessageFlags.Ephemeral] }
		});
		else if (numberOfDiceOption && numberOfDiceOption.type != ApplicationCommandOptionTypes.Integer) createInteractionResponse(interaction, {
			type: InteractionCallbackTypes.ChannelMessageWithSource,
			data: { content: "Problem with the `number_of_dice` option, try again", flags: [MessageFlags.Ephemeral] }
		});
		else {
			const faces = facesOption?.value || 6, numberOfDice = numberOfDiceOption?.value || 1;
	
			if (typeof faces == "boolean" || typeof faces == "string") createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `faces` setting, try again", flags: [MessageFlags.Ephemeral] } });
			else if (typeof numberOfDice == "boolean" || typeof numberOfDice == "string") createInteractionResponse(interaction, {
				type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the `number of dice` setting, try again", flags: [MessageFlags.Ephemeral] }
			});
			else createInteractionResponse(interaction, {
				type: InteractionCallbackTypes.ChannelMessageWithSource,
				data: {
					embeds: [{
						fields: Array.from({ length: numberOfDice }, () => (Math.floor(Math.random() * faces) + 1)).map((result, i) => ({ name: `N°${i + 1} :`, value: result.toString(), inline: true }))
					}]
				}
			}).catch(error => {
				createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });

				console.log(`[src/commands/roll.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
			});
		}
	}
} satisfies Command;
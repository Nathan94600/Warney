import { MessageFlags } from "../utils/enums/flags";
import { InteractionCallbackTypes } from "../utils/enums/types";
import { createInteractionResponse } from "../utils/functions";
import { Command } from "../utils/types/other";

export default ((_client, interaction) => {
	const sides = interaction.data.options?.[0]?.value || 6;

	if (typeof sides == "boolean" || typeof sides == "string") createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Problem with the sides setting, try again", flags: [MessageFlags.Ephemeral] } })
	else createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: `${Math.floor(Math.random() * sides) + 1} !` } });
}) satisfies Command;
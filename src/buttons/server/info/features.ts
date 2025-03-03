import { inspect } from "util";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { MessageFlags } from "../../../utils/enums/flags";
import { ButtonStyles } from "../../../utils/enums/others";
import { InteractionCallbackTypes, MessageComponentTypes } from "../../../utils/enums/types";
import { createInteractionResponse, getGuildFeatureLabel } from "../../../utils/functions/others";
import { Button } from "../../../utils/interfaces/others";
import { EmbedField } from "../../../utils/interfaces/emebds";

export default {
	run(client, interaction, authorId) {		
		const guildId = interaction.guild?.id
		
		if (!guildId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server id not found", flags: [MessageFlags.Ephemeral] } });
		else {
			const guild = client.cache.guilds.get(guildId);

			if (!guild) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server not found", flags: [MessageFlags.Ephemeral] } });
			else {
				const fields: EmbedField[] = [];				

				for (let i = 0; i < guild.features.length; i += 2) {
					const feature = guild.features[i], nextFeature = guild.features[i + 1];

					if (feature) fields.push({ name: getGuildFeatureLabel(feature), value: nextFeature ? getGuildFeatureLabel(nextFeature) : "\u200b", inline: true });
				};

				createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
					embeds: [{
						author: guild.icon ? { name: `Server features of ${guild.name} (${guild.id})`, iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}` } : { name: `Server features of ${guild.name} (${guild.id})` },
						fields
					}],
					components: [{
						type: MessageComponentTypes.ActionRow,
						components: [{
							type: MessageComponentTypes.Button,
							style: ButtonStyles.Primary,
							label: "Server",
							customId: `server_info_info-${authorId}`
						}]
					}]
				} }).catch(error => {
					createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });
	
					console.log(`[src/buttons/server/info/features.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
				});
			}
		};
	}
} satisfies Button;
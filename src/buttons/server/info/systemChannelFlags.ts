import { inspect } from "util";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { MessageFlags, SystemChannelFlags } from "../../../utils/enums/flags";
import { ButtonStyles } from "../../../utils/enums/others";
import { InteractionCallbackTypes, MessageComponentTypes } from "../../../utils/enums/types";
import { createInteractionResponse, flagsToArray, getSystemChannelFlagLabel } from "../../../utils/functions/others";
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
				const fields: EmbedField[] = [], systemChannelFlags = flagsToArray(guild.systemChannelFlags, SystemChannelFlags);
				
				console.log(systemChannelFlags, guild.systemChannelFlags);

				for (let i = 0; i < systemChannelFlags.length; i += 2) {
					const flag = systemChannelFlags[i], nextFlag = systemChannelFlags[i + 1];

					if (flag) fields.push({ name: getSystemChannelFlagLabel(flag), value: nextFlag ? getSystemChannelFlagLabel(nextFlag) : "\u200b", inline: true });
				};

				createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
					embeds: systemChannelFlags.length == 0 ? [{
						author: guild.icon ? {
							name: `System channel flags of ${guild.name} (${guild.id})`,
							iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}`
						} : { name: `System channel flags of ${guild.name} (${guild.id})` },
						description: "No system channel flags"
					}] : [{
						author: guild.icon ? {
							name: `System channel flags of ${guild.name} (${guild.id})`,
							iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}`
						} : { name: `System channel flags of ${guild.name} (${guild.id})` },
						fields
					}],
					components: [{
						type: MessageComponentTypes.ActionRow,
						components: [{
							type: MessageComponentTypes.Button,
							style: ButtonStyles.Primary,
							label: "Owner",
							customId: `server_info_info-${authorId}`
						}]
					}]
				} }).catch(error => {
					createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });
	
					console.log(`[src/buttons/server/info/systemChannelFlags.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
				});
			}
		};
	}
} satisfies Button;
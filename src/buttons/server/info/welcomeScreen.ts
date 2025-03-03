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

				if (guild.welcomeScreen) for (let i = 0; i < guild.welcomeScreen.welcomeChannels.length; i++) {
					const flag = systemChannelFlags[i], nextFlag = systemChannelFlags[i + 1];

					if (flag) fields.push({ name: getSystemChannelFlagLabel(flag), value: nextFlag ? getSystemChannelFlagLabel(nextFlag) : "\u200b", inline: true });
				};

				createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
					embeds: (guild.welcomeScreen && guild.welcomeScreen.welcomeChannels.length !== 0) ? [{
						author: guild.icon ? { name: `Welcome screen of ${guild.name} (${guild.id})`, iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}` } : { name: `Welcome screen of ${guild.name} (${guild.id})` },
						description: guild.welcomeScreen.description,
						fields: guild.welcomeScreen.welcomeChannels.map(channel => ({
							name: `<#${channel.channelId}>`,
							value: `${channel.emojiId ? `Emoji: <${channel.emojiName}:${channel.emojiId}>` : (channel.emojiName || "")}\n\n${channel.description}` || "\u200b",
							inline: true
						}))
					}] : [{
						author: guild.icon ? { name: `Welcome screen of ${guild.name} (${guild.id})`, iconUrl: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}` } : { name: `Welcome screen of ${guild.name} (${guild.id})` },
						description: "No welcome screen"
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
	
					console.log(`[src/buttons/server/info/welcomeScreen.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
				});
			}
		};
	}
} satisfies Button;
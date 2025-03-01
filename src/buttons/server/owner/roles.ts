import { IMAGE_BASE_URL } from "../../../utils/constants";
import { MessageFlags } from "../../../utils/enums/flags";
import { ButtonStyles } from "../../../utils/enums/others";
import { InteractionCallbackTypes, MessageComponentTypes } from "../../../utils/enums/types";
import { createInteractionResponse } from "../../../utils/functions/others";
import { EmbedField } from "../../../utils/interfaces/emebds";
import { Button } from "../../../utils/interfaces/others";

export default {
	run(client, interaction, authorId) {		
		const guildId = interaction.guild?.id
		
		if (!guildId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server id not found", flags: [MessageFlags.Ephemeral] } });
		else {
			const guildInCache = client.cache.guilds.get(guildId);

			if (!guildInCache) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server not found", flags: [MessageFlags.Ephemeral] } });
			else {
				const ownerId = guildInCache.ownerId, owner = guildInCache.members.get(ownerId), ownerRoles = owner?.roles;

				if (!owner) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Owner not found", flags: [MessageFlags.Ephemeral] } });
				else if (!ownerRoles) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Owner roles not found", flags: [MessageFlags.Ephemeral] } });
				else {
					const fields: EmbedField[][] = [];

					for (let i = 0; i < ownerRoles.length; i += 2) {
						const embedIndex = ~~(i / 25), role = ownerRoles[i], nextRole = ownerRoles[i + 1];

						if (role) {
							if (!fields[embedIndex]) fields[embedIndex] = [];

							fields[embedIndex].push({ name: "\u200b", value: `<@&${role}>${nextRole ? `<@&${nextRole}>` : ""}`, inline: true });
						};
					};

					createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
						embeds: fields.length == 0 ? [{
							author: {
								name: `Roles of ${owner.nick || owner.user.globalName} (${ownerId})`,
								iconUrl: owner.avatar ? `${IMAGE_BASE_URL}/guilds/${guildId}/users/${ownerId}/avatars/${owner.avatar}.${owner.avatar.startsWith("_a") ? "gif" : "webp"}` :
								owner.user.avatar ? `${IMAGE_BASE_URL}/avatars/${ownerId}/${owner.user.avatar}.${owner.user.avatar.startsWith("_a") ? "gif" : "webp"}` :
								`${IMAGE_BASE_URL}/embed/avatars/${owner.user.discriminator != "0" ? BigInt(owner.user.discriminator) % 5n : (BigInt(ownerId) >> 22n) % 6n}.png` 
							},
							fields: [{ name: "No roles", value: "\u200b" }]
						}] : fields.map((fields, index) => index == 0 ? {
							author: {
								name: `Roles of ${owner.nick || owner.user.globalName} (${ownerId})`,
								iconUrl: owner.avatar ? `${IMAGE_BASE_URL}/guilds/${guildId}/users/${ownerId}/avatars/${owner.avatar}.${owner.avatar.startsWith("_a") ? "gif" : "webp"}` :
								owner.user.avatar ? `${IMAGE_BASE_URL}/avatars/${ownerId}/${owner.user.avatar}.${owner.user.avatar.startsWith("_a") ? "gif" : "webp"}` :
								`${IMAGE_BASE_URL}/embed/avatars/${owner.user.discriminator != "0" ? BigInt(owner.user.discriminator) % 5n : (BigInt(ownerId) >> 22n) % 6n}.png` 
							},
							fields
						} : { fields }),
						components: [{
							type: MessageComponentTypes.ActionRow,
							components: [{
								type: MessageComponentTypes.Button,
								style: ButtonStyles.Primary,
								label: "Owner",
								customId: `server_owner_owner-${authorId}`
							}]
						}]
					} }).catch(error => console.error(error, error.errors.data.embeds["0"]));
				};
			};
		};
	}
} satisfies Button;
import { inspect } from "util";
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
				const ownerId = guildInCache.ownerId, owner = guildInCache.members.get(ownerId), ownerFlags = owner?.user.flags;

				if (!owner) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Owner not found", flags: [MessageFlags.Ephemeral] } });
				else if (!ownerFlags) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Owner user flags not found", flags: [MessageFlags.Ephemeral] } });
				else {
					const fields: EmbedField[] = [];

					for (let i = 0; i < ownerFlags.length; i += 2) {
						const flags = ownerFlags[i], nextFlags = ownerFlags[i + 1];

						if (flags) fields.push({ name: flags, value: nextFlags || "\u200b", inline: true });
					};

					createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
						embeds: [{
							author: {
								name: `User flags of ${owner.nick || owner.user.globalName} (${ownerId})`,
								iconUrl: owner.avatar ? `${IMAGE_BASE_URL}/guilds/${guildId}/users/${ownerId}/avatars/${owner.avatar}.${owner.avatar.startsWith("_a") ? "gif" : "webp"}` :
								owner.user.avatar ? `${IMAGE_BASE_URL}/avatars/${ownerId}/${owner.user.avatar}.${owner.user.avatar.startsWith("_a") ? "gif" : "webp"}` :
								`${IMAGE_BASE_URL}/embed/avatars/${owner.user.discriminator != "0" ? BigInt(owner.user.discriminator) % 5n : (BigInt(ownerId) >> 22n) % 6n}.png` 
							},
							fields: fields.length == 0 ? [{ name: "No user flags", value: "\u200b" }] : fields
						}],
						components: [{
							type: MessageComponentTypes.ActionRow,
							components: [{
								type: MessageComponentTypes.Button,
								style: ButtonStyles.Primary,
								label: "Owner",
								customId: `server_owner_owner-${authorId}`
							}]
						}]
					} }).catch(error => {
						createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });

						console.log(`[src/buttons/server/owner/userFlags.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
					});
				}
			}
		};
	}
} satisfies Button;
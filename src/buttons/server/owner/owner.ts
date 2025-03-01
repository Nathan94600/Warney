import { inspect } from "util";
import { IMAGE_BASE_URL, DISCORD_EPOCH_IN_SECONDS } from "../../../utils/constants";
import { MessageFlags } from "../../../utils/enums/flags";
import { ButtonStyles } from "../../../utils/enums/others";
import { InteractionCallbackTypes, MessageComponentTypes } from "../../../utils/enums/types";
import { createInteractionResponse, getPermissionLabels, getPremiumTypeLabel } from "../../../utils/functions/others";
import { Button } from "../../../utils/interfaces/others";

export default {
	run(client, interaction, authorId) {		
		const guildId = interaction.guild?.id || interaction.guild_id, guild = client.cache.guilds.get(guildId || ""), owner = guild?.members.get(authorId);

		if (!guildId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "You must be in a server", flags: [MessageFlags.Ephemeral] } });
		else if (!guild) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Server not found", flags: [MessageFlags.Ephemeral] } });
		else if (!owner) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Owner not found", flags: [MessageFlags.Ephemeral] } });
		else {
			const ownerId = owner.user.id,
			userAvatar = owner.user.avatar ? `${IMAGE_BASE_URL}/avatars/${ownerId}/${owner.user.avatar}.${owner.user.avatar.startsWith("_a") ? "gif" : "webp"}` :
			`${IMAGE_BASE_URL}/embed/avatars/${owner.user.discriminator != "0" ? BigInt(owner.user.discriminator) % 5n : (BigInt(ownerId) >> 22n) % 6n}.png`,
			ownerIcon = owner.avatar ? `${IMAGE_BASE_URL}/guilds/${guild.id}/users/${ownerId}/avatars/${owner.avatar}.${owner.avatar.startsWith("_a") ? "gif" : "webp"}` : userAvatar,
			numberOfPermissions = owner.permissions ? getPermissionLabels(owner.permissions).length : 0,
			numberOfMemberFlags = owner.flags ? owner.flags.length : 0,
			numberOfUserFlags = owner.user.flags ? owner.user.flags.length : 0,
			numberOfUserPublicFlags = owner.user.publicFlags ? owner.user.publicFlags.length : 0
			
			createInteractionResponse(interaction, { type: InteractionCallbackTypes.UpdateMessage, data: {
				embeds: [{
					author: { name: `${owner.nick || owner.user.globalName || owner.user.username} (${ownerId})`, iconUrl: ownerIcon },
					...(owner.user.banner ? { image: { url: `${IMAGE_BASE_URL}/banners/${ownerId}/${owner.user.banner}.${owner.user.banner.startsWith("_a") ? "gif" : "webp"}` } } : {}),
					fields: [
						{ name: "Avatar decoration for the server", value: owner.avatarDecorationData ? `Asset: ${owner.avatarDecorationData.asset}\nSku ID: ${owner.avatarDecorationData.skuId}` : "No avatar decoration", inline: true },
						{ name: "Avatar URL for the server", value: owner.avatar ? `${IMAGE_BASE_URL}/guilds/${guild.id}/users/${ownerId}/avatars/${owner.avatar}.${owner.avatar.startsWith("_a") ? "gif" : "webp"}` : "No avatar", inline: true },
						{ name: "Communication disabled until", value: owner.communicationDisabledUntil ? `<t:${new Date(owner.communicationDisabledUntil).getTime().toString().slice(0, -3)}:F>` : "Not timed out", inline: true },
						{ name: "Deaf", value: `${owner.deaf ? "Yes" : "No"}`, inline: true },
						{ name: "Mute", value: `${owner.mute ? "Yes" : "No"}`, inline: true },
						{ name: "Joined the", value: `<t:${new Date(owner.joinedAt).getTime().toString().slice(0, -3)}:F>`, inline: true },
						{ name: "Nickname", value: `${owner.nick?.replace(/[`|()\\\/_~\[\].\-\*>#]/g, str => `\\${str}`) || "\`None\`"}`, inline: true },
						{ name: "Pending", value: `${typeof owner.pending == "boolean" ? owner.pending ? "Yes" : "No" : "Unknown"}`, inline: true },
						{ name: "Premium since", value: owner.premiumSince ? `<t:${new Date(owner.premiumSince).getTime().toString().slice(0, -3)}:F>` : "Unknown", inline: true },
						{ name: "User banner color (in hexadecimal)", value: typeof owner.user.accentColor == "number" ? `#${owner.user.accentColor.toString(16)}` : "Unknown", inline: true },
						{ name: "Avatar URL", value: `${userAvatar}`, inline: true },
						{ name: "Avatar decoration", value: owner.avatarDecorationData ? `Asset: ${owner.avatarDecorationData.asset}\nSku ID: ${owner.avatarDecorationData.skuId}` : "No avatar decoration", inline: true },
						{ name: "Is a bot", value: `${typeof owner.user.bot == "boolean" ? owner.user.bot ? "Yes" : "No" : "Unknown"}`, inline: true },
						{ name: "Username", value: `${owner.user.username.replace(/[`|()\\\/_~\[\].\-\*>#]/g, str => `\\${str}`)}${owner.user.discriminator == "0" ? "" : `#${owner.user.discriminator}`}`, inline: true },
						{ name: "Global name", value: `${(owner.user.globalName || owner.user.username).replace(/[`|()\\\/_~\[\].\-\*>#]/g, str => `\\${str}`)}`, inline: true },
						{ name: "User language", value: owner.user.locale || "Unknown", inline: true },
						{ name: "Premium type", value: owner.user.premiumType ? getPremiumTypeLabel(owner.user.premiumType) : "Unknown", inline: true },
						{ name: "Created the", value: `<t:${parseInt(parseInt(ownerId.slice(0, -3)).toString(2).slice(0, -22), 2) + DISCORD_EPOCH_IN_SECONDS}:F>`, inline: true },
						{ name: "Official Discord System user (part of the urgent message system)", value: `${owner.user.system ? "Yes" : "No"}`, inline: true },
					]
				}],
				components: [{
					type: MessageComponentTypes.ActionRow,
					components: [
						{ type: MessageComponentTypes.Button, label: `Roles (${owner.roles.length})`, customId: `server_owner_roles-${authorId}`, style: ButtonStyles.Primary, disabled: owner.roles.length == 0 },
						{ type: MessageComponentTypes.Button, label: `Permissions (${numberOfPermissions})`, customId: `server_owner_permissions-${authorId}`, style: ButtonStyles.Primary, disabled: numberOfPermissions == 0 },
						{ type: MessageComponentTypes.Button, label: `Member flags (${numberOfMemberFlags})`, customId: `server_owner_flags-${authorId}`, style: ButtonStyles.Primary, disabled: numberOfMemberFlags == 0 },
						{ type: MessageComponentTypes.Button, label: `User flags (${numberOfUserFlags})`, customId: `server_owner_userFlags-${authorId}`, style: ButtonStyles.Primary, disabled: numberOfUserFlags == 0 },
						{ type: MessageComponentTypes.Button, label: `User public flags (${numberOfUserPublicFlags})`, customId: `server_owner_publicFlags-${authorId}`, style: ButtonStyles.Primary, disabled: numberOfUserPublicFlags == 0 }
					]
				}]
			} }).catch(error => {
				createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "An error occurred", flags: [MessageFlags.Ephemeral] } });

				console.log(`[src/buttons/server/owner/owner.ts] ${inspect(error, { depth: Infinity, colors: true, compact: false })}`);
			});
		};
	}
} satisfies Button;
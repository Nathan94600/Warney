import { readdir, lstat } from "fs";
import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { InteractionCallbackTypes, InteractionTypes, MessageComponentTypes } from "../../utils/enums/types";
import { Button, Command } from "../../utils/interfaces/others";
import { apiUserToUser, apiGuildMemberToGuildMember } from "../../utils/functions/apiTransformers";
import { createInteractionResponse } from "../../utils/functions/others";
import { MessageFlags } from "../../utils/enums/flags";

const commands: Record<string, Command> = {}, buttons: Record<string, Button> = {};

readdir("./dist/commands", (err, fileNames) => {
	if (err) throw err;
	else fileNames.forEach(fileName => {
		const command: Command | undefined = require(`../../commands/${fileName}`)?.default

		if (command?.run) commands[command.name] = command;
		else console.log(`src/commands/${fileName}: bad file export`);
	})
});

function readButtons(path: string, defaultPath: string = path) {
	readdir(path, (err, fileNames) => {
		if (err) throw err;
		else fileNames.forEach(fileName => {
			lstat(`${path}/${fileName}`, (err, stats) => {
				if (err) throw err;
				else if (stats.isDirectory()) readButtons(`${path}/${fileName}`, defaultPath);
				else {
					const button: Button | undefined = require(`../.${path.replace("/dist", "")}/${fileName}`)?.default

					if (button?.run) buttons[`${path.replace(`${defaultPath}/`, "")}/${fileName.split(".")[0]}`] = button;
					else console.log(`src/buttons/${fileName}: bad file export`);
				};
			});
		});
	});
};

readButtons("./dist/buttons");

export default ((client, interaction) => {
	const interactionAuthorId = interaction.member?.user.id || interaction.user?.id;

	if (interaction.user) client.cache.users.set(interaction.user.id, { ...client.cache.users.get(interaction.user.id), ...apiUserToUser(interaction.user)	});

	if (interaction.member) {
		const guildId = interaction.guild?.id || interaction.guild_id;

		if (guildId) {
			const guildInCache = client.cache.guilds.get(guildId), member = guildInCache?.members.get(interaction.member.user.id);

			if (guildInCache && member) guildInCache.members.set(interaction.member.user.id, { ...member, ...apiGuildMemberToGuildMember(interaction.member) });
		};

		client.cache.users.set(interaction.member.user.id, { ...client.cache.users.get(interaction.member.user.id), ...apiUserToUser(interaction.member.user)	});
	};

	switch (interaction.type) {
		case InteractionTypes.ApplicationCommand:
			const command = commands[interaction.data.name]?.run;

			if (command) command(client, interaction);
			else console.log(`NEW COMMAND: ${interaction.data.name}`);
			break;
		case InteractionTypes.MessageComponent:
			switch (interaction.data.component_type) {
				case MessageComponentTypes.Button:
					const [path, authorId] = interaction.data.custom_id.split("-");

					if (!path) {

					} else if (!authorId || !interactionAuthorId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Author ID not found", flags: [MessageFlags.Ephemeral] } });
					else if (authorId != interactionAuthorId) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "You are not the author of this command", flags: [MessageFlags.Ephemeral] } });
					else {
						const [commandName, subCommandName, buttonName] = path.split("_");

						if (!commandName) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Command name not found", flags: [MessageFlags.Ephemeral] } });
						else if (!subCommandName) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Subcommand not found", flags: [MessageFlags.Ephemeral] } });
						else if (!buttonName) createInteractionResponse(interaction, { type: InteractionCallbackTypes.ChannelMessageWithSource, data: { content: "Button name not found", flags: [MessageFlags.Ephemeral] } });
						else {
							const button = buttons[path.replaceAll("_", "/")]?.run;							

							if (button) button(client, interaction, authorId);
							else console.log(`[src/gatewayEvents/others/INTERACTION_CREATE.ts] NEW BUTTON: ${path}`);
						};
					};
					break;
				default:
					console.log(`[src/gatewayEvents/others/INTERACTION_CREATE.ts] NEW MESSAGE COMPONENT TYPE: ${interaction.data.component_type}`);
					break;
			};
			break;
		default:
			console.log(`[src/gatewayEvents/others/INTERACTION_CREATE.ts] NEW INTERACTION TYPE: ${interaction.type}`);
			break;
	};
}) satisfies GatewayEvent<GatewayEventNames.InteractionCreate>;
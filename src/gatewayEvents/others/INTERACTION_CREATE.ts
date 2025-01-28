import { readdir } from "fs";
import { GatewayEventNames } from "../../utils/enums/others";
import { GatewayEvent } from "../../utils/types/others";
import { InteractionTypes } from "../../utils/enums/types";
import { Command } from "../../utils/interfaces/others";
import { apiUserToUser, apiGuildToGuild, apiGuildMemberToGuildMember } from "../../utils/functions/apiTransformers";

const commands: Record<string, Command> = {};

readdir("./dist/commands", (err, fileNames) => {
	if (err) throw err;
	else fileNames.forEach(fileName => {
		const command: Command | undefined = require(`../../commands/${fileName}`)?.default

		if (command?.run) commands[command.name] = command;
		else console.log(`src/commands/${fileName}: bad file export`);
	})
});

export default ((client, interaction) => {
	if (interaction.guild) {
		const guild = interaction.guild, guildInCache = client.cache.guilds.get(guild.id);
		
		if (guildInCache) client.cache.guilds.set(guild.id, { ...guildInCache, ...apiGuildToGuild(interaction.guild) });
	};

	if (interaction.user) client.cache.users.set(interaction.user.id, { ...client.cache.users.get(interaction.user.id), ...apiUserToUser(interaction.user)	});

	if (interaction.member) {
		const guildId = interaction.guild?.id || interaction.guild_id;

		if (guildId) {
			const guildInCache = client.cache.guilds.get(guildId), member = guildInCache?.members.get(interaction.member.user.id);

			if (guildInCache && member) guildInCache.members.set(interaction.member.user.id, { ...member, ...apiGuildMemberToGuildMember(interaction.member) });
		};

		client.cache.users.set(interaction.member.user.id, { ...client.cache.users.get(interaction.member.user.id), ...apiUserToUser(interaction.member.user)	});
	};

	if (interaction.type == InteractionTypes.ApplicationCommand) {
		const command = commands[interaction.data.name]?.run;

		if (command) command(client, interaction);
		else console.log(`NEW COMMAND: ${interaction.data.name}`);
	} else console.log(`NEW INTERACTION TYPE: ${interaction.type}`);
}) satisfies GatewayEvent<GatewayEventNames.InteractionCreate>;
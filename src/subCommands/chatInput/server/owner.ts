import {ChatInputSubcommand} from "../../../utils/interfaces";
import {inspect} from "util";
import {guildMemberToInteractionResponse} from "../../../utils/functions";

export default {
  name: "owner",
  run(interaction) {
    const guildId = interaction.guild?.id ?? interaction.guildId,
      guild = interaction.client.guilds.cache.get(guildId ?? ""),
      owner = guild?.members.cache.get(guild?.ownerId ?? ""),
      authorId = (interaction.member?.user ?? interaction.user)?.id;

    if (!interaction.inGuild())
      interaction.reply({
        content: "You must be in a server",
        flags: ["Ephemeral"],
      });
    else if (!guild)
      interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
    else if (!owner)
      interaction.reply({content: "Owner not found", flags: ["Ephemeral"]});
    else
      interaction
        .reply(guildMemberToInteractionResponse(owner, authorId))
        .catch((error) => {
          interaction.reply({
            content: "An error occurred",
            flags: ["Ephemeral"],
          });

          console.log(
            `[src/subCommands/owner.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
          );
        });
  },
} satisfies ChatInputSubcommand;

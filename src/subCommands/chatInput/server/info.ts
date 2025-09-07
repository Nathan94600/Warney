import {ChatInputSubcommand} from "../../../utils/interfaces";
import {inspect} from "util";
import {guildToInteractionResponse} from "../../../utils/functions";

export default {
  name: "info",
  async run(interaction) {
    const guildId = interaction.guild?.id ?? interaction.guildId,
      guild = interaction.client.guilds.cache.get(guildId ?? ""),
      authorId = interaction.user.id;

    if (!guildId)
      interaction.reply({
        content: "You must be in a server",
        flags: ["Ephemeral"],
      });
    else if (!guild)
      interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
    else {
      interaction
        .reply(await guildToInteractionResponse(guild, authorId))
        .catch((error) => {
          interaction.reply({
            content: "An error occurred",
            flags: ["Ephemeral"],
          });

          console.log(
            `[src/subCommands/info.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
          );
        });
    }
  },
} satisfies ChatInputSubcommand;

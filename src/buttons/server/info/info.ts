import {Button} from "../../../utils/interfaces";
import {
  formatError,
  guildToInteractionResponse,
} from "../../../utils/functions";

export default {
  run(interaction, authorId) {
    if (!interaction.inGuild())
      interaction
        .reply({content: "Server id not found", flags: ["Ephemeral"]})
        .catch((err) =>
          console.log(
            `[src/buttons/server/info/info.ts - guild] ${formatError(err)}`,
          ),
        );
    else
      interaction.client.guilds
        .fetch(interaction.guildId)
        .then(async (guild) => {
          interaction
            .update(await guildToInteractionResponse(guild, authorId))
            .catch((err) => {
              interaction
                .reply({content: "An error occurred", flags: ["Ephemeral"]})
                .catch((err) =>
                  console.log(
                    `[src/buttons/server/info/info.ts - update catch] ${formatError(err)}`,
                  ),
                );

              console.log(
                `[src/buttons/server/info/info.ts - update] ${formatError(err)}`,
              );
            });
        })
        .catch((err) => {
          console.log(
            `[src/buttons/server/info/info.ts - fetch] ${formatError(err)}`,
          );

          interaction
            .reply({content: "Server not found", flags: ["Ephemeral"]})
            .catch((err) =>
              console.log(
                `[src/buttons/server/info/info.ts - fetch catch] ${formatError(err)}`,
              ),
            );
        });
  },
} satisfies Button;

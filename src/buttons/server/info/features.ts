import {Button} from "../../../utils/interfaces";
import {ButtonStyle, ComponentType, EmbedField} from "discord.js";
import {formatError} from "../../../utils/functions";

export default {
  run(interaction, authorId) {
    if (!interaction.inGuild())
      interaction
        .reply({content: "You must be in a server", flags: ["Ephemeral"]})
        .catch((err) =>
          console.log(
            `[src/buttons/server/info/features.ts - guild] ${formatError(err)}`,
          ),
        );
    else
      interaction.client.guilds
        .fetch(interaction.guildId)
        .then((guild) => {
          const fields: EmbedField[] = [],
            guildIconURL = guild.iconURL();

          for (let i = 0; i < guild.features.length; i += 2) {
            const feature = guild.features[i];

            if (feature)
              fields.push({
                name: feature,
                value: guild.features[i + 1] ?? "\u200b",
                inline: true,
              });
          }

          interaction
            .update({
              embeds: [
                {
                  author: guildIconURL
                    ? {
                        name: `Server features of ${guild.name} (${guild.id})`,
                        icon_url: guildIconURL,
                      }
                    : {name: `Server features of ${guild.name} (${guild.id})`},
                  fields,
                },
              ],
              components: [
                {
                  type: ComponentType.ActionRow,
                  components: [
                    {
                      type: ComponentType.Button,
                      style: ButtonStyle.Primary,
                      label: "Server",
                      customId: `server_info_info-${authorId}`,
                    },
                  ],
                },
              ],
            })
            .catch((err) => {
              interaction
                .reply({content: "An error occurred", flags: ["Ephemeral"]})
                .catch((err) =>
                  console.log(
                    `[src/buttons/server/info/features.ts - update catch] ${formatError(err)}`,
                  ),
                );

              console.log(
                `[src/buttons/server/info/features.ts - update] ${formatError(err)}`,
              );
            });
        })
        .catch((err) => {
          console.log(
            `[src/buttons/server/info/features.ts - fetch] ${formatError(err)}`,
          );

          interaction
            .reply({content: "Server not found", flags: ["Ephemeral"]})
            .catch((err) =>
              console.log(
                `[src/buttons/server/info/features.ts - fetch catch] ${formatError(err)}`,
              ),
            );
        });
  },
} satisfies Button;

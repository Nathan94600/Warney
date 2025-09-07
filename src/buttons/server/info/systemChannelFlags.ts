import {inspect} from "util";
import {IMAGE_BASE_URL} from "../../../utils/constants";
import {Button} from "../../../utils/interfaces";
import {ButtonStyle, ComponentType, EmbedField} from "discord.js";

export default {
  run(interaction, authorId) {
    if (!interaction.inGuild())
      interaction
        .reply({content: "Server id not found", flags: ["Ephemeral"]})
        .catch((reason) =>
          console.log(
            `[src/buttons/server/info/systemChannelFlags.ts - guild] ${inspect(reason, {depth: Infinity, colors: true, compact: false})}`,
          ),
        );

    const guildId = interaction.guild?.id;

    if (!guildId)
      interaction.reply({content: "Server id not found", flags: ["Ephemeral"]});
    else {
      const guild = interaction.client.guilds.cache.get(guildId);

      if (!guild)
        interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
      else {
        const fields: EmbedField[] = [],
          systemChannelFlags = guild.systemChannelFlags.toArray();

        for (let i = 0; i < systemChannelFlags.length; i += 2) {
          const flag = systemChannelFlags[i];

          if (flag)
            fields.push({
              name: flag,
              value: systemChannelFlags[i + 1] ?? "\u200b",
              inline: true,
            });
        }

        interaction
          .update({
            embeds: [
              {
                author: guild.icon
                  ? {
                      name: `System channel flags of ${guild.name} (${guild.id})`,
                      icon_url: `${IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("_a") ? "gif" : "webp"}`,
                    }
                  : {
                      name: `System channel flags of ${guild.name} (${guild.id})`,
                    },
                ...(systemChannelFlags.length == 0
                  ? {description: "No system channel flags"}
                  : {fields}),
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
          .catch((error) => {
            interaction.reply({
              content: "An error occurred",
              flags: ["Ephemeral"],
            });

            console.log(
              `[src/buttons/server/info/systemChannelFlags.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
            );
          });
      }
    }
  },
} satisfies Button;

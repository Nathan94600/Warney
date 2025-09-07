import {inspect} from "util";
import {Button} from "../../../utils/interfaces";
import {ButtonStyle, ComponentType, EmbedField} from "discord.js";

export default {
  async run(interaction, authorId) {
    const guildId = interaction.guild?.id;

    if (!guildId)
      interaction.reply({content: "Server id not found", flags: ["Ephemeral"]});
    else {
      const guild = interaction.client.guilds.cache.get(guildId);

      if (!guild)
        interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
      else {
        const fields: EmbedField[] = [],
          systemChannelFlags = guild.systemChannelFlags.toArray(),
          welcomeScreen = await guild.fetchWelcomeScreen();

        console.log(systemChannelFlags, guild.systemChannelFlags);

        if (welcomeScreen)
          for (let i = 0; i < welcomeScreen.welcomeChannels.size; i++) {
            const flag = systemChannelFlags[i];

            if (flag)
              fields.push({
                name: flag,
                value: systemChannelFlags[i + 1] ?? "\u200b",
                inline: true,
              });
          }

        const guildIconURL = guild.iconURL();

        interaction
          .update({
            embeds: [
              {
                author: guildIconURL
                  ? {
                      name: `Welcome screen of ${guild.name} (${guild.id})`,
                      icon_url: guildIconURL,
                    }
                  : {name: `Welcome screen of ${guild.name} (${guild.id})`},
                ...(welcomeScreen && welcomeScreen.welcomeChannels.size !== 0
                  ? {
                      description:
                        welcomeScreen.description ?? "`No description`",
                      fields: welcomeScreen.welcomeChannels.map((channel) => ({
                        name: `<#${channel.channelId}>`,
                        value: `${channel.emoji.toString()}\n\n${channel.description}`,
                        inline: true,
                      })),
                    }
                  : {description: "No welcome screen"}),
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
              `[src/buttons/server/info/welcomeScreen.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
            );
          });
      }
    }
  },
} satisfies Button;

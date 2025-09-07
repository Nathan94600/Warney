import {inspect} from "util";
import {Button} from "../../../utils/interfaces";
import {ButtonStyle, ComponentType, EmbedField} from "discord.js";

export default {
  async run(interaction, authorId) {
    const guildId = interaction.guildId;

    if (!guildId)
      interaction.reply({content: "Server id not found", flags: ["Ephemeral"]});
    else {
      const guildInCache = await interaction.client.guilds.fetch(guildId);

      if (!guildInCache)
        interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
      else {
        const ownerId = guildInCache.ownerId,
          owner = await guildInCache.members.fetch(ownerId),
          ownerFlags = owner.flags.toArray();

        if (!owner)
          interaction.reply({content: "Owner not found", flags: ["Ephemeral"]});
        else {
          const fields: EmbedField[] = [];

          for (let i = 0; i < ownerFlags.length; i += 2) {
            const flags = ownerFlags[i],
              nextFlags = ownerFlags[i + 1];

            if (flags)
              fields.push({
                name: flags,
                value: nextFlags ?? "\u200b",
                inline: true,
              });
          }

          interaction
            .update({
              embeds: [
                {
                  author: {
                    name: `Flags of ${owner.displayName} (${ownerId})`,
                    icon_url: owner.displayAvatarURL(),
                  },
                  fields:
                    fields.length == 0
                      ? [{name: "No flags", value: "\u200b"}]
                      : fields,
                },
              ],
              components: [
                {
                  type: ComponentType.ActionRow,
                  components: [
                    {
                      type: ComponentType.Button,
                      style: ButtonStyle.Primary,
                      label: "Owner",
                      customId: `server_owner_owner-${authorId}`,
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
                `[src/buttons/server/owner/flags.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
              );
            });
        }
      }
    }
  },
} satisfies Button;

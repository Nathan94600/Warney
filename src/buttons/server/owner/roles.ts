import {inspect} from "util";
import {Button} from "../../../utils/interfaces";
import {ButtonStyle, ComponentType, EmbedField} from "discord.js";

export default {
  run(interaction, authorId) {
    const guildId = interaction.guild?.id;

    if (!guildId)
      interaction.reply({content: "Server id not found", flags: ["Ephemeral"]});
    else {
      const guildInCache = interaction.client.guilds.cache.get(guildId);

      if (!guildInCache)
        interaction.reply({content: "Server not found", flags: ["Ephemeral"]});
      else {
        const ownerId = guildInCache.ownerId,
          owner = guildInCache.members.cache.get(ownerId),
          ownerRoles = owner?.roles.cache.toJSON();

        if (!owner)
          interaction.reply({content: "Owner not found", flags: ["Ephemeral"]});
        else if (!ownerRoles)
          interaction.reply({
            content: "Owner roles not found",
            flags: ["Ephemeral"],
          });
        else {
          const fields: EmbedField[][] = [];

          for (let i = 0; i < ownerRoles.length; i += 2) {
            const embedIndex = ~~(i / 25),
              role = ownerRoles[i],
              nextRole = ownerRoles[i + 1];

            if (role) {
              fields[embedIndex] ??= [];

              fields[embedIndex].push({
                name: "\u200b",
                value: `<@&${role}>${nextRole ? `<@&${nextRole}>` : ""}`,
                inline: true,
              });
            }
          }

          interaction
            .update({
              embeds:
                fields.length == 0
                  ? [
                      {
                        author: {
                          name: `Roles of ${owner.displayName} (${ownerId})`,
                          icon_url: owner.displayAvatarURL(),
                        },
                        fields: [{name: "No roles", value: "\u200b"}],
                      },
                    ]
                  : fields.map((fields, index) =>
                      index == 0
                        ? {
                            author: {
                              name: `Roles of ${owner.displayName} (${ownerId})`,
                              icon_url: owner.displayAvatarURL(),
                            },
                            fields,
                          }
                        : {fields},
                    ),
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
                `[src/buttons/server/owner/roles.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
              );
            });
        }
      }
    }
  },
} satisfies Button;

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
          ownerPermissions = owner?.permissions;

        if (!owner)
          interaction.reply({content: "Owner not found", flags: ["Ephemeral"]});
        else if (!ownerPermissions)
          interaction.reply({
            content: "Owner permissions not found",
            flags: ["Ephemeral"],
          });
        else {
          const fields: EmbedField[] = [],
            permissionLabels = ownerPermissions.toArray();

          for (let i = 0; i < permissionLabels.length; i += 2) {
            const permission = permissionLabels[i],
              nextPermission = permissionLabels[i + 1];

            if (permission)
              fields.push({
                name: permission,
                value: nextPermission ?? "\u200b",
                inline: true,
              });
          }

          interaction
            .update({
              embeds: [
                {
                  author: {
                    name: `Permissions of ${owner.displayName} (${ownerId})`,
                    icon_url: owner.displayAvatarURL(),
                  },
                  fields:
                    fields.length == 0
                      ? [{name: "No permissions", value: "\u200b"}]
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
                `[src/buttons/server/owner/permissions.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
              );
            });
        }
      }
    }
  },
} satisfies Button;

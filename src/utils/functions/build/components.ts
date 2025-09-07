import {
  ActionRowData,
  ButtonStyle,
  ComponentType,
  Guild,
  GuildMember,
  MessageActionRowComponentData,
} from "discord.js";
import {formatError} from "../helpers";

export function buildGuildComponents(
  guild: Guild,
  authorId: string,
): Promise<ActionRowData<MessageActionRowComponentData>[]> {
  const numberOfSystemChannelFlags = guild.systemChannelFlags.toArray().length,
    components: ActionRowData<MessageActionRowComponentData>[] = [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            label: `Features (${guild.features.length})`,
            style: ButtonStyle.Primary,
            customId: `server_info_features-${authorId}`,
            disabled: guild.features.length == 0,
          },
          {
            type: ComponentType.Button,
            label: `System channel flags (${numberOfSystemChannelFlags})`,
            style: ButtonStyle.Primary,
            customId: `server_info_systemChannelFlags-${authorId}`,
            disabled: numberOfSystemChannelFlags == 0,
          },
          {
            type: ComponentType.Button,
            label: `Welcome screen`,
            style: ButtonStyle.Primary,
            customId: `server_info_welcomeScreen-${authorId}`,
            disabled: true,
          },
        ],
      },
    ];

  return new Promise((resolve) => {
    guild
      .fetchWelcomeScreen()
      .then((welcomeScreen) => {
        const component = components[0]?.components[2];

        if (component && "disabled" in component)
          component.disabled = !welcomeScreen.enabled;

        resolve(components);
      })
      .catch((err) => {
        console.log(
          `[src/utils/functions/build/components.ts - buildGuildComponent] ${formatError(err)}`,
        );

        resolve(components);
      });
  });
}

export function buildGuildMemberComponents(
  member: GuildMember,
  authorId: string,
): ActionRowData<MessageActionRowComponentData>[] {
  const numberOfPermissions = member.permissions.toArray().length,
    numberOfMemberFlags = member.flags.toArray().length,
    numberOfUserFlags = member.user.flags
      ? member.user.flags.toArray().length
      : 0;
  return [
    {
      type: ComponentType.ActionRow,
      components: [
        {
          type: ComponentType.Button,
          label: `Roles (${member.roles.cache.size})`,
          customId: `server_owner_roles-${authorId}`,
          style: ButtonStyle.Primary,
          disabled: member.roles.cache.size == 0,
        },
        {
          type: ComponentType.Button,
          label: `Permissions (${numberOfPermissions})`,
          customId: `server_owner_permissions-${authorId}`,
          style: ButtonStyle.Primary,
          disabled: numberOfPermissions == 0,
        },
        {
          type: ComponentType.Button,
          label: `Member flags (${numberOfMemberFlags})`,
          customId: `server_owner_flags-${authorId}`,
          style: ButtonStyle.Primary,
          disabled: numberOfMemberFlags == 0,
        },
        {
          type: ComponentType.Button,
          label: `User flags (${numberOfUserFlags})`,
          customId: `server_owner_userFlags-${authorId}`,
          style: ButtonStyle.Primary,
          disabled: numberOfUserFlags == 0,
        },
      ],
    },
  ];
}

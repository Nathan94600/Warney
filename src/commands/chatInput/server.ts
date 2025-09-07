import {ChatInputCommand} from "../../utils/interfaces";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionContextType,
} from "discord.js";

export default {
  name: "server",
  description: "Get information about multiple things in the server",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "Get information about the server",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "owner",
      description: "Get information about the owner",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "presences",
      description: "Get information about the presences",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "members",
      description: "Get information about the members",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "roles",
      description: "Get information about the roles",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "emojis",
      description: "Get information about the emojis",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "stickers",
      description: "Get information about the stickers",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "stage_instances",
      description: "Get information about the stage instances",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "sound_board_sounds",
      description: "Get information about the sound board sounds",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "voice_states",
      description: "Get information about the voice states",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "scheduled_events",
      description: "Get information about the scheduled events",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "afk_channel",
      description: "Get information about the afk channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "public_updates_channel",
      description: "Get information about the public updates channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "rules_channel",
      description: "Get information about the rules channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "safety_alerts_channel",
      description: "Get information about the safety alerts channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "system_channel",
      description: "Get information about the system channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "widget_channel",
      description: "Get information about the widget channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "channels",
      description: "Get information about the channels",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "threads",
      description: "Get information about the threads",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  contexts: [InteractionContextType.Guild],
  run(interaction) {
    const subCommandName = interaction.options.getSubcommand(true),
      subCommand = interaction.client.subcommands.chatInput
        .get("server")
        ?.get(subCommandName);

    if (!subCommand) {
      if (subCommandName)
        console.log(
          `[src/commands/server.ts] NEW SUB COMMAND: ${subCommandName}`,
        );

      interaction.reply({
        content: "Subcommand not found",
        flags: ["Ephemeral"],
      });
    } else subCommand.run(interaction);
  },
} satisfies ChatInputCommand;

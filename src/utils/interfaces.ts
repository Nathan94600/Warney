/* eslint-disable no-unused-vars */
import {
  ButtonInteraction,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Snowflake,
} from "discord.js";

export interface ChatInputSubcommand {
  name: string;
  run: (interaction: ChatInputCommandInteraction) => void;
}

export interface Button {
  run: (interaction: ButtonInteraction, authorId: Snowflake) => void;
}

export interface ChatInputCommand extends ChatInputApplicationCommandData {
  run: (interaction: ChatInputCommandInteraction) => void;
}

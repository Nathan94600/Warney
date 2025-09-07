import "discord.js";
import {Collection} from "discord.js";
import {ChatInputCommand, ChatInputSubcommand} from "../utils/interfaces";

declare module "discord.js" {
  export interface Client {
    commands: {
      chatInput: Collection<string, ChatInputCommand>;
    };

    subcommands: {
      chatInput: Collection<string, Collection<string, ChatInputSubcommand>>;
    };
  }
}

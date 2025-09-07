import {Client, ClientOptions, Collection} from "discord.js";

export class CustomClient extends Client {
  constructor(options: ClientOptions) {
    super(options);

    this.commands = {
      chatInput: new Collection(),
    };

    this.subcommands = {
      chatInput: new Collection(),
    };
  }
}

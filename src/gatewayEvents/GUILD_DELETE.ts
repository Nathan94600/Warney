import { readdir } from "fs";
import { GatewayEventNames } from "../utils/enums/others";
import { GatewayEvent } from "../utils/types/others";
import { Command } from "../utils/interfaces/others";

const commands: Command[] = [];

readdir("./dist/commands", (err, fileNames) => {
  if (err) throw err;
  else
    fileNames.forEach((fileName) => {
      const command: Command | undefined =
        require(`../commands/${fileName}`)?.default;

      if (command?.run) commands.push(command);
      else console.log(`src/commands/${fileName}: bad file export`);
    });
});

export default ((client, guild) => {
  delete client.cache.guilds[guild.id];
}) satisfies GatewayEvent<GatewayEventNames.GuildDelete>;
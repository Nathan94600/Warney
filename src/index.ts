import {token} from "./config.json";
import {readdir, readdirSync} from "fs";
import {ChatInputCommand, ChatInputSubcommand} from "./utils/interfaces";
import {CustomClient} from "./utils/classes";
import {Collection} from "discord.js";

const client = new CustomClient({
  intents: ["Guilds", "GuildPresences"],
});

readdir("./dist/commands/chatInput", (err, fileNames) => {
  if (err) throw err;
  else
    fileNames.forEach((fileName) => {
      const command: ChatInputCommand = require(
        `./commands/chatInput/${fileName}`,
      )?.default;

      if (
        command &&
        typeof command === "object" &&
        "run" in command &&
        "name" in command
      )
        client.commands.chatInput.set(command.name, command);
      else console.log(`src/commands/chatInput/${fileName}: bad file export`);
    });
});

readdir("./dist/subcommands/chatInput", (err, dirNames) => {
  if (err) throw err;
  else
    dirNames.forEach((dirName) =>
      readdir(`./dist/subcommands/chatInput/${dirName}`, (err, fileNames) => {
        const commandName = dirName.split(".")[0];

        if (commandName) {
          const collection =
            client.subcommands.chatInput.get(commandName) ??
            client.subcommands.chatInput
              .set(commandName, new Collection())
              .get(commandName);

          if (collection) {
            if (err) throw err;
            else
              fileNames.forEach((fileName) => {
                const subcommand: ChatInputSubcommand = require(
                  `./subcommands/chatInput/${dirName}/${fileName}`,
                )?.default;

                if (
                  subcommand &&
                  typeof subcommand === "object" &&
                  "run" in subcommand &&
                  "name" in subcommand
                )
                  collection.set(subcommand.name, subcommand);
                else
                  console.log(
                    `src/subcommands/chatInput/${dirName}/${fileName}: bad file export`,
                  );
              });
          }
        }
      }),
    );
});

readdirSync("./dist/events").forEach((dirName) =>
  readdirSync(`./dist/events/${dirName}`).forEach((fileName) => {
    const eventName = fileName.split(".")[0];

    if (eventName) {
      // eslint-disable-next-line no-unused-vars
      const req: (...args: any[]) => void = require(
        `./events/${dirName}/${fileName}`,
      )?.default;

      if (typeof req === "function") client.on(eventName, req);
      else console.log(`src/events/${dirName}/${fileName}: bad file export`);
    }
  }),
);

client.login(token);

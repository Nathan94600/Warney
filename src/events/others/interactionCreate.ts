import {readdir, lstat} from "fs";
import {ClientEvent} from "../../utils/types";
import {Button} from "../../utils/interfaces";
import {
  ApplicationCommandType,
  ComponentType,
  InteractionType,
} from "discord.js";

const buttons: Record<string, Button> = {};

function readButtons(path: string, defaultPath: string = path) {
  readdir(path, (err, fileNames) => {
    if (err) throw err;
    else
      fileNames.forEach((fileName) => {
        lstat(`${path}/${fileName}`, (err, stats) => {
          if (err) throw err;
          else if (stats.isDirectory())
            readButtons(`${path}/${fileName}`, defaultPath);
          else {
            const button: Button | undefined = require(
              `../.${path.replace("/dist", "")}/${fileName}`,
            )?.default;

            if (button?.run)
              buttons[
                `${path.replace(`${defaultPath}/`, "")}/${fileName.split(".")[0]}`
              ] = button;
            else console.log(`src/buttons/${fileName}: bad file export`);
          }
        });
      });
  });
}

readButtons("./dist/buttons");

export default ((interaction) => {
  const client = interaction.client,
    interactionAuthorId = interaction.user.id;

  switch (interaction.type) {
    case InteractionType.ApplicationCommand:
      switch (interaction.commandType) {
        case ApplicationCommandType.ChatInput: {
          const command = client.commands.chatInput.get(
            interaction.commandName,
          );

          if (command) command.run(interaction);
          else {
            interaction.reply({
              content: "Unsupported command",
              flags: ["Ephemeral"],
            });

            console.log(
              `[src/events/others/interactionCreate.ts] NEW CHAT INPUT COMMAND: ${interaction.commandName}`,
            );
          }

          break;
        }
        default:
          console.log(
            `[src/events/others/interactionCreate.ts] NEW COMMAND TYPE: ${interaction.commandType}`,
          );
          break;
      }
      break;
    case InteractionType.MessageComponent:
      switch (interaction.componentType) {
        case ComponentType.Button: {
          const [path, authorId] = interaction.customId.split("-");

          if (!path) {
            console.log("No path");
          } else if (!authorId)
            interaction.reply({
              content: "Author ID not found",
              flags: ["Ephemeral"],
            });
          else if (authorId != interactionAuthorId)
            interaction.reply({
              content: "You are not the author of this command",
              flags: ["Ephemeral"],
            });
          else {
            const [commandName, subCommandName, buttonName] = path.split("_");

            if (!commandName)
              interaction.reply({
                content: "Command name not found",
                flags: ["Ephemeral"],
              });
            else if (!subCommandName)
              interaction.reply({
                content: "Subcommand not found",
                flags: ["Ephemeral"],
              });
            else if (!buttonName)
              interaction.reply({
                content: "Button name not found",
                flags: ["Ephemeral"],
              });
            else {
              const button = buttons[path.replaceAll("_", "/")]?.run;

              if (button) button(interaction, authorId);
              else {
                interaction.reply({
                  content: "Unsupported button",
                  flags: ["Ephemeral"],
                });

                console.log(
                  `[src/events/others/interactionCreate.ts] NEW BUTTON: ${path}`,
                );
              }
            }
          }
          break;
        }
        default:
          interaction.reply({
            content: "Unsupported message component",
            flags: ["Ephemeral"],
          });

          console.log(
            `[src/events/others/interactionCreate.ts] NEW MESSAGE COMPONENT TYPE: ${interaction.componentType}`,
          );
          break;
      }
      break;
    default:
      if (interaction.isRepliable())
        interaction.reply({
          content: "Unsupported interaction",
          flags: ["Ephemeral"],
        });

      console.log(
        `[src/events/others/interactionCreate.ts] NEW INTERACTION TYPE: ${interaction.type}`,
      );
      break;
  }
}) satisfies ClientEvent<"interactionCreate">;

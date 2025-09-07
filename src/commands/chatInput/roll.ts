import {inspect} from "util";
import {ApplicationCommandOptionType, ApplicationCommandType} from "discord.js";
import {ChatInputCommand} from "../../utils/interfaces";

export default {
  name: "roll",
  description: "Roll dice with a specified number of faces (6 by default)",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "faces",
      description: "The number of faces on the dice (6 by default)",
      type: ApplicationCommandOptionType.Integer,
      minValue: 2,
      required: false,
    },
    {
      name: "number_of_dice",
      description: "The number of dices rolled (1 by default)",
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 25,
      required: false,
    },
  ],
  run(interaction) {
    const faces = interaction.options.getInteger("faces") ?? 6,
      numberOfDice = interaction.options.getInteger("number_of_dice") ?? 1;

    interaction
      .reply({
        embeds: [
          {
            fields: Array.from(
              {length: numberOfDice},
              () => Math.floor(Math.random() * faces) + 1,
            ).map((result, i) => ({
              name: `N°${i + 1} :`,
              value: result.toString(),
              inline: true,
            })),
          },
        ],
      })
      .catch((error) => {
        interaction.reply({content: "An error occured", flags: ["Ephemeral"]});

        console.log(
          `[src/commands/roll.ts] ${inspect(error, {depth: Infinity, colors: true, compact: false})}`,
        );
      });
  },
} satisfies ChatInputCommand;

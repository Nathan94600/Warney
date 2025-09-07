export const BASE_URL = "https://discord.com/api/v10";
export const GATEWAY_CLOSE_EVENT_RECONNECTABLE_CODES = [
  4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009,
];
export const CHAT_INPUT_APPLICATION_COMMAND_NAMING_REGEX =
  /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;
export const OTHER_APPLICATION_COMMAND_NAMING_REGEX =
  /^[ -_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;
export const DISCORD_EPOCH_IN_SECONDS = 1_420_070_400;
export const IMAGE_BASE_URL = "https://cdn.discordapp.com";

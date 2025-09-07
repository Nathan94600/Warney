/* eslint-disable no-unused-vars */
import {ClientEvents} from "discord.js";

export type ClientEvent<Event extends keyof ClientEvents> = (
  ...args: ClientEvents[Event]
) => void;

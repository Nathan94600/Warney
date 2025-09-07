import {inspect} from "util";

export function formatError(error: any) {
  return inspect(error, {depth: Infinity, colors: true, compact: false});
}

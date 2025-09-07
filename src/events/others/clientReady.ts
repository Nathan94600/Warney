import {ClientEvent} from "../../utils/types";

export default ((client) => {
  console.log("Ready !");

  client.application.commands.set(client.commands.chatInput.toJSON());
}) satisfies ClientEvent<"clientReady">;

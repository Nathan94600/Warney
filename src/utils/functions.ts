import {
  Guild,
  GuildMember,
  InteractionReplyOptions,
  InteractionUpdateOptions,
} from "discord.js";
import {inspect} from "util";
import {
  buildGuildFields,
  buildGuildMemberFields,
} from "./functions/build/embedFields";
import {
  buildGuildComponents,
  buildGuildMemberComponents,
} from "./functions/build/components";

export function formatError(error: any) {
  return inspect(error, {depth: Infinity, colors: true, compact: false});
}

export function guildToInteractionResponse(
  guild: Guild,
  authorId: string,
): Promise<InteractionReplyOptions & InteractionUpdateOptions> {
  const guildIconURL = guild.iconURL(),
    guildBannerURL = guild.bannerURL();

  return new Promise((resolve, reject) => {
    buildGuildComponents(guild, authorId)
      .then((components) => {
        resolve({
          embeds: [
            {
              author: guildIconURL
                ? {name: `${guild.name} (${guild.id})`, icon_url: guildIconURL}
                : {name: `${guild.name} (${guild.id})`},
              description: guild.description ?? "`No description`",
              ...(guildBannerURL ? {image: {url: guildBannerURL}} : {}),
              fields: buildGuildFields(guild),
            },
          ],
          components,
        });
      })
      .catch(reject);
  });
}

export function guildMemberToInteractionResponse(
  member: GuildMember,
  authorId: string,
): InteractionReplyOptions & InteractionUpdateOptions {
  const memberBannerURL = member.displayBannerURL();

  return {
    embeds: [
      {
        author: {
          name: `${member.displayName} (${member.id})`,
          icon_url: member.displayAvatarURL(),
        },
        ...(memberBannerURL
          ? {
              image: {
                url: memberBannerURL,
              },
            }
          : {}),
        fields: buildGuildMemberFields(member),
      },
    ],
    components: buildGuildMemberComponents(member, authorId),
  };
}

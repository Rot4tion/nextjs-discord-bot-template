import { CustomAPIApplicationCommand } from "@/types"
import { bold, hyperlink } from "@discordjs/formatters"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIInteractionResponse,
  APIUser,
  ApplicationCommandOptionType,
  InteractionResponseType,
} from "discord-api-types/v10"

function getUserAvatarUrl(user: APIUser | undefined) {
  if (!user || !user.avatar) return ""
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`
}

export default {
  description: "Displays your avatar or someone else's avatar",
  options: [{ type: ApplicationCommandOptionType.User, name: "user", description: "The user to get avatar for." }],
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    const requestUser = i.member?.user || i.user
    const requestUserAvatar = getUserAvatarUrl(requestUser)

    const avatarUserID = options?.find((x) => x.name == "user")?.value as string
    const displayAvatarUser = i.data.resolved?.users![avatarUserID]
    const displayAvatarUrl = displayAvatarUser ? getUserAvatarUrl(displayAvatarUser) : requestUserAvatar

    const embed: APIEmbed = !displayAvatarUrl
      ? { title: "User does not have an avatar", color: 0xff0000 }
      : {
          description: `${bold(hyperlink("Avatar Link", displayAvatarUrl))}`,
          author: { icon_url: displayAvatarUrl, name: displayAvatarUser?.username as string },
          image: { url: displayAvatarUrl },
          footer: { icon_url: requestUserAvatar, text: `Requested by ${requestUser?.username}` },
        }
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [embed],
      },
    }
  },
} as CustomAPIApplicationCommand

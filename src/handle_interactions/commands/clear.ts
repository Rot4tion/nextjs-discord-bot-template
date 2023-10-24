import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessage,
  ApplicationCommandOptionType,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
  Routes,
} from "discord-api-types/v10"

export default {
  // Tool calculate the permissions integer last page
  // https://discord.com/developers/applications/<your discord application id>/bot

  // Document
  // https://discord.com/developers/docs/topics/permissions
  default_member_permissions: "8240",
  description: "Cleans messages from a channel.",
  options: [
    {
      required: true,
      type: ApplicationCommandOptionType.Number,
      name: "number_of_messages",
      min_value: 1,
      description: "Number of messages to delete.",
    },
    {
      type: ApplicationCommandOptionType.User,
      name: "filter_by_user",
      description: "Filter buy user messages.",
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: "filter_by_bots",
      description: "Filter buy bots messages.",
    },
  ],
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    // Options
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    const deleteMessagesNumber = options?.find((x) => x.name == "number_of_messages")?.value as number
    const filterUser = options?.find((x) => x.name == "filter_by_user")?.value as string
    const filterBots = options?.find((x) => x.name == "filter_by_bots")?.value as boolean
    // Handler
    const messages = (await discordClient.get(Routes.channelMessages(i.channel.id))) as APIMessage[]
    const messagesNeedDelete: APIMessage[] = messages
      .filter((x) => (filterUser && filterUser == x.author.id) || (filterBots && x.author.bot))
      .slice(0, deleteMessagesNumber)

    messagesNeedDelete.forEach((message) => {
      discordClient.delete(Routes.channelMessage(message.channel_id, message.id))
    })

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        flags: MessageFlags.Ephemeral,
        embeds: [
          {
            title: "Request to clear messages successfully",
            description: `Deleting ${messagesNeedDelete.length} messages the process may take some time because Discord API rate limit.`,
            color: 0x00ff00,
          },
        ],
      },
    }
  },
} as CustomAPIApplicationCommand

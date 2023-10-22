import { discordClient } from "@/discord/client"
import util from "@/lib/util"
import { CustomAPIApplicationCommand } from "@/types"
import { channelMention, userMention } from "@discordjs/formatters"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIEmbed,
  APIInteractionResponse,
  APIMessage,
  ApplicationCommandOptionType,
  InteractionResponseType,
  MessageFlags,
  Routes,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  description: "Send Message to channel",
  options: [
    {
      type: ApplicationCommandOptionType.Channel,
      name: "channel",
      description: "Select channel you want to send message",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "message",
      description: "Message want to send",
      required: true,
    },
  ],
  execute: async (i) => {
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    //get interaction input
    const channelID = options.find((x) => x.name == "channel")?.value as string
    const inputMessage = options.find((x) => x.name == "message")?.value as string

    if (!options || !channelID || !inputMessage) {
      return new NextResponse("Invalid request", { status: 400 })
    }
    //build embed
    const embed: APIEmbed = {
      title: "Send message complete!",
      description: `Complete send message "${inputMessage}" to channel ${channelMention(channelID)}`,
      color: 0x08ff14,
    }
    // send message
    try {
      const message = (
        await discordClient.post<APIMessage>(Routes.channelMessages(channelID as string), {
          content: `${userMention(i.member?.user.id as string)}: ${inputMessage}`,
        } as APIMessage)
      ).data
    } catch (error) {
      embed.title = "Send message fail!"
      embed.description = "Send message fail something wrong!"
      embed.color = 0xff0033
    }

    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      },
    })
  },
} as CustomAPIApplicationCommand

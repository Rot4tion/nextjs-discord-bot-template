import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandInteractionDataBasicOption,
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

    const channelID = options.find((x) => x.name == "channel")?.value as string
    const inputMessage = options.find((x) => x.name == "message")?.value as string

    if (!options || !channelID || !inputMessage) {
      return new NextResponse("Invalid request", { status: 400 })
    }

    await discordClient.post(Routes.channelMessages(channelID as string), {
      content: inputMessage,
    } as APIMessage)

    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            title: "Send message complete!",
            description: `Complete send message "${inputMessage}" to channel <#${channelID}>`,
          },
        ],
        flags: MessageFlags.Ephemeral,
      },
    })
  },
} as CustomAPIApplicationCommand

import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIInteractionResponse,
  APIMessage,
  ApplicationCommandOptionType,
  InteractionResponseType,
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
    if (!options || options.length < 2) {
      return new NextResponse("Invalid request", { status: 400 })
    }
    const channelID = options.find((x) => x.name == "channel")
    const inputMessage = options.find((x) => x.name == "message")

    await discordClient.post(Routes.channelMessages(channelID?.value as string), {
      content: inputMessage?.value,
    } as APIMessage)

    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "Send mesage complete!", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

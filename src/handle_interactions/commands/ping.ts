import { CustomAPIApplicationCommand } from "@/types"
import { APIChatInputApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType } from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  description: "Ping pong! I'll respond with pong.",
  execute: async (i:APIChatInputApplicationCommandInteraction ) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: `Pong` },
    })
  },
} as CustomAPIApplicationCommand

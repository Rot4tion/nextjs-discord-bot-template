import { CustomAPIApplicationCommand } from "@/types"
import { APIInteractionResponse, InteractionResponseType } from "discord-api-types/v10"
import { NextResponse } from "next/server"

const PING = {
  name: "ping",
  description: "Ping pong! I'll respond with pong.",
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: `Pong` },
    })
  },
} as CustomAPIApplicationCommand

export default PING

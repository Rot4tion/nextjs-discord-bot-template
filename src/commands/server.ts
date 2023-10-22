import { CustomAPIApplicationCommand } from "@/types"
import { APIInteractionResponse, InteractionResponseType } from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Show server info",
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

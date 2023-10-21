import { CustomAPIApplicationCommand } from "@/types"
import {
  APIInteractionResponse,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

// This is private command will not register to discord
export default {
  isPrivate: true,
  description: "Only developer can use this command using for test something.",
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

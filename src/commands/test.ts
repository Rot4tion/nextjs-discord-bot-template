import fs from "fs"
import path from "path"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

const TEST_COMMAND: CustomAPIApplicationCommand = {
  name: "test",
  description: "Using for test something.",
  execute: async (i) => {
    
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    })
  },
}

export default TEST_COMMAND

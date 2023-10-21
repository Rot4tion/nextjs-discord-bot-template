import fs from "fs"
import path from "path"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Only developer can use this command using for test something.",
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

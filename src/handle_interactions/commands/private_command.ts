import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

// This is private command will not register to discord
export default {
  isDisable: true,
  description: "Example private command",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    }
  },
} as CustomAPIApplicationCommand

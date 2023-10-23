import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIGuild,
  APIInteractionResponse,
  InteractionResponseType,
  Routes,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Show server info",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    const res = (await discordClient.get(Routes.guild(i.guild_id as string))) as APIGuild
    console.log("🚀 ~ file: server.ts:11 ~ execute: ~ res:", res)

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    }
  },
} as CustomAPIApplicationCommand

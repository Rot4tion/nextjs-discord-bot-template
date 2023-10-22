import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import { APIGuild, APIInteractionResponse, InteractionResponseType, Routes } from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Show server info",
  execute: async (i) => {
    const res = (await discordClient.get<APIGuild>(Routes.guild(i.guild_id as string))).data
    console.log("🚀 ~ file: server.ts:11 ~ execute: ~ res:", res)

    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

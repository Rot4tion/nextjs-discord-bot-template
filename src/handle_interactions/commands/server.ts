import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIGuild,
  APIGuildMember,
  APIGuildPreview,
  APIInteractionResponse,
  InteractionResponseType,
  Routes,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Show server info",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    const guild = (await discordClient.get(Routes.guild(i.guild_id as string))) as APIGuild

    const guildMembers = await discordClient.get(Routes.guildAuditLog(i.guild_id as string))
    console.log("🚀 ~ file: server.ts:18 ~ execute: ~ guildMembers:", guildMembers)
    console.log("🚀 ~ file: server.ts:11 ~ execute: ~ res:", guild)

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "test title", description: "test description" }] },
    }
  },
} as CustomAPIApplicationCommand

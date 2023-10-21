import { CustomAPIApplicationCommand } from "@/types"
import { APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import { NextResponse } from "next/server"

const INVITE = {
  name: "invite",
  description: "Get an invite link to add this bot to your server",
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Click this link to add NextBot to your server: https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_APP_ID}&permissions=2147485696&scope=bot%20applications.commands`,
        flags: MessageFlags.Ephemeral,
      },
    })
  },
} as CustomAPIApplicationCommand
export default INVITE
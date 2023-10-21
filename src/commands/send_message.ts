import fs from "fs"
import path from "path"
import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import axios from "axios"
import {
  APIApplicationCommandBasicOption,
  APIApplicationCommandInteractionDataBasicOption,
  APIApplicationCommandInteractionDataChannelOption,
  APIApplicationCommandInteractionDataOption,
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionDataOptionBase,
  APIInteractionResponse,
  APIMessage,
  ApplicationCommandOptionType,
  InteractionResponseType,
  Routes,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  description: "Send Message to channel",
  options: [
    {
      type: ApplicationCommandOptionType.Channel,
      name: "channel",
      description: "Select channel you want to send message",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "message",
      description: "Message want to send",
      required: true,
    },
  ],
  execute: async (i) => {
    console.log("🚀 ~ file: send_message.ts:16 ~ execute: ~ i:", i.data.options)
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    if (!options || options.length < 2) {
      return new NextResponse("Invalid request", { status: 400 })
    }

    await discordClient.post(Routes.channelMessages(options[0].value as string), {
      content: options[1].value as string,
    } as APIMessage)
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [{ title: "Send mesage complete!", description: "test description" }] },
    })
  },
} as CustomAPIApplicationCommand

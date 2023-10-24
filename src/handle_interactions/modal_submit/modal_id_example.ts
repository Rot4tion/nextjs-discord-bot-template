import { CustomAPIInteraction } from "@/types"
import { codeBlock } from "@discordjs/formatters"
import { APIInteractionResponse, APIModalSubmitInteraction, InteractionResponseType } from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  execute: async (i: APIModalSubmitInteraction): Promise<APIInteractionResponse> => {
    // Handler modal submit
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [{ title: "Example autocomplete", description: codeBlock("json", JSON.stringify(i.data.components, null, 2)) }],
      },
    }
  },
} as CustomAPIInteraction

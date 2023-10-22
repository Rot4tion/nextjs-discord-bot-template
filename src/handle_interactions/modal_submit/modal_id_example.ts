import { codeBlock } from "@discordjs/formatters"
import {
  APIInteractionResponse,
  APIModalSubmitInteraction,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default async (i: APIModalSubmitInteraction): Promise<NextResponse<APIInteractionResponse>> => {
  // Handler modal submit

  return NextResponse.json<APIInteractionResponse>({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [{ title: "Example autocomplete", description: codeBlock(JSON.stringify(i.data.components, null, 2)) }],
    },
  })
}

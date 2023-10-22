import {
  APIInteractionResponse,
  APIMessageComponentButtonInteraction,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default async (i: APIMessageComponentButtonInteraction): Promise<NextResponse<APIInteractionResponse>> => {
  // Handler button

  return NextResponse.json<APIInteractionResponse>({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Confirm!`,
      flags: MessageFlags.Ephemeral,
    },
  })
}

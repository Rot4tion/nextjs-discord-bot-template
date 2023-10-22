import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandAutocompleteResponse,
  APIInteractionResponse,
  APIMessageComponentButtonInteraction,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default async (
  i: APIApplicationCommandAutocompleteInteraction
): Promise<NextResponse<APIApplicationCommandAutocompleteResponse>> => {
  // handler auto complete

  return NextResponse.json<APIApplicationCommandAutocompleteResponse>({
    type: InteractionResponseType.ApplicationCommandAutocompleteResult,
    data: {
      choices: [
        { name: "kick", value: "kick" },
        { name: "punch", value: "punch" },
        { name: "tame", value: "tame_id" },
        { name: "ramdom", value: "random_id" },
      ],
    },
  })
}

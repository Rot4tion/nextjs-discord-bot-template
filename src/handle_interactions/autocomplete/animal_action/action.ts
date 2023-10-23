import { CustomAPIInteraction } from "@/types"
import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandAutocompleteResponse,
  APIInteractionResponse,
  APIMessageComponentButtonInteraction,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  execute: async (
    i: APIApplicationCommandAutocompleteInteraction
  ): Promise<APIApplicationCommandAutocompleteResponse> => {
    // handler auto complete

    return {
      type: InteractionResponseType.ApplicationCommandAutocompleteResult,
      data: {
        choices: [
          { name: "kick", value: "kick" },
          { name: "punch", value: "punch" },
          { name: "tame", value: "tame_id" },
          { name: "ramdom", value: "random_id" },
        ],
      },
    }
  },
} as CustomAPIInteraction

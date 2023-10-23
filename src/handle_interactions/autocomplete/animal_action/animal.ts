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
          { name: "cat", value: "cat_id" },
          { name: "dog", value: "dog_id" },
          { name: "pig", value: "pig_id" },
          { name: "cow", value: "random_id" },
        ],
      },
    }
  },
} as CustomAPIInteraction

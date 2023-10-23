import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  description: "Example modal submit",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    return {
      type: InteractionResponseType.Modal,
      data: {
        custom_id: "modal_id_example",
        title: "Example Modal",
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                label: "Full Name",
                custom_id: "username_id",
                style: TextInputStyle.Short,
                placeholder: "TTextInputStyle.Short",
              },
            ],
          },
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                label: "bio",
                custom_id: "bio_id",
                style: TextInputStyle.Paragraph,
                placeholder: "TextInputStyle.Paragraph",
              },
            ],
          },
        ],
      },
    }
  },
} as CustomAPIApplicationCommand

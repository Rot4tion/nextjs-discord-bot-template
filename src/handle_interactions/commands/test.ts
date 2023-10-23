import { CustomAPIApplicationCommand } from "@/types"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Only developer can use this command using for test something.",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [{ title: "test title", description: "test description" }],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                label: "Confirm",
                style: ButtonStyle.Primary,
                custom_id: "confirm_example",
              },
            ],
          },
        ],
      },
    }
  },
} as CustomAPIApplicationCommand

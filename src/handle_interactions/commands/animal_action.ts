import { CustomAPIApplicationCommand } from "@/types"
import {
  APIInteractionResponse,
  ApplicationCommandOptionType,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default {
  isDeveloperOnly: true,
  description: "Example autocomplete.",
  options: [
    { type: ApplicationCommandOptionType.String, name: "animal", description: "Animal name", autocomplete: true },
    {
      type: ApplicationCommandOptionType.String,
      name: "action",
      description: "Action you want to do with animal",
      autocomplete: true,
    },
  ],
  execute: async (i) => {
    return NextResponse.json<APIInteractionResponse>({
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
    })
  },
} as CustomAPIApplicationCommand

import { CustomAPIApplicationCommand } from "@/types"
import { codeBlock } from "@discordjs/formatters"
import {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  ApplicationCommandOptionType,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

// example auto complete
export default {
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
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        flags: MessageFlags.Ephemeral,
        embeds: [{ title: "Example autocomplete", description: codeBlock("json", JSON.stringify(i.data.options, null, 2)) }],
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

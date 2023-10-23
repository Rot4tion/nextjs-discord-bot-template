import { codeBlock } from "@discordjs/formatters"
import {
  APIInteractionResponse,
  APIMessageComponentInteraction,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export default async (i: APIMessageComponentInteraction) => {
  return NextResponse.json<APIInteractionResponse>({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      flags: MessageFlags.Ephemeral,
      embeds: [
        {
          title: `Example ${ComponentType[i.data.component_type]}`,
          description: codeBlock(JSON.stringify(i.data, null, 2)),
        },
      ],
    },
  })
}

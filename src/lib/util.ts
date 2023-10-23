import { developers } from "@/discord/client"
import { APIInputInteraction } from "@/discord/verify-incoming-request"
import { APIInteractionResponse, InteractionResponseType, MessageFlags } from "discord-api-types/v10"
import { NextResponse } from "next/server"

const util = {
  invalidRequestResponse() {
    console.log("🚀 ~ file: util.ts:7 ~ invalidRequestResponse ~ Invalid request:")
    return new NextResponse("Invalid request", { status: 400 })
  },
  embedDeveloperPermission() {
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          { title: "Permission denied", description: "Only developer can use this interaction", color: 0xff0000 },
        ],
        flags: MessageFlags.Ephemeral,
      },
    })
  },
  isDeveloper(interaction: APIInputInteraction | any) {
    return developers.includes(interaction.user?.id as string) || developers.includes(interaction.member?.user.id)
  },
}

export default util

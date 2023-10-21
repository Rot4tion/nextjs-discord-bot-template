import fs from "fs"
import path from "path"
import { developers } from "@/discord/client"
import { verifyInteractionRequest } from "@/discord/verify-incoming-request"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIInteractionDataOptionBase,
  APIInteractionResponse,
  APIMessage,
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
  Routes,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
// export const runtime = process.env.NEXT_RUNTIME
export const runtime = "edge"

// Your public key can be found on your application in the Developer Portal
const DISCORD_APP_PUBLIC_KEY = process.env.DISCORD_APP_PUBLIC_KEY

/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */
export async function POST(request: Request) {
  const verifyResult = await verifyInteractionRequest(request, DISCORD_APP_PUBLIC_KEY!)
  if (!verifyResult.isValid || !verifyResult.interaction) {
    return new NextResponse("Invalid request", { status: 401 })
  }
  const { interaction } = verifyResult

  if (interaction.type === InteractionType.Ping) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return NextResponse.json({ type: InteractionResponseType.Pong })
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const { name } = interaction.data

    try {
      const command = (await import(`../../../commands/${name}`)).default as CustomAPIApplicationCommand

      // Handler command permission
      if (
        command.isPrivate ||
        (command.isDeveloperOnly && !developers.includes(interaction.member?.user?.id as string))
      ) {
        return NextResponse.json<APIInteractionResponse>({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: `Only developer can use this command` },
        })
      }
      if (command && command?.execute) {
        // const command = commands.find((x) => x.name == name)
        return await command.execute(interaction)
      }
    } catch (error) {
      console.log("🚀 ~ file: route.ts:55 ~ POST ~ error:", error)
    }
  }
  return new NextResponse("Unknown command", { status: 400 })
}

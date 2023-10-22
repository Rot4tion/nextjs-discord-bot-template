import { developers } from "@/discord/client"
import { verifyInteractionRequest } from "@/discord/verify-incoming-request"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandAutocompleteResponse,
  APIApplicationCommandInteraction,
  APIApplicationCommandInteractionData,
  APIApplicationCommandInteractionDataOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessageButtonInteractionData,
  APIMessageComponentButtonInteraction,
  APIMessageComponentInteraction,
  APIMessageInteraction,
  APIModalSubmitInteraction,
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
// export const runtime = "edge"

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
  let { interaction } = verifyResult

  const interactionPath = "handle_interactions"

  try {
    switch (interaction.type) {
      case InteractionType.Ping:
        // The `PING` message is used during the initial webhook handshake, and is
        // required to configure the webhook in the developer portal.
        return NextResponse.json({ type: InteractionResponseType.Pong })
      case InteractionType.ApplicationCommand:
        // commands
        interaction = interaction as APIChatInputApplicationCommandInteraction

        const command = (await import(`../../../${interactionPath}/commands/${interaction.data.name}`))
          .default as CustomAPIApplicationCommand
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
          return await command.execute(interaction)
        }

        break
      case InteractionType.MessageComponent:
        // components
        interaction = interaction as APIMessageComponentInteraction
        const component = (
          await import(
            `../../../${interactionPath}/components/${ComponentType[interaction.data.component_type]}/${
              interaction.data.custom_id
            }`
          )
        ).default
        return await component(interaction)

      case InteractionType.ModalSubmit:
        // modal_submit
        interaction = interaction as APIModalSubmitInteraction
        const modalSubmit = (await import(`../../../${interactionPath}/modal_submit/${interaction.data.custom_id}`))
          .default

        return await modalSubmit(interaction)

      case InteractionType.ApplicationCommandAutocomplete:
        // autocomplete
        interaction = interaction as APIApplicationCommandAutocompleteInteraction

        const focus = interaction.data.options.find((x: any) => x.focused)
        const autoComplete = (
          await import(`../../../${interactionPath}/autocomplete/${interaction.data.name}/${focus?.name}`)
        ).default
        return await autoComplete(interaction)
    }
  } catch (error) {
    console.log("🚀 ~ file: route.ts:108 ~ POST ~ error:", error)
  }

  return new NextResponse("Unknown interaction", { status: 400 })
}

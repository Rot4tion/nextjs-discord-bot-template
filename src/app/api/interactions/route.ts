import { developers } from "@/discord/client"
import { verifyInteractionRequest } from "@/discord/verify-incoming-request"
import util from "@/lib/util"
import { CustomAPIApplicationCommand, CustomAPIInteraction } from "@/types"
import { codeBlock } from "@discordjs/formatters"
import {
  APIApplicationCommandAutocompleteInteraction,
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIInteractionResponse,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
  ComponentType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * But you'll also have to polyfill fetch (and maybe other things).
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
    return util.invalidRequestResponse()
  }
  let { interaction } = verifyResult
  let interactionModulePath = "handle_interactions"

  try {
    switch (interaction.type) {
      case InteractionType.Ping:
        // The `PING` message is used during the initial webhook handshake, and is
        // required to configure the webhook in the developer portal.
        return NextResponse.json({ type: InteractionResponseType.Pong })
      case InteractionType.ApplicationCommand:
        // commands
        interaction = interaction as APIChatInputApplicationCommandInteraction
        interactionModulePath = `${interactionModulePath}/commands/${interaction.data.name}`
        break
      case InteractionType.MessageComponent:
        // components
        interaction = interaction as APIMessageComponentInteraction
        interactionModulePath = `${interactionModulePath}/components/${
          ComponentType[interaction.data.component_type]
        }/${interaction.data.custom_id}`
        break
      case InteractionType.ModalSubmit:
        // modal_submit
        interaction = interaction as APIModalSubmitInteraction
        interactionModulePath = `${interactionModulePath}/modal_submit/${interaction.data.custom_id}`
        break
      case InteractionType.ApplicationCommandAutocomplete:
        // autocomplete
        interaction = interaction as APIApplicationCommandAutocompleteInteraction
        const focus = interaction.data.options.find((x: any) => x.focused)
        interactionModulePath = `${interactionModulePath}/autocomplete/${interaction.data.name}/${focus?.name}`
        break
    }

    const interactionModule = (await import(`../../../${interactionModulePath}`)).default as CustomAPIInteraction
    // Handler command permission
    if (interactionModule.isDisable || (interactionModule.isDeveloperOnly && !util.isDeveloper(interaction))) {
      return util.embedDeveloperPermission()
    }
    if (interactionModule && interactionModule?.execute) {
      return NextResponse.json<APIInteractionResponse>(await interactionModule.execute(interaction))
    }
  } catch (error: any) {
    const embed: APIEmbed = { title: "Interaction fail!", description: "Something went wrong \n", color: 0xff0000 }

    if (util.isDeveloper(interaction)) {
      embed.description = `Only developer can see this error:\n ${codeBlock(error)}`
    }
    return NextResponse.json<APIInteractionResponse>({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      },
    })
  }

  return util.invalidRequestResponse()
}

import {
  APIApplicationCommand,
  APIApplicationCommandAutocompleteInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
  APIPingInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Snowflake,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export type InteractionPermission = {
  /**
   * Only developer can use this command
   * config env DEVELOPERS
   */
  isDeveloperOnly?: boolean
  isDisable?: boolean
}

export type CustomAPIApplicationCommand = Omit<
  APIApplicationCommand,
  "id" | "type" | "application_id" | "default_member_permissions" | "version" | "name"
> &
  InteractionPermission & {
    id?: Snowflake
    type?: number
    application_id?: string
    default_member_permissions?: string
    version?: string
    name?: string
    execute?: (interaction: APIChatInputApplicationCommandInteraction) => Promise<NextResponse<APIInteractionResponse>>
  }

export type CustomAPIInteraction = InteractionPermission & {
  isDisable?: boolean
  /**Only author can use*/
  isOnlyAuthor?: boolean
  execute?: (
    interaction:
      | APIMessageComponentInteraction
      | APIModalSubmitInteraction
      | APIApplicationCommandAutocompleteInteraction
  ) => Promise<NextResponse<APIInteractionResponse>>
}

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
  isDisable?: boolean
  /**
   * Only developer can use this command
   * config env DEVELOPERS
   */
  isDeveloperOnly?: boolean
}

export type CustomAPIInteraction = {
  execute?: (
    interaction:
      | APIChatInputApplicationCommandInteraction
      | APIMessageComponentInteraction
      | APIModalSubmitInteraction
      | APIApplicationCommandAutocompleteInteraction
  ) => Promise<APIInteractionResponse>
} & InteractionPermission

export type CustomAPIApplicationCommand = Omit<
  APIApplicationCommand,
  "id" | "type" | "application_id" | "default_member_permissions" | "version" | "name"
> & {
  id?: Snowflake
  type?: number
  application_id?: string
  default_member_permissions?: string
  version?: string
  name?: string
} & InteractionPermission &
  CustomAPIInteraction

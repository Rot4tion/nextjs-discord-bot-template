import {
  APIApplicationCommand,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIPingInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Snowflake,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

export type CustomAPIApplicationCommand = Omit<
  APIApplicationCommand,
  "id" | "type" | "application_id" | "default_member_permissions" | "version"
> & {
  id?: Snowflake
  type?: number
  application_id?: string
  default_member_permissions?: string
  version?: string
  /**
   * Only developer can use this command
   * config env.DEVELOPERS
   */
  isDeveloperOnly?: boolean
  isPrivate?: boolean
  /**Make sure it name same with file name */
  name?: string
  execute?: (interaction: APIChatInputApplicationCommandInteraction) => Promise<NextResponse<APIInteractionResponse>>
}

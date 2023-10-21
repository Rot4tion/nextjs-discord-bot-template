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
  "id" | "type" | "application_id" | "default_member_permissions" | "version" | "name"
> & {
  id?: Snowflake
  type?: number
  application_id?: string
  default_member_permissions?: string
  version?: string
  /**
   * Only developer can use this command
   * config env DEVELOPERS
   */
  isDeveloperOnly?: boolean
  /** If `true` your command will not be registered and used */
  isPrivate?: boolean
  name?: string
  execute?: (interaction: APIChatInputApplicationCommandInteraction) => Promise<NextResponse<APIInteractionResponse>>
}

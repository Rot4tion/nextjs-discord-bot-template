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
  isDeveloperOnly?: boolean
  isPrivate?: boolean
  execute?: (interaction: APIChatInputApplicationCommandInteraction) => Promise<NextResponse<APIInteractionResponse>>
}

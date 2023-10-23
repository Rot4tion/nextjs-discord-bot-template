import { REST } from "@discordjs/rest"
import { APIApplicationCommand, Routes } from "discord-api-types/v10"

// @ts-ignore
export const discordClient = new REST({ version: "10", makeRequest: fetch }).setToken(
  process.env.DISCORD_BOT_TOKEN as string
)

export const developers: string[] = process.env.DEVELOPERS?.replaceAll(" ", "").split("|") || []

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export const getGlobalCommands = async ({ appId }: { appId: string }) => {
  return discordClient.get(Routes.applicationCommands(appId))
}

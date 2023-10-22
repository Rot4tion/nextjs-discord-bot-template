import axios from "axios"
import { APIApplicationCommand, Routes } from "discord-api-types/v10"

export const discordClient = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
})
export const developers: string[] = process.env.DEVELOPERS?.replaceAll(" ", "").split("|") || []

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export const getGlobalCommands = async ({ appId }: { appId: string }) =>
  discordClient.get<APIApplicationCommand[]>(Routes.applicationCommands(appId))

import INVITE from "@/commands/invite"
import PING from "@/commands/ping"
import RANDOM_PIC from "@/commands/random_pic"
import TEST_COMMAND from "@/commands/test"
import { CustomAPIApplicationCommand } from "@/types"
import axios from "axios"
import { APIApplication, APIMessage } from "discord-api-types/v9"

export const discordClient = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
})
export const developers: string[] = process.env.DEVELOPERS?.replaceAll(" ", "").split("|") || []

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export const getGlobalCommands = async ({ appId }: { appId: string }) =>
  discordClient.get<APIApplication[]>(`applications/${appId}/commands`)

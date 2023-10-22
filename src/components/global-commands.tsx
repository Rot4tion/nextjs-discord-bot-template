import { getGlobalCommands } from "@/discord/client"
import CommandTable from "./CommnadTable"

export async function GlobalCommands() {
  try {
    const commands = (await getGlobalCommands({ appId: process.env.DISCORD_APP_ID! })).data
    if (commands.length <= 0) {
      return <p className="pt-6">No commands found :</p>
    }

    return <CommandTable rows={commands}></CommandTable>
  } catch (error) {
    return (
      <div>
        <p>Failed to get commands for your Discord app. Make sure your environment variables are set up correctly!</p>
      </div>
    )
  }
}

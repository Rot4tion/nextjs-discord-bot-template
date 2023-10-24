import { channel } from "diagnostics_channel"
import { discordClient } from "@/discord/client"
import { CustomAPIApplicationCommand } from "@/types"
import { userMention } from "@discordjs/formatters"
import {
  APIChannel,
  APIChatInputApplicationCommandInteraction,
  APIGuild,
  APIGuildChannel,
  APIGuildMember,
  ChannelFlags,
  ChannelType,
  GatewayGuildCreateDispatchData,
  GuildChannelType,
  InteractionResponseType,
  Routes,
} from "discord-api-types/v10"

export default {
  description: "Show server info",
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    // Fetch data concurrently
    const [guild, guildMembers, guildChannels] = await Promise.all([
      discordClient.get(Routes.guild(i.guild_id as string)) as Promise<APIGuild>,
      discordClient.get(Routes.guildMembers(i.guild_id as string)) as Promise<APIGuildMember[]>,
      discordClient.get(Routes.guildChannels(i.guild_id as string)) as Promise<APIGuildChannel<GuildChannelType>[]>,
    ])
    // Handler data
    const guildChannelsSorted: Record<number, APIGuildChannel<GuildChannelType>[]> = {}
    guildChannels.forEach((channel) => {
      if (!guildChannelsSorted[channel.type]) {
        guildChannelsSorted[channel.type] = []
      }
      guildChannelsSorted[channel.type].push(channel)
    })

    const channelsInfoFormat = Object.keys(guildChannelsSorted)
      .map((k: string) => {
        const channelLength = guildChannelsSorted[parseInt(k)].length
        if (channelLength > 0) {
          return ` ${channelLength} ${ChannelType[parseInt(k)]
            .replace("Guild", "")
            .split(/(?=[A-Z])/)
            .join(" ")}`
        }
      })
      .join("\n")

    // Return data
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            title: `${guild.name} info`,
            thumbnail: { url: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` },
            fields: [
              { name: ":id: Server ID", value: guild.id, inline: true },
              { name: ":crown: Owned by", value: userMention(guild.owner_id), inline: true },
              { name: `:speech_balloon: Channels (${guildChannels.length})`, value: channelsInfoFormat, inline: true },
              { name: `👥Members`, value: guildMembers.length, inline: true },
              { name: `:closed_lock_with_key:  Roles`, value: guild.roles.length, inline: true },
              { name: `:sunglasses: Emojis`, value: guild.emojis.length, inline: true },
            ],
          },
        ],
      },
    }
  },
} as CustomAPIApplicationCommand

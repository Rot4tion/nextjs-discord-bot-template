import { CustomAPIApplicationCommand } from "@/types"
import axios from "axios"
import {
  APIChatInputApplicationCommandInteraction,
  APIEmbed,
  APIInteractionDataOptionBase,
  APIInteractionResponse,
  ApplicationCommandOptionType,
  InteractionResponseType,
} from "discord-api-types/v10"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export type RandomPicType = "cat" | "dog" | "picsum"

export default {
  description: "Get a random picture",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "What type of picture would you like?",
      required: true,
      choices: [
        { name: "cat", value: "cat" },
        { name: "dog", value: "dog" },
        { name: "generic", value: "picsum" },
      ],
    },
  ],
  execute: async (i:APIChatInputApplicationCommandInteraction) => {
    const { options } = i.data
    if (!options) {
      return new NextResponse("Invalid request", { status: 400 })
    }

    const { value } = options[0] as APIInteractionDataOptionBase<ApplicationCommandOptionType.String, RandomPicType>
    let embed: APIEmbed = { title: "Random Pic", description: `Here's a random ${value} picture!` }
    switch (value) {
      case "cat":
        embed = { ...embed, image: { url: "https://cataas.com/cat" } }
        break
      case "dog":
        embed = { ...embed, image: { url: (await axios.get("https://dog.ceo/api/breeds/image/random")).data.message } }
        break
      case "picsum":
        embed = { ...embed, image: { url: `https://picsum.photos/seed/${nanoid()}/500` } }
    }

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: [embed] },
    }
  },
} as CustomAPIApplicationCommand

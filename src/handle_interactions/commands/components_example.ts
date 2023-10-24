import util from "@/lib/util"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessageActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  ChannelType,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

const components_type = Object.keys(ComponentType)
  .map((key: any) => {
    return {
      name: key,
      value: ComponentType[key],
    }
  })
  .filter((x) => isNaN(Number(x.name)) && x.name != "ActionRow" && x.name != "TextInput")

export default {
  description: "Example components",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "component_type",
      description: "Type component you want to see example",
      choices: components_type,
    },
  ],
  execute: async (i: APIChatInputApplicationCommandInteraction) => {
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    const componentType: ComponentType = options.find((x) => x.name == "component_type")?.value as ComponentType
    const componentName = ComponentType[componentType]

    if (!options || !componentType || !componentName) {
      return util.invalidRequestResponse()
    }

    const custom_id = `${componentName}_example`
    const components: APIMessageActionRowComponent[] = []

    switch (componentType) {
      case ComponentType.Button:
        components.push({
          type: ComponentType.Button,
          label: "Confirm",
          style: ButtonStyle.Success,
          custom_id: "confirm_example",
        })
        components.push({
          type: ComponentType.Button,
          label: "Dev Only",
          style: ButtonStyle.Danger,
          custom_id: "permission_example",
        })
        break
      case ComponentType.ChannelSelect:
        components.push({
          type: ComponentType.ChannelSelect,
          channel_types: [ChannelType.GuildText, ChannelType.DM, ChannelType.GuildVoice],
          custom_id,
        })
        break
      case ComponentType.MentionableSelect:
        components.push({
          type: ComponentType.MentionableSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.MentionableSelect",
          custom_id,
        })
        break
      case ComponentType.RoleSelect:
        components.push({
          type: ComponentType.RoleSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.RoleSelect",
          custom_id,
        })
        break

      case ComponentType.SelectMenu || ComponentType.StringSelect:
        components.push({
          type: ComponentType.SelectMenu,
          options: [
            { label: "option1", value: "optionValue1" },
            { label: "option2", value: "optionValue2" },
            { label: "option3", value: "optionValue3" },
            { label: "option4", value: "optionValue4" },
          ],
          // max_values: 10,
          // min_values: 1,
          placeholder: "StringSelect or SelectMenu",
          custom_id,
        })
        break
      case ComponentType.UserSelect:
        components.push({
          type: ComponentType.UserSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.UserSelect",
          custom_id,
        })
        break
    }
    if (!components) {
      return util.invalidRequestResponse()
    }
    const response: APIInteractionResponse = {
      type: InteractionResponseType.ChannelMessageWithSource,

      data: {
        embeds: [{ title: `Example ${componentName}`, description: "description" }],
        components: [
          {
            type: ComponentType.ActionRow,
            components,
          },
        ],
        flags: MessageFlags.Ephemeral,
      },
    }

    return response
  },
} as CustomAPIApplicationCommand

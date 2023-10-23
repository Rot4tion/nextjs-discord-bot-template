import util from "@/lib/util"
import { CustomAPIApplicationCommand } from "@/types"
import {
  APIApplicationCommandInteractionDataBasicOption,
  APIInteractionResponse,
  APIMessageActionRowComponent,
  ApplicationCommandOptionType,
  ButtonStyle,
  ChannelType,
  ComponentType,
  InteractionResponseType,
} from "discord-api-types/v10"
import { NextResponse } from "next/server"

const components_type = Object.keys(ComponentType)
  .map((key: any) => {
    return {
      name: key,
      value: ComponentType[key],
    }
  })
  .filter((x) => isNaN(Number(x.name)))

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
  execute: async (i) => {
    const options = i.data.options as APIApplicationCommandInteractionDataBasicOption[]
    const componentType: ComponentType = options.find((x) => x.name == "component_type")?.value as ComponentType
    const componentName = ComponentType[componentType]

    if (!options || !componentType || !componentName) {
      return util.invalidRequestResponse()
    }

    const custom_id = `${componentName}_example`

    let exampleComponent: APIMessageActionRowComponent | undefined = undefined
    switch (componentType) {
      case ComponentType.Button:
        break
      case ComponentType.ChannelSelect:
        exampleComponent = {
          type: ComponentType.ChannelSelect,
          channel_types: [ChannelType.GuildText, ChannelType.DM, ChannelType.GuildVoice],
          custom_id,
        }
        break
      case ComponentType.MentionableSelect:
        exampleComponent = {
          type: ComponentType.MentionableSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.MentionableSelect",
          custom_id,
        }
        break
      case ComponentType.RoleSelect:
        exampleComponent = {
          type: ComponentType.RoleSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.RoleSelect",
          custom_id,
        }
        break

      case ComponentType.SelectMenu || ComponentType.StringSelect:
        exampleComponent = {
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
        }
        break
      case ComponentType.UserSelect:
        exampleComponent = {
          type: ComponentType.UserSelect,
          max_values: 10,
          min_values: 1,
          placeholder: "ComponentType.UserSelect",
          custom_id,
        }
        break
    }
    if (!exampleComponent) {
      return util.invalidRequestResponse()
    }
    const response: APIInteractionResponse = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [{ title: `Example ${componentName}`, description: "description" }],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [exampleComponent],
          },
        ],
      },
    }

    return NextResponse.json<APIInteractionResponse>(response)
  },
} as CustomAPIApplicationCommand

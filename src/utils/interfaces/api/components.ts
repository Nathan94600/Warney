import { TextInputStyles, ButtonStyles } from "../../enums/others";
import { MessageComponentTypes, ChannelTypes } from "../../enums/types";
import { APISelectMenuComponent, APIMessageComponent, APIActionRowComponent } from "../../types/api";
import { SelectMenuComponentType, Snowflake } from "../../types/others";
import { APISelectOption, APISelectDefaultValue, APIEmoji } from "./others";

export interface APITextInputComponent {
	/**
	 * `4` for a text input
	 */
	type: MessageComponentTypes.TextInput;
	/**
	 * Developer-defined identifier for the input; max 100 characters
	 */
	custom_id: string;
	/**
	 * The [Text Input Style](https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles)
	 */
	style: TextInputStyles;
	/**
	 * Label for this component; max 45 characters
	 */
	label: string;
	/**
	 * Minimum input length for a text input; min 0, max 4000
	 */
	min_length?: number;
	/**
	 * Maximum input length for a text input; min 1, max 4000
	 */
	max_length?: number;
	/**
	 * Whether this component is required to be filled (defaults to `true`)
	 */
	required?: boolean;
	/**
	 * Pre-filled value for this component; max 4000 characters
	 */
	value?: string;
	/**
	 * Custom placeholder text if the input is empty; max 100 characters
	 */
	placeholder?: string;
};

export interface APISelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: [] | [APISelectMenuComponent];
};

export interface APINonSelectMenuActionRowComponent {
	type: MessageComponentTypes.ActionRow;
	components: Exclude<APIMessageComponent, APISelectMenuComponent | APIActionRowComponent>[];
};

export interface APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: SelectMenuComponentType;
	/**
	 * ID for the select menu; max 100 characters
	 */
	custom_id: string;
	/**
	 * Placeholder text if nothing is selected; max 150 characters
	 */
	placeholder?: string;
	/**
	 * Minimum number of items that must be chosen (defaults to 1); min 0, max 25
	 */
	min_values?: number;
	/**
	 * Maximum number of items that can be chosen (defaults to 1); max 25
	 */
	max_values?: number;
	/**
	 * Whether select menu is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface APIStringSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.StringSelect;
	/**
	 * Specified choices in a select menu (only required and available for string selects (type `3`); max 25
	 */
	options: APISelectOption[];
};

export interface APIChannelSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: MessageComponentTypes.ChannelSelect;
	/**
	 * List of channel types to include in the channel select component (type `8`)
	 */
	channel_types?: ChannelTypes[];
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	default_values?: APISelectDefaultValue[];
};

export interface APIOtherSelectMenuComponent extends APIBaseSelectMenuComponent {
	/**
	 * [Type](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)
	 */
	type: Exclude<SelectMenuComponentType, MessageComponentTypes.ActionRow | MessageComponentTypes.Button | MessageComponentTypes.TextInput>;
	/**
	 * List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values`
	 */
	default_values?: APISelectDefaultValue[];
};

export interface APIBaseButtonComponent {
	/**
	 * `2` for a button
	 */
	type: MessageComponentTypes.Button;
	/**
	 * Whether the button is disabled (defaults to `false`)
	 */
	disabled?: boolean;
};

export interface APIBasicButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: Exclude<ButtonStyles, ButtonStyles.Link | ButtonStyles.Premium>;
	/**
	 * Text that appears on the button; max 80 characters
	 */
	label?: string;
	/**
	 * `name`, `id`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * Developer-defined identifier for the button; max 100 characters
	 */
	custom_id?: string;
};

export interface APILinkButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: ButtonStyles.Link;
	/**
	 * Text that appears on the button; max 80 characters
	 */
	label?: string;
	/**
	 * `name`, `id`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * URL for link-style buttons
	 */
	url: string;
};

export interface APIPremiumButtonComponent extends APIBaseButtonComponent {
	/**
	 * A [button style](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)
	 */
	style: ButtonStyles.Premium;
	/**
	 * Identifier for a purchasable [SKU](https://discord.com/developers/docs/resources/sku#sku-object), only available when using premium-style buttons
	 */
	sku_id: Snowflake;
};
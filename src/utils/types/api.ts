import { APIApplicationCommandSubCommandOption, APIApplicationCommandSubCommandGroupOption, APIApplicationCommandIntegerOption, APIApplicationCommandNumberOption, APIApplicationCommandStringOption, APIApplicationCommandAttachmentOption, APIApplicationCommandBooleanOption, APIApplicationCommandMentionableOption, APIApplicationCommandRoleOption, APIApplicationCommandUserOption, APIApplicationCommandChannelOption } from "../interfaces/api/applicationCommandOptions";
import { APIDmChannel, APIGroupDmChannel, APIGuildVoiceChannel, APIGuildStageVoiceChannel, APIGuildTextChannel, APIGuildCategoryChannel, APIGuildMediaChannel, APIGuildForumChannel, APIThreadChannel, APIGuildAnnouncementChannel, APIGuildDirectoryChannel } from "../interfaces/api/channels";
import { APIBasicButtonComponent, APILinkButtonComponent, APIPremiumButtonComponent, APITextInputComponent, APIStringSelectMenuComponent, APIChannelSelectMenuComponent, APIOtherSelectMenuComponent, APISelectMenuActionRowComponent, APINonSelectMenuActionRowComponent } from "../interfaces/api/components";
import { APIApplicationCommandAutocompleteData, APIApplicationCommandAutocompleteInteraction, APIApplicationCommandData, APIApplicationCommandInteraction, APIMessageComponentInteraction, APIModalSubmitData, APIModalSubmitInteraction, APIOtherMessageComponentData, APIPingInteraction, APISelectMenuComponentData } from "../interfaces/api/interactions";
import { APIMessageApplicationCommand, APIUserApplicationCommand, APIPrimaryEntryPointApplicationCommand, APIChatInputApplicationCommand, APIModalInteractionCallbackData, APIMessageInteractionCallbackData, APIAutocompleteInteractionCallbackData } from "../interfaces/api/others";

export type APIGuildChannel = APIGuildVoiceChannel | APIGuildStageVoiceChannel | APIGuildTextChannel | APIGuildCategoryChannel | APIGuildMediaChannel | APIGuildForumChannel | APIGuildAnnouncementChannel | APIGuildDirectoryChannel;

export type APIChannel = APIDmChannel | APIGroupDmChannel | APIGuildChannel | APIThreadChannel;

export type APIButtonComponent = APIBasicButtonComponent | APILinkButtonComponent | APIPremiumButtonComponent;

export type APIMessageComponent = APIButtonComponent | APISelectMenuComponent | APIActionRowComponent | APITextInputComponent;

export type APISelectMenuComponent = APIStringSelectMenuComponent | APIChannelSelectMenuComponent | APIOtherSelectMenuComponent;

export type APIActionRowComponent = APISelectMenuActionRowComponent | APINonSelectMenuActionRowComponent;

export type APIMessageComponentData = APIOtherMessageComponentData | APISelectMenuComponentData;

export type APIInteractionData = APIApplicationCommandData | APIApplicationCommandAutocompleteData | APIMessageComponentData | APIModalSubmitData;

export type APIApplicationCommandInteractionDataOption = APIApplicationCommandData | APIMessageComponentData | APIModalSubmitData;

export type APIApplicationCommandOption = APIApplicationCommandSubCommandOption |
APIApplicationCommandSubCommandGroupOption |
APIApplicationCommandIntegerOption |
APIApplicationCommandNumberOption |
APIApplicationCommandStringOption |
APIApplicationCommandAttachmentOption |
APIApplicationCommandBooleanOption |
APIApplicationCommandMentionableOption |
APIApplicationCommandRoleOption |
APIApplicationCommandUserOption |
APIApplicationCommandChannelOption;

export type APIApplicationCommand = APIMessageApplicationCommand | APIUserApplicationCommand | APIPrimaryEntryPointApplicationCommand | APIChatInputApplicationCommand;

export type APIInteraction = APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction | APIMessageComponentInteraction | APIModalSubmitInteraction | APIPingInteraction;

export type APIInteractionCallbackData = APIModalInteractionCallbackData | APIMessageInteractionCallbackData | APIAutocompleteInteractionCallbackData;
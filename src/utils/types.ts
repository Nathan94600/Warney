import { MessageComponentTypes } from "./enums/other";
import { APIBasicButtonComponent, APILinkButtonComponent, APIPremiumButtonComponent, APITextInputComponent, APIStringSelectMenuComponent, APIChannelSelectMenuComponent, APIOtherSelectMenuComponent, APISelectMenuActionRowComponent, APINonSelectMenuActionRowComponent, APIApplicationCommandData, APIModalSubmitData, APIResolvedData, APIApplicationCommandSubCommandOption, APIApplicationCommandSubCommandGroupOption, APIApplicationCommandIntegerOption, APIApplicationCommandNumberOption, APIApplicationCommandStringOption, APIApplicationCommandChannelOption, APIPrimaryEntryPointApplicationCommand, APIChatInputApplicationCommand, APIApplicationCommandAttachmentOption, APIApplicationCommandBooleanOption, APIApplicationCommandMentionableOption, APIApplicationCommandRoleOption, APIApplicationCommandUserOption, APIMessageApplicationCommand, APIUserApplicationCommand } from "./interfaces/api/other";
import { APIDmChannel, APIGroupDmChannel, APIGuildVoiceChannel, APIGuildStageVoiceChannel, APIGuildTextChannel, APIGuildCategoryChannel, APIGuildMediaChannel, APIGuildForumChannel, APIThreadChannel, APIGuildAnnouncementChannel, APIGuildDirectoryChannel } from "./interfaces/api/channels";
import { ApplicationCommandAttachmentOption, ApplicationCommandBooleanOption, ApplicationCommandChannelOption, ApplicationCommandIntegerOption, ApplicationCommandMentionableOption, ApplicationCommandNumberOption, ApplicationCommandRoleOption, ApplicationCommandStringOption, ApplicationCommandSubCommandGroupOption, ApplicationCommandSubCommandOption, ApplicationCommandUserOption, Client, GatewayEvents, Opcodes, WsEvents } from "./interfaces/other";
import { APIMessageComponentData } from "./interfaces/api/messages";

export type Snowflake = string;

export type WsEvent<Event extends keyof WsEvents> = (client: Client, ...args: WsEvents[Event]) => void;

export type Opcode<Op extends keyof Opcodes> = (client: Client, ...args: Opcodes[Op]) => void;

export type GatewayEvent<Event extends keyof GatewayEvents> = (client: Client, ...args: GatewayEvents[Event]) => void;

export type APIChannel = APIDmChannel | APIGroupDmChannel | APIGuildVoiceChannel | APIGuildStageVoiceChannel | APIGuildTextChannel | APIGuildCategoryChannel | APIGuildMediaChannel | APIGuildForumChannel | APIThreadChannel | APIGuildAnnouncementChannel | APIGuildDirectoryChannel;

export type APIButtonComponent = APIBasicButtonComponent | APILinkButtonComponent | APIPremiumButtonComponent;

export type APIMessageComponent = APIButtonComponent | APISelectMenuComponent | APIActionRowComponent | APITextInputComponent;

export type APISelectMenuComponent = APIStringSelectMenuComponent | APIChannelSelectMenuComponent | APIOtherSelectMenuComponent;

export type SelectMenuComponentType = MessageComponentTypes.StringSelect | MessageComponentTypes.UserSelect | MessageComponentTypes.RoleSelect | MessageComponentTypes.MentionableSelect | MessageComponentTypes.ChannelSelect;

export type APIActionRowComponent = APISelectMenuActionRowComponent | APINonSelectMenuActionRowComponent;

export type APIInteractionData = APIApplicationCommandData | APIMessageComponentData | APIModalSubmitData | APIResolvedData;

export type ApplicationCommandOption = ApplicationCommandSubCommandOption |
ApplicationCommandSubCommandGroupOption |
ApplicationCommandIntegerOption |
ApplicationCommandNumberOption |
ApplicationCommandStringOption |
ApplicationCommandAttachmentOption |
ApplicationCommandBooleanOption |
ApplicationCommandMentionableOption |
ApplicationCommandRoleOption |
ApplicationCommandUserOption |
ApplicationCommandChannelOption;

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
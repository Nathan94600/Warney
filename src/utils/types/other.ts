import { MessageComponentTypes } from "../enums/types";
import { ApiGatewayEvents } from "../interfaces/api/other";
import { ApplicationCommandAttachmentOption, ApplicationCommandBooleanOption, ApplicationCommandChannelOption, ApplicationCommandIntegerOption, ApplicationCommandMentionableOption, ApplicationCommandNumberOption, ApplicationCommandRoleOption, ApplicationCommandStringOption, ApplicationCommandSubCommandGroupOption, ApplicationCommandSubCommandOption, ApplicationCommandUserOption, AutocompleteInteractionCallbackData, BasicButtonComponent, ChannelSelectMenuComponent, Client, DmChannel, GroupDmChannel, GuildAnnouncementChannel, GuildCategoryChannel, GuildDirectoryChannel, GuildForumChannel, GuildMediaChannel, GuildStageVoiceChannel, GuildTextChannel, GuildVoiceChannel, LinkButtonComponent, MessageInteractionCallbackData, ModalInteractionCallbackData, NonSelectMenuActionRowComponent, Opcodes, OtherSelectMenuComponent, PremiumButtonComponent, SelectMenuActionRowComponent, StringSelectMenuComponent, TextInputComponent, ThreadChannel, WsEvents } from "../interfaces/other";

export type Snowflake = string;

export type WsEvent<Event extends keyof WsEvents> = (client: Client, ...args: WsEvents[Event]) => void;

export type Opcode<Op extends keyof Opcodes> = (client: Client, ...args: Opcodes[Op]) => void;

export type GatewayEvent<Event extends keyof ApiGatewayEvents> = (client: Client, ...args: ApiGatewayEvents[Event]) => void;

export type SelectMenuComponentType = MessageComponentTypes.StringSelect | MessageComponentTypes.UserSelect | MessageComponentTypes.RoleSelect | MessageComponentTypes.MentionableSelect | MessageComponentTypes.ChannelSelect;

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

export type ButtonComponent = BasicButtonComponent | LinkButtonComponent | PremiumButtonComponent;

export type MessageComponent = ButtonComponent | SelectMenuComponent | ActionRowComponent | TextInputComponent;

export type SelectMenuComponent = StringSelectMenuComponent | ChannelSelectMenuComponent | OtherSelectMenuComponent;

export type ActionRowComponent = SelectMenuActionRowComponent | NonSelectMenuActionRowComponent;

export type InteractionCallbackData = ModalInteractionCallbackData | MessageInteractionCallbackData | AutocompleteInteractionCallbackData;

export type GuildChannel = GuildVoiceChannel | GuildStageVoiceChannel | GuildTextChannel | GuildCategoryChannel | GuildMediaChannel | GuildForumChannel | ThreadChannel | GuildAnnouncementChannel | GuildDirectoryChannel;

export type Channel = DmChannel | GroupDmChannel | GuildChannel;
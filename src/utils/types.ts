import { MessageComponentTypes } from "./enums/other";
import { APIBasicButtonComponent, APILinkButtonComponent, APIPremiumButtonComponent, APITextInputComponent, APIStringSelectMenuComponent, APIChannelSelectMenuComponent, APIOtherSelectMenuComponent, APISelectMenuActionRowComponent, APINonSelectMenuActionRowComponent, APIApplicationCommandData, APIModalSubmitData, APIResolvedData } from "./interfaces/api/other";
import { APIDmChannel, APIGroupDmChannel, APIGuildVoiceChannel, APIGuildStageVoiceChannel, APIGuildTextChannel, APIGuildCategoryChannel, APIGuildMediaChannel, APIGuildForumChannel, APIThreadChannel, APIGuildAnnouncementChannel, APIGuildDirectoryChannel } from "./interfaces/api/channels";
import { Client, GatewayEvents, Opcodes, WsEvents } from "./interfaces/other";
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
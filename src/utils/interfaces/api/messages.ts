import { ReactionTypes, MessageTypes, MessageActivityTypes, MessageReferenceTypes, InteractionTypes, ApplicationIntegrationTypes } from "../../enums/types";
import { Snowflake } from "../../types/other";
import { APIActionRowComponent } from "../../types/api";
import { APIEmoji, APIUser, APIChannelMention, APIAttachment, APIEmbed, APIReaction, APIApplication, APIStickerItem, APIRoleSubscriptionDataObject, APIPollObject, APIResolvedData } from "./other";
import { APIThreadChannel } from "./channels";
import { APIGuildMember } from "./guilds";

export interface APIMessagePollVoteRemoveFields {
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the answer
	 */
	answer_id: number;
};

export interface APIMessagePollVoteAddFields {
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the answer
	 */
	answer_id: number;
};

export interface APIMessageReactionRemoveEmojiEventFields {
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * Emoji that was removed
	 */
	emoji: APIEmoji;
};

export interface APIMessageReactionRemoveAllEventFields {
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
};

export interface APIMessageReactionRemoveEventFields {
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * Emoji used to react - [example](https://discord.com/developers/docs/resources/emoji#emoji-object-standard-emoji-example)
	 */
	emoji: APIEmoji;
	/**
	 * true if this was a super-reaction
	 */
	burst: boolean;
	/**
	 * The [type of reaction](https://discord.com/developers/docs/resources/message#get-reactions-reaction-types)
	 */
	type: ReactionTypes;
};

export interface APIMessageReactionAddEventFields {
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the message
	 */
	message_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * Member who reacted if this happened in a guild
	 */
	member?: APIGuildMember;
	/**
	 * Emoji used to react - [example](https://discord.com/developers/docs/resources/emoji#emoji-object-standard-emoji-example)
	 */
	emoji: APIEmoji;
	/**
	 * ID of the user who authored the message which was reacted to
	 */
	message_author_id?: Snowflake;
	/**
	 * true if this is a super-reaction
	 */
	burst: boolean;
	/**
	 * Colors used for super-reaction animation in "#rrggbb" format
	 */
	burst_colors?: string[];
	/**
	 * The [type of reaction](https://discord.com/developers/docs/resources/message#get-reactions-reaction-types)
	 */
	type: ReactionTypes;
};

export interface APIMessageDeleteBulkEventFields {
	/**
	 * IDs of the messages
	 */
	ids: Snowflake[];
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
};

export interface APIMessageDeleteEventFields {
	/**
	 * ID of the message
	 */
	id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
};

export interface APIMessageCreateExtraFields {
	/**
	 * ID of the guild the message was sent in - unless it is an ephemeral message
	 */
	guild_id?: Snowflake;
	/**
	 * Member properties for this message's author. Missing for ephemeral messages and messages from webhooks
	 */
	memerb?: Omit<APIGuildMember, "user">;
	/**
	 * Users specifically mentioned in the message
	 */
	mentions: (APIUser & { member: Omit<APIGuildMember, "user">; })[];
};

export interface APIMessage {
	/**
	 * id of the message
	 */
	id: Snowflake;
	/**
	 * id of the channel the message was sent in
	 */
	channel_id: Snowflake;
	/**
	 * the author of this message (not guaranteed to be a valid user, see below)
	 */
	author: APIUser;
	/**
	 * contents of the message
	 */
	content: string;
	/**
	 * when this message was sent
	 */
	timestamp: string;
	/**
	 * when this message was edited (or null if never)
	 */
	edited_timestamp: string | null;
	/**
	 * whether this was a TTS message
	 */
	tts: boolean;
	/**
	 * whether this message mentions everyone
	 */
	mention_everyone: boolean;
	/**
	 * users specifically mentioned in the message
	 */
	mentions: APIUser[];
	/**
	 * roles specifically mentioned in this message
	 */
	mention_roles: Snowflake[];
	/**
	 * channels specifically mentioned in this message
	 */
	mention_channels: APIChannelMention[];
	/**
	 * any attached files
	 */
	attachments: APIAttachment[];
	/**
	 * any embedded content
	 */
	embeds: APIEmbed[];
	/**
	 * reactions to the message
	 */
	reactions?: APIReaction[];
	/**
	 * used for validating a message was sent
	 */
	nonce?: string | number;
	/**
	 * whether this message is pinned
	 */
	pinned: boolean;
	/**
	 * if the message is generated by a webhook, this is the webhook's id
	 */
	webhook_id?: Snowflake;
	/**
	 * [type of message](https://discord.com/developers/docs/resources/message#message-object-message-types)
	 */
	type: MessageTypes;
	/**
	 * sent with Rich Presence-related chat embeds
	 */
	activity?: APIMessageActivity;
	/**
	 * sent with Rich Presence-related chat embeds
	 */
	application?: APIApplication;
	/**
	 * if the message is an [Interaction](https://discord.com/developers/docs/interactions/receiving-and-responding) or application-owned webhook, this is the id of the application
	 */
	application_id?: Snowflake;
	/**
	 * [message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags?: number;
	/**
	 * data showing the source of a crosspost, channel follow add, pin, or reply message
	 */
	message_reference?: APIMessageReference;
	/**
	 * the message associated with the `message_reference`. This is a minimal subset of fields in a message (e.g. `author` is excluded.)
	 */
	message_snapshots?: APIMessageSnapshot[];
	/**
	 * the message associated with the message_reference
	 */
	referenced_message?: APIMessage;
	/**
	 * [In preview](https://discord.com/developers/docs/change-log#user-installable-apps-preview). Sent if the message is sent as a result of an [interaction](https://discord.com/developers/docs/interactions/receiving-and-responding)
	 */
	interaction_metadata?: APIMessageInteractionMetadata;
	/**
	 * the thread that was started from this message, includes [thread member](https://discord.com/developers/docs/resources/channel#thread-member-object) object
	 */
	thread?: APIThreadChannel;
	/**
	 * sent if the message contains components like buttons, action rows, or other interactive components
	 */
	components?: APIActionRowComponent[];
	/**
	 * sent if the message contains stickers
	 */
	sticker_items?: APIStickerItem[];
	/**
	 * A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with `total_message_sent` on parent thread
	 */
	position?: number;
	/**
	 * data of the role subscription purchase or renewal that prompted this ROLE_SUBSCRIPTION_PURCHASE message
	 */
	role_subscription_data?: APIRoleSubscriptionDataObject;
	/**
	 * data for users, members, channels, and roles in the message's [auto-populated select menus](https://discord.com/developers/docs/interactions/message-components#select-menus)
	 */
	resolved?: APIResolvedData;
	/**
	 * A poll!
	 */
	poll?: APIPollObject;
	/**
	 * the call associated with the message
	 */
	call?: APIMessageCallObject;
};

export interface APIMessageActivity {
	/**
	 * [type of message activity](https://discord.com/developers/docs/resources/message#message-object-message-activity-types)
	 */
	type: MessageActivityTypes;
	/**
	 * party_id from a Rich Presence event
	 */
	party_id?: string;
};

export interface APIMessageReference {
	/**
	 * [type of reference](https://discord.com/developers/docs/resources/message#message-reference-types).
	 */
	type?: MessageReferenceTypes;
	/**
	 * id of the originating message
	 */
	message_id?: Snowflake;
	/**
	 * id of the originating message's channel
	 */
	channel_id?: Snowflake;
	/**
	 * id of the originating message's guild
	 */
	guild_id?: Snowflake;
	/**
	 * when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
	 */
	fall_if_not_exists?: boolean;
};

export interface APIMessageSnapshot {
	message: Pick<APIMessage, "type" | "content" | "embeds" | "attachments" | "timestamp" | "edited_timestamp" | "flags" | "mentions" | "mention_roles" | "sticker_items" | "components">
};

export interface APIMessageInteractionMetadata {
	/**
	 * ID of the interaction
	 */
	id: Snowflake;
	/**
	 * Type of interaction
	 */
	type: InteractionTypes;
	/**
	 * User who triggered the interaction
	 */
	user: APIUser;
	/**
	 * IDs for installation context(s) related to an interaction. Details in [Authorizing Integration Owners Object](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object)
	 */
	authorizing_integration_owners: Record<ApplicationIntegrationTypes, Snowflake | "0">;
	/**
	 * ID of the original response message, present only on [follow-up messages](https://discord.com/developers/docs/interactions/receiving-and-responding)
	 */
	original_response_message_id?: Snowflake;
	/**
	 * ID of the message that contained interactive component, present only on messages created from component interactions
	 */
	interacted_message_id?: Snowflake;
	/**
	 * Metadata for the interaction that was used to open the modal, present only on modal submit interactions
	 */
	triggering_interaction_metadata?: APIMessageInteractionMetadata;
};

export interface APIMessageCallObject {
	/**
	 * array of [user](https://discord.com/developers/docs/resources/user#user-object) object ids that participated in the call
	 */
	participants: Snowflake[];
	/**
	 * time when call ended
	 */
	ended_timestamp?: string | null;
};
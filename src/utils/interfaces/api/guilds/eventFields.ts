import { Snowflake } from "../../../types/others";
import { APIPresenceUpdateEventFields } from "../eventFields";
import { APIRole, APIUser, APIAvatarDecorationData, APIEmoji, APISticker } from "../others";
import { APIGuildMember } from "./others";

export interface APIGuildSoundboardSoundDeleteEventFields {
	/**
	 * ID of the sound that was deleted
	 */
	sound_id: Snowflake;
	/**
	 * ID of the guild the sound was in
	 */
	guild_id: Snowflake;
};

export interface APIGuildScheduledEventUserRemoveEventFields {
	/**
	 * ID of the guild scheduled event
	 */
	guild_scheduled_event_id: Snowflake;
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildScheduledEventUserAddEventFields {
	/**
	 * ID of the guild scheduled event
	 */
	guild_scheduled_event_id: Snowflake;
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildRoleDeleteEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * ID of the role
	 */
	role_id: Snowflake;
};

export interface APIGuildRoleUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Role that was updated
	 */
	role: APIRole;
};

export interface APIGuildRoleCreateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Role that was created
	 */
	role: APIRole;
};

export interface APIGuildMembersChunkEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Set of guild members
	 */
	members: APIGuildMember[];
	/**
	 * Chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)
	 */
	chunk_index: number;
	/**
	 * Total number of expected chunks for this response
	 */
	chunk_count: number;
	/**
	 * When passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here
	 */
	not_found?: [];
	/**
	 * When passing `true` to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here
	 */
	presences?: APIPresenceUpdateEventFields[];
	/**
	 * Nonce used in the [Guild Members Request](https://discord.com/developers/docs/topics/gateway-events#request-guild-members)
	 */
	nonce?: string;
};

export interface APIGuildMemberUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User role ids
	 */
	roles: Snowflake[];
	/**
	 * User
	 */
	user: APIUser;
	/**
	 * Nickname of the user in the guild
	 */
	nick?: string | null;
	/**
	 * Member's [guild avatar hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	avatar: string | null;
	/**
	 * When the user joined the guild
	 */
	joined_at: string | null;
	/**
	 * When the user starting [boosting](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-) the guild
	 */
	premium_since?: string | null;
	/**
	 * Whether the user is deafened in voice channels
	 */
	deaf?: boolean;
	/**
	 * Whether the user is muted in voice channels
	 */
	mute?: boolean;
	/**
	 * Whether the user has not yet passed the guild's [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) requirements
	 */
	pending?: boolean;
	/**
	 * When the user's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
	 */
	communication_disabled_until?: string | null;
	/**
	 * [Guild member flags](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags) represented as a bit set, defaults to 0
	 */
	flasg?: number;
	/**
	 * Data for the member's guild avatar decoration
	 */
	avatar_decoration_data?: APIAvatarDecorationData | null;
};

export interface APIGuildMemberRemoveEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was removed
	 */
	user: APIUser;
};

export interface APIGuildBanAddEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was banned
	 */
	user: APIUser;
};

export interface APIGuildBanRemoveEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * User who was banned
	 */
	user: APIUser;
};

export interface APIGuildEmojisUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Array of [emojis](https://discord.com/developers/docs/resources/emoji#emoji-object)
	 */
	emojis: APIEmoji[];
};

export interface APIGuildStickersUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Array of [stickers](https://discord.com/developers/docs/resources/sticker#sticker-object)
	 */
	stickers: APISticker[];
};

export interface APIGuildIntegrationsUpdateEventFields {
	/**
	 * ID of the guild whose integrations were updated
	 */
	guild_id: Snowflake;
};
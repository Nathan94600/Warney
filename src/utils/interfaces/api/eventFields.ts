import { AnimationTypes, InviteTargetTypes, TriggerTypes } from "../../enums/types";
import { PresenceStatus } from "../../enums/others";
import { Snowflake } from "../../types/others";
import { APIActivity } from "./activities";
import { APIThreadChannel } from "./channels";
import { APIGuildMember } from "./guilds/others";
import { APIApplication, APIAutoModerationAction, APIClientStatus, APIEmoji, APISoundboardSound, APIThreadMember, APIUnavailableGuild, APIUser } from "./others";

export interface APIWebhooksUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
};

export interface APIVoiceServerUpdateEventFields {
	/**
	 * Voice connection token
	 */
	token: string;
	/**
	 * Guild this voice server update is for
	 */
	guild_id: Snowflake;
	/**
	 * Voice server host
	 */
	endpoint: string | null;
};

export interface APIVoiceChannelEffectSendEventFields {
	/**
	 * ID of the channel the effect was sent in
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild the effect was sent in
	 */
	guild_id: Snowflake;
	/**
	 * ID of the user who sent the effect
	 */
	user_id: Snowflake;
	/**
	 * The emoji sent, for emoji reaction and soundboard effects
	 */
	emoji?: APIEmoji;
	/**
	 * The [type of emoji animation](https://discord.com/developers/docs/topics/gateway-events#voice-channel-effect-send-animation-types), for emoji reaction and soundboard effects
	 */
	animation_type?: AnimationTypes | null;
	/**
	 * The ID of the emoji animation, for emoji reaction and soundboard effects
	 */
	animation_id?: number;
	/**
	 * The ID of the soundboard sound, for soundboard effects
	 */
	sound_id?: Snowflake | number;
	/**
	 * The volume of the soundboard sound, from 0 to 1, for soundboard effects
	 */
	sound_volume?: number;
};

export interface APITypingStartEventFields {
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the user
	 */
	user_id: Snowflake;
	/**
	 * Unix time (in seconds) of when the user started typing
	 */
	timestamp: number;
	/**
	 * Member who started typing if this happened in a guild
	 */
	member?: APIGuildMember;
};

export interface APIInviteDeleteEventFields {
	/**
	 * Channel of the invite
	 */
	channel_id: Snowflake;
	/**
	 * Guild of the invite
	 */
	guild_id?: Snowflake;
	/**
	 * Unique invite [code](https://discord.com/developers/docs/resources/invite#invite-object)
	 */
	code: string;
};

export interface APIInviteCreateEventFields {
	/**
	 * Channel the invite is for
	 */
	channel_id: Snowflake;
	/**
	 * Unique invite [code](https://discord.com/developers/docs/resources/invite#invite-object)
	 */
	code: string;
	/**
	 * Time at which the invite was created
	 */
	created_at: string;
	/**
	 * Guild of the invite
	 */
	guild_id?: Snowflake;
	/**
	 * User that created the invite
	 */
	inviter?: APIUser;
	/**
	 * How long the invite is valid for (in seconds)
	 */
	max_age: number;
	/**
	 * Maximum number of times the invite can be used
	 */
	max_uses: number;
	/**
	 * [Type of target](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) for this voice channel invite
	 */
	target_type?: InviteTargetTypes;
	/**
	 * User whose stream to display for this voice channel stream invite
	 */
	target_user?: APIUser;
	/**
	 * Embedded application to open for this voice channel embedded application invite
	 */
	target_application?: APIApplication;
	/**
	 * Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role)
	 */
	temporary: boolean;
	/**
	 * How many times the invite has been used (always will be 0)
	 */
	uses: number;
};

export interface APIIntegrationDeleteEventFields {
	/**
	 * Integration ID
	 */
	id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * ID of the bot/OAuth2 application for this discord integration
	 */
	application_id?: Snowflake;
};

export interface APIIntegrationCreateEventAdditionalFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIIntegrationUpdateEventAdditionalFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APISoundboardSoundsEventFields {
	/**
	 * The guild's soundboard sounds
	 */
	soundboard_sounds: APISoundboardSound[];
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIReadyEventFields {
	/**
	 * [API version](https://discord.com/developers/docs/reference#api-versioning-api-versions)
	 */
	v: number;
	/**
	 * Information about the user including email
	 */
	user: APIUser;
	/**
	 * Guilds the user is in
	 */
	guilds: APIUnavailableGuild[];
	/**
	 * Used for resuming connections
	 */
	session_id: string;
	/**
	 * Gateway URL for resuming connections
	 */
	resume_gateway_url: string;
	/**
	 * [Shard information](https://discord.com/developers/docs/topics/gateway#sharding) associated with this session, if sent when identifying
	 */
	shard?: [number, number];
	/**
	 * Contains `id` and `flags`
	 */
	application: Required<Pick<APIApplication, "id" | "flags">>;
};

export interface APIAutoModerationActionExecutionEventFields {
	/**
	 * ID of the guild in which action was executed
	 */
	guild_id: Snowflake;
	/**
	 * Action which was executed
	 */
	action: APIAutoModerationAction;
	/**
	 * ID of the rule which action belongs to
	 */
	rule_id: Snowflake;
	/**
	 * Trigger type of rule which was triggered
	 */
	rule_trigger_type: TriggerTypes;
	/**
	 * ID of the user which generated the content which triggered the rule
	 */
	user_id: Snowflake;
	/**
	 * ID of the channel in which user content was posted
	 */
	channel_id: Snowflake;
	/**
	 * ID of any user message which content belongs to
	 */
	message_id: Snowflake;
	/**
	 * ID of any system auto moderation messages posted as a result of this action
	 */
	alert_system_message_id?: Snowflake;
	/**
	 * User-generated text content
	 */
	content: string;
	/**
	 * Word or phrase configured in the rule that triggered the rule
	 */
	matched_keyword: string | null;
	/**
	 * Substring in content that triggered the rule
	 */
	matched_content: string | null;
};

export interface APIChannelPinsUpdateEventFields {
	/**
	 * ID of the guild
	 */
	guild_id?: Snowflake;
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
	/**
	 * Time at which the most recent pinned message was pinned
	 */
	last_pin_timestamp?: string | null;
};

export interface APIThreadListSyncEventFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Parent channel IDs whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channel_ids that have no active threads as well, so you know to clear that data.
	 */
	channel_ids?: Snowflake[];
	/**
	 * All active threads in the given channels that the current user can access
	 */
	threads: APIThreadChannel[];
	/**
	 * All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to
	 */
	members: APIThreadMember[];
};

export interface APIThreadMemberUpdateEventExtaFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIThreadMembersUpdateEventFields {
	/**
	 * ID of the thread
	 */
	id: Snowflake;
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Approximate number of members in the thread, capped at 50
	 */
	member_count: number;
	/**
	 * Users who were added to the thread
	 */
	added_members?: Omit<APIThreadMember, "member">[];
	/**
	 * ID of the users who were removed from the thread
	 */
	removed_member_ids?: Snowflake[];
};

export interface APIPresenceUpdateEventFields {
	/**
	 * User whose presence is being updated
	 */
	user: Partial<APIUser> & { id: string; };
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
	/**
	 * Either "idle", "dnd", "online", or "offline"
	 */
	status: PresenceStatus;
	/**
	 * User's current activities
	 */
	activities: APIActivity[];
	/**
	 * User's platform-dependent status
	 */
	client_status: APIClientStatus;
};
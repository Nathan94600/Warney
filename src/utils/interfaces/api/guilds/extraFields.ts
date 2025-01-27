import { APIGuildChannel } from "../../../types/api";
import { Snowflake } from "../../../types/others";
import { APIThreadChannel } from "../channels";
import { APIPresenceUpdateEventFields } from "../eventFields";
import { APIVoiceState, APIStageInstance, APISoundboardSound } from "../others";
import { APIGuildMember, APIGuildScheduledEvent } from "./others";

export interface APIGuildCreateExtraFields {
	/**
	 * When this guild was joined at
	 */
	joined_at: string;
	/**
	 * `true` if this is considered a large guild
	 */
	large: boolean;
	/**
	 * `true` if this guild is unavailable due to an outage
	 */
	unavailable?: boolean;
	/**
	 * Total number of members in this guild
	 */
	member_count: number;
	/**
	 * States of members currently in voice channels; lacks the `guild_id` key
	 */
	voice_states: APIVoiceState[];
	/**
	 * Users in the guild
	 */
	members: APIGuildMember[];
	/**
	 * Channels in the guild
	 */
	channels:APIGuildChannel[];
	/**
	 * All active threads in the guild that current user has permission to view
	 */
	threads: APIThreadChannel[];
	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold`
	 */
	presences: APIPresenceUpdateEventFields[];
	/**
	 * Stage instances in the guild
	 */
	stage_instances: APIStageInstance[];
	/**
	 * Scheduled events in the guild
	 */
	guild_scheduled_events: APIGuildScheduledEvent[];
	/**
	 * Soundboard sounds in the guild
	 */
	soundboard_sounds: APISoundboardSound[];
};

export interface APIGuildMemberAddExtraFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};

export interface APIGuildAuditLogEntryCreateExtraFields {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;
};
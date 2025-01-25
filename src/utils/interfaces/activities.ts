import { ActivityTypes } from "../enums/types";
import { Snowflake } from "../types/others";

export interface Activity {
	/**
	 * Activity's name
	 */
	name: string;
	/**
	 * [Activity type](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types)
	 */
	type: ActivityTypes;
	/**
	 * Stream URL, is validated when type is 1
	 */
	url?: string | null;
	/**
	 * Unix timestamp (in milliseconds) of when the activity was added to the user's session
	 */
	createdAt: number;
	/**
	 * Unix timestamps for start and/or end of the game
	 */
	timestamps?: ActivityTimestamps;
	/**
	 * Application ID for the game
	 */
	applicationId?: Snowflake;
	/**
	 * What the player is currently doing
	 */
	details?: string | null;
	/**
	 * User's current party status, or text used for a custom status
	 */
	state?: string | null;
	/**
	 * Emoji used for a custom status
	 */
	emoji?: ActivityEmoji | null;
	/**
	 * Information for the current party of the player
	 */
	party?: ActivityParty;
	/**
	 * Images for the presence and their hover texts
	 */
	assets?: ActivityAssets;
	/**
	 * Secrets for Rich Presence joining and spectating
	 */
	secrets?: ActivitySecrets;
	/**
	 * Whether or not the activity is an instanced game session
	 */
	instance?: boolean;
	/**
	 * [Activity flags](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags) `OR`d together, describes what the payload includes
	 */
	flags?: number;
	/**
	 * Custom buttons shown in the Rich Presence (max 2)
	 */
	buttons?: ActivityButton[];
};

export interface ActivityTimestamps {
	/**
	 * Unix time (in milliseconds) of when the activity started
	 */
	start?: number;
	/**
	 * Unix time (in milliseconds) of when the activity ends
	 */
	end?: number;
};

export interface ActivityEmoji {
	/**
	 * Name of the emoji
	 */
	name: string;
	/**
	 * ID of the emoji
	 */
	id?: Snowflake;
	/**
	 * Whether the emoji is animated
	 */
	animated?: boolean;
};

export interface ActivityParty {
	/**
	 * ID of the party
	 */
	id?: string;
	/**
	 * Used to show the party's current and maximum size
	 */
	size ?: [number, number];
};

export interface ActivityAssets {
	/**
	 * See [Activity Asset Image](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-asset-image)
	 */
	largeImage?: string;
	/**
	 * Text displayed when hovering over the large image of the activity
	 */
	largeText?: string;
	/**
	 * See [Activity Asset Image](https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-asset-image)
	 */
	smallImage?: string;
	/**
	 * Text displayed when hovering over the small image of the activity
	 */
	smallText?: string;
};

export interface ActivitySecrets {
	/**
	 * Secret for joining a party
	 */
	join?: string;
	/**
	 * Secret for spectating a game
	 */
	spectate?: string;
	/**
	 * Secret for a specific instanced match
	 */
	match?: string;
};

/**
 * When received over the gateway, the `buttons` field is an array of strings, which are the button labels. Bots cannot access a user's activity button URLs. When sending, the `buttons` field must be an array of the below object:
 */
export interface ActivityButton {
	/**
	 * Text shown on the button (1-32 characters)
	 */
	label: string;
	/**
	 * URL opened when clicking the button (1-512 characters)
	 */
	url: string;
};
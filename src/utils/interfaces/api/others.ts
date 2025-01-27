import { Locales, MembershipStates, OAuth2Scopes, IntegrationExpireBehaviors, PresenceStatus, PrivacyLevels, AuditLogEvents, GatewayEventNames } from "../../enums/others";
import { SubscriptionStatus, InteractionTypes, ApplicationIntegrationTypes, InteractionContextTypes, ApplicationCommandTypes, ChannelTypes, TeamMemberRoleTypes, SelectDefaultValueTypes, StickerFormatTypes, LayoutTypes, IntegrationTypes, PremiumTypes, ApplicationCommandPermissionTypes, EventTypes, TriggerTypes, KeywordPresetTypes, ActionTypes, OverwriteTypes, EntitlementTypes, StickerTypes, EntryPointCommandHandlerTypes, InteractionCallbackTypes, AllowedMentionsTypes } from "../../enums/types";
import { APIChannel, APIActionRowComponent, APIApplicationCommandOption, APIInteractionCallbackData, APIInteraction, APIGuildChannel } from "../../types/api";
import { Snowflake } from "../../types/others";
import { APIApplicationCommandOptionChoice } from "./applicationCommandOptions";
import { APIThreadChannel } from "./channels";
import { APIEmbed } from "./embeds";
import { APIAutoModerationActionExecutionEventFields, APIChannelPinsUpdateEventFields, APIIntegrationCreateEventAdditionalFields, APIIntegrationDeleteEventFields, APIIntegrationUpdateEventAdditionalFields, APIInviteCreateEventFields, APIInviteDeleteEventFields, APIPresenceUpdateEventFields, APIReadyEventFields, APISoundboardSoundsEventFields, APIThreadListSyncEventFields, APIThreadMembersUpdateEventFields, APIThreadMemberUpdateEventExtaFields, APITypingStartEventFields, APIVoiceChannelEffectSendEventFields, APIVoiceServerUpdateEventFields, APIWebhooksUpdateEventFields } from "./eventFields";
import { APIGuildBanAddEventFields, APIGuildBanRemoveEventFields, APIGuildEmojisUpdateEventFields, APIGuildStickersUpdateEventFields, APIGuildIntegrationsUpdateEventFields, APIGuildMemberRemoveEventFields, APIGuildMemberUpdateEventFields, APIGuildMembersChunkEventFields, APIGuildRoleCreateEventFields, APIGuildRoleUpdateEventFields, APIGuildRoleDeleteEventFields, APIGuildScheduledEventUserAddEventFields, APIGuildScheduledEventUserRemoveEventFields, APIGuildSoundboardSoundDeleteEventFields } from "./guilds/eventFields";
import { APIGuildCreateExtraFields, APIGuildAuditLogEntryCreateExtraFields, APIGuildMemberAddExtraFields } from "./guilds/extraFields";
import { APIGuild, APIGuildMember, APIGuildScheduledEvent } from "./guilds/others";
import { APIMessage, APIMessageCreateExtraFields, APIMessageDeleteBulkEventFields, APIMessageDeleteEventFields, APIMessagePollVoteAddFields, APIMessagePollVoteRemoveFields, APIMessageReactionAddEventFields, APIMessageReactionRemoveAllEventFields, APIMessageReactionRemoveEmojiEventFields, APIMessageReactionRemoveEventFields } from "./messages";

export interface APISubscription {
	/**
	 * ID of the subscription
	 */
	id: Snowflake;
	/**
	 * ID of the user who is subscribed
	 */
	user_id: Snowflake;
	/**
	 * List of SKUs subscribed to
	 */
	sku_ids: Snowflake[];
	/**
	 * List of entitlements granted for this subscription
	 */
	entitlement_ids: Snowflake[];
	/**
	 * Start of the current subscription period
	 */
	current_period_start: string;
	/**
	 * End of the current subscription period
	 */
	current_period_end: string;
	/**
	 * Current status of the subscription
	 */
	status: SubscriptionStatus;
	/**
	 * When the subscription was canceled
	 */
	canceled_at: string | null;
	/**
	 * ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription. Missing unless queried with a private OAuth scope.
	 */
	country?: string;
};

export interface APIChannelMention {
	/**
	 * id of the channel
	 */
	id: Snowflake;
	/**
	 * id of the guild containing the channel
	 */
	guild_id: Snowflake;
	/**
	 * the [type of channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)
	 */
	type: ChannelTypes;
	/**
	 * the name of the channel
	 */
	name: string;
};

export interface APIReaction {
	/**
	 * Total number of times this emoji has been used to react (including super reacts)
	 */
	count: number;
	/**
	 * [Reaction count details object](https://discord.com/developers/docs/resources/message#reaction-count-details-object)
	 */
	count_details: APIReactionCountDetails;
	/**
	 * Whether the current user reacted using this emoji
	 */
	me: boolean;
	/**
	 * Whether the current user super-reacted using this emoji
	 */
	me_burst: boolean;
	/**
	 * emoji information
	 */
	emoji: APIEmoji;
	/**
	 * HEX colors used for super reaction
	 */
	burst_colors: string[];
};

export interface APIReactionCountDetails {
	/**
	 * Count of super reactions
	 */
	burst: number;
	/**
	 * Count of normal reactions
	 */
	normal: number;
};

export interface APIApplication {
	/**
	 * ID of the app
	 */
	id: Snowflake;
	/**
	 * Name of the app
	 */
	name: string;
	/**
	 * [Icon hash](https://discord.com/developers/docs/reference#image-formatting) of the app
	 */
	icon: string | null;
	/**
	 * Description of the app
	 */
	description: string;
	/**
	 * List of RPC origin URLs, if RPC is enabled
	 */
	rpc_origins?: string[];
	/**
	 * When `false`, only the app owner can add the app to guilds
	 */
	bot_public: boolean;
	/**
	 * When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow
	 */
	bot_require_code_grant: boolean;
	/**
	 * Partial user object for the bot user associated with the app
	 */
	bot?: APIUser;
	/**
	 * URL of the app's Terms of Service
	 */
	terms_of_service_url?: string;
	/**
	 * URL of the app's Privacy Policy
	 */
	privacy_policy_url?: string;
	/**
	 * Partial user object for the owner of the app
	 */
	owner?: APIUser;
	/**
	 * Hex encoded key for verification in interactions and the GameSDK's [GetTicket](https://github.com/discord/discord-api-docs/blob/legacy-gamesdk/docs/game_sdk/Applications.md#getticket)
	 */
	verify_key: string;
	/**
	 * If the app belongs to a team, this will be a list of the members of that team
	 */
	team: APITeam | null;
	/**
	 * Guild associated with the app. For example, a developer support server.
	 */
	guild_id?: Snowflake;
	/**
	 * Partial object of the associated guild
	 */
	guild?: APIGuild;
	/**
	 * If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
	 */
	primary_sku_id?: Snowflake;
	/**
	 * If this app is a game sold on Discord, this field will be the URL slug that links to the store page
	 */
	slug?: string;
	/**
	 * App's default rich presence invite [cover image hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	cover_image?: string;
	/**
	 * App's public [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags)
	 */
	flags?: number;
	/**
	 * Approximate count of guilds the app has been added to
	 */
	approximate_guild_count?: number;
	/**
	 * Approximate count of users that have installed the app
	 */
	approximate_user_install_count?: number;
	/**
	 * Array of redirect URIs for the app
	 */
	redirect_uris?: string[];
	/**
	 * [Interactions endpoint URL](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) for the app
	 */
	interactions_endpoint_url?: string;
	/**
	 * Role connection verification URL for the app
	 */
	role_connections_verification_url?: string | null;
	/**
	 * List of tags describing the content and functionality of the app. Max of 5 tags.
	 */
	tags?: string[];
	/**
	 * Settings for the app's default in-app authorization link, if enabled
	 */
	install_params?: APIInstallParams;
	/**
	 * Default scopes and permissions for each supported installation context. Value for each key is an [integration type configuration object](https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object)
	 */
	integration_types_config?: Record<ApplicationIntegrationTypes, APIApplicationIntegrationTypeConfigurationObject>;
	/**
	 * Default custom authorization URL for the app, if enabled
	 */
	custom_install_url?: string;
};

export interface APITeam {
	/**
	 * Hash of the image of the team's icon
	 */
	icon: string | null;
	/**
	 * Unique ID of the team
	 */
	id: Snowflake;
	/**
	 * Members of the team
	 */
	members: APITeamMember[];
	/**
	 * Name of the team
	 */
	name: string;
	/**
	 * User ID of the current team owner
	 */
	owner_user_id: Snowflake;
};

export interface APITeamMember {
	/**
	 * User's [membership state](https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum) on the team
	 */
	membership_state: MembershipStates;
	/**
	 * ID of the parent team of which they are a member
	 */
	team_id: Snowflake;
	/**
	 * Avatar, discriminator, ID, and username of the user
	 */
	user: APIUser;
	/**
	 * [Role](https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types) of the team member
	 */
	role: TeamMemberRoleTypes;
};

export interface APIApplicationIntegrationTypeConfigurationObject {
	oauth2_install_params?: APIInstallParams;
};

export interface APIInstallParams {
	/**
	 * [Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) to add the application to the server with
	 */
	scopes: OAuth2Scopes[];
	/**
	 * [Permissions](https://discord.com/developers/docs/topics/permissions) to request for the bot role
	 */
	permissions: string;
};

export interface APISelectDefaultValue {
	/**
	 * ID of a user, role, or channel
	 */
	id: Snowflake;
	/**
	 * Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"`
	 */
	type: SelectDefaultValueTypes;
};

export interface APISelectOption {
	/**
	 * User-facing name of the option; max 100 characters
	 */
	label: string;
	/**
	 * Dev-defined value of the option; max 100 characters
	 */
	value: string;
	/**
	 * Additional description of the option; max 100 characters
	 */
	description?: string;
	/**
	 * `id`, `name`, and `animated`
	 */
	emoji?: Pick<APIEmoji, "name" | "id" | "animated">;
	/**
	 * Will show this option as selected by default
	 */
	default?: boolean;
};

export interface APIStickerItem {
	/**
	 * id of the sticker
	 */
	id: Snowflake;
	/**
	 * name of the sticker
	 */
	name: string;
	/**
	 * [type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)
	 */
	format_type: StickerFormatTypes;
};

export interface APIRoleSubscriptionDataObject {
	/**
	 * the id of the sku and listing that the user is subscribed to
	 */
	role_subscription_listing_id: Snowflake;
	/**
	 * the name of the tier that the user is subscribed to
	 */
	tier_name: string;
	/**
	 * the cumulative number of months that the user has been subscribed for
	 */
	total_months_subscribed: number;
	/**
	 * whether this notification is for a renewal rather than a new purchase
	 */
	is_renewal: boolean;
};

export interface APIAttachment {
	/**
	 * attachment id
	 */
	id: Snowflake;
	/**
	 * name of file attached
	 */
	filename: string;
	/**
	 * the title of the file
	 */
	title?: string;
	/**
	 * description for the file (max 1024 characters)
	 */
	description?: string;
	/**
	 * the attachment's [media type](https://en.wikipedia.org/wiki/Media_type)
	 */
	content_type?: string;
	/**
	 * size of file in bytes
	 */
	size: number;
	/**
	 * source url of file
	 */
	url: string;
	/**
	 * a proxied url of file
	 */
	proxy_url: string;
	/**
	 * height of file (if image)
	 */
	height?: number | null;
	/**
	 * width of file (if image)
	 */
	width?: number | null;
	/**
	 * whether this attachment is ephemeral
	 */
	ephemeral?: boolean;
	/**
	 * the duration of the audio file (currently for voice messages)
	 */
	duration_secs?: number;
	/**
	 * base64 encoded bytearray representing a sampled waveform (currently for voice messages)
	 */
	waveform?: string;
	/**
	 * [attachment flags](https://discord.com/developers/docs/resources/message#attachment-object-attachment-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags?: number;
};

export interface APIPollObject {
	/**
	 * The question of the poll. Only `text` is supported.
	 */
	question: APIPollMediaObject;
	/**
	 * Each of the answers available in the poll.
	 */
	answers: APIPollAnswerObject[];
	/**
	 * The time when the poll ends.
	 */
	expiry: string | null;
	/**
	 * Whether a user can select multiple answers
	 */
	allow_multiselect: boolean;
	/**
	 * The [layout type](https://discord.com/developers/docs/resources/poll#layout-type) of the poll
	 */
	layout_type: LayoutTypes;
	/**
	 * The results of the poll
	 */
	results?: APIPollResultsObject;
};

export interface APIPollAnswerObject {
	/**
	 * The ID of the answer
	 */
	answer_id: number;
	/**
	 * The data of the answer
	 */
	poll_media: APIPollMediaObject;
};

export interface APIPollMediaObject {
	/**
	 * The text of the field
	 */
	text?: string;
	/**
	 * The emoji of the field
	 */
	emoji?: Pick<APIEmoji, "id" | "name">;
};

export interface APIPollResultsObject {
	/**
	 * Whether the votes have been precisely counted
	 */
	is_finalized: boolean;
	/**
	 * The counts for each answer
	 */
	answer_counts: APIPollAnswerCountObject[];
};

export interface APIPollAnswerCountObject {
	/**
	 * The `answer_id`
	 */
	id: number;
	/**
	 * The number of votes for this answer
	 */
	count: number;
	/**
	 * Whether the current user voted for this answer
	 */
	me_voted: boolean;
};

export interface APIIntegration {
	id: Snowflake;
	name: string;
	type: IntegrationTypes;
	enabled: boolean;
	syncing?: boolean;
	role_id?: Snowflake;
	enable_emoticons?: boolean;
	expire_behavior?: IntegrationExpireBehaviors;
	expire_grace_period?: number;
	user?: APIUser;
	account: APIIntegrationAccount;
	synced_at?: string;
	subscriber_count?: number;
	revoked?: boolean;
	application?: APIIntegrationApplication;
	scopes?: OAuth2Scopes[];
};

export interface APIIntegrationAccount {
	/**
	 * id of the account
	 */
	id: string;
	/**
	 * name of the account
	 */
	name: string;
};

export interface APIIntegrationApplication {
	/**
	 * the id of the app
	 */
	id: Snowflake;
	/**
	 * the name of the app
	 */
	name: string;
	/**
	 * the [icon hash](https://discord.com/developers/docs/reference#image-formatting) of the app
	 */
	icon: string | null;
	/**
	 * the description of the app
	 */
	description: string;
	/**
	 * the bot associated with this application
	 */
	bot?: APIUser;
};

export interface APIUser {
	/**
	 * the user's id
	 */
	id: Snowflake;
	/**
	 * the user's username, not unique across the platform
	 */
	username: string;
	/**
	 * the user's Discord-tag
	 */
	discriminator: string;
	/**
	 * the user's display name, if it is set. For bots, this is the application name
	 */
	global_name: string;
	/**
	 * the user's [avatar hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	avatar: string | null;
	/**
	 * whether the user belongs to an OAuth2 application
	 */
	bot?: boolean;
	/**
	 * whether the user is an Official Discord System user (part of the urgent message system)
	 */
	system?: boolean;
	/**
	 * whether the user has two factor enabled on their account
	 */
	mfa_enabled: boolean;
	/**
	 * the user's [banner hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	banner?: string | null;
	/**
	 * the user's banner color encoded as an integer representation of hexadecimal color code
	 */
	accent_color?: number | null;
	/**
	 * the user's chosen [language option](https://discord.com/developers/docs/reference#locales)
	 */
	locale?: Locales;
	/**
	 * the [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	flags?: number;
	/**
	 * whether the email on this account has been verified
	 */
	verified?: boolean;
	/**
	 * the user's email
	 */
	email?: string | null;
	/**
	 * the [type of Nitro subscription](https://discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account
	 */
	premium_type?: PremiumTypes;
	/**
	 * the public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
	 */
	public_flags?: number;
	/**
	 * data for the user's avatar decoration
	 */
	avatar_decoration_data?: APIAvatarDecorationData | null;
};

/**
 * The data for the user's [avatar decoration](https://support.discord.com/hc/en-us/articles/13410113109911-Avatar-Decorations).
 */
export interface APIAvatarDecorationData {
	/**
	 * the [avatar decoration hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	asset: string;
	/**
	 * id of the avatar decoration's SKU
	 */
	sku_id: Snowflake;
};

/**
 * A partial [guild](https://discord.com/developers/docs/resources/guild#guild-object) object.
 * Represents an Offline Guild, or a Guild whose information has not been provided through [Guild Create](https://discord.com/developers/docs/topics/gateway-events#guild-create) events during the Gateway connect.
 */
export interface APIUnavailableGuild {
	/**
	 * guild id
	 */
	id: Snowflake;
	unavailable: true;
};

/**
 * Application command permissions allow you to enable or disable commands for specific users, roles, or channels within a guild.
 */
export interface APIApplicationCommandPermission {
	/**
	 * ID of the role, user, or channel. It can also be a [permission constant](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants)
	 */
	id: Snowflake;
	/**
	 * role (`1`), user (`2`), or channel (`3`)
	 */
	type: ApplicationCommandPermissionTypes;
	/**
	 * `true` to allow, `false`, to disallow
	 */
	permission: boolean;
};

export interface APIAutoModerationRule {
	/**
	 * the id of this rule
	 */
	id: Snowflake;
	/**
	 * the id of the guild which this rule belongs to
	 */
	guild_id: Snowflake;
	/**
	 * the rule name
	 */
	name: string;
	/**
	 * the user which first created this rule
	 */
	creator_id: Snowflake;
	/**
	 * the rule [event type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types)
	 */
	event_type: EventTypes;
	/**
	 * the rule [trigger type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types)
	 */
	trigger_type: TriggerTypes;
	/**
	 * the rule [trigger metadata](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata)
	 */
	trigger_metadata: APITriggerMetadata;
	/**
	 * the actions which will execute when the rule is triggered
	 */
	actions: APIAutoModerationAction[];
	/**
	 * whether the rule is enabled
	 */
	enabled: boolean;
	/**
	 * the role ids that should not be affected by the rule (Maximum of 20)
	 */
	exempt_roles: Snowflake[];
	/**
	 * the channel ids that should not be affected by the rule (Maximum of 50)
	 */
	exempt_channels: Snowflake[];
};

/**
 * Additional data used to determine whether a rule should be triggered. Different fields are relevant based on the value of [trigger_type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types).

 */
export interface APITriggerMetadata {
	/**
	 * substrings which will be searched for in content (Maximum of 1000) (Associated trigger types: KEYWORD, MEMBER_PROFILE)
	 */
	keyword_filter: string[];
	/**
	 * regular expression patterns which will be matched against content (Maximum of 10) (Associated trigger types: KEYWORD, MEMBER_PROFILE)
	 */
	regex_patterns: string[];
	/**
	 * the internally pre-defined wordsets which will be searched for in content (Associated trigger types: KEYWORD_PRESET)
	 */
	presets: KeywordPresetTypes;
	/**
	 * substrings which should not trigger the rule (Maximum of 100 or 1000) (Associated trigger types: KEYWORD, KEYWORD_PRESET, MEMBER_PROFILE)
	 */
	allow_list: string[];
	/**
	 * total number of unique role and user mentions allowed per message (Maximum of 50) (Associated trigger types: MENTION_SPAM)
	 */
	mentionTotalLimit: number;
	/**
	 * whether to automatically detect mention raids (Associated trigger types: MENTION_SPAM)
	 */
	mentionRaidProtectionEnabled: boolean;
};

/**
 * An action which will execute whenever a rule is triggered.
 */
export interface APIAutoModerationAction {
	/**
	 * the type of action
	 */
	type: ActionTypes;
	/**
	 * additional metadata needed during execution for this specific action type
	 */
	metadata?: APIActionMetadata;
};

/**
 * Additional data used when an action is executed. Different fields are relevant based on the value of [action type](https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types).
 */
export interface APIActionMetadata {
	/**
	 * channel to which user content should be logged	(Associated action types: SEND_ALERT_MESSAGE) (Constraints: existing channel)
	 */
	channel_id: Snowflake;
	/**
	 * timeout duration in seconds (Associated action types: TIMEOUT) (Constraints: maximum of 2419200 seconds (4 weeks))
	 */
	duration_seconds: number;
	/**
	 * additional explanation that will be shown to members whenever their message is blocked (Associated action types: BLOCK_MESSAGE) (Constraints: maximum of 150 characters)
	 */
	custom_message? :string;
};

export interface APIOverwrite {
	/**
	 * role or user id
	 */
	id: Snowflake;
	/**
	 * either 0 (role) or 1 (member)
	 */
	type: OverwriteTypes;
	/**
	 * permission bit set
	 */
	allow: string;
	/**
	 * permission bit set
	 */
	deny: string;
};

export interface APIVoiceRegion {
	/**
	 * unique ID for the region
	 */
	id: string;
	/**
	 * name of the region
	 */
	name: string;
	/**
	 * true for a single server that is closest to the current user's client
	 */
	optimal: boolean;
	/**
	 * whether this is a deprecated voice region (avoid switching to these)
	 */
	deprecated: boolean;
	/**
	 * whether this is a custom voice region (used for events/etc)
	 */
	custom: boolean;
};

export interface APIThreadMetadata {
	/**
	 * whether the thread is archived
	 */
	archived: boolean;
	/**
	 * the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080
	 */
	auto_archive_duration: 60 | 1440 | 4320 | 10080;
	/**
	 * timestamp when the thread's archive status was last changed, used for calculating recent activity
	 */
	archive_timestamp: string;
	/**
	 * whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it
	 */
	locked: boolean;
	/**
	 * whether non-moderators can add other non-moderators to a thread; only available on private threads
	 */
	invitable?: boolean;
	/**
	 * timestamp when the thread was created; only populated for threads created after 2022-01-09
	 */
	create_timestamp?: string | null;
};

export interface APIThreadMember {
	/**
	 * ID of the thread
	 */
	id?: Snowflake;
	/**
	 * ID of the user
	 */
	user_id?: Snowflake;
	/**
	 * Time the user last joined the thread
	 */
	join_timestamp: string;
	/**
	 * Any user-thread settings, currently only used for notifications
	 */
	flags: number;
	/**
	 * Additional information about the user
	 */
	member?: APIGuildMember;
};

export interface APIForumTag {
	/**
	 * the id of the tag
	 */
	id: Snowflake;
	/**
	 * the name of the tag (0-20 characters)
	 */
	name: string;
	/**
	 * whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission
	 */
	moderated: boolean;
	/**
	 * the id of a guild's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of the emoji
	 */
	emoji_name: string | null;
};

export interface APIDefaultReaction {
	/**
	 * the id of a guild's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of the emoji
	 */
	emoji_name: string | null;
};

export interface APIEntitlement {
	/**
	 * ID of the entitlement
	 */
	id: Snowflake;
	/**
	 * ID of the SKU
	 */
	sku_id: Snowflake;
	/**
	 * ID of the parent application
	 */
	application_id: Snowflake;
	/**
	 * ID of the user that is granted access to the entitlement's sku
	 */
	user_id?: Snowflake;
	/**
	 * [Type of entitlement](https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-types)
	 */
	type: EntitlementTypes;
	/**
	 * Entitlement was deleted
	 */
	deleted: boolean;
	/**
	 * Start date at which the entitlement is valid. Not present when using test entitlements.
	 */
	starts_at?: string;
	/**
	 * Date at which the entitlement is no longer valid. Not present when using test entitlements.
	 */
	ends_at?: string;
	/**
	 * ID of the guild that is granted access to the entitlement's sku
	 */
	guild_id?: Snowflake;
	/**
	 * For consumable items, whether or not the entitlement has been consumed
	 */
	consumed?: boolean;
};

export interface APIVoiceState {
	/**
	 * the guild id this voice state is for
	 */
	guild_id?: Snowflake;
	/**
	 * the channel id this user is connected to
	 */
	channel_id: Snowflake;
	/**
	 * the user id this voice state is for
	 */
	user_id: Snowflake;
	/**
	 * the guild member this voice state is for
	 */
	member?: APIGuildMember;
	/**
	 * the session id for this voice state
	 */
	session_id: string;
	/**
	 * whether this user is deafened by the server
	 */
	deaf: boolean;
	/**
	 * whether this user is muted by the server
	 */
	mute: boolean;
	/**
	 * whether this user is locally deafened
	 */
	self_deaf: boolean;
	/**
	 * whether this user is locally muted
	 */
	self_mute: boolean;
	/**
	 * whether this user is streaming using "Go Live"
	 */
	self_stream?: boolean;
	/**
	 * whether this user's camera is enabled
	 */
	self_video: boolean;
	/**
	 * whether this user's permission to speak is denied
	 */
	suppress: boolean;
	/**
	 * the time at which the user requested to speak
	 */
	request_to_speak_timestamp: string | null;
};

/**
 * Active sessions are indicated with an "online", "idle", or "dnd" string per platform. If a user is offline or invisible, the corresponding field is not present.
 */
export interface APIClientStatus {
	/**
	 * User's status set for an active desktop (Windows, Linux, Mac) application session
	 */
	desktop?: PresenceStatus;
	/**
	 * User's status set for an active mobile (iOS, Android) application session
	 */
	mobile?: PresenceStatus;
	/**
	 * User's status set for an active web (browser, bot user) application session
	 */
	web?: PresenceStatus;
};

export interface APIStageInstance {
	/**
	 * The id of this Stage instance
	 */
	id: Snowflake;
	/**
	 * The guild id of the associated Stage channel
	 */
	guild_id: Snowflake;
	/**
	 * The id of the associated Stage channel
	 */
	channel_id: Snowflake;
	/**
	 * The topic of the Stage instance (1-120 characters)
	 */
	topic: string;
	/**
	 * The [privacy level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance
	 */
	privacy_level: PrivacyLevels;
	/**
	 * Whether or not Stage Discovery is disabled (deprecated)
	 */
	discoverable_disabled: boolean;
	/**
	 * The id of the scheduled event for this Stage instance
	 */
	guild_scheduled_event_id: Snowflake | null;
};

export interface APISoundboardSound {
	/**
	 * the name of this sound
	 */
	name: string;
	/**
	 * the id of this sound
	 */
	sound_id: Snowflake;
	/**
	 * the volume of this sound, from 0 to 1
	 */
	volume: number;
	/**
	 * the id of this sound's custom emoji
	 */
	emoji_id: Snowflake | null;
	/**
	 * the unicode character of this sound's standard emoji
	 */
	emoji_name: string | null;
	/**
	 * the id of the guild this sound is in
	 */
	guild_id?: Snowflake;
	/**
	 * whether this sound can be used, may be false due to loss of Server Boosts
	 */
	available: boolean;
	/**
	 * the user who created this sound
	 */
	user?: APIUser;
};

export interface APIRole {
	/**
	 * role id
	 */
	id: Snowflake;
	/**
	 * role name
	 */
	name: string;
	/**
	 * integer representation of hexadecimal color code
	 */
	color: number;
	/**
	 * if this role is pinned in the user listing
	 */
	hoist: boolean;
	/**
	 * role [icon hash](https://discord.com/developers/docs/reference#image-formatting)
	 */
	icon?: string | null;
	/**
	 * role unicode emoji
	 */
	unicode_emoji?: string | null;
	/**
	 * position of this role (roles with the same position are sorted by id)
	 */
	position: number;
	/**
	 * permission bit set
	 */
	permissions: string;
	/**
	 * whether this role is managed by an integration
	 */
	managed: boolean;
	/**
	 * whether this role is mentionable
	 */
	mentionable: boolean;
	/**
	 * the tags this role has
	 */
	tags?: APIRoleTags;
	/**
	 * [role flags](https://discord.com/developers/docs/topics/permissions#role-object-role-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
	 */
	flags: number;
};

/**
 * Tags with type `null` represent booleans. They will be present and set to `null` if they are "true", and will be not present if they are "false".

 */
export interface APIRoleTags {
	/**
	 * the id of the bot this role belongs to
	 */
	bot_id?: Snowflake;
	/**
	 * the id of the integration this role belongs to
	 */
	integration_id?: Snowflake;
	/**
	 * whether this is the guild's Booster role
	 */
	premium_subscriber?: null;
	/**
	 * the id of this role's subscription sku and listing
	 */
	subscription_listing_id?: Snowflake;
	/**
	 * whether this role is available for purchase
	 */
	available_for_purchase?: null;
	/**
	 * whether this role is a guild's linked role
	 */
	guild_connections?: null;
};

export interface APIEmoji {
	/**
	 * [emoji id](https://discord.com/developers/docs/reference#image-formatting)
	 */
	id: Snowflake | null;
	/**
	 * emoji name
	 */
	name: string | null;
	/**
	 * roles allowed to use this emoji
	 */
	roles?: string[];
	/**
	 * user that created this emoji
	 */
	user?: APIUser;
	/**
	 * whether this emoji must be wrapped in colons
	 */
	require_colons?: boolean;
	/**
	 * whether this emoji is managed
	 */
	managed?: boolean;
	/**
	 * whether this emoji is animated
	 */
	animated?: boolean;
	/**
	 * whether this emoji can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
};

export interface APIWelcomeScreen {
	/**
	 * the server description shown in the welcome screen
	 */
	description: string;
	/**
	 * the channels shown in the welcome screen, up to 5
	 */
	welcome_channels: APIWelcomeScreenChannel[];
};

export interface APIWelcomeScreenChannel {
	/**
	 * the channel's id
	 */
	channel_id: Snowflake;
	/**
	 * the description shown for the channel
	 */
	description: string;
	/**
	 * the [emoji id](https://discord.com/developers/docs/reference#image-formatting), if the emoji is custom
	 */
	emoji_id: Snowflake | null;
	/**
	 * the emoji name if custom, the unicode character if standard, or `null` if no emoji is set
	 */
	emoji_name: string | null;
};

export interface APISticker {
	/**
	 * [id of the sticker](https://discord.com/developers/docs/reference#image-formatting)
	 */
	id: Snowflake;
	/**
	 * for standard stickers, id of the pack the sticker is from
	 */
	pack_id?: Snowflake;
	/**
	 * name of the sticker
	 */
	name: string;
	/**
	 * description of the sticker
	 */
	description: string | null;
	/**
	 * autocomplete/suggestion tags for the sticker (max 200 characters)
	 */
	tags: string;
	/**
	 * [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)
	 */
	type: StickerTypes;
	/**
	 * [type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)
	 */
	format_type: StickerFormatTypes;
	/**
	 * whether this guild sticker can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
	/**
	 * id of the guild that owns this sticker
	 */
	guild_id?: Snowflake;
	/**
	 * the user that uploaded the guild sticker
	 */
	user?: APIUser;
	/**
	 * the standard sticker's sort order within its pack
	 */
	sort_value?: number;
};

export interface APIAuditLogEntry {
	/**
	 * ID of the affected entity (webhook, user, role, etc.)
	 */
	target_id: string | null;
	/**
	 * Changes made to the target_id
	 */
	changes: APIAuditLogChange[];
	/**
	 * User or app that made the changes
	 */
	user_id: Snowflake | null;
	/**
	 * ID of the entry
	 */
	id: Snowflake;
	/**
	 * Type of action that occurred
	 */
	action_type: AuditLogEvents;
	/**
	 * Additional info for certain event types
	 */
	options?: APIOptionalAuditEntryInfo;
	/**
	 * Reason for the change (1-512 characters)
	 */
	reason?: string;
};

export interface APIAuditLogChange {
	/**
	 * New value of the key
	 */
	new_value?: string;
	/**
	 * Old value of the key
	 */
	old_value?: string;
	/**
	 * Name of the changed entity, with a few [exceptions](https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions)
	 */
	key: string;
};

export interface APIOptionalAuditEntryInfo {
	/**
	 * ID of the app whose permissions were targeted
	 */
	application_id: Snowflake;
	/**
	 * Name of the Auto Moderation rule that was triggered
	 */
	auto_moderation_rule_name: string;
	/**
	 * Trigger type of the Auto Moderation rule that was triggered
	 */
	auto_moderation_rule_trigger_type: string;
	/**
	 * Channel in which the entities were targeted
	 */
	channel_id: Snowflake;
	/**
	 * Number of entities that were targeted
	 */
	count: string;
	/**
	 * ID of the overwritten entity
	 */
	delete_member_days: string;
	/**
	 * ID of the overwritten entity
	 */
	id: Snowflake;
	/**
	 * Number of members removed by the prune
	 */
	members_removed: string;
	/**
	 * ID of the message that was targeted
	 */
	message_id: Snowflake;
	/**
	 * Name of the role if type is `"0"` (not present if type is `"1"`)
	 */
	role_name: string;
	/**
	 * Type of overwritten entity - role (`"0"`) or member (`"1"`)
	 */
	type: string;
	/**
	 * The type of integration which performed the action
	 */
	integration_type: string;
};

export interface APIBaseApplicationCommand {
	/**
	 * Unique ID of command
	 */
	id: Snowflake;
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type?: ApplicationCommandTypes;
	/**
	 * ID of the parent application
	 */
	application_id: Snowflake;
	/**
	 * Guild ID of the command, if not global
	 */
	guild_id?: Snowflake;
	/**
	 * [Name of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming), 1-32 characters
	 */
	name: string;
	/**
	 * Localization dictionary for `name` field. Values follow the same restrictions as `name`
	 */
	name_localizations?: Record<Locales, string> | null;
	/**
	 * Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands
	 */
	description: string;
	/**
	 * Localization dictionary for `description` field. Values follow the same restrictions as `description`
	 */
	description_localizations?: Record<Locales, string> | null;
	/**
	 * Set of [permissions](https://discord.com/developers/docs/topics/permissions) represented as a bit set
	 */
	default_member_permissions: string | null;
	/**
	 * Indicates whether the command is [age-restricted](https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands), defaults to `false`
	 */
	nsfw?: boolean;
	/**
	 * [Installation contexts](https://discord.com/developers/docs/resources/application#installation-context) where the command is available, only for globally-scoped commands.
	 * Defaults to your app's [configured contexts](https://discord.com/developers/docs/resources/application#installation-context)
	 */
	integration_types?: IntegrationTypes[];
	/**
	 * [Interaction context(s)](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types) where the command can be used, only for globally-scoped commands.
	 * By default, all interaction context types included for new commands.
	 */
	contexts?: InteractionContextTypes[] | null;
	/**
	 * Autoincrementing version identifier updated during substantial record changes
	 */
	version: Snowflake;
};

export interface APIMessageApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.Message;
};

export interface APIUserApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.User;
};

export interface APIPrimaryEntryPointApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type: ApplicationCommandTypes.PrimaryEntryPoint;
	/**
	 * Determines whether the interaction is handled by the app's interactions handler or by Discord
	 */
	handler?: EntryPointCommandHandlerTypes;
};

export interface APIChatInputApplicationCommand extends APIBaseApplicationCommand {
	/**
	 * [Type of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types), defaults to `1`
	 */
	type?: ApplicationCommandTypes.ChatInput;
	/**
	 * Parameters for the command, max of 25
	 */
	options?: APIApplicationCommandOption[];
};

export interface APIApplcationCommandParams {
	/**
	 * [Name of command](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming), 1-32 characters
	 */
	name: string;
	/**
	 * Localization dictionary for the `name` field. Values follow the same restrictions as `name`
	 */
	name_localizations?: Record<Locales, string> | null;
	/**
	 * 1-100 character description for `CHAT_INPUT` commands
	 */
	description?: string;
	/**
	 * Localization dictionary for the `description` field. Values follow the same restrictions as `description`
	 */
	description_localizations?: Record<Locales, string> | null;
	/**
	 * the parameters for the command, max of 25
	 */
	options?: APIApplicationCommandOption[];
	/**
	 * Set of [permissions](https://discord.com/developers/docs/topics/permissions) represented as a bit set
	 */
	default_member_permissions?: string | null;
	/**
	 * [Installation context(s)](https://discord.com/developers/docs/resources/application#installation-context) where the command is available
	 */
	integration_types?: ApplicationIntegrationTypes[];
	/**
	 * [Interaction context(s)](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types) where the command can be used
	 */
	contexts?: InteractionContextTypes[];
	/**
	 * Type of command, defaults `1` if not set
	 */
	type?: ApplicationCommandTypes;
	/**
	 * Indicates whether the command is [age-restricted](https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands)
	 */
	nsfw?: boolean;
};

export interface APIInteractionCallbackResponse {
	/**
	 * The interaction object associated with the interaction response.
	 */
	interaction: APIInteractionCallback;
	/**
	 * The resource that was created by the interaction response.
	 */
	resource?: APIInteractionResource;
};

export interface APIInteractionResource {
	/**
	 * [Interaction callback type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)
	 */
	type: InteractionCallbackTypes;
	/**
	 * Represents the Activity launched by this interaction.
	 */
	activity_instance?: APIInteractionCallbackActivityInstanceResource;
	/**
	 * Message created by the interaction.
	 */
	message?: APIMessage;
};

export interface APIInteractionCallback {
	/**
	 * ID of the interaction
	 */
	id: Snowflake;
	/**
	 * [Interaction type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type)
	 */
	type: InteractionTypes;
	/**
	 * Instance ID of the Activity if one was launched or joined
	 */
	activity_instance_id?: string;
	/**
	 * ID of the message that was created by the interaction
	 */
	response_message_id?: Snowflake;
	/**
	 * Whether or not the message is in a loading state
	 */
	response_message_loading?: boolean;
	/**
	 * Whether or not the response message was ephemeral
	 */
	response_message_ephemeral?: boolean;
};

export interface APIInteractionCallbackActivityInstanceResource {
	/**
	 * Instance ID of the Activity if one was launched or joined.
	 */
	id: string;
};

export interface APIInteractionResponse {
	/**
	 * Type of response
	 */
	type: InteractionCallbackTypes;
	/**
	 * An optional response message
	 */
	data?: APIInteractionCallbackData;
};

export interface APIAllowedMentions {
	/**
	 * An array of [allowed mention types](https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types) to parse from the content.
	 */
	parse: AllowedMentionsTypes[];
	/**
	 * Array of role_ids to mention (Max size of 100)
	 */
	roles: Snowflake[];
	/**
	 * Array of user_ids to mention (Max size of 100)
	 */
	users: Snowflake[];
	/**
	 * For replies, whether to mention the author of the message being replied to (default false)
	 */
	replied_user: boolean;
};

/**
 * Not all message fields are currently supported.
 */
export interface APIMessageInteractionCallbackData {
	/**
	 * Whether the response is TTS
	 */
	tts?: boolean;
	/**
	 * Message content
	 */
	content?: string;
	/**
	 * Supports up to 10 embeds
	 */
	embeds?: APIEmbed[];
	/**
	 * [Allowed mentions](https://discord.com/developers/docs/resources/message#allowed-mentions-object) object
	 */
	allowed_mentions?: APIAllowedMentions;
	/**
	 * [Message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS`, `EPHEMERAL`, and `SUPPRESS_NOTIFICATIONS` can be set)
	 */
	flags?: number;
	/**
	 * Message components
	 */
	components?: APIActionRowComponent[];
	/**
	 * Attachment objects with filename and description
	 */
	attachments?: APIAttachment[];
	/**
	 * Details about the poll
	 */
	poll?: APIPollCreateRequestObject;
};

export interface APIAutocompleteInteractionCallbackData {
	/**
	 * autocomplete choices (max of 25 choices)
	 */
	choices: APIApplicationCommandOptionChoice<string | number>[];
};

export interface APIModalInteractionCallbackData {
	/**
	 * Developer-defined identifier for the modal, max 100 characters
	 */
	custom_id: string;
	/**
	 * Title of the popup modal, max 45 characters
	 */
	title: string;
	/**
	 * Between 1 and 5 (inclusive) components that make up the modal
	 */
	components: APIActionRowComponent[];
};

export interface APIPollCreateRequestObject {
	/**
	 * The question of the poll. Only `text` is supported.
	 */
	question: APIPollMediaObject;
	/**
	 * Each of the answers available in the poll, up to 10
	 */
	answers: APIPollAnswerObject[];
	/**
	 * Number of hours the poll should be open for, up to 32 days. Defaults to 24
	 */
	duration?: number;
	/**
	 * Whether a user can select multiple answers. Defaults to false
	 */
	allow_multiselect?: boolean;
	/**
	 * The [layout type](https://discord.com/developers/docs/resources/poll#layout-type) of the poll. Defaults to... DEFAULT!
	 */
	layout_type?: LayoutTypes;
};

export interface ApiGatewayEvents {
	[GatewayEventNames.Ready]: [d: APIReadyEventFields];
	[GatewayEventNames.Resumed]: [];
	[GatewayEventNames.ApplicationCommandPermissionsUpdate]: [d: ApplicationCommandPermissionTypes];
	[GatewayEventNames.AutoModerationRuleCreate]: [d: APIAutoModerationRule];
	[GatewayEventNames.AutoModerationRuleUpdate]: [d: APIAutoModerationRule];
	[GatewayEventNames.AutoModerationRuleDelete]: [d: APIAutoModerationRule];
	[GatewayEventNames.AutoModerationActionExecution]: [d: APIAutoModerationActionExecutionEventFields];
	[GatewayEventNames.ChannelCreate]: [d: APIGuildChannel];
	[GatewayEventNames.ChannelUpdate]: [d: Exclude<APIChannel, APIThreadChannel>];
	[GatewayEventNames.ChannelDelete]: [d: Exclude<APIChannel, APIThreadChannel>];
	[GatewayEventNames.ChannelPinsUpdate]: [d: APIChannelPinsUpdateEventFields];
	[GatewayEventNames.ThreadCreate]: [d: APIThreadChannel];
	[GatewayEventNames.ThreadUpdate]: [d: APIThreadChannel];
	[GatewayEventNames.ThreadDelete]: [d: APIThreadChannel];
	[GatewayEventNames.ThreadListSync]: [d: APIThreadListSyncEventFields];
	[GatewayEventNames.ThreadMemberUpdate]: [d: APIThreadMember & APIThreadMemberUpdateEventExtaFields];
	[GatewayEventNames.ThreadMembersUpdate]: [d: APIThreadMembersUpdateEventFields];
	[GatewayEventNames.EntitlementCreate]: [d: APIEntitlement];
	[GatewayEventNames.EntitlementUpdate]: [d: APIEntitlement];
	[GatewayEventNames.EntitlementDelete]: [d: APIEntitlement];
	[GatewayEventNames.GuildCreate]: [d: (APIGuild & APIGuildCreateExtraFields) | APIUnavailableGuild];
	[GatewayEventNames.GuildUpdate]: [d: APIGuild];
	[GatewayEventNames.GuildDelete]: [d: APIUnavailableGuild];
	[GatewayEventNames.GuildAuditLogEntryCreate]: [d: APIAuditLogEntry & APIGuildAuditLogEntryCreateExtraFields];
	[GatewayEventNames.GuildBanAdd]: [d: APIGuildBanAddEventFields];
	[GatewayEventNames.GuildBanRemove]: [d: APIGuildBanRemoveEventFields];
	[GatewayEventNames.GuildEmojisUpdate]: [d: APIGuildEmojisUpdateEventFields];
	[GatewayEventNames.GuildStickersUpdate]: [d: APIGuildStickersUpdateEventFields];
	[GatewayEventNames.GuildIntegrationsUpdate]: [d: APIGuildIntegrationsUpdateEventFields];
	[GatewayEventNames.GuildMemberAdd]: [d: APIGuildMember & APIGuildMemberAddExtraFields];
	[GatewayEventNames.GuildMemberRemove]: [d: APIGuildMemberRemoveEventFields];
	[GatewayEventNames.GuildMemberUpdate]: [d: APIGuildMemberUpdateEventFields];
	[GatewayEventNames.GuildMembersChunk]: [d: APIGuildMembersChunkEventFields];
	[GatewayEventNames.GuildRoleCreate]: [d: APIGuildRoleCreateEventFields];
	[GatewayEventNames.GuildRoleUpdate]: [d: APIGuildRoleUpdateEventFields];
	[GatewayEventNames.GuildRoleDelete]: [d: APIGuildRoleDeleteEventFields];
	[GatewayEventNames.GuildScheduledEventCreate]: [d: APIGuildScheduledEvent];
	[GatewayEventNames.GuildScheduledEventUpdate]: [d: APIGuildScheduledEvent];
	[GatewayEventNames.GuildScheduledEventDelete]: [d: APIGuildScheduledEvent];
	[GatewayEventNames.GuildScheduledEventUserAdd]: [d: APIGuildScheduledEventUserAddEventFields];
	[GatewayEventNames.GuildScheduledEventUserRemove]: [d: APIGuildScheduledEventUserRemoveEventFields];
	[GatewayEventNames.GuildSoundboardSoundCreate]: [d: APISoundboardSound];
	[GatewayEventNames.GuildSoundboardSoundUpdate]: [d: APISoundboardSound];
	[GatewayEventNames.GuildSoundboardSoundDelete]: [d: APIGuildSoundboardSoundDeleteEventFields];
	[GatewayEventNames.GuildSoundboardSoundsUpdate]: [d: APISoundboardSound[]];
	[GatewayEventNames.SoundboardSounds]: [d: APISoundboardSoundsEventFields];
	[GatewayEventNames.IntegrationCreate]: [d: APIIntegration & APIIntegrationCreateEventAdditionalFields];
	[GatewayEventNames.IntegrationUpdate]: [d: APIIntegration & APIIntegrationUpdateEventAdditionalFields];
	[GatewayEventNames.IntegrationDelete]: [d: APIIntegrationDeleteEventFields];
	[GatewayEventNames.InteractionCreate]: [d: APIInteraction];
	[GatewayEventNames.InviteCreate]: [d: APIInviteCreateEventFields];
	[GatewayEventNames.InviteDelete]: [d: APIInviteDeleteEventFields];
	[GatewayEventNames.MessageCreate]: [d: APIMessage & APIMessageCreateExtraFields];
	[GatewayEventNames.MessageUpdate]: [d: APIMessage & APIMessageCreateExtraFields];
	[GatewayEventNames.MessageDelete]: [d: APIMessageDeleteEventFields];
	[GatewayEventNames.MessageDeleteBulk]: [d: APIMessageDeleteBulkEventFields];
	[GatewayEventNames.MessageReactionAdd]: [d: APIMessageReactionAddEventFields];
	[GatewayEventNames.MessageReactionRemove]: [d: APIMessageReactionRemoveEventFields];
	[GatewayEventNames.MessageReactionRemoveAll]: [d: APIMessageReactionRemoveAllEventFields];
	[GatewayEventNames.MessageReactionRemoveEmoji]: [d: APIMessageReactionRemoveEmojiEventFields];
	[GatewayEventNames.PresenceUpdate]: [d: APIPresenceUpdateEventFields];
	[GatewayEventNames.StageInstanceCreate]: [d: APIStageInstance];
	[GatewayEventNames.StageInstanceUpdate]: [d: APIStageInstance];
	[GatewayEventNames.StageInstanceDelete]: [d: APIStageInstance];
	[GatewayEventNames.SubscriptionCreate]: [d: APISubscription];
	[GatewayEventNames.SubscriptionUpdate]: [d: APISubscription];
	[GatewayEventNames.SubscriptionDelete]: [d: APISubscription];
	[GatewayEventNames.TypingStart]: [d: APITypingStartEventFields];
	[GatewayEventNames.UserUpdate]: [d: APIUser];
	[GatewayEventNames.VoiceChannelEffectSend]: [d: APIVoiceChannelEffectSendEventFields];
	[GatewayEventNames.VoiceStateUpdate]: [d: APIVoiceState];
	[GatewayEventNames.VoiceServerUpdate]: [d: APIVoiceServerUpdateEventFields];
	[GatewayEventNames.WebhooksUpdate]: [d: APIWebhooksUpdateEventFields];
	[GatewayEventNames.MessagePollVoteAdd]: [d: APIMessagePollVoteAddFields];
	[GatewayEventNames.MessagePollVoteRemove]: [d: APIMessagePollVoteRemoveFields];
};

export interface APIResolvedData {
	/**
	 * IDs and User objects
	 */
	users?: Record<Snowflake, APIUser>;
	/**
	 * IDs and partial Member objects
	 */
	members?: Record<Snowflake, Omit<APIGuildMember, "user" | "deaf" | "mute">>;
	/**
	 * IDs and Role objects
	 */
	roles?: Record<Snowflake, APIRole>;
	/**
	 * IDs and partial Channel objects
	 */
	channels?: Record<Snowflake, Pick<APIChannel, "id" | "name" | "type"> | Pick<APIGuildChannel, "id" | "name" | "type" | "permissions"> | Pick<APIThreadChannel, "id" | "name" | "type" | "permissions" | "thread_metadata" | "parent_id">>;
	/**
	 * IDs and partial Message objects
	 */
	messages?: Record<Snowflake, APIMessage>;
	/**
	 * IDs and attachment objects
	 */
	attachments?: Record<Snowflake, APIAttachment>;
};
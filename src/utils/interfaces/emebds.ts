import { EmbedTypes } from "../enums/types";

export interface Embed {
	/**
	 * title of embed
	 */
	title?: string;
	/**
	 * [type of embed](https://discord.com/developers/docs/resources/message#embed-object-embed-types) (always "rich" for webhook embeds)
	 */
	type?: EmbedTypes;
	/**
	 * description of embed
	 */
	description?: string;
	/**
	 * url of embed
	 */
	url?: string;
	/**
	 * timestamp of embed content
	 */
	timestamp?: string;
	/**
	 * color code of the embed
	 */
	color?: number;
	/**
	 * footer information
	 */
	footer?: EmbedFooter;
	/**
	 * image information
	 */
	image?: EmbedImage;
	/**
	 * thumbnail information
	 */
	thumbnail?: EmbedThumbnail;
	/**
	 * video information
	 */
	video?: EmbedVideo;
	/**
	 * provider information
	 */
	provider?: EmbedProvider;
	/**
	 * author information
	 */
	author?: EmbedAuthor;
	/**
	 * fields information, max of 25
	 */
	fields?: EmbedField[];
};

export interface EmbedField {
	/**
	 * name of the field
	 */
	name: string;
	/**
	 * value of the field
	 */
	value: string;
	/**
	 * whether or not this field should display inline
	 */
	inline?: boolean;
};

export interface EmbedAuthor {
	/**
	 * name of author
	 */
	name: string;
	/**
	 * url of author (only supports http(s))
	 */
	url?: string;
	/**
	 * url of author icon (only supports http(s) and attachments)
	 */
	iconUrl?: string;
	/**
	 * a proxied url of author icon
	 */
	proxyIconUrl?: string;
};

export interface EmbedProvider {
	/**
	 * name of provider
	 */
	name?: string;
	/**
	 * url of provider
	 */
	url?: string;
};

export interface EmbedVideo {
	/**
	 * source url of video
	 */
	url?: string;
	/**
	 * a proxied url of the video
	 */
	proxyUrl?: string;
	/**
	 * height of video
	 */
	height?: number;
	/**
	 * width of video
	 */
	width?: number;
};

export interface EmbedThumbnail {
	/**
	 * source url of thumbnail (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the thumbnail
	 */
	proxyUrl?: string;
	/**
	 * height of thumbnail
	 */
	height?: number;
	/**
	 * width of thumbnail
	 */
	width?: number;
};

export interface EmbedImage {
	/**
	 * source url of image (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the image
	 */
	proxyUrl?: string;
	/**
	 * height of image
	 */
	height?: number;
	/**
	 * width of image
	 */
	width?: number;
};

export interface EmbedFooter {
	/**
	 * footer text
	 */
	text: string;
	/**
	 * url of footer icon (only supports http(s) and attachments)
	 */
	iconUrl?: string;
	/**
	 * a proxied url of footer icon
	 */
	proxyIconUrl?: string;
};
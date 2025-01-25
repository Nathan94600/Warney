import { EmbedTypes } from "../../enums/types";

export interface APIEmbed {
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
	footer?: APIEmbedFooter;
	/**
	 * image information
	 */
	image?: APIEmbedImage;
	/**
	 * thumbnail information
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * video information
	 */
	video?: APIEmbedVideo;
	/**
	 * provider information
	 */
	provider?: APIEmbedProvider;
	/**
	 * author information
	 */
	author?: APIEmbedAuthor;
	/**
	 * fields information, max of 25
	 */
	fields?: APIEmbedField[];
};

export interface APIEmbedField {
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

export interface APIEmbedAuthor {
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
	icon_url?: string;
	/**
	 * a proxied url of author icon
	 */
	proxy_icon_url?: string;
};

export interface APIEmbedProvider {
	/**
	 * name of provider
	 */
	name?: string;
	/**
	 * url of provider
	 */
	url?: string;
};

export interface APIEmbedVideo {
	/**
	 * source url of video
	 */
	url?: string;
	/**
	 * a proxied url of the video
	 */
	proxy_url?: string;
	/**
	 * height of video
	 */
	height?: number;
	/**
	 * width of video
	 */
	width?: number;
};

export interface APIEmbedThumbnail {
	/**
	 * source url of thumbnail (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the thumbnail
	 */
	proxy_url?: string;
	/**
	 * height of thumbnail
	 */
	height?: number;
	/**
	 * width of thumbnail
	 */
	width?: number;
};

export interface APIEmbedImage {
	/**
	 * source url of image (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * a proxied url of the image
	 */
	proxy_url?: string;
	/**
	 * height of image
	 */
	height?: number;
	/**
	 * width of image
	 */
	width?: number;
};

export interface APIEmbedFooter {
	/**
	 * footer text
	 */
	text: string;
	/**
	 * url of footer icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * a proxied url of footer icon
	 */
	proxy_icon_url?: string;
};
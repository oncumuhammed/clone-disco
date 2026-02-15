/**
 * Regular expression patterns for validation.
 * Used for validating usernames, emails, channel names, and invite codes.
 */

export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,32}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CHANNEL_NAME_REGEX = /^[a-z0-9-_]{1,100}$/;
export const SERVER_NAME_REGEX = /^.{1,100}$/;
export const INVITE_CODE_REGEX = /^[a-zA-Z0-9]{6,12}$/;
export const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;
export const SNOWFLAKE_REGEX = /^\d{17,20}$/;

/**
 * Permission bit flags for role-based access control.
 * Uses BigInt for bitwise operations supporting up to 64 unique permissions.
 */

export const Permissions = {
  VIEW_CHANNEL: 1n << 0n,
  SEND_MESSAGES: 1n << 1n,
  SEND_TTS_MESSAGES: 1n << 2n,
  MANAGE_MESSAGES: 1n << 3n,
  EMBED_LINKS: 1n << 4n,
  ATTACH_FILES: 1n << 5n,
  READ_MESSAGE_HISTORY: 1n << 6n,
  MENTION_EVERYONE: 1n << 7n,
  USE_EXTERNAL_EMOJIS: 1n << 8n,
  ADD_REACTIONS: 1n << 9n,
  CONNECT: 1n << 10n,
  SPEAK: 1n << 11n,
  MUTE_MEMBERS: 1n << 12n,
  DEAFEN_MEMBERS: 1n << 13n,
  MOVE_MEMBERS: 1n << 14n,
  USE_VAD: 1n << 15n,
  STREAM: 1n << 16n,
  USE_SOUNDBOARD: 1n << 17n,
  CREATE_INVITE: 1n << 18n,
  KICK_MEMBERS: 1n << 19n,
  BAN_MEMBERS: 1n << 20n,
  ADMINISTRATOR: 1n << 21n,
  MANAGE_CHANNELS: 1n << 22n,
  MANAGE_SERVER: 1n << 23n,
  CHANGE_NICKNAME: 1n << 24n,
  MANAGE_NICKNAMES: 1n << 25n,
  MANAGE_ROLES: 1n << 26n,
  MANAGE_WEBHOOKS: 1n << 27n,
  MANAGE_EMOJIS: 1n << 28n,
} as const;

export const ALL_PERMISSIONS =
  Permissions.VIEW_CHANNEL |
  Permissions.SEND_MESSAGES |
  Permissions.SEND_TTS_MESSAGES |
  Permissions.MANAGE_MESSAGES |
  Permissions.EMBED_LINKS |
  Permissions.ATTACH_FILES |
  Permissions.READ_MESSAGE_HISTORY |
  Permissions.MENTION_EVERYONE |
  Permissions.USE_EXTERNAL_EMOJIS |
  Permissions.ADD_REACTIONS |
  Permissions.CONNECT |
  Permissions.SPEAK |
  Permissions.MUTE_MEMBERS |
  Permissions.DEAFEN_MEMBERS |
  Permissions.MOVE_MEMBERS |
  Permissions.USE_VAD |
  Permissions.STREAM |
  Permissions.USE_SOUNDBOARD |
  Permissions.CREATE_INVITE |
  Permissions.KICK_MEMBERS |
  Permissions.BAN_MEMBERS |
  Permissions.ADMINISTRATOR |
  Permissions.MANAGE_CHANNELS |
  Permissions.MANAGE_SERVER |
  Permissions.CHANGE_NICKNAME |
  Permissions.MANAGE_NICKNAMES |
  Permissions.MANAGE_ROLES |
  Permissions.MANAGE_WEBHOOKS |
  Permissions.MANAGE_EMOJIS;

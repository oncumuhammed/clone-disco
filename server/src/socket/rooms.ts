/**
 * Socket.IO room naming utilities.
 * Provides consistent room naming conventions for different entity types.
 */

export function serverRoom(serverId: string): string {
  return `server:${serverId}`;
}

export function channelRoom(channelId: string): string {
  return `channel:${channelId}`;
}

export function userRoom(userId: string): string {
  return `user:${userId}`;
}

export function voiceRoom(channelId: string): string {
  return `voice:${channelId}`;
}

export function dmRoom(channelId: string): string {
  return `dm:${channelId}`;
}

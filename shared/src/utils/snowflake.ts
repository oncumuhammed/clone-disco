/**
 * Snowflake ID utility functions.
 * Provides helpers for parsing and converting Discord-style snowflake IDs.
 */

const EPOCH = 1420070400000n;

/**
 * Parse a snowflake ID into its timestamp and sequence components.
 */
export function parseSnowflake(id: string): { timestamp: number; sequence: number } {
  const snowflake = BigInt(id);
  const timestamp = Number((snowflake >> 22n) + EPOCH);
  const sequence = Number(snowflake & 0xfffn);
  return { timestamp, sequence };
}

/**
 * Convert a snowflake ID to a Date object.
 */
export function snowflakeToDate(id: string): Date {
  const { timestamp } = parseSnowflake(id);
  return new Date(timestamp);
}

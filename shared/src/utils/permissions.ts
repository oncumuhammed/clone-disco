/**
 * Permission utility functions.
 * Provides helpers for checking, adding, removing, and computing permissions.
 */

/**
 * Check if a user has a specific permission.
 */
export function hasPermission(userPermissions: bigint, permission: bigint): boolean {
  return (userPermissions & permission) === permission;
}

/**
 * Add a permission to the current permission set.
 */
export function addPermission(current: bigint, permission: bigint): bigint {
  return current | permission;
}

/**
 * Remove a permission from the current permission set.
 */
export function removePermission(current: bigint, permission: bigint): bigint {
  return current & ~permission;
}

/**
 * Compute final permissions based on base permissions, role permissions, and channel overrides.
 * Resolution order: base -> roles (additive) -> channel overrides (deny then allow).
 */
export function computePermissions(
  basePermissions: bigint,
  rolePermissions: bigint[],
  channelOverrides: { allow: bigint; deny: bigint }[],
): bigint {
  let permissions = basePermissions;

  for (const rolePerm of rolePermissions) {
    permissions |= rolePerm;
  }

  for (const override of channelOverrides) {
    permissions &= ~override.deny;
    permissions |= override.allow;
  }

  return permissions;
}

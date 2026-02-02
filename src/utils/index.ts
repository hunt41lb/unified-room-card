/* Utils Index
 * unified-room-card/src/utils/index.ts
 *
 * Re-exports all utility functions for easy importing.
 */

export {
  getDomain,
  getPrimaryDomain,
  isUnavailable,
  isEntityActive,
  getAllPrimaryEntities,
  getPrimaryEntity,
  isPrimaryEntityUnavailable,
  isGroupActive,
  getUnavailableConfig,
  getRelevantEntityIds,
  hasRelevantStateChanged,
} from './entity-helpers';
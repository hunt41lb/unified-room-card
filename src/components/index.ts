/**
 * Components Index
 *
 * Re-exports all component render functions for easy importing.
 */

export { renderClimateSection } from './climate-section';

export {
  renderBatteryEntities,
  renderBatteryBadge,
  getLowBatteryCount,
  isBatteryBadgeMode,
} from './battery-entities';

export {
  renderUpdateEntities,
  renderUpdateBadge,
  getPendingUpdateCount,
  getSpinInterval,
  isSpinAnimationEnabled,
  isUpdateBadgeMode,
  type UpdateAnimationState
} from './update-entities';

export {
  animationKeyframes,
  animationClasses,
  PeriodicAnimationController,
  getAnimationClass,
  type AnimationName
} from './animations';

export {
  renderPersistentEntities,
  hasPersistentEntities,
  type PersistentActionHandler,
  type MoreInfoHandler,
} from './persistent-section';

export {
  renderIntermittentEntities,
  hasActiveIntermittentEntities,
  getActiveIntermittentCount,
  type IntermittentActionHandler,
} from './intermittent-section';

export { renderIconSection } from './icon-section';
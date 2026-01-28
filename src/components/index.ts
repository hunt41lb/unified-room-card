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

/**
 * State Resolver Utility
 * 
 * Helper functions for resolving and auto-populating entity states
 * based on entity type, state class, and history.
 */

import { HassEntity, HomeAssistant, StateConfig } from '../types';
import { COMMON_STATES } from '../constants';
import { getDomain } from './entity-helpers';

/**
 * Known states by domain
 */
const DOMAIN_STATES: Record<string, string[]> = {
  binary_sensor: [COMMON_STATES.ON, COMMON_STATES.OFF],
  switch: [COMMON_STATES.ON, COMMON_STATES.OFF],
  light: [COMMON_STATES.ON, COMMON_STATES.OFF],
  fan: [COMMON_STATES.ON, COMMON_STATES.OFF],
  lock: [COMMON_STATES.LOCKED, COMMON_STATES.UNLOCKED],
  cover: [COMMON_STATES.OPEN, COMMON_STATES.CLOSED],
  person: [COMMON_STATES.HOME, COMMON_STATES.AWAY],
  device_tracker: [COMMON_STATES.HOME, COMMON_STATES.AWAY],
  climate: [COMMON_STATES.IDLE, COMMON_STATES.HEATING, COMMON_STATES.COOLING, COMMON_STATES.OFF],
  input_boolean: [COMMON_STATES.ON, COMMON_STATES.OFF],
  automation: [COMMON_STATES.ON, COMMON_STATES.OFF],
  update: [COMMON_STATES.ON, COMMON_STATES.OFF],
};

/**
 * Known states by device class
 */
const DEVICE_CLASS_STATES: Record<string, string[]> = {
  door: [COMMON_STATES.ON, COMMON_STATES.OFF], // on = open, off = closed
  window: [COMMON_STATES.ON, COMMON_STATES.OFF],
  motion: [COMMON_STATES.ON, COMMON_STATES.OFF],
  occupancy: [COMMON_STATES.ON, COMMON_STATES.OFF],
  presence: [COMMON_STATES.ON, COMMON_STATES.OFF],
  lock: [COMMON_STATES.ON, COMMON_STATES.OFF], // on = unlocked, off = locked
  moisture: [COMMON_STATES.ON, COMMON_STATES.OFF],
  smoke: [COMMON_STATES.ON, COMMON_STATES.OFF],
  gas: [COMMON_STATES.ON, COMMON_STATES.OFF],
  problem: [COMMON_STATES.ON, COMMON_STATES.OFF],
  battery: [COMMON_STATES.ON, COMMON_STATES.OFF], // on = low, off = normal
  connectivity: [COMMON_STATES.ON, COMMON_STATES.OFF],
};

/**
 * Get possible states for an entity
 * Auto-populates based on domain, device class, or state class
 */
export function getPossibleStates(entity: HassEntity | undefined): string[] {
  if (!entity) {
    return [COMMON_STATES.ON, COMMON_STATES.OFF];
  }

  const domain = getDomain(entity.entity_id);
  const deviceClass = entity.attributes.device_class as string | undefined;

  // Check device class first (more specific)
  if (deviceClass && DEVICE_CLASS_STATES[deviceClass]) {
    return DEVICE_CLASS_STATES[deviceClass];
  }

  // Fall back to domain
  if (DOMAIN_STATES[domain]) {
    return DOMAIN_STATES[domain];
  }

  // Default to on/off
  return [COMMON_STATES.ON, COMMON_STATES.OFF];
}

/**
 * Create default state configurations for an entity
 */
export function createDefaultStateConfigs(entity: HassEntity | undefined): StateConfig[] {
  const states = getPossibleStates(entity);
  
  return states.map((state) => ({
    state,
    icon: undefined,
    color: undefined,
    animation: undefined,
  }));
}

/**
 * Get state label for display (human-readable)
 */
export function getStateLabel(state: string): string {
  const labels: Record<string, string> = {
    [COMMON_STATES.ON]: 'On',
    [COMMON_STATES.OFF]: 'Off',
    [COMMON_STATES.UNAVAILABLE]: 'Unavailable',
    [COMMON_STATES.UNKNOWN]: 'Unknown',
    [COMMON_STATES.LOCKED]: 'Locked',
    [COMMON_STATES.UNLOCKED]: 'Unlocked',
    [COMMON_STATES.OPEN]: 'Open',
    [COMMON_STATES.CLOSED]: 'Closed',
    [COMMON_STATES.HOME]: 'Home',
    [COMMON_STATES.AWAY]: 'Away',
    [COMMON_STATES.IDLE]: 'Idle',
    [COMMON_STATES.HEATING]: 'Heating',
    [COMMON_STATES.COOLING]: 'Cooling',
  };

  return labels[state] || state.charAt(0).toUpperCase() + state.slice(1);
}

/**
 * Find matching state config for current entity state
 */
export function findStateConfig(
  currentState: string,
  stateConfigs: StateConfig[] | undefined
): StateConfig | undefined {
  if (!stateConfigs || stateConfigs.length === 0) {
    return undefined;
  }

  return stateConfigs.find((config) => config.state === currentState);
}

/**
 * Resolve icon for entity based on state
 */
export function resolveIcon(
  entity: HassEntity,
  stateConfigs: StateConfig[] | undefined,
  defaultIcon?: string
): string {
  const stateConfig = findStateConfig(entity.state, stateConfigs);
  
  if (stateConfig?.icon) {
    return stateConfig.icon;
  }

  if (defaultIcon) {
    return defaultIcon;
  }

  if (entity.attributes.icon) {
    return entity.attributes.icon as string;
  }

  return 'mdi:help-circle';
}

/**
 * Resolve color for entity based on state
 */
export function resolveColor(
  entity: HassEntity,
  stateConfigs: StateConfig[] | undefined,
  defaultColor?: string
): string {
  const stateConfig = findStateConfig(entity.state, stateConfigs);
  
  if (stateConfig?.color) {
    return stateConfig.color;
  }

  if (defaultColor) {
    return defaultColor;
  }

  // Return empty string to use default CSS
  return '';
}

/**
 * Resolve animation for entity based on state
 */
export function resolveAnimation(
  entity: HassEntity,
  stateConfigs: StateConfig[] | undefined,
  defaultAnimation?: string
): string {
  const stateConfig = findStateConfig(entity.state, stateConfigs);
  
  if (stateConfig?.animation) {
    return stateConfig.animation;
  }

  if (defaultAnimation) {
    return defaultAnimation;
  }

  return 'none';
}

/* Icon Resolver Utilities
 * unified-room-card/src/utils/icon-resolver.ts
 *
 * Pure functions for resolving entity icons across all card contexts:
 * main card icon, persistent entity icons, intermittent entity icons,
 * and binary sensor device class icons.
 * All functions operate on explicit parameters with no rendering dependencies.
 */

import { DOMAIN_DEFAULT_ICONS, DOMAIN_STATE_ICONS } from '../constants';
import { getDomain } from './entity-helpers';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Minimal entity shape for icon resolution
 */
type EntityLike = {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
};

// =============================================================================
// BINARY SENSOR DEVICE CLASS ICONS
// =============================================================================

/**
 * Device class icon mappings for binary sensors
 * Maps device_class to on/off icon pairs
 */
const BINARY_SENSOR_DEVICE_CLASS_ICONS: Record<string, { on: string; off: string }> = {
  motion: { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
  occupancy: { on: 'mdi:home-account', off: 'mdi:home-outline' },
  door: { on: 'mdi:door-open', off: 'mdi:door-closed' },
  window: { on: 'mdi:window-open', off: 'mdi:window-closed' },
  garage_door: { on: 'mdi:garage-open', off: 'mdi:garage' },
  opening: { on: 'mdi:square-outline', off: 'mdi:square' },
  lock: { on: 'mdi:lock-open', off: 'mdi:lock' },
  moisture: { on: 'mdi:water', off: 'mdi:water-off' },
  smoke: { on: 'mdi:smoke-detector-alert', off: 'mdi:smoke-detector' },
  gas: { on: 'mdi:gas-cylinder', off: 'mdi:gas-cylinder' },
  co: { on: 'mdi:molecule-co', off: 'mdi:molecule-co' },
  safety: { on: 'mdi:shield-alert', off: 'mdi:shield-check' },
  sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
  vibration: { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
  presence: { on: 'mdi:home', off: 'mdi:home-outline' },
  light: { on: 'mdi:brightness-7', off: 'mdi:brightness-5' },
  battery: { on: 'mdi:battery-alert', off: 'mdi:battery' },
  battery_charging: { on: 'mdi:battery-charging', off: 'mdi:battery' },
  plug: { on: 'mdi:power-plug', off: 'mdi:power-plug-off' },
  power: { on: 'mdi:flash', off: 'mdi:flash-off' },
  running: { on: 'mdi:play', off: 'mdi:stop' },
  problem: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
  tamper: { on: 'mdi:alert', off: 'mdi:check' },
  update: { on: 'mdi:package-up', off: 'mdi:package' },
  connectivity: { on: 'mdi:wifi', off: 'mdi:wifi-off' },
  cold: { on: 'mdi:snowflake', off: 'mdi:snowflake-off' },
  heat: { on: 'mdi:fire', off: 'mdi:fire-off' },
};

/**
 * Get binary sensor icon based on device_class and state
 */
export function getBinarySensorIcon(deviceClass: string | undefined, state: string): string {
  const isOn = state === 'on';

  if (deviceClass && BINARY_SENSOR_DEVICE_CLASS_ICONS[deviceClass]) {
    return isOn
      ? BINARY_SENSOR_DEVICE_CLASS_ICONS[deviceClass].on
      : BINARY_SENSOR_DEVICE_CLASS_ICONS[deviceClass].off;
  }

  // Default binary sensor icon
  return isOn ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline';
}

// =============================================================================
// MAIN CARD ICON RESOLUTION
// =============================================================================

/**
 * Get default icon for main card entity based on domain and state
 * Used when no explicit icon is configured
 *
 * Resolution order:
 * 1. Entity's icon attribute (if set in HA)
 * 2. Climate special handling (hvac_action-based icons)
 * 3. Domain state-specific icons (DOMAIN_STATE_ICONS)
 * 4. Domain default icons (DOMAIN_DEFAULT_ICONS)
 * 5. Fallback to 'mdi:home'
 */
export function getDefaultIcon(entity?: EntityLike): string {
  if (!entity) {
    return 'mdi:home';
  }

  // Use entity's icon if available
  if (entity.attributes.icon) {
    return entity.attributes.icon as string;
  }

  const domain = getDomain(entity.entity_id);

  // Special handling for climate - use hvac_action for icon
  if (domain === 'climate') {
    const hvacAction = entity.attributes.hvac_action as string | undefined;
    if (hvacAction) {
      switch (hvacAction) {
        case 'heating':
        case 'preheating':
          return 'mdi:fire';
        case 'cooling':
          return 'mdi:snowflake';
        case 'drying':
          return 'mdi:water-percent';
        case 'fan':
          return 'mdi:fan';
        default:
          return 'mdi:thermostat';
      }
    }
  }

  // Check for state-specific icon
  const stateIcons = DOMAIN_STATE_ICONS[domain];
  if (stateIcons && stateIcons[entity.state]) {
    return stateIcons[entity.state];
  }

  // Fall back to domain default icon
  return DOMAIN_DEFAULT_ICONS[domain] || 'mdi:home';
}

// =============================================================================
// PERSISTENT ENTITY ICON RESOLUTION
// =============================================================================

/**
 * Get default icon for persistent entity based on domain and state
 * These entities are always visible regardless of state
 */
export function getPersistentEntityDefaultIcon(domain: string, state: string): string {
  // Lock icons
  if (domain === 'lock') {
    switch (state) {
      case 'locked': return 'mdi:lock';
      case 'unlocked': return 'mdi:lock-open';
      case 'locking': return 'mdi:lock-clock';
      case 'unlocking': return 'mdi:lock-clock';
      case 'jammed': return 'mdi:lock-alert';
      default: return 'mdi:lock-question';
    }
  }

  // Binary sensor icons
  if (domain === 'binary_sensor') {
    return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
  }

  // Door/window sensors (cover domain)
  if (domain === 'cover') {
    switch (state) {
      case 'open': return 'mdi:door-open';
      case 'closed': return 'mdi:door-closed';
      case 'opening': return 'mdi:door-open';
      case 'closing': return 'mdi:door-closed';
      default: return 'mdi:door';
    }
  }

  // Switch
  if (domain === 'switch') {
    return state === 'on' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off';
  }

  // Light
  if (domain === 'light') {
    return state === 'on' ? 'mdi:lightbulb' : 'mdi:lightbulb-off';
  }

  // Default
  return 'mdi:help-circle';
}

// =============================================================================
// INTERMITTENT ENTITY ICON RESOLUTION
// =============================================================================

/**
 * Get default icon for intermittent entity based on domain, state, and attributes
 * These entities only appear when in an active state
 *
 * Resolution order:
 * 1. Entity's icon attribute (if set in HA)
 * 2. Binary sensor device_class-specific icons
 * 3. Domain state-specific icons (DOMAIN_STATE_ICONS)
 * 4. Domain default icons (DOMAIN_DEFAULT_ICONS)
 * 5. Fallback to 'mdi:alert-circle'
 */
export function getIntermittentEntityDefaultIcon(
  domain: string,
  state: string,
  entity: { attributes: Record<string, unknown> },
): string {
  // Check for entity-provided icon
  if (entity.attributes.icon) {
    return entity.attributes.icon as string;
  }

  // Binary sensor has device_class-specific icons
  if (domain === 'binary_sensor') {
    const deviceClass = entity.attributes.device_class as string;
    return getBinarySensorIcon(deviceClass, state);
  }

  // Check domain state icons
  if (DOMAIN_STATE_ICONS[domain]?.[state]) {
    return DOMAIN_STATE_ICONS[domain][state];
  }

  // Fall back to domain default
  return DOMAIN_DEFAULT_ICONS[domain] || 'mdi:alert-circle';
}
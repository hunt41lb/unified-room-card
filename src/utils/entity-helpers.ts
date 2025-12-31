/**
 * Entity Helpers Utility
 * 
 * Helper functions for working with Home Assistant entities:
 * - State fetching
 * - Unit detection
 * - Domain extraction
 * - Icon resolution
 */

import { HassEntity } from '../types';
import { COMMON_STATES } from '../constants';

/**
 * Extract domain from entity ID
 */
export function getDomain(entityId: string): string {
  return entityId.split('.')[0];
}

/**
 * Extract object ID from entity ID
 */
export function getObjectId(entityId: string): string {
  return entityId.split('.')[1] || '';
}

/**
 * Check if entity is in an unavailable state
 */
export function isUnavailable(entity: HassEntity | undefined): boolean {
  if (!entity) return true;
  return (
    entity.state === COMMON_STATES.UNAVAILABLE ||
    entity.state === COMMON_STATES.UNKNOWN
  );
}

/**
 * Check if entity is in an active state
 */
export function isActive(state: string): boolean {
  const activeStates = [
    COMMON_STATES.ON,
    COMMON_STATES.UNLOCKED,
    COMMON_STATES.OPEN,
    COMMON_STATES.HOME,
    COMMON_STATES.HEATING,
    COMMON_STATES.COOLING,
  ];
  return activeStates.includes(state as typeof activeStates[number]);
}

/**
 * Get unit of measurement from entity attributes
 */
export function getUnitOfMeasurement(entity: HassEntity | undefined): string {
  if (!entity?.attributes?.unit_of_measurement) return '';
  return entity.attributes.unit_of_measurement as string;
}

/**
 * Get numeric value from entity state
 */
export function getNumericState(entity: HassEntity | undefined): number | null {
  if (!entity || isUnavailable(entity)) return null;
  
  const value = parseFloat(entity.state);
  return isNaN(value) ? null : value;
}

/**
 * Get default icon for entity based on domain
 */
export function getDefaultIcon(entity: HassEntity | undefined): string {
  if (!entity) return 'mdi:help-circle';

  // Use entity's icon if available
  if (entity.attributes.icon) {
    return entity.attributes.icon as string;
  }

  const domain = getDomain(entity.entity_id);
  
  const domainIcons: Record<string, string> = {
    light: 'mdi:lightbulb',
    switch: 'mdi:toggle-switch',
    fan: 'mdi:fan',
    climate: 'mdi:thermostat',
    lock: 'mdi:lock',
    binary_sensor: 'mdi:radiobox-blank',
    sensor: 'mdi:eye',
    cover: 'mdi:window-shutter',
    camera: 'mdi:camera',
    media_player: 'mdi:cast',
    vacuum: 'mdi:robot-vacuum',
    input_boolean: 'mdi:toggle-switch',
    automation: 'mdi:robot',
    script: 'mdi:script-text',
    scene: 'mdi:palette',
    person: 'mdi:account',
    device_tracker: 'mdi:crosshairs-gps',
    weather: 'mdi:weather-partly-cloudy',
    update: 'mdi:update',
  };

  return domainIcons[domain] || 'mdi:help-circle';
}

/**
 * Get icon based on binary sensor device class
 */
export function getBinarySensorIcon(
  entity: HassEntity,
  stateOn: boolean
): string {
  const deviceClass = entity.attributes.device_class as string | undefined;

  const icons: Record<string, { on: string; off: string }> = {
    battery: { on: 'mdi:battery', off: 'mdi:battery-outline' },
    cold: { on: 'mdi:snowflake', off: 'mdi:thermometer' },
    connectivity: { on: 'mdi:check-network-outline', off: 'mdi:close-network-outline' },
    door: { on: 'mdi:door-open', off: 'mdi:door-closed' },
    garage_door: { on: 'mdi:garage-open', off: 'mdi:garage' },
    gas: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
    heat: { on: 'mdi:fire', off: 'mdi:thermometer' },
    light: { on: 'mdi:brightness-7', off: 'mdi:brightness-5' },
    lock: { on: 'mdi:lock-open', off: 'mdi:lock' },
    moisture: { on: 'mdi:water', off: 'mdi:water-off' },
    motion: { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
    occupancy: { on: 'mdi:home', off: 'mdi:home-outline' },
    opening: { on: 'mdi:square-outline', off: 'mdi:square' },
    plug: { on: 'mdi:power-plug', off: 'mdi:power-plug-off' },
    power: { on: 'mdi:flash', off: 'mdi:flash-off' },
    presence: { on: 'mdi:home', off: 'mdi:home-outline' },
    problem: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
    running: { on: 'mdi:play', off: 'mdi:stop' },
    safety: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
    smoke: { on: 'mdi:smoke-detector-alert', off: 'mdi:smoke-detector' },
    sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
    tamper: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
    update: { on: 'mdi:update', off: 'mdi:check' },
    vibration: { on: 'mdi:vibrate', off: 'mdi:crop-portrait' },
    window: { on: 'mdi:window-open', off: 'mdi:window-closed' },
  };

  if (deviceClass && icons[deviceClass]) {
    return stateOn ? icons[deviceClass].on : icons[deviceClass].off;
  }

  return stateOn ? 'mdi:radiobox-marked' : 'mdi:radiobox-blank';
}

/* Entity Helper Utilities
 * unified-room-card/src/utils/entity-helpers.ts
 *
 * Pure functions for entity state evaluation, domain extraction,
 * and entity group operations. These have no rendering dependencies
 * and operate on explicit parameters rather than component state.
 */

import {
  COMMON_STATES,
  DOMAIN_ACTIVE_STATES,
} from '../constants';

import type {
  HomeAssistant,
  UnifiedRoomCardConfig,
} from '../types';

// =============================================================================
// DOMAIN HELPERS
// =============================================================================

/**
 * Extract domain from entity_id
 * e.g., "light.living_room" → "light"
 */
export function getDomain(entityId: string): string {
  return entityId.split('.')[0];
}

/**
 * Get the domain of the primary entity from config
 */
export function getPrimaryDomain(config: UnifiedRoomCardConfig): string | undefined {
  if (!config.entity) return undefined;
  return getDomain(config.entity);
}

// =============================================================================
// ENTITY STATE HELPERS
// =============================================================================

/**
 * Check if entity is unavailable or unknown
 */
export function isUnavailable(entity: { state: string }): boolean {
  return ['unavailable', 'unknown'].includes(entity.state);
}

/**
 * Check if an entity is in an "active" state
 *
 * Resolution order:
 * 1. Config-level active_states override (if defined)
 * 2. Climate domain special handling via hvac_action attribute
 * 3. Domain-specific active states from DOMAIN_ACTIVE_STATES
 * 4. Fallback to common active states (on, unlocked, open, home, heating, cooling)
 */
export function isEntityActive(
  entityId: string,
  state: string,
  attributes?: Record<string, unknown>,
  activeStatesOverride?: string[],
): boolean {
  // If custom active_states defined, use those
  if (activeStatesOverride && activeStatesOverride.length > 0) {
    return activeStatesOverride.includes(state);
  }

  const domain = getDomain(entityId);

  // Special handling for climate - use hvac_action attribute
  if (domain === 'climate' && attributes) {
    const hvacAction = attributes.hvac_action as string | undefined;
    if (hvacAction) {
      // Active if actually heating, cooling, drying, or fan running
      return ['heating', 'cooling', 'drying', 'fan', 'preheating'].includes(hvacAction);
    }
  }

  // Otherwise, use domain-specific defaults
  const domainActiveStates = DOMAIN_ACTIVE_STATES[domain];

  if (domainActiveStates) {
    return domainActiveStates.includes(state);
  }

  // Fallback to common active states
  const fallbackActiveStates = [
    COMMON_STATES.ON,
    COMMON_STATES.UNLOCKED,
    COMMON_STATES.OPEN,
    COMMON_STATES.HOME,
    COMMON_STATES.HEATING,
    COMMON_STATES.COOLING,
  ];
  return fallbackActiveStates.includes(state as typeof fallbackActiveStates[number]);
}

// =============================================================================
// ENTITY GROUP HELPERS
// =============================================================================

/**
 * Get all primary entities (entity + entities array)
 */
export function getAllPrimaryEntities(config: UnifiedRoomCardConfig): string[] {
  const entities: string[] = [];
  if (config.entity) {
    entities.push(config.entity);
  }
  if (config.entities?.length) {
    entities.push(...config.entities);
  }
  return entities;
}

/**
 * Get the primary entity state object
 * Returns the first entity for backwards compatibility
 */
export function getPrimaryEntity(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): { entity_id: string; state: string; attributes: Record<string, unknown> } | undefined {
  if (!config.entity) return undefined;
  return hass.states[config.entity];
}

/**
 * Check if the primary entity is unavailable
 */
export function isPrimaryEntityUnavailable(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): boolean {
  const entity = getPrimaryEntity(hass, config);
  if (!entity) return true; // Entity doesn't exist
  return isUnavailable(entity);
}

/**
 * Check if ANY entity in the primary group is active
 */
export function isGroupActive(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): boolean {
  const entities = getAllPrimaryEntities(config);
  if (entities.length === 0) return false;

  for (const entityId of entities) {
    const entity = hass.states[entityId];
    if (entity && isEntityActive(entityId, entity.state, entity.attributes, config.active_states)) {
      return true;
    }
  }
  return false;
}

// =============================================================================
// UNAVAILABLE HANDLING
// =============================================================================

/**
 * Get unavailable handling config with defaults
 */
export function getUnavailableConfig(config: UnifiedRoomCardConfig): {
  behavior: string;
  icon?: string;
  icon_color: string;
  background_color: string;
  opacity: number;
  show_badge: boolean;
} {
  const unavailableConfig = config.unavailable_handling || { behavior: 'off' };
  return {
    behavior: unavailableConfig.behavior || 'off',
    icon: unavailableConfig.icon,
    icon_color: unavailableConfig.icon_color || 'var(--disabled-text-color)',
    background_color: unavailableConfig.background_color || 'var(--secondary-background-color)',
    opacity: unavailableConfig.opacity ?? 0.5,
    show_badge: unavailableConfig.show_badge || false,
  };
}

// =============================================================================
// STATE CHANGE DETECTION
// =============================================================================

/**
 * Collect all entity IDs that this card depends on.
 * Used by shouldUpdate to determine if a re-render is needed.
 */
export function getRelevantEntityIds(config: UnifiedRoomCardConfig): string[] {
  const entityIds: string[] = [];

  // Main entity and additional entities
  if (config.entity) {
    entityIds.push(config.entity);
  }
  if (config.entities?.length) {
    entityIds.push(...config.entities);
  }

  // Persistent entities
  if (config.persistent_entities?.entities) {
    entityIds.push(
      ...config.persistent_entities.entities.map((e) => e.entity),
    );
  }

  // Intermittent entities
  if (config.intermittent_entities?.entities) {
    entityIds.push(
      ...config.intermittent_entities.entities.map((e) => e.entity),
    );
  }

  // Climate entities
  if (config.climate_entities) {
    const climate = config.climate_entities;
    if (climate.primary_entities) entityIds.push(...climate.primary_entities);
    if (climate.temperature_entities) entityIds.push(...climate.temperature_entities);
    if (climate.humidity_entities) entityIds.push(...climate.humidity_entities);
    if (climate.air_quality_entities) entityIds.push(...climate.air_quality_entities);
    if (climate.illuminance_entities) entityIds.push(...climate.illuminance_entities);
  }

  // Power entities
  if (config.power_entities?.entities) {
    entityIds.push(...config.power_entities.entities);
  }

  // Battery entities
  if (config.battery_entities?.entities) {
    entityIds.push(...config.battery_entities.entities);
  }

  // Update entities
  if (config.update_entities?.entities) {
    entityIds.push(...config.update_entities.entities);
  }

  // Glow effect entities
  if (config.glow_effects?.length) {
    entityIds.push(
      ...config.glow_effects.map((g) => g.entity).filter(Boolean),
    );
  }

  // Border entity
  if (config.border_entity) {
    entityIds.push(config.border_entity);
  }

  // Icon state map entity
  if (config.icon_state_map?.entity) {
    entityIds.push(config.icon_state_map.entity);
  }

  return entityIds;
}

/**
 * Check if any entity relevant to this card has changed state
 */
export function hasRelevantStateChanged(
  config: UnifiedRoomCardConfig,
  oldHass: HomeAssistant,
  newHass: HomeAssistant,
): boolean {
  const entityIds = getRelevantEntityIds(config);

  for (const entityId of entityIds) {
    const oldState = oldHass.states[entityId];
    const newState = newHass.states[entityId];

    if (oldState !== newState) {
      return true;
    }
  }

  return false;
}
/* Color Resolver Utilities
 * unified-room-card/src/utils/color-resolver.ts
 *
 * Pure functions for resolving entity colors across all card contexts:
 * border colors, icon background colors, icon colors, glow effects,
 * persistent entity colors, and intermittent entity colors.
 * All functions operate on explicit parameters with no rendering dependencies.
 */

import { DOMAIN_ACTIVE_STATES, DOMAIN_STATE_COLORS } from '../constants';
import type { HomeAssistant, HassEntity, UnifiedRoomCardConfig } from '../types';
import { getDomain, getAllPrimaryEntities, getPrimaryDomain, getPrimaryEntity } from './entity-helpers';

// =============================================================================
// SHARED ENTITY TYPE
// =============================================================================

/** Minimal entity shape accepted by color functions */
type EntityLike = {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
};

// =============================================================================
// BORDER COLOR
// =============================================================================

/**
 * Get border color for entity based on domain and state.
 * Returns undefined when no border color should be applied (inactive/idle states).
 */
export function getBorderEntityColor(entity: EntityLike): string | undefined {
  const domain = getDomain(entity.entity_id);

  // Special handling for climate - use hvac_action
  if (domain === 'climate') {
    const hvacAction = entity.attributes.hvac_action as string | undefined;
    if (hvacAction) {
      switch (hvacAction) {
        case 'heating':
        case 'preheating':
          return 'var(--state-climate-heat-color, #ff8c00)';
        case 'cooling':
          return 'var(--state-climate-cool-color, #2196f3)';
        case 'drying':
          return 'var(--state-climate-dry-color, #8bc34a)';
        case 'fan':
          return 'var(--state-climate-fan_only-color, #00bcd4)';
        case 'idle':
        case 'off':
          return undefined; // No border for idle/off
        default:
          return undefined;
      }
    }
  }

  // Use domain state colors
  const stateColors = DOMAIN_STATE_COLORS[domain];
  if (stateColors && stateColors[entity.state]) {
    // Don't show border for "off" or inactive states (they use primary-text-color)
    const color = stateColors[entity.state];
    if (color === 'var(--primary-text-color)') {
      return undefined;
    }
    return color;
  }

  // Fallback for unknown domains - use active color for "on" states
  if (entity.state === 'on') {
    return 'var(--state-active-color, var(--amber-color, #ffc107))';
  }

  return undefined;
}

// =============================================================================
// ICON BACKGROUND COLOR
// =============================================================================

/**
 * Get background color for icon based on entity attributes and domain.
 * Supports light entities with rgb_color attribute and climate entities with hvac_action.
 *
 * @param entity - Entity state object (or undefined for fallback)
 * @param opacity - Icon background opacity from config (default 0.3)
 */
export function getEntityBackgroundColor(
  entity?: EntityLike,
  opacity: number = 0.3,
): string {
  if (!entity) {
    return `rgba(255, 193, 7, ${opacity})`; // Amber fallback
  }

  const domain = getDomain(entity.entity_id);

  // Climate entities - use hvac_action attribute for actual heating/cooling state
  if (domain === 'climate') {
    const hvacAction = entity.attributes.hvac_action as string | undefined;
    switch (hvacAction) {
      case 'heating':
      case 'preheating':
        return 'var(--state-climate-heat-color, #ff8c00)';
      case 'cooling':
        return 'var(--state-climate-cool-color, #2196f3)';
      case 'drying':
        return 'var(--state-climate-dry-color, #8bc34a)';
      case 'fan':
        return 'var(--state-climate-fan_only-color, #00bcd4)';
      default:
        // idle or off - use secondary background (no colored background)
        return 'var(--secondary-background-color)';
    }
  }

  // Light entities - use rgb_color directly when on
  if (domain === 'light') {
    if (entity.state === 'on') {
      // Use rgb_color if available
      if (entity.attributes.rgb_color) {
        const rgb = entity.attributes.rgb_color as [number, number, number];
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      }
      // Light on but no color capability - use amber
      return `rgba(255, 193, 7, ${opacity})`;
    }
    // Light off - no colored background
    return 'var(--secondary-background-color)';
  }

  // Lock entities - use state-specific colors
  if (domain === 'lock') {
    const stateColor = DOMAIN_STATE_COLORS[domain]?.[entity.state];
    if (stateColor) {
      return stateColor;
    }
    return 'var(--secondary-background-color)';
  }

  // Other entities - check if in active state using domain defaults
  const activeStates = DOMAIN_ACTIVE_STATES[domain] || ['on'];
  if (activeStates.includes(entity.state)) {
    return `rgba(255, 193, 7, ${opacity})`; // Amber for active state
  }

  // Inactive - use secondary background
  return 'var(--secondary-background-color)';
}

// =============================================================================
// ICON COLORS
// =============================================================================

/**
 * Get icon color for light entity based on its color attributes.
 * Used when img_cell is disabled.
 */
export function getLightIconColor(entity: EntityLike): string {
  // Only use rgb_color if light is on and has color
  if (entity.state === 'on' && entity.attributes.rgb_color) {
    const rgb = entity.attributes.rgb_color as [number, number, number];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  // Lights without color capability - use HA's light active color
  return 'var(--state-light-active-color, var(--amber-color, #ffc107))';
}

/**
 * Get icon color for climate entity based on hvac_action attribute.
 */
export function getClimateIconColor(entity: EntityLike): string {
  const hvacAction = entity.attributes.hvac_action as string | undefined;
  switch (hvacAction) {
    case 'heating':
    case 'preheating':
      return 'var(--state-climate-heat-color, #ff8c00)';
    case 'cooling':
      return 'var(--state-climate-cool-color, #2196f3)';
    case 'drying':
      return 'var(--state-climate-dry-color, #8bc34a)';
    case 'fan':
      return 'var(--state-climate-fan_only-color, #00bcd4)';
    default:
      // idle or off - use primary text color
      return 'var(--primary-text-color)';
  }
}

/**
 * Get state-specific color for entity based on domain state color mappings.
 */
export function getEntityStateColor(entity?: EntityLike): string | undefined {
  if (!entity) return undefined;

  const domain = getDomain(entity.entity_id);
  const stateColors = DOMAIN_STATE_COLORS[domain];

  if (stateColors && stateColors[entity.state]) {
    return stateColors[entity.state];
  }

  return undefined;
}

// =============================================================================
// GROUP COLORS (multi-entity averaging)
// =============================================================================

/**
 * Get averaged background color for light groups.
 * Averages RGB values from all active lights in the group.
 * For non-light domains, delegates to getEntityBackgroundColor.
 */
export function getGroupBackgroundColor(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): string {
  const entities = getAllPrimaryEntities(config);
  const domain = getPrimaryDomain(config);
  const opacity = config.icon_background_opacity ?? 0.3;

  // Only average colors for lights
  if (domain !== 'light') {
    const primaryEntity = getPrimaryEntity(hass, config);
    return getEntityBackgroundColor(primaryEntity, opacity);
  }

  // Collect RGB values from all active lights
  const rgbValues: { r: number; g: number; b: number }[] = [];

  for (const entityId of entities) {
    const entity = hass.states[entityId];
    if (!entity || entity.state !== 'on') continue;

    const rgb = entity.attributes.rgb_color as [number, number, number] | undefined;
    if (rgb) {
      rgbValues.push({ r: rgb[0], g: rgb[1], b: rgb[2] });
    }
  }

  // If we have RGB values, average them with configurable opacity
  if (rgbValues.length > 0) {
    const avgR = Math.round(rgbValues.reduce((sum, c) => sum + c.r, 0) / rgbValues.length);
    const avgG = Math.round(rgbValues.reduce((sum, c) => sum + c.g, 0) / rgbValues.length);
    const avgB = Math.round(rgbValues.reduce((sum, c) => sum + c.b, 0) / rgbValues.length);
    return `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
  }

  // Fallback to primary entity color
  const primaryEntity = getPrimaryEntity(hass, config);
  return getEntityBackgroundColor(primaryEntity, opacity);
}

/**
 * Get averaged icon color for light groups (when no img_cell).
 * Averages RGB values from all active lights.
 * For non-light domains, delegates to getLightIconColor.
 */
export function getGroupIconColor(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): string {
  const entities = getAllPrimaryEntities(config);
  const domain = getPrimaryDomain(config);

  // Only average colors for lights
  if (domain !== 'light') {
    const primaryEntity = getPrimaryEntity(hass, config);
    if (!primaryEntity) return 'var(--state-active-color, var(--amber-color, #ffc107))';
    return getLightIconColor(primaryEntity);
  }

  // Collect RGB values from all active lights
  const rgbValues: { r: number; g: number; b: number }[] = [];

  for (const entityId of entities) {
    const entity = hass.states[entityId];
    if (!entity || entity.state !== 'on') continue;

    const rgb = entity.attributes.rgb_color as [number, number, number] | undefined;
    if (rgb) {
      rgbValues.push({ r: rgb[0], g: rgb[1], b: rgb[2] });
    }
  }

  // If we have RGB values, average them
  if (rgbValues.length > 0) {
    const avgR = Math.round(rgbValues.reduce((sum, c) => sum + c.r, 0) / rgbValues.length);
    const avgG = Math.round(rgbValues.reduce((sum, c) => sum + c.g, 0) / rgbValues.length);
    const avgB = Math.round(rgbValues.reduce((sum, c) => sum + c.b, 0) / rgbValues.length);
    return `rgb(${avgR}, ${avgG}, ${avgB})`;
  }

  // Fallback
  return 'var(--state-light-active-color, var(--amber-color, #ffc107))';
}

// =============================================================================
// GLOW EFFECT COLORS
// =============================================================================

/**
 * Get glow color from entity based on domain and state.
 * Used when glow color is set to 'auto'.
 */
export function getEntityGlowColor(entity: HassEntity): string {
  const domain = getDomain(entity.entity_id);

  // Light entities - use rgb_color if available
  if (domain === 'light' && entity.state === 'on') {
    const rgbColor = entity.attributes.rgb_color as [number, number, number] | undefined;
    if (rgbColor) {
      return `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    }
    // Fallback for lights without color
    return 'var(--state-light-active-color, var(--amber-color, #ffc107))';
  }

  // Climate entities
  if (domain === 'climate') {
    const hvacAction = entity.attributes.hvac_action as string | undefined;
    switch (hvacAction) {
      case 'heating':
      case 'preheating':
        return 'var(--state-climate-heat-color, #ff8c00)';
      case 'cooling':
        return 'var(--state-climate-cool-color, #2196f3)';
      case 'drying':
        return 'var(--state-climate-dry-color, #8bc34a)';
      case 'fan':
        return 'var(--state-climate-fan_only-color, #00bcd4)';
      default:
        return 'var(--primary-color)';
    }
  }

  // Lock entities
  if (domain === 'lock') {
    switch (entity.state) {
      case 'locked':
        return 'var(--state-lock-locked-color, #43a047)';
      case 'unlocked':
        return 'var(--state-lock-unlocked-color, #ffa600)';
      case 'jammed':
        return 'var(--state-lock-jammed-color, #db4437)';
      default:
        return 'var(--primary-color)';
    }
  }

  // Binary sensors / problem states
  if (entity.state === 'problem' || entity.state === 'error' || entity.state === 'jammed') {
    return 'var(--error-color, #db4437)';
  }

  // Default - use primary color
  return 'var(--primary-color)';
}

/**
 * Resolve glow color - handles 'auto' and explicit colors.
 */
export function resolveGlowColor(color: string | undefined, entity: HassEntity): string {
  // Default to auto if not specified
  const colorValue = color || 'auto';

  if (colorValue === 'auto') {
    return getEntityGlowColor(entity);
  }

  return colorValue;
}

/**
 * Get the first active glow effect based on entity states.
 * Returns the first matching glow effect configuration with resolved color,
 * or undefined if none match.
 */
export function getActiveGlowEffect(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
): { color: string; spread: number; animation: string } | undefined {
  if (!config.glow_effects?.length) {
    return undefined;
  }

  // Find first matching glow effect
  for (const glowEffect of config.glow_effects) {
    if (!glowEffect.entity) {
      continue;
    }

    const entity = hass.states[glowEffect.entity];
    if (!entity) {
      continue;
    }

    // Get trigger states (support both state and states)
    const triggerStates: string[] = [];
    if (glowEffect.state) {
      triggerStates.push(glowEffect.state);
    }
    if (glowEffect.states?.length) {
      triggerStates.push(...glowEffect.states);
    }

    // If no states specified, skip this effect
    if (triggerStates.length === 0) {
      continue;
    }

    // Check if entity is in one of the trigger states
    if (triggerStates.includes(entity.state)) {
      // Resolve color (auto or specified)
      const resolvedColor = resolveGlowColor(glowEffect.color, entity);

      return {
        color: resolvedColor,
        spread: glowEffect.spread ?? 4,
        animation: glowEffect.animation || 'none',
      };
    }
  }

  return undefined;
}

// =============================================================================
// SECTION-SPECIFIC COLORS
// =============================================================================

/**
 * Get color for persistent entity based on domain and state.
 */
export function getPersistentEntityColor(domain: string, state: string, entityUnavailable: boolean): string {
  if (entityUnavailable) {
    return 'var(--disabled-text-color, #9e9e9e)';
  }

  // Lock colors
  if (domain === 'lock') {
    switch (state) {
      case 'locked': return 'var(--state-lock-locked-color, #43a047)';
      case 'unlocked': return 'var(--state-lock-unlocked-color, #ffc107)';
      case 'locking': return 'var(--state-lock-locking-color, #ffc107)';
      case 'unlocking': return 'var(--state-lock-unlocking-color, #ffc107)';
      case 'jammed': return 'var(--state-lock-jammed-color, #db4437)';
      case 'open': return 'var(--state-lock-open-color, #db4437)';
      default: return 'var(--primary-text-color)';
    }
  }

  // Binary sensor colors
  if (domain === 'binary_sensor') {
    return state === 'on'
      ? 'var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))'
      : 'var(--primary-text-color)';
  }

  // Cover colors
  if (domain === 'cover') {
    switch (state) {
      case 'open': return 'var(--state-cover-open-color, #ffc107)';
      case 'opening': return 'var(--state-cover-open-color, #ffc107)';
      case 'closed': return 'var(--state-cover-closed-color, #43a047)';
      case 'closing': return 'var(--state-cover-closed-color, #43a047)';
      default: return 'var(--primary-text-color)';
    }
  }

  // Switch colors
  if (domain === 'switch') {
    return state === 'on'
      ? 'var(--state-switch-active-color, var(--amber-color, #ffc107))'
      : 'var(--primary-text-color)';
  }

  // Light colors
  if (domain === 'light') {
    return state === 'on'
      ? 'var(--state-light-active-color, var(--amber-color, #ffc107))'
      : 'var(--primary-text-color)';
  }

  // Default colors
  return state === 'on' || state === 'home' || state === 'open'
    ? 'var(--state-active-color, var(--amber-color, #ffc107))'
    : 'var(--primary-text-color)';
}

/**
 * Get color for intermittent entity based on domain and state.
 */
export function getIntermittentEntityColor(domain: string, state: string): string {
  // Check domain-specific colors
  if (DOMAIN_STATE_COLORS[domain]?.[state]) {
    return DOMAIN_STATE_COLORS[domain][state];
  }

  // Default: active states get amber, inactive get primary text
  const activeStates = DOMAIN_ACTIVE_STATES[domain] || ['on'];
  if (activeStates.includes(state)) {
    return 'var(--state-active-color, var(--amber-color, #ffc107))';
  }

  return 'var(--primary-text-color)';
}
/**
 * Battery Entities Component
 *
 * Renders battery icons for entities below the low threshold.
 * Shows dynamic battery icons based on level.
 * Supports both inline (status section) and badge display modes.
 */

import { html, TemplateResult, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { HomeAssistant, BatteryEntitiesConfig, TapActionConfig } from '../types';
import {
  DEFAULT_BADGE_SIZE,
  DEFAULT_BADGE_ICON_SIZE,
  DEFAULT_BADGE_POSITION,
  type BadgePositionType,
} from '../constants';
import { getBadgePositionStyles } from '../utils/style-helpers';

// =============================================================================
// TYPES
// =============================================================================

interface BatteryActionHandler {
  (action: TapActionConfig, entityId: string): void;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get battery level from entity state
 */
function getBatteryLevel(entity: { state: string }): number | null {
  const state = parseFloat(entity.state);
  if (!isNaN(state)) {
    return state;
  }
  return null;
}

/**
 * Get battery icon based on level
 */
function getBatteryIcon(level: number | null): string {
  if (level === null) return 'mdi:battery-unknown';
  if (level <= 10) return 'mdi:battery-alert';
  if (level <= 20) return 'mdi:battery-10';
  if (level <= 30) return 'mdi:battery-20';
  if (level <= 40) return 'mdi:battery-30';
  if (level <= 50) return 'mdi:battery-40';
  if (level <= 60) return 'mdi:battery-50';
  if (level <= 70) return 'mdi:battery-60';
  if (level <= 80) return 'mdi:battery-70';
  if (level <= 90) return 'mdi:battery-80';
  return 'mdi:battery';
}

/**
 * Get list of entities with low battery
 */
function getLowBatteryEntities(
  hass: HomeAssistant,
  config: BatteryEntitiesConfig
): string[] {
  const lowThreshold = config.low_threshold ?? 20;
  const entities = config.entities || [];

  const lowBatteryEntities: string[] = [];
  for (const entityId of entities) {
    const entity = hass.states[entityId];
    if (!entity) continue;

    const level = getBatteryLevel(entity);
    if (level !== null && level <= lowThreshold) {
      lowBatteryEntities.push(entityId);
    }
  }

  return lowBatteryEntities;
}

/**
 * Build tooltip showing all low battery entities
 */
function buildBatteryTooltip(
  hass: HomeAssistant,
  lowBatteryEntities: string[]
): string {
  if (lowBatteryEntities.length === 0) return '';

  if (lowBatteryEntities.length === 1) {
    const entity = hass.states[lowBatteryEntities[0]];
    if (!entity) return '1 low battery';
    const name = entity.attributes.friendly_name || lowBatteryEntities[0];
    const level = getBatteryLevel(entity);
    return `${name}: ${level}%`;
  }

  // Multiple low batteries - show count and list
  const items = lowBatteryEntities.map(entityId => {
    const entity = hass.states[entityId];
    const name = entity?.attributes.friendly_name || entityId;
    const level = getBatteryLevel(entity);
    return `${name}: ${level}%`;
  });

  return `${lowBatteryEntities.length} low batteries:\n${items.join('\n')}`;
}

// =============================================================================
// RENDER FUNCTIONS
// =============================================================================

/**
 * Render a single battery entity (inline mode)
 */
function renderBatteryEntity(
  hass: HomeAssistant,
  entityId: string,
  iconSize: string,
  color: string,
  config: BatteryEntitiesConfig,
  onAction: BatteryActionHandler
): TemplateResult | typeof nothing {
  const entity = hass.states[entityId];
  if (!entity) return nothing;

  const level = getBatteryLevel(entity);
  const icon = getBatteryIcon(level);

  const iconStyles: Record<string, string> = {
    '--mdc-icon-size': iconSize,
    'color': color,
  };

  const tapAction = config.tap_action || { action: 'more-info' as const };
  const holdAction = config.hold_action || { action: 'more-info' as const };

  return html`
    <div
      class="intermittent-entity"
      @click=${(e: Event) => { e.stopPropagation(); onAction(tapAction, entityId); }}
      @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); onAction(holdAction, entityId); }}
      title="${entity.attributes.friendly_name || entityId}: ${level}%"
    >
      <ha-icon
        .icon=${icon}
        style=${styleMap(iconStyles)}
      ></ha-icon>
    </div>
  `;
}

// =============================================================================
// MAIN RENDER FUNCTIONS
// =============================================================================

/**
 * Render battery entities section (inline mode)
 * Only shows entities below the low threshold
 */
export function renderBatteryEntities(
  hass: HomeAssistant,
  config: BatteryEntitiesConfig | undefined,
  onAction: BatteryActionHandler
): TemplateResult | typeof nothing {
  if (!config) return nothing;

  // Skip rendering in inline mode if badge mode is enabled
  if (config.show_as_badge) return nothing;

  const lowBatteryEntities = getLowBatteryEntities(hass, config);
  if (lowBatteryEntities.length === 0) return nothing;

  const iconSize = config.icon_size || '21px';
  const color = 'var(--state-sensor-battery-low-color, var(--error-color, #db4437))';

  return html`
    ${lowBatteryEntities.map(entityId =>
      renderBatteryEntity(hass, entityId, iconSize, color, config, onAction)
    )}
  `;
}

/**
 * Render battery badge (badge mode)
 * Shows a single circular badge with battery icon when any entities are low
 */
export function renderBatteryBadge(
  hass: HomeAssistant,
  config: BatteryEntitiesConfig | undefined,
  onAction: BatteryActionHandler
): TemplateResult | typeof nothing {
  if (!config || !config.show_as_badge) return nothing;

  const lowBatteryEntities = getLowBatteryEntities(hass, config);
  if (lowBatteryEntities.length === 0) return nothing;

  // Get the lowest battery level for the icon
  let lowestLevel: number | null = null;
  for (const entityId of lowBatteryEntities) {
    const entity = hass.states[entityId];
    if (entity) {
      const level = getBatteryLevel(entity);
      if (level !== null && (lowestLevel === null || level < lowestLevel)) {
        lowestLevel = level;
      }
    }
  }

  const icon = getBatteryIcon(lowestLevel);
  const badgeSize = config.badge_size || DEFAULT_BADGE_SIZE;
  const badgeIconSize = config.badge_icon_size || DEFAULT_BADGE_ICON_SIZE;
  const badgePosition = (config.badge_position || DEFAULT_BADGE_POSITION) as BadgePositionType;
  const badgeColor = config.badge_color || 'var(--state-sensor-battery-low-color, var(--error-color, #db4437))';

  const positionStyles = getBadgePositionStyles(badgePosition);

  const badgeStyles: Record<string, string> = {
    ...positionStyles,
    'width': badgeSize,
    'height': badgeSize,
    'background-color': badgeColor,
  };

  const iconStyles: Record<string, string> = {
    '--mdc-icon-size': badgeIconSize,
    'color': 'white',
  };

  const tapAction = config.tap_action || { action: 'more-info' as const };
  const holdAction = config.hold_action || { action: 'more-info' as const };

  // Use first entity for tap action
  const primaryEntityId = lowBatteryEntities[0];
  const tooltip = buildBatteryTooltip(hass, lowBatteryEntities);

  return html`
    <div
      class="alert-badge alert-badge-battery"
      style=${styleMap(badgeStyles)}
      @click=${(e: Event) => { e.stopPropagation(); onAction(tapAction, primaryEntityId); }}
      @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); onAction(holdAction, primaryEntityId); }}
      title="${tooltip}"
    >
      <ha-icon
        .icon=${icon}
        style=${styleMap(iconStyles)}
      ></ha-icon>
    </div>
  `;
}

/**
 * Get count of low battery entities
 * Useful for checking if section should be rendered
 */
export function getLowBatteryCount(
  hass: HomeAssistant,
  config: BatteryEntitiesConfig | undefined
): number {
  if (!config) return 0;
  return getLowBatteryEntities(hass, config).length;
}

/**
 * Check if battery should be rendered as badge
 */
export function isBatteryBadgeMode(config: BatteryEntitiesConfig | undefined): boolean {
  return config?.show_as_badge === true;
}
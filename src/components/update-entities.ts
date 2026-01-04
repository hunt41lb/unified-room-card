/**
 * Update Entities Component
 * 
 * Renders a single update icon when any entities have pending updates.
 * Supports periodic spin animation to draw attention.
 */

import { html, TemplateResult, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type { HomeAssistant, UpdateEntitiesConfig, TapActionConfig } from '../types';

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_ICON = 'mdi:update';
const DEFAULT_ICON_SIZE = '21px';
const DEFAULT_COLOR = 'var(--state-update-active-color, var(--info-color, #039be5))';
const DEFAULT_SPIN_INTERVAL = 60; // seconds

// =============================================================================
// TYPES
// =============================================================================

interface UpdateActionHandler {
  (action: TapActionConfig, entityId: string): void;
}

export interface UpdateAnimationState {
  isSpinning: boolean;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get list of entities with pending updates
 */
function getPendingUpdateEntities(
  hass: HomeAssistant,
  config: UpdateEntitiesConfig
): string[] {
  const entities = config.entities || [];

  const pendingUpdateEntities: string[] = [];
  for (const entityId of entities) {
    const entity = hass.states[entityId];
    if (!entity) continue;
    
    // Update entities have state 'on' when update is available
    if (entity.state === 'on') {
      pendingUpdateEntities.push(entityId);
    }
  }

  return pendingUpdateEntities;
}

/**
 * Build tooltip showing all pending updates
 */
function buildUpdateTooltip(
  hass: HomeAssistant,
  pendingEntities: string[]
): string {
  if (pendingEntities.length === 0) return '';
  
  if (pendingEntities.length === 1) {
    const entity = hass.states[pendingEntities[0]];
    if (!entity) return '1 update available';
    const name = entity.attributes.friendly_name || pendingEntities[0];
    const version = entity.attributes.latest_version || 'available';
    return `${name}: Update ${version}`;
  }
  
  // Multiple updates - show count and list
  const names = pendingEntities.map(entityId => {
    const entity = hass.states[entityId];
    return entity?.attributes.friendly_name || entityId;
  });
  
  return `${pendingEntities.length} updates available:\n${names.join('\n')}`;
}

// =============================================================================
// MAIN RENDER FUNCTION
// =============================================================================

/**
 * Render update entities section
 * Shows a SINGLE icon when any updates are pending
 */
export function renderUpdateEntities(
  hass: HomeAssistant,
  config: UpdateEntitiesConfig | undefined,
  onAction: UpdateActionHandler,
  animationState: UpdateAnimationState
): TemplateResult | typeof nothing {
  if (!config) return nothing;

  const pendingEntities = getPendingUpdateEntities(hass, config);
  if (pendingEntities.length === 0) return nothing;

  const iconSize = config.icon_size || DEFAULT_ICON_SIZE;
  const color = config.color || DEFAULT_COLOR;
  const icon = config.icon || DEFAULT_ICON;
  const spinEnabled = config.spin_animation === true;

  const iconStyles: Record<string, string> = {
    '--mdc-icon-size': iconSize,
    'color': color,
  };

  const tapAction = config.tap_action || { action: 'more-info' as const };
  const holdAction = config.hold_action || { action: 'more-info' as const };

  // Use first entity for action (will show more-info for first update)
  const primaryEntityId = pendingEntities[0];
  const tooltip = buildUpdateTooltip(hass, pendingEntities);

  // Animation classes
  const iconClasses = {
    'update-icon': true,
    'spin-animation': spinEnabled && animationState.isSpinning,
  };

  return html`
    <div 
      class="intermittent-entity"
      @click=${(e: Event) => { e.stopPropagation(); onAction(tapAction, primaryEntityId); }}
      @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); onAction(holdAction, primaryEntityId); }}
      title="${tooltip}"
    >
      <ha-icon
        class=${classMap(iconClasses)}
        .icon=${icon}
        style=${styleMap(iconStyles)}
      ></ha-icon>
      ${pendingEntities.length > 1 ? html`
        <span class="update-badge">${pendingEntities.length}</span>
      ` : nothing}
    </div>
  `;
}

/**
 * Get count of pending updates
 * Useful for checking if section should be rendered
 */
export function getPendingUpdateCount(
  hass: HomeAssistant,
  config: UpdateEntitiesConfig | undefined
): number {
  if (!config) return 0;
  return getPendingUpdateEntities(hass, config).length;
}

/**
 * Get spin interval from config (in milliseconds)
 */
export function getSpinInterval(config: UpdateEntitiesConfig | undefined): number {
  const seconds = config?.spin_interval ?? DEFAULT_SPIN_INTERVAL;
  return Math.max(10, seconds) * 1000; // Minimum 10 seconds
}

/**
 * Check if spin animation is enabled
 */
export function isSpinAnimationEnabled(config: UpdateEntitiesConfig | undefined): boolean {
  return config?.spin_animation === true;
}

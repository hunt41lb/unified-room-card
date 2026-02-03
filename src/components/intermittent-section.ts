/**
 * Intermittent Entities Component
 *
 * Renders entities that only appear when in an "active" state.
 * Supports state-based icon/color/animation configurations,
 * custom active state definitions, and tap/hold actions.
 * Can optionally include battery and update entities in the same section.
 */

import { html, TemplateResult, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type {
  HomeAssistant,
  IntermittentEntitiesConfig,
  BatteryEntitiesConfig,
  UpdateEntitiesConfig,
  EntityConfig,
  TapActionConfig
} from '../types';
import type { AnimationType } from '../constants';
import { DOMAIN_ACTIVE_STATES } from '../constants';
import { getDomain } from '../utils/entity-helpers';
import { getIntermittentEntityDefaultIcon } from '../utils/icon-resolver';
import { getIntermittentEntityColor } from '../utils/color-resolver';
import { renderBatteryEntities, getLowBatteryCount } from './battery-entities';
import { renderUpdateEntities, getPendingUpdateCount, type UpdateAnimationState } from './update-entities';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Action handler callback type
 * The parent component provides this to handle tap/hold actions
 */
export interface IntermittentActionHandler {
  (action: TapActionConfig, entityId: string): void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_ICON_SIZE = '21px';
const DEFAULT_GAP = '4px';

// =============================================================================
// ACTIVE STATE CHECKER
// =============================================================================

/**
 * Check if an intermittent entity should be displayed (is "active")
 */
function isIntermittentEntityActive(
  hass: HomeAssistant,
  entityConfig: EntityConfig,
  sectionActiveStates?: string[]
): boolean {
  const entity = hass.states[entityConfig.entity];
  if (!entity) return false;

  // Check if unavailable - don't show
  if (['unavailable', 'unknown'].includes(entity.state)) {
    return false;
  }

  const state = entity.state;
  const domain = getDomain(entityConfig.entity);

  // Priority: entity-specific > section-wide > domain defaults
  const activeStates = entityConfig.active_states || sectionActiveStates || DOMAIN_ACTIVE_STATES[domain] || ['on'];

  return activeStates.includes(state);
}

// =============================================================================
// SINGLE ENTITY RENDERER
// =============================================================================

/**
 * Render a single intermittent entity
 */
function renderIntermittentEntity(
  hass: HomeAssistant,
  entityConfig: EntityConfig,
  defaultIconSize: string,
  sectionAnimation: AnimationType | undefined,
  onAction: IntermittentActionHandler
): TemplateResult | typeof nothing {
  const entity = hass.states[entityConfig.entity];
  if (!entity) return nothing;

  const state = entity.state;
  const domain = getDomain(entityConfig.entity);

  // Determine icon
  let icon = entityConfig.icon;
  const stateConfig = entityConfig.states?.find(s => s.state === state);
  if (stateConfig?.icon) {
    icon = stateConfig.icon;
  } else if (!icon) {
    icon = getIntermittentEntityDefaultIcon(domain, state, entity);
  }

  // Determine color
  let color = getIntermittentEntityColor(domain, state);
  if (stateConfig?.color) {
    color = stateConfig.color;
  }

  // Determine animation (state > entity > section)
  const animation = stateConfig?.animation || entityConfig.animation || sectionAnimation;

  // Determine icon size
  const iconSize = entityConfig.icon_size || defaultIconSize;

  // Handle tap action
  const tapAction = entityConfig.tap_action || { action: 'more-info' as const };
  const holdAction = entityConfig.hold_action || { action: 'more-info' as const };

  const iconStyles: Record<string, string> = {
    '--mdc-icon-size': iconSize,
    'color': color,
  };

  const entityClasses = {
    'intermittent-entity': true,
    [`animation-${animation}`]: !!animation,
  };

  return html`
    <div
      class=${classMap(entityClasses)}
      @click=${(e: Event) => { e.stopPropagation(); onAction(tapAction, entityConfig.entity); }}
      @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); onAction(holdAction, entityConfig.entity); }}
      title="${entity.attributes.friendly_name || entityConfig.entity}: ${state}"
    >
      <ha-icon
        .icon=${icon}
        style=${styleMap(iconStyles)}
      ></ha-icon>
    </div>
  `;
}

// =============================================================================
// MAIN RENDER FUNCTION
// =============================================================================

/**
 * Render the intermittent entities section
 * Only shows entities when they are in an "active" state
 *
 * @param hass - Home Assistant instance
 * @param config - Intermittent entities configuration
 * @param onAction - Callback for handling tap/hold actions
 * @param legacyGrid - If true, applies grid-area positioning styles
 * @param batteryConfig - Optional battery config to include in section
 * @param updateConfig - Optional update config to include in section
 * @param updateAnimationState - Animation state for update entities
 */
export function renderIntermittentEntities(
  hass: HomeAssistant,
  config: IntermittentEntitiesConfig | undefined,
  onAction: IntermittentActionHandler,
  legacyGrid: boolean = false,
  batteryConfig?: BatteryEntitiesConfig,
  updateConfig?: UpdateEntitiesConfig,
  updateAnimationState?: UpdateAnimationState
): TemplateResult | typeof nothing {
  const defaultIconSize = config?.icon_size || DEFAULT_ICON_SIZE;
  const gap = config?.gap || DEFAULT_GAP;
  const sectionActiveStates = config?.active_states;
  const sectionAnimation = config?.animation;

  // Filter to only active entities
  const activeEntities = (config?.entities || []).filter(entityConfig =>
    isIntermittentEntityActive(hass, entityConfig, sectionActiveStates)
  );

  // Check if battery/update have content
  const hasBatteryContent = batteryConfig &&
    getLowBatteryCount(hass, batteryConfig) > 0;
  const hasUpdateContent = updateConfig &&
    getPendingUpdateCount(hass, updateConfig) > 0;

  // Don't render section if no content at all
  if (activeEntities.length === 0 && !hasBatteryContent && !hasUpdateContent) {
    return nothing;
  }

  const sectionStyles: Record<string, string> = {
    'gap': gap,
  };

  const classes = {
    'intermittent-section': true,
    'legacy-grid': legacyGrid,
  };

  return html`
    <div class=${classMap(classes)} style=${styleMap(sectionStyles)}>
      ${activeEntities.map((entityConfig) =>
        renderIntermittentEntity(hass, entityConfig, defaultIconSize, sectionAnimation, onAction)
      )}
      ${hasBatteryContent ? renderBatteryEntities(hass, batteryConfig, onAction) : nothing}
      ${hasUpdateContent && updateAnimationState ? renderUpdateEntities(hass, updateConfig, onAction, updateAnimationState) : nothing}
    </div>
  `;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if intermittent entities section has any active content to render
 */
export function hasActiveIntermittentEntities(
  hass: HomeAssistant,
  config: IntermittentEntitiesConfig | undefined
): boolean {
  if (!config?.entities?.length) return false;

  const sectionActiveStates = config.active_states;
  return config.entities.some(entityConfig =>
    isIntermittentEntityActive(hass, entityConfig, sectionActiveStates)
  );
}

/**
 * Get count of active intermittent entities
 */
export function getActiveIntermittentCount(
  hass: HomeAssistant,
  config: IntermittentEntitiesConfig | undefined
): number {
  if (!config?.entities?.length) return 0;

  const sectionActiveStates = config.active_states;
  return config.entities.filter(entityConfig =>
    isIntermittentEntityActive(hass, entityConfig, sectionActiveStates)
  ).length;
}
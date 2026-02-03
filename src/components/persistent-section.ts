/**
 * Persistent Entities Component
 *
 * Renders entities that are always visible regardless of state.
 * Supports state-based icon/color configurations, custom positioning,
 * and tap/hold actions.
 */

import { html, TemplateResult, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type {
  HomeAssistant,
  PersistentEntitiesConfig,
  EntityConfig,
  TapActionConfig
} from '../types';
import { getDomain, isUnavailable } from '../utils/entity-helpers';
import { getPersistentEntityDefaultIcon } from '../utils/icon-resolver';
import { getPersistentEntityColor } from '../utils/color-resolver';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Action handler callback type
 * The parent component provides this to handle tap/hold actions
 */
export interface PersistentActionHandler {
  (action: TapActionConfig, entityId: string): void;
}

/**
 * Default more-info handler for when no tap_action is configured
 */
export interface MoreInfoHandler {
  (entityId: string): void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_ICON_SIZE = '21px';
const DEFAULT_GAP = '4px';

// =============================================================================
// SINGLE ENTITY RENDERER
// =============================================================================

/**
 * Render a single persistent entity
 */
function renderPersistentEntity(
  hass: HomeAssistant,
  entityConfig: EntityConfig,
  defaultIconSize: string,
  onAction: PersistentActionHandler,
  onMoreInfo: MoreInfoHandler
): TemplateResult {
  const entity = hass.states[entityConfig.entity];
  const entityUnavailable = !entity || isUnavailable(entity);
  const state = entity?.state || 'unavailable';
  const domain = getDomain(entityConfig.entity);

  // Find state-specific config
  const stateConfig = entityConfig.states?.find(s => s.state === state);

  // Determine icon (priority: state config > entity config > entity attribute > domain default)
  let icon = stateConfig?.icon || entityConfig.icon;
  if (!icon && entity?.attributes.icon) {
    icon = entity.attributes.icon as string;
  }
  if (!icon) {
    icon = getPersistentEntityDefaultIcon(domain, state);
  }

  // Determine color (priority: state config > domain state colors > default)
  let color = stateConfig?.color;
  if (!color) {
    color = getPersistentEntityColor(domain, state, entityUnavailable);
  }

  // Icon size (entity-specific or default)
  const iconSize = entityConfig.icon_size || defaultIconSize;

  // Icon styles
  const iconStyles: Record<string, string> = {
    'width': iconSize,
    'height': iconSize,
    'color': color,
    '--mdc-icon-size': iconSize,
  };

  // Handle tap action
  const handleTap = (e: Event) => {
    e.stopPropagation();
    if (entityConfig.tap_action) {
      onAction(entityConfig.tap_action, entityConfig.entity);
    } else {
      // Default: show more-info dialog
      onMoreInfo(entityConfig.entity);
    }
  };

  // Handle hold action
  const handleHold = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    if (entityConfig.hold_action) {
      onAction(entityConfig.hold_action, entityConfig.entity);
    }
  };

  return html`
    <div
      class="persistent-entity"
      @click=${handleTap}
      @contextmenu=${handleHold}
      title="${entity?.attributes.friendly_name || entityConfig.entity}: ${state}"
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
 * Render the persistent entities section
 *
 * @param hass - Home Assistant instance
 * @param config - Persistent entities configuration
 * @param onAction - Callback for handling tap/hold actions
 * @param onMoreInfo - Callback for default more-info action
 * @param legacyGrid - If true, applies grid-area positioning styles
 */
export function renderPersistentEntities(
  hass: HomeAssistant,
  config: PersistentEntitiesConfig | undefined,
  onAction: PersistentActionHandler,
  onMoreInfo: MoreInfoHandler,
  legacyGrid: boolean = false
): TemplateResult | typeof nothing {
  if (!config?.entities?.length) {
    return nothing;
  }

  const position = config.position || 'right';
  const defaultIconSize = config.icon_size || DEFAULT_ICON_SIZE;
  const gap = config.gap || DEFAULT_GAP;

  // Build section styles
  const sectionStyles: Record<string, string> = {
    'gap': gap,
  };

  // Only apply positioning styles in legacy grid mode or when position is explicitly set
  if (legacyGrid) {
    // Handle custom padding or use smart defaults based on position
    if (config.padding) {
      sectionStyles['padding'] = config.padding;
    } else {
      switch (position) {
        case 'left':
          sectionStyles['padding'] = '0 0 1px 14px';
          break;
        case 'center':
          sectionStyles['padding'] = '0 0 1px 0';
          break;
        case 'right':
        default:
          sectionStyles['padding'] = '0 0 1px 2px';
          if (!config.margin) {
            sectionStyles['margin'] = '0 3px 0 0';
          }
          break;
      }
    }

    // Handle custom margin
    if (config.margin) {
      sectionStyles['margin'] = config.margin;
    }

    // Set justify-self based on position
    switch (position) {
      case 'left':
        sectionStyles['justify-self'] = 'start';
        break;
      case 'center':
        sectionStyles['justify-self'] = 'center';
        break;
      case 'right':
      default:
        sectionStyles['justify-self'] = 'end';
        break;
    }
  }

  const entities = config.entities || [];
  const classes = {
    'persistent-section': true,
    'legacy-grid': legacyGrid,
  };

  return html`
    <div class=${classMap(classes)} style=${styleMap(sectionStyles)}>
      ${entities.map((entityConfig) =>
        renderPersistentEntity(hass, entityConfig, defaultIconSize, onAction, onMoreInfo)
      )}
    </div>
  `;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if persistent entities section has content to render
 */
export function hasPersistentEntities(config: PersistentEntitiesConfig | undefined): boolean {
  return !!(config?.entities?.length);
}
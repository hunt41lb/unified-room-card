/**
 * Icon Section Component
 *
 * Renders the main card icon with support for:
 * - img_cell background mode
 * - Icon state map (dynamic icon/color based on entity state)
 * - Domain-specific coloring (light, climate, etc.)
 * - Unavailable state handling
 * - Animation effects (spin, pulse, glow, flash)
 * - Configurable positioning
 */

import { html, TemplateResult, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type { HomeAssistant, UnifiedRoomCardConfig } from '../types';
import {
  ICON_HORIZONTAL_POSITION_OPTIONS,
  ICON_VERTICAL_POSITION_OPTIONS,
} from '../constants';
import {
  getPrimaryDomain,
  getPrimaryEntity,
  isPrimaryEntityUnavailable,
  isGroupActive,
  getUnavailableConfig,
  getClimateIconColor,
  getEntityStateColor,
  getGroupBackgroundColor,
  getGroupIconColor,
  getDefaultIcon,
} from '../utils';
import { getAnimationClass } from '../styles';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Resolved icon state map entry
 */
interface ResolvedStateMap {
  icon?: string;
  color?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Resolve icon_state_map configuration to get current icon/color overrides
 */
function resolveIconStateMap(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig
): ResolvedStateMap {
  if (!config.icon_state_map?.states) {
    return {};
  }

  const mapEntityId = config.icon_state_map.entity || config.entity;
  const mapEntity = mapEntityId ? hass.states[mapEntityId] : undefined;

  if (!mapEntity) {
    return {};
  }

  const mapEntry = config.icon_state_map.states[mapEntity.state];
  return mapEntry || {};
}

/**
 * Determine the icon to display based on priority chain
 * Priority: unavailable custom icon > state map icon > config icon > entity default
 */
function resolveIcon(
  config: UnifiedRoomCardConfig,
  mainEntity: { entity_id: string; state: string; attributes: Record<string, unknown> } | undefined,
  stateMapIcon: string | undefined,
  applyUnavailableStyles: boolean,
  unavailableIcon: string | undefined
): string {
  if (applyUnavailableStyles && unavailableIcon) {
    return unavailableIcon;
  }
  return stateMapIcon || config.icon || getDefaultIcon(mainEntity);
}

/**
 * Build icon container classes
 */
function buildIconContainerClasses(
  showImgCell: boolean,
  isActive: boolean,
  animationClass: string
): Record<string, boolean> {
  const classes: Record<string, boolean> = {
    'icon-container': true,
    'with-img-cell': showImgCell,
    'active': isActive,
  };

  if (animationClass) {
    classes[animationClass] = true;
  }

  return classes;
}

/**
 * Build icon container styles (background, size, animation)
 */
function buildIconContainerStyles(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
  showImgCell: boolean,
  isActive: boolean,
  applyUnavailableStyles: boolean,
  unavailableBackgroundColor: string,
  stateMapColor: string | undefined
): Record<string, string> {
  const styles: Record<string, string> = {};

  // Apply spin duration if spin animation is enabled
  if (config.icon_animation === 'spin' && isActive) {
    const spinDuration = config.spin_duration || 2;
    styles['--spin-duration'] = `${spinDuration}s`;
  }

  // Apply custom img_cell size if specified
  if (showImgCell && config.img_cell_size) {
    styles['width'] = config.img_cell_size;
    styles['height'] = config.img_cell_size;
  }

  // Apply dynamic background color for active state with img_cell
  if (applyUnavailableStyles && showImgCell) {
    // Unavailable state background
    styles['background'] = unavailableBackgroundColor;
  } else if (stateMapColor && showImgCell) {
    // Icon state map color overrides background when img_cell is shown
    styles['background'] = stateMapColor;
  } else if (isActive && showImgCell) {
    const bgColor = getGroupBackgroundColor(hass, config);
    styles['background'] = bgColor;
  }

  return styles;
}

/**
 * Build icon styles (color, size)
 */
function buildIconStyles(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig,
  mainEntity: { entity_id: string; state: string; attributes: Record<string, unknown> } | undefined,
  domain: string,
  showImgCell: boolean,
  isActive: boolean,
  applyUnavailableStyles: boolean,
  unavailableIconColor: string,
  stateMapColor: string | undefined,
  iconContainerStyles: Record<string, string>
): Record<string, string> {
  const styles: Record<string, string> = {};

  // Apply icon size
  if (config.icon_size) {
    styles['--mdc-icon-size'] = config.icon_size;
    // Also apply size to container when no img_cell
    if (!showImgCell) {
      iconContainerStyles['width'] = config.icon_size;
      iconContainerStyles['height'] = config.icon_size;
    }
  }

  // Determine icon color based on state and configuration
  if (applyUnavailableStyles) {
    // Unavailable state color
    styles['color'] = unavailableIconColor;
  } else if (stateMapColor && showImgCell) {
    // Icon state map with img_cell - use white/contrast for readability
    styles['color'] = 'var(--text-primary-color, #fff)';
  } else if (stateMapColor) {
    // Icon state map without img_cell - apply color directly to icon
    styles['color'] = stateMapColor;
  } else if (isActive && showImgCell) {
    // For active state with img-cell, use white/contrast color
    styles['color'] = 'var(--text-primary-color, #fff)';
  } else if (mainEntity && isActive) {
    // Active state WITHOUT img_cell - use domain-specific colors
    if (domain === 'light') {
      // Use averaged light color for groups
      styles['color'] = getGroupIconColor(hass, config);
    } else if (domain === 'climate') {
      // Use climate hvac_action colors
      styles['color'] = getClimateIconColor(mainEntity);
    } else {
      // Other domains - use generic active color or state color
      const stateColor = getEntityStateColor(mainEntity);
      if (stateColor) {
        styles['color'] = stateColor;
      } else {
        styles['color'] = 'var(--state-active-color, var(--amber-color, #ffc107))';
      }
    }
  } else if (mainEntity && domain === 'climate') {
    // Climate not active but may still be heating/cooling - check hvac_action
    styles['color'] = getClimateIconColor(mainEntity);
  } else if (mainEntity) {
    // Inactive state - check for domain-specific state color (like lock states)
    const stateColor = getEntityStateColor(mainEntity);
    if (stateColor) {
      styles['color'] = stateColor;
    }
  }

  return styles;
}

/**
 * Build icon section positioning styles
 */
function buildIconSectionStyles(config: UnifiedRoomCardConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  // Horizontal positioning
  const hPos = config.icon_horizontal_position || ICON_HORIZONTAL_POSITION_OPTIONS.RIGHT;
  switch (hPos) {
    case ICON_HORIZONTAL_POSITION_OPTIONS.LEFT:
      styles['justify-self'] = 'start';
      break;
    case ICON_HORIZONTAL_POSITION_OPTIONS.CENTER:
      styles['justify-self'] = 'center';
      break;
    case ICON_HORIZONTAL_POSITION_OPTIONS.RIGHT:
    default:
      styles['justify-self'] = 'end';
      break;
  }

  // Vertical positioning
  const vPos = config.icon_vertical_position || ICON_VERTICAL_POSITION_OPTIONS.TOP;
  switch (vPos) {
    case ICON_VERTICAL_POSITION_OPTIONS.TOP:
      styles['align-self'] = 'start';
      break;
    case ICON_VERTICAL_POSITION_OPTIONS.CENTER:
      styles['align-self'] = 'center';
      break;
    case ICON_VERTICAL_POSITION_OPTIONS.BOTTOM:
      styles['align-self'] = 'end';
      break;
  }

  return styles;
}

// =============================================================================
// MAIN RENDER FUNCTION
// =============================================================================

/**
 * Render the icon section
 *
 * @param hass - Home Assistant instance
 * @param config - Card configuration
 */
export function renderIconSection(
  hass: HomeAssistant,
  config: UnifiedRoomCardConfig
): TemplateResult | typeof nothing {
  // Get primary entity for display purposes
  const mainEntity = getPrimaryEntity(hass, config);

  // Check if ANY entity in the group is active
  const isActive = isGroupActive(hass, config);

  // Get domain from primary entity
  const domain = getPrimaryDomain(config) || '';

  const showIcon = config.show_icon !== false;
  const showImgCell = config.show_img_cell ?? true;

  // Check for unavailable state and get appropriate handling
  const entityUnavailable = isPrimaryEntityUnavailable(hass, config);
  const unavailableConfig = getUnavailableConfig(config);
  const applyUnavailableStyles = entityUnavailable && unavailableConfig.behavior !== 'off';

  // Resolve icon_state_map match (if configured)
  const stateMap = resolveIconStateMap(hass, config);

  // Resolve icon
  const icon = resolveIcon(
    config,
    mainEntity,
    stateMap.icon,
    applyUnavailableStyles,
    unavailableConfig.icon
  );

  // Get animation class (only when active and animation is configured)
  const animationClass = isActive && config.icon_animation && config.icon_animation !== 'none'
    ? getAnimationClass(config.icon_animation)
    : '';

  // Build classes and styles
  const iconContainerClasses = buildIconContainerClasses(showImgCell, isActive, animationClass);

  const iconContainerStyles = buildIconContainerStyles(
    hass,
    config,
    showImgCell,
    isActive,
    applyUnavailableStyles,
    unavailableConfig.background_color,
    stateMap.color
  );

  const iconStyles = buildIconStyles(
    hass,
    config,
    mainEntity,
    domain,
    showImgCell,
    isActive,
    applyUnavailableStyles,
    unavailableConfig.icon_color,
    stateMap.color,
    iconContainerStyles // Pass by reference to allow mutation for icon size
  );

  const iconSectionStyles = buildIconSectionStyles(config);

  // Check if state should be shown inline (not in separate grid area)
  const showStateInline = config.show_state && mainEntity &&
    !/\bstate\b/.test(config.grid?.template_areas || '');

  return html`
    <div class="icon-section" style=${styleMap(iconSectionStyles)}>
      ${showStateInline
        ? html`<span class="state-text">${mainEntity.state}</span>`
        : nothing}
      <div class="icon-wrapper">
        ${showIcon
          ? html`
              <div
                class=${classMap(iconContainerClasses)}
                style=${styleMap(iconContainerStyles)}
              >
                <ha-icon
                  .icon=${icon}
                  style=${styleMap(iconStyles)}
                ></ha-icon>
              </div>
            `
          : nothing}
      </div>
    </div>
  `;
}
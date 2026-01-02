/**
 * Unified Room Card - Styles
 * 
 * Central source of truth for all CSS styles.
 * All styles reference Home Assistant CSS variables where applicable
 * to ensure theme compatibility.
 */

import { css, unsafeCSS } from 'lit';
import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
  DEFAULT_ICON_WIDTH,
  DEFAULT_ICON_HEIGHT,
  DEFAULT_IMG_CELL_WIDTH,
  DEFAULT_IMG_CELL_HEIGHT,
  DEFAULT_PRIMARY_FONT_SIZE,
  DEFAULT_SECONDARY_FONT_SIZE,
  DEFAULT_SECONDARY_FONT_WEIGHT,
  DEFAULT_SECONDARY_OPACITY,
  DEFAULT_GRID_TEMPLATE_AREAS,
  DEFAULT_GRID_TEMPLATE_COLUMNS,
  DEFAULT_GRID_TEMPLATE_ROWS,
  DEFAULT_PERSISTENT_ICON_SIZE,
  DEFAULT_INTERMITTENT_ICON_SIZE,
} from './constants';

// =============================================================================
// HOME ASSISTANT CSS VARIABLE REFERENCES
// =============================================================================

export const HA_CSS_VARIABLES = {
  // Card
  cardBackground: 'var(--ha-card-background, var(--card-background-color, white))',
  cardBorderRadius: 'var(--ha-card-border-radius, 12px)',
  cardBoxShadow: 'var(--ha-card-box-shadow, none)',
  
  // Colors
  primaryColor: 'var(--primary-color)',
  primaryTextColor: 'var(--primary-text-color)',
  secondaryTextColor: 'var(--secondary-text-color)',
  disabledTextColor: 'var(--disabled-text-color)',
  
  // State Colors
  stateOnColor: 'var(--state-light-on-color, var(--state-on-color, var(--primary-color)))',
  stateOffColor: 'var(--state-light-off-color, var(--state-off-color, var(--disabled-text-color)))',
  stateActiveColor: 'var(--state-active-color, var(--primary-color))',
  stateInactiveColor: 'var(--state-inactive-color, var(--disabled-text-color))',
  
  // Sensor Battery Colors
  batteryLowColor: 'var(--state-sensor-battery-low-color, #db4437)',
  batteryMediumColor: 'var(--state-sensor-battery-medium-color, #ffa600)',
  batteryHighColor: 'var(--state-sensor-battery-high-color, #43a047)',
  
  // Update Entity Color
  updateActiveColor: 'var(--state-update-on-color, var(--primary-color))',
  
  // Climate Colors
  climateIdleColor: 'var(--state-climate-idle-color, var(--disabled-text-color))',
  climateHeatColor: 'var(--state-climate-heat-color, #ff8100)',
  climateCoolColor: 'var(--state-climate-cool-color, #2196f3)',
  
  // Lock Colors
  lockLockedColor: 'var(--state-lock-locked-color, var(--primary-color))',
  lockUnlockedColor: 'var(--state-lock-unlocked-color, #db4437)',
  
  // Binary Sensor Colors
  binarySensorOnColor: 'var(--state-binary-sensor-on-color, var(--primary-color))',
  binarySensorOffColor: 'var(--state-binary-sensor-off-color, var(--disabled-text-color))',
  
  // Icon
  iconColor: 'var(--paper-item-icon-color, #44739e)',
  iconActiveColor: 'var(--paper-item-icon-active-color, var(--primary-color))',
  
  // Divider
  dividerColor: 'var(--divider-color, #e0e0e0)',
  
  // Unavailable
  unavailableColor: 'var(--state-unavailable-color, var(--disabled-text-color))',
} as const;

// =============================================================================
// ANIMATION KEYFRAMES
// =============================================================================

export const animationKeyframes = css`
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
      filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 12px currentColor);
    }
  }

  @keyframes flash {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.3;
    }
  }
`;

// =============================================================================
// ANIMATION CLASSES
// =============================================================================

export const animationClasses = css`
  .animation-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animation-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animation-flash {
    animation: flash 1s ease-in-out infinite;
  }
`;

// =============================================================================
// CARD BASE STYLES
// =============================================================================

export const cardBaseStyles = css`
  :host {
    display: block;
  }

  ha-card {
    display: grid;
    grid-template-areas: ${unsafeCSS(DEFAULT_GRID_TEMPLATE_AREAS)};
    grid-template-columns: ${unsafeCSS(DEFAULT_GRID_TEMPLATE_COLUMNS)};
    grid-template-rows: ${unsafeCSS(DEFAULT_GRID_TEMPLATE_ROWS)};
    height: ${unsafeCSS(DEFAULT_CARD_HEIGHT)};
    width: ${unsafeCSS(DEFAULT_CARD_WIDTH)};
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    background: ${unsafeCSS(HA_CSS_VARIABLES.cardBackground)};
    border-radius: ${unsafeCSS(HA_CSS_VARIABLES.cardBorderRadius)};
    transition: background-color 0.3s ease;
  }

  ha-card.state-on {
    background-color: var(--card-background-color);
  }

  ha-card.state-off {
    background-color: color-mix(in srgb, var(--card-background-color) 50%, transparent);
  }
`;

// =============================================================================
// NAME SECTION STYLES
// =============================================================================

export const nameStyles = css`
  .name-section {
    grid-area: name;
    justify-self: start;
    align-self: start;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
    padding: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// =============================================================================
// ICON SECTION STYLES
// =============================================================================

export const iconStyles = css`
  .icon-section {
    grid-area: icon;
    justify-self: end;
    align-self: start;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${unsafeCSS(DEFAULT_ICON_WIDTH)};
    height: ${unsafeCSS(DEFAULT_ICON_HEIGHT)};
    transition: all 0.2s ease;
  }

  .icon-container.with-img-cell {
    width: ${unsafeCSS(DEFAULT_IMG_CELL_WIDTH)};
    height: ${unsafeCSS(DEFAULT_IMG_CELL_HEIGHT)};
    border-radius: 100%;
    background: var(--secondary-background-color);
    transition: background 0.3s ease;
  }

  /* Active state background is applied dynamically via inline style for light color support */

  .icon-container ha-icon {
    --mdc-icon-size: ${unsafeCSS(DEFAULT_ICON_WIDTH)};
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .icon-container.active ha-icon {
    color: ${unsafeCSS(HA_CSS_VARIABLES.iconActiveColor)};
  }

  .icon-container.with-img-cell.active ha-icon {
    color: var(--text-primary-color, #fff);
  }

  .state-text {
    font-size: 12px;
    font-weight: 500;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    text-transform: capitalize;
    white-space: nowrap;
  }

  /* When icon is hidden, keep the section but hide content */
  .icon-section.hidden {
    visibility: hidden;
  }
`;

// =============================================================================
// CLIMATE SECTION STYLES
// =============================================================================

export const climateStyles = css`
  .climate-section {
    grid-area: climate;
    justify-self: start;
    font-size: 30px;
    line-height: 30px;
    font-weight: 300;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
    padding: 0 0 1px 14px;
  }

  .climate-primary {
    font-size: 18px;
  }

  .climate-secondary {
    display: inline;
  }

  .climate-value {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.7;
  }

  .climate-divider {
    display: none;
  }
`;

// =============================================================================
// PERSISTENT ENTITIES STYLES
// =============================================================================

export const persistentStyles = css`
  .persistent-section {
    grid-area: persistent;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }

  .persistent-section.position-left {
    justify-content: flex-start;
  }

  .persistent-section.position-center {
    justify-content: center;
  }

  .persistent-section.position-right {
    justify-content: flex-end;
  }

  .persistent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .persistent-entity ha-icon {
    --mdc-icon-size: ${unsafeCSS(DEFAULT_PERSISTENT_ICON_SIZE)};
    transition: color 0.3s ease;
  }
`;

// =============================================================================
// INTERMITTENT ENTITIES STYLES
// =============================================================================

export const intermittentStyles = css`
  .intermittent-section {
    grid-area: intermittent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .intermittent-section.position-left {
    justify-content: flex-start;
  }

  .intermittent-section.position-center {
    justify-content: center;
  }

  .intermittent-section.position-right {
    justify-content: flex-end;
  }

  .intermittent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .intermittent-entity ha-icon {
    --mdc-icon-size: ${unsafeCSS(DEFAULT_INTERMITTENT_ICON_SIZE)};
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .intermittent-entity.hidden {
    display: none;
  }
`;

// =============================================================================
// OVERFLOW INDICATOR STYLES
// =============================================================================

export const overflowStyles = css`
  .overflow-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 2px 6px;
    min-width: 20px;
  }
`;

// =============================================================================
// UNAVAILABLE STATE STYLES
// =============================================================================

export const unavailableStyles = css`
  .unavailable {
    color: ${unsafeCSS(HA_CSS_VARIABLES.unavailableColor)} !important;
    opacity: 0.5;
  }
`;

// =============================================================================
// COMBINED CARD STYLES
// =============================================================================

export const cardStyles = css`
  ${animationKeyframes}
  ${animationClasses}
  ${cardBaseStyles}
  ${nameStyles}
  ${iconStyles}
  ${climateStyles}
  ${persistentStyles}
  ${intermittentStyles}
  ${overflowStyles}
  ${unavailableStyles}
`;

// =============================================================================
// EDITOR STYLES
// =============================================================================

export const editorStyles = css`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .accordion {
    border: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: hidden;
  }

  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.03);
    cursor: pointer;
    font-weight: 500;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
    transition: background 0.2s ease;
  }

  .accordion-header:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  .accordion-header ha-icon {
    transition: transform 0.2s ease;
  }

  .accordion-header.expanded ha-icon {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding: 16px;
    display: none;
  }

  .accordion-content.expanded {
    display: block;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .form-row:last-child {
    margin-bottom: 0;
  }

  .form-row-dual {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 24px;
  }

  .form-row-dual:last-child {
    margin-bottom: 0;
  }

  .form-row-dual .form-item {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .form-row-dual .form-label {
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
  }

  .form-row-dual .form-input {
    flex: 0 0 auto;
  }

  .form-row-dual .form-input ha-textfield {
    width: 100%;
  }

  /* For dual rows with text inputs, the input should expand */
  .form-row-dual.expand-inputs .form-input {
    flex: 1;
    min-width: 0;
  }

  .form-label {
    flex: 0 0 140px;
    font-size: 14px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
  }

  .form-input {
    flex: 1;
  }

  .entity-list {
    border: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
    border-radius: 8px;
    overflow: hidden;
  }

  .entity-item {
    border-bottom: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
  }

  .entity-item:last-child {
    border-bottom: none;
  }

  .entity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }

  .entity-header:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .entity-config {
    padding: 12px;
    display: none;
    border-top: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
  }

  .entity-config.expanded {
    display: block;
  }

  .add-entity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 8px;
    border: 1px dashed ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
    border-radius: 8px;
    cursor: pointer;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    transition: all 0.2s ease;
  }

  .add-entity-btn:hover {
    border-color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
  }

  ha-textfield,
  ha-select,
  ha-selector {
    width: 100%;
  }

  ha-switch {
    --mdc-theme-secondary: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
  }
`;

// =============================================================================
// STYLE HELPER FUNCTIONS
// =============================================================================

/**
 * Generate dynamic styles for card based on configuration
 */
export function getCardDynamicStyles(config: {
  cardHeight?: string;
  cardWidth?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  backgroundGradient?: string;
}): string {
  const styles: string[] = [];

  if (config.cardHeight) {
    styles.push(`height: ${config.cardHeight};`);
  }
  if (config.cardWidth) {
    styles.push(`width: ${config.cardWidth};`);
  }
  if (config.gridTemplateAreas) {
    styles.push(`grid-template-areas: ${config.gridTemplateAreas};`);
  }
  if (config.gridTemplateColumns) {
    styles.push(`grid-template-columns: ${config.gridTemplateColumns};`);
  }
  if (config.gridTemplateRows) {
    styles.push(`grid-template-rows: ${config.gridTemplateRows};`);
  }
  if (config.backgroundGradient) {
    styles.push(`background: ${config.backgroundGradient};`);
  } else if (config.backgroundColor) {
    styles.push(`background-color: ${config.backgroundColor};`);
  }

  return styles.join(' ');
}

/**
 * Get animation class based on animation type
 */
export function getAnimationClass(animation: string | undefined): string {
  if (!animation || animation === 'none') return '';
  return `animation-${animation}`;
}

/**
 * Get position class for entity sections
 */
export function getPositionClass(position: string | undefined): string {
  if (!position) return '';
  return `position-${position}`;
}

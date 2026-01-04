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

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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

  .animation-spin {
    animation: spin var(--spin-duration, 2s) linear infinite;
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
    /* Position in row 1, spanning first 2 columns */
    grid-row: 1;
    grid-column: 1 / 3;
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
    z-index: 1; /* Ensure name is above icon area */
  }
`;

// =============================================================================
// ICON SECTION STYLES
// =============================================================================

export const iconStyles = css`
  .icon-section {
    grid-area: icon;
    /* Position is set via inline styles for flexibility */
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
// STATUS SECTION STYLES (Combined persistent + intermittent)
// =============================================================================

export const statusStyles = css`
  .status-section {
    grid-area: status;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    padding: 0 0 1px 2px;
    margin: 0 3px 0 0;
  }
`;

// =============================================================================
// PERSISTENT ENTITIES STYLES
// =============================================================================

export const persistentStyles = css`
  .persistent-section {
    display: flex;
    align-items: center;
    /* padding, gap, and justify-self are set via inline styles for flexibility */
  }

  /* When using legacy grid with separate persistent area */
  .persistent-section.legacy-grid {
    grid-area: persistent;
  }

  .persistent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .persistent-entity:hover {
    transform: scale(1.1);
  }

  .persistent-entity:active {
    transform: scale(0.95);
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  /* When using legacy grid with separate intermittent area */
  .intermittent-section.legacy-grid {
    grid-area: intermittent;
  }

  .intermittent-entity {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .intermittent-entity:hover {
    transform: scale(1.1);
  }

  .intermittent-entity:active {
    transform: scale(0.95);
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
// BATTERY & UPDATE INDICATOR STYLES (uses .intermittent-entity class)
// =============================================================================

// Battery and Update entities now use the .intermittent-entity class
// No additional styles needed - they inherit from intermittent styles

// Battery section for custom grid layouts
export const batterySectionStyles = css`
  .battery-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  .battery-section.legacy-grid {
    grid-area: battery;
  }
`;

// Update section for custom grid layouts
export const updateSectionStyles = css`
  .update-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  .update-section.legacy-grid {
    grid-area: update;
  }
`;

// =============================================================================
// UPDATE ANIMATION STYLES
// =============================================================================

export const updateAnimationStyles = css`
  @keyframes spin-once {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .update-icon.spin-animation {
    animation: spin-once 1s ease-in-out;
  }

  .update-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--error-color, #db4437);
    color: white;
    font-size: 9px;
    font-weight: 600;
    min-width: 14px;
    height: 14px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
  }

  .intermittent-entity {
    position: relative;
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
  ${statusStyles}
  ${persistentStyles}
  ${intermittentStyles}
  ${batterySectionStyles}
  ${updateSectionStyles}
  ${overflowStyles}
  ${unavailableStyles}
  ${updateAnimationStyles}
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

  /* Sub-accordion styles (nested within main accordions) */
  .sub-accordion {
    border: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
    border-radius: 6px;
    margin-bottom: 12px;
    margin-left: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.01);
  }

  .sub-accordion:last-child {
    margin-bottom: 0;
  }

  .sub-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryTextColor)};
    transition: background 0.2s ease;
  }

  .sub-accordion-header:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .sub-accordion-header ha-icon {
    transition: transform 0.2s ease;
    --mdc-icon-size: 18px;
  }

  .sub-accordion-header.expanded ha-icon {
    transform: rotate(180deg);
  }

  .sub-accordion-content {
    padding: 12px 14px;
    display: none;
    background: rgba(255, 255, 255, 0.02);
  }

  .sub-accordion-content.expanded {
    display: block;
  }

  .section-description {
    font-size: 12px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    margin: 0 0 16px 0;
    font-style: italic;
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

  /* Inline form row - text field with toggle on same row */
  .form-row-inline {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;
  }

  .form-row-inline:last-child {
    margin-bottom: 0;
  }

  .form-row-inline .form-label {
    flex: 0 0 auto;
  }

  .form-row-inline .form-input {
    flex: 1;
  }

  .form-row-inline .form-toggle {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
  }

  /* Helper text style */
  .helper-text {
    font-size: 11px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    margin: -8px 0 12px 0;
    padding-left: 140px;
    font-style: italic;
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
    gap: 4px;
  }

  .add-entity-btn:hover {
    border-color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
  }

  .entity-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .entity-list-item ha-selector {
    flex: 1;
  }

  .entity-list-item ha-icon {
    cursor: pointer;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    transition: color 0.2s ease;
  }

  .entity-list-item ha-icon:hover {
    color: var(--error-color, #db4437);
  }

  .add-state-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    margin-top: 8px;
    border: 1px dashed ${unsafeCSS(HA_CSS_VARIABLES.dividerColor)};
    border-radius: 4px;
    cursor: pointer;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    transition: all 0.2s ease;
    font-size: 12px;
    gap: 4px;
  }

  .add-state-btn:hover {
    border-color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
  }

  .state-config-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 0;
    flex-wrap: wrap;
  }

  .state-config-row > ha-textfield,
  .state-config-row > ha-selector {
    flex: 1;
    min-width: 100px;
  }

  .state-config-row > .color-select-wrapper {
    flex: 1.5;
    min-width: 150px;
  }

  .state-config-row > ha-icon {
    cursor: pointer;
    color: ${unsafeCSS(HA_CSS_VARIABLES.secondaryTextColor)};
    flex-shrink: 0;
    margin-top: 12px;
  }

  .state-config-row > ha-icon:hover {
    color: var(--error-color, #db4437);
  }

  .color-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .color-select-wrapper ha-select {
    width: 100%;
  }

  .color-select-wrapper ha-textfield {
    width: 100%;
  }

  /* Color select with preview */
  .color-select-with-preview {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .color-select-with-preview ha-select {
    flex: 1;
  }

  .color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  /* Entity validation warning */
  .entity-name-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .entity-warning {
    color: var(--warning-color, #ffc107);
    --mdc-icon-size: 18px;
  }

  .validation-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 193, 7, 0.1);
    border: 1px solid var(--warning-color, #ffc107);
    border-radius: 4px;
    margin: 4px 0 8px 0;
    font-size: 12px;
    color: var(--warning-color, #ffc107);
  }

  .validation-warning ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  /* State header row with apply defaults button */
  .state-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .apply-defaults-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: transparent;
    border: 1px solid ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    border-radius: 4px;
    color: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .apply-defaults-btn:hover {
    background: ${unsafeCSS(HA_CSS_VARIABLES.primaryColor)};
    color: white;
  }

  .apply-defaults-btn ha-icon {
    --mdc-icon-size: 14px;
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
  borderStyle?: string;
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
  if (config.borderStyle) {
    styles.push(`border: ${config.borderStyle};`);
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

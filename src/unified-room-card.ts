/**
 * Unified Room Card
 * 
 * A comprehensive room status card for Home Assistant with support for
 * climate, persistent, and intermittent entities.
 */

import { LitElement, html, PropertyValues, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

// Internal imports
import {
  CARD_NAME,
  CARD_VERSION,
  CARD_DESCRIPTION,
  CARD_TAG,
  CARD_EDITOR_TAG,
  DEFAULT_TAP_ACTION,
  DEFAULT_HOLD_ACTION,
  DEFAULT_DOUBLE_TAP_ACTION,
  COMMON_STATES,
  ICON_HORIZONTAL_POSITION_OPTIONS,
  ICON_VERTICAL_POSITION_OPTIONS,
  DOMAIN_ACTIVE_STATES,
  DOMAIN_DEFAULT_ICONS,
  DOMAIN_STATE_ICONS,
  DOMAIN_STATE_COLORS,
  AnimationType,
} from './constants';

import type {
  HomeAssistant,
  UnifiedRoomCardConfig,
  TapActionConfig,
  ClimateEntitiesConfig,
  PowerEntitiesConfig,
} from './types';

import {
  cardStyles,
  getCardDynamicStyles,
  getAnimationClass,
} from './styles';

// Import editor (side effect: registers the custom element)
import './editor';

// Import components
import { 
  renderClimateSection, 
  renderBatteryEntities, 
  getLowBatteryCount,
  renderUpdateEntities,
  getPendingUpdateCount,
  getSpinInterval,
  isSpinAnimationEnabled,
  type UpdateAnimationState
} from './components';

// =============================================================================
// CONSOLE REGISTRATION LOG
// =============================================================================

console.info(
  `%c ${CARD_NAME.toUpperCase()} %c v${CARD_VERSION} `,
  'color: white; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);

// =============================================================================
// MAIN CARD CLASS
// =============================================================================

@customElement(CARD_TAG)
export class UnifiedRoomCard extends LitElement {
  // ===========================================================================
  // PROPERTIES
  // ===========================================================================

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UnifiedRoomCardConfig;
  
  // Tap handling - debounce to prevent double-tap from triggering tap
  private _tapTimeout?: ReturnType<typeof setTimeout>;
  private _tapCount: number = 0;
  private static readonly TAP_DEBOUNCE_MS = 250;

  // Update animation state
  @state() private _updateAnimationState: UpdateAnimationState = { isSpinning: false };
  private _updateSpinTimer?: ReturnType<typeof setInterval>;
  private _spinAnimationTimeout?: ReturnType<typeof setTimeout>;

  // ===========================================================================
  // STATIC STYLES
  // ===========================================================================

  static override styles = cardStyles;

  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================

  /**
   * Set card configuration from YAML
   */
  public setConfig(config: UnifiedRoomCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this._config = {
      // Defaults
      show_name: true,
      show_icon: true,
      show_state: false,
      show_img_cell: true, // Default to enabled
      icon_animation: 'none',
      tap_action: { action: DEFAULT_TAP_ACTION },
      hold_action: { action: DEFAULT_HOLD_ACTION },
      double_tap_action: { action: DEFAULT_DOUBLE_TAP_ACTION },
      // User overrides
      ...config,
    };
  }

  /**
   * Get card size for layout calculations
   */
  public getCardSize(): number {
    return 2;
  }

  /**
   * Clean up on disconnect
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up tap debounce timer
    if (this._tapTimeout) {
      clearTimeout(this._tapTimeout);
      this._tapTimeout = undefined;
    }
    // Clean up update animation timers
    this._stopUpdateSpinTimer();
  }

  /**
   * Start or restart the update spin animation timer
   */
  private _startUpdateSpinTimer(): void {
    this._stopUpdateSpinTimer();
    
    if (!isSpinAnimationEnabled(this._config?.update_entities)) return;
    if (!this.hass || getPendingUpdateCount(this.hass, this._config?.update_entities) === 0) return;

    const interval = getSpinInterval(this._config?.update_entities);
    
    // Trigger initial spin
    this._triggerUpdateSpin();
    
    // Set up periodic spin
    this._updateSpinTimer = setInterval(() => {
      this._triggerUpdateSpin();
    }, interval);
  }

  /**
   * Stop the update spin animation timer
   */
  private _stopUpdateSpinTimer(): void {
    if (this._updateSpinTimer) {
      clearInterval(this._updateSpinTimer);
      this._updateSpinTimer = undefined;
    }
    if (this._spinAnimationTimeout) {
      clearTimeout(this._spinAnimationTimeout);
      this._spinAnimationTimeout = undefined;
    }
  }

  /**
   * Trigger a single spin animation
   */
  private _triggerUpdateSpin(): void {
    this._updateAnimationState = { isSpinning: true };
    
    // Stop spinning after animation completes (1 second)
    this._spinAnimationTimeout = setTimeout(() => {
      this._updateAnimationState = { isSpinning: false };
    }, 1000);
  }

  /**
   * Return static configuration element for editor
   */
  public static getConfigElement(): HTMLElement {
    return document.createElement(CARD_EDITOR_TAG);
  }

  /**
   * Return stub configuration for card picker
   */
  public static getStubConfig(): Partial<UnifiedRoomCardConfig> {
    return {
      type: `custom:${CARD_TAG}`,
      name: 'Room Name',
      entity: '',
      show_name: true,
      show_icon: true,
    };
  }

  // ===========================================================================
  // UPDATE LIFECYCLE
  // ===========================================================================

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    
    // Apply grid-area to host element for layout-card compatibility
    if (this._config?.grid_area) {
      this.style.gridArea = this._config.grid_area;
    } else {
      this.style.removeProperty('grid-area');
    }

    // Start/restart animation timer when hass or config changes
    if (changedProps.has('hass') || changedProps.has('_config')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      // Only restart timer if this is the first hass, or config changed
      if (!oldHass || changedProps.has('_config')) {
        this._startUpdateSpinTimer();
      }
    }
  }

  protected override shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) {
      return true;
    }

    // Allow animation state changes to trigger re-render
    if (changedProps.has('_updateAnimationState')) {
      return true;
    }

    if (changedProps.has('hass') && this._config) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;

      // Check if any relevant entity states have changed
      return this._hasRelevantStateChanged(oldHass);
    }

    return false;
  }

  /**
   * Check if any entity relevant to this card has changed state
   */
  private _hasRelevantStateChanged(oldHass: HomeAssistant): boolean {
    if (!this._config || !this.hass) return false;

    const entitiesToCheck: string[] = [];

    // Main entity
    if (this._config.entity) {
      entitiesToCheck.push(this._config.entity);
    }

    // Persistent entities
    if (this._config.persistent_entities?.entities) {
      entitiesToCheck.push(
        ...this._config.persistent_entities.entities.map((e) => e.entity)
      );
    }

    // Intermittent entities
    if (this._config.intermittent_entities?.entities) {
      entitiesToCheck.push(
        ...this._config.intermittent_entities.entities.map((e) => e.entity)
      );
    }

    // Climate entities
    if (this._config.climate_entities) {
      const climate = this._config.climate_entities;
      if (climate.primary_entities) entitiesToCheck.push(...climate.primary_entities);
      if (climate.temperature_entities) entitiesToCheck.push(...climate.temperature_entities);
      if (climate.humidity_entities) entitiesToCheck.push(...climate.humidity_entities);
      if (climate.air_quality_entities) entitiesToCheck.push(...climate.air_quality_entities);
      if (climate.illuminance_entities) entitiesToCheck.push(...climate.illuminance_entities);
    }

    // Power entities
    if (this._config.power_entities?.entities) {
      entitiesToCheck.push(...this._config.power_entities.entities);
    }

    // Battery entities
    if (this._config.battery_entities?.entities) {
      entitiesToCheck.push(...this._config.battery_entities.entities);
    }

    // Update entities
    if (this._config.update_entities?.entities) {
      entitiesToCheck.push(...this._config.update_entities.entities);
    }

    // Check if any of these entities have changed
    for (const entityId of entitiesToCheck) {
      const oldState = oldHass.states[entityId];
      const newState = this.hass.states[entityId];

      if (oldState !== newState) {
        return true;
      }
    }

    return false;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const mainEntity = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;

    const isActive = mainEntity
      ? this._isEntityActive(mainEntity.entity_id, mainEntity.state, mainEntity.attributes)
      : false;

    const cardClasses = {
      'state-on': isActive,
      'state-off': !isActive && !!mainEntity,
    };

    // Calculate border color from border_entity
    const borderStyle = this._getBorderStyle();

    const cardDynamicStyles = getCardDynamicStyles({
      cardHeight: this._config.card_height,
      cardWidth: this._config.card_width,
      gridTemplateAreas: this._config.grid?.template_areas,
      gridTemplateColumns: this._config.grid?.template_columns,
      gridTemplateRows: this._config.grid?.template_rows,
      backgroundColor: this._config.background_color,
      activeBackgroundColor: isActive ? this._config.active_background_color : undefined,
      backgroundGradient: this._config.background_gradient,
      borderStyle: borderStyle,
    });

    // Detect which grid areas are defined in custom grid
    const gridAreas = this._getDefinedGridAreas();

    return html`
      <ha-card
        class=${classMap(cardClasses)}
        style=${cardDynamicStyles}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
      >
        ${this._renderName()}
        ${this._renderIcon()}
        ${this.hass ? renderClimateSection(this.hass, this._config?.climate_entities, this._config?.power_entities) : nothing}
        ${this._renderEntitySections(gridAreas)}
      </ha-card>
    `;
  }

  /**
   * Detect which grid areas are defined in custom grid template
   */
  private _getDefinedGridAreas(): {
    hasCustomGrid: boolean;
    hasPersistentArea: boolean;
    hasIntermittentArea: boolean;
    hasBatteryArea: boolean;
    hasUpdateArea: boolean;
  } {
    const customAreas = this._config?.grid?.template_areas || '';
    return {
      hasCustomGrid: customAreas.length > 0,
      hasPersistentArea: customAreas.includes('persistent'),
      hasIntermittentArea: customAreas.includes('intermittent'),
      hasBatteryArea: customAreas.includes('battery'),
      hasUpdateArea: customAreas.includes('update'),
    };
  }

  /**
   * Render entity sections based on grid configuration
   * - Default grid: Everything in unified "status" area
   * - Custom grid with persistent/intermittent: Separate areas, battery/update flow with intermittent
   * - Custom grid with battery/update areas: Those get their own grid areas
   */
  private _renderEntitySections(gridAreas: ReturnType<typeof this._getDefinedGridAreas>): TemplateResult | typeof nothing {
    const { hasCustomGrid, hasPersistentArea, hasIntermittentArea, hasBatteryArea, hasUpdateArea } = gridAreas;
    
    // Check if using any custom grid areas for entities
    const usesCustomEntityAreas = hasPersistentArea || hasIntermittentArea || hasBatteryArea || hasUpdateArea;

    if (!usesCustomEntityAreas) {
      // Default mode: unified status section
      return this._renderStatusSection();
    }

    // Custom grid mode: render sections based on defined areas
    // Battery/update flow with intermittent unless they have their own areas
    const includeBatteryWithIntermittent = !hasBatteryArea;
    const includeUpdateWithIntermittent = !hasUpdateArea;

    return html`
      ${hasPersistentArea ? this._renderPersistentEntities(true) : nothing}
      ${hasIntermittentArea ? this._renderIntermittentEntities(true, includeBatteryWithIntermittent, includeUpdateWithIntermittent) : nothing}
      ${hasBatteryArea ? this._renderBatterySection() : nothing}
      ${hasUpdateArea ? this._renderUpdateSection() : nothing}
    `;
  }

  /**
   * Render battery entities in their own grid area (advanced users)
   */
  private _renderBatterySection(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config?.battery_entities) return nothing;
    
    const lowBatteryCount = getLowBatteryCount(this.hass, this._config.battery_entities);
    if (lowBatteryCount === 0) return nothing;

    return html`
      <div class="battery-section legacy-grid">
        ${renderBatteryEntities(this.hass, this._config.battery_entities, this._handleEntityAction.bind(this))}
      </div>
    `;
  }

  /**
   * Render update entities in their own grid area (advanced users)
   */
  private _renderUpdateSection(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config?.update_entities) return nothing;
    
    const pendingUpdateCount = getPendingUpdateCount(this.hass, this._config.update_entities);
    if (pendingUpdateCount === 0) return nothing;

    return html`
      <div class="update-section legacy-grid">
        ${renderUpdateEntities(this.hass, this._config.update_entities, this._handleEntityAction.bind(this), this._updateAnimationState)}
      </div>
    `;
  }

  /**
   * Render combined status section (persistent + intermittent + battery + update)
   * Used with default grid layout
   */
  private _renderStatusSection(): TemplateResult | typeof nothing {
    const hasPersistent = this._config?.persistent_entities?.entities?.length;
    const hasIntermittent = this._config?.intermittent_entities?.entities?.length;
    const hasBattery = this._config?.battery_entities;
    const hasUpdate = this._config?.update_entities;

    // Check if any status content exists
    const lowBatteryCount = this.hass ? getLowBatteryCount(this.hass, this._config?.battery_entities) : 0;
    const pendingUpdateCount = this.hass ? getPendingUpdateCount(this.hass, this._config?.update_entities) : 0;
    
    if (!hasPersistent && !hasIntermittent && lowBatteryCount === 0 && pendingUpdateCount === 0) {
      return nothing;
    }

    return html`
      <div class="status-section">
        ${this._renderPersistentEntities(false)}
        ${this._renderIntermittentEntities(false, false, false)}
        ${hasBattery && this.hass ? renderBatteryEntities(this.hass, this._config?.battery_entities, this._handleEntityAction.bind(this)) : nothing}
        ${hasUpdate && this.hass ? renderUpdateEntities(this.hass, this._config?.update_entities, this._handleEntityAction.bind(this), this._updateAnimationState) : nothing}
      </div>
    `;
  }

  /**
   * Get border style based on border_entity state
   */
  private _getBorderStyle(): string | undefined {
    if (!this._config?.border_entity || !this.hass) {
      return undefined;
    }

    const entity = this.hass.states[this._config.border_entity];
    if (!entity) {
      return undefined;
    }

    const borderWidth = this._config.border_width || '2px';
    const borderStyle = this._config.border_style || 'solid';
    const borderColor = this._getBorderEntityColor(entity);

    if (!borderColor) {
      return undefined;
    }

    return `${borderWidth} ${borderStyle} ${borderColor}`;
  }

  /**
   * Get border color for entity based on domain and state
   */
  private _getBorderEntityColor(entity: { entity_id: string; state: string; attributes: Record<string, unknown> }): string | undefined {
    const domain = this._getDomain(entity.entity_id);

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

  // ===========================================================================
  // SECTION RENDERERS
  // ===========================================================================

  /**
   * Render card name section
   */
  private _renderName(): TemplateResult | typeof nothing {
    if (!this._config?.show_name || !this._config.name) {
      return nothing;
    }

    return html`
      <div class="name-section">
        ${this._config.name}
      </div>
    `;
  }

  /**
   * Render main icon section
   */
  private _renderIcon(): TemplateResult | typeof nothing {
    const mainEntity = this._config?.entity
      ? this.hass?.states[this._config.entity]
      : undefined;

    const isActive = mainEntity
      ? this._isEntityActive(mainEntity.entity_id, mainEntity.state, mainEntity.attributes)
      : false;

    const showIcon = this._config?.show_icon !== false;
    const showImgCell = this._config?.show_img_cell ?? true;
    const icon = this._config?.icon || this._getDefaultIcon(mainEntity);
    const domain = mainEntity ? this._getDomain(mainEntity.entity_id) : '';

    // Get animation class (only when active and animation is configured)
    const animationClass = isActive && this._config?.icon_animation && this._config.icon_animation !== 'none'
      ? getAnimationClass(this._config.icon_animation)
      : '';

    const iconContainerClasses: Record<string, boolean> = {
      'icon-container': true,
      'with-img-cell': showImgCell,
      'active': isActive,
    };
    
    // Only add animation class if it's not empty
    if (animationClass) {
      iconContainerClasses[animationClass] = true;
    }

    // Build icon container styles
    const iconContainerStyles: Record<string, string> = {};

    // Apply spin duration if spin animation is enabled
    if (this._config?.icon_animation === 'spin' && isActive) {
      const spinDuration = this._config?.spin_duration || 2;
      iconContainerStyles['--spin-duration'] = `${spinDuration}s`;
    }
    
    // Apply custom img_cell size if specified
    if (showImgCell && this._config?.img_cell_size) {
      iconContainerStyles['width'] = this._config.img_cell_size;
      iconContainerStyles['height'] = this._config.img_cell_size;
    }
    
    // Apply dynamic background color for active state with img_cell
    if (isActive && showImgCell) {
      const bgColor = this._getEntityBackgroundColor(mainEntity);
      iconContainerStyles['background-color'] = bgColor;
      iconContainerStyles['background'] = bgColor;
    }

    // Icon styles
    const iconStyles: Record<string, string> = {};
    if (this._config?.icon_size) {
      iconStyles['--mdc-icon-size'] = this._config.icon_size;
      // Also apply size to container when no img_cell
      if (!showImgCell) {
        iconContainerStyles['width'] = this._config.icon_size;
        iconContainerStyles['height'] = this._config.icon_size;
      }
    }
    
    // Determine icon color based on state and configuration
    if (isActive && showImgCell) {
      // For active state with img-cell, use white/contrast color
      iconStyles['color'] = 'var(--text-primary-color, #fff)';
    } else if (mainEntity && isActive) {
      // Active state WITHOUT img_cell - use domain-specific colors
      if (domain === 'light') {
        // Use light's actual color (RGB/HS) or fallback to active color
        iconStyles['color'] = this._getLightIconColor(mainEntity);
      } else if (domain === 'climate') {
        // Use climate hvac_action colors
        iconStyles['color'] = this._getClimateIconColor(mainEntity);
      } else {
        // Other domains - use generic active color or state color
        const stateColor = this._getEntityStateColor(mainEntity);
        if (stateColor) {
          iconStyles['color'] = stateColor;
        } else {
          iconStyles['color'] = 'var(--state-active-color, var(--amber-color, #ffc107))';
        }
      }
    } else if (mainEntity && domain === 'climate') {
      // Climate not active but may still be heating/cooling - check hvac_action
      iconStyles['color'] = this._getClimateIconColor(mainEntity);
    } else if (mainEntity) {
      // Inactive state - check for domain-specific state color (like lock states)
      const stateColor = this._getEntityStateColor(mainEntity);
      if (stateColor) {
        iconStyles['color'] = stateColor;
      }
    }

    // Build icon section styles for positioning
    const iconSectionStyles: Record<string, string> = {};
    
    // Horizontal positioning
    const hPos = this._config?.icon_horizontal_position || ICON_HORIZONTAL_POSITION_OPTIONS.RIGHT;
    switch (hPos) {
      case ICON_HORIZONTAL_POSITION_OPTIONS.LEFT:
        iconSectionStyles['justify-self'] = 'start';
        break;
      case ICON_HORIZONTAL_POSITION_OPTIONS.CENTER:
        iconSectionStyles['justify-self'] = 'center';
        break;
      case ICON_HORIZONTAL_POSITION_OPTIONS.RIGHT:
      default:
        iconSectionStyles['justify-self'] = 'end';
        break;
    }
    
    // Vertical positioning
    const vPos = this._config?.icon_vertical_position || ICON_VERTICAL_POSITION_OPTIONS.TOP;
    switch (vPos) {
      case ICON_VERTICAL_POSITION_OPTIONS.TOP:
        iconSectionStyles['align-self'] = 'start';
        break;
      case ICON_VERTICAL_POSITION_OPTIONS.CENTER:
        iconSectionStyles['align-self'] = 'center';
        break;
      case ICON_VERTICAL_POSITION_OPTIONS.BOTTOM:
        iconSectionStyles['align-self'] = 'end';
        break;
    }

    return html`
      <div class="icon-section" style=${styleMap(iconSectionStyles)}>
        ${this._config?.show_state && mainEntity
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

  /**
   * Get background color for icon based on entity attributes and domain
   * Supports light entities with rgb_color attribute and climate entities with hvac_action
   */
  private _getEntityBackgroundColor(entity?: { entity_id: string; state: string; attributes: Record<string, unknown> }): string {
    if (!entity) {
      return 'var(--state-active-color, rgba(255, 167, 38, 0.3))';
    }

    const domain = this._getDomain(entity.entity_id);

    // Climate entities - use hvac_action attribute for actual heating/cooling state
    if (domain === 'climate') {
      const hvacAction = entity.attributes.hvac_action as string | undefined;
      switch (hvacAction) {
        case 'heating':
          return 'var(--state-climate-heat-color, #ff8c00)';
        case 'cooling':
          return 'var(--state-climate-cool-color, #2196f3)';
        case 'drying':
          return 'var(--state-climate-dry-color, #8bc34a)';
        case 'fan':
          return 'var(--state-climate-fan_only-color, #00bcd4)';
        case 'preheating':
          return 'var(--state-climate-heat-color, #ff8c00)';
        default:
          // idle or off - use secondary background (no colored background)
          return 'var(--secondary-background-color)';
      }
    }

    // Light entities - check for color attributes (with opacity for img_cell background)
    if (domain === 'light') {
      const opacity = 0.3; // Opacity for light background when active with img_cell
      
      // Check for rgb_color attribute
      const rgbColor = entity.attributes.rgb_color as [number, number, number] | undefined;
      if (rgbColor && Array.isArray(rgbColor) && rgbColor.length === 3) {
        return `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity})`;
      }

      // Check for hs_color and convert to rgb
      const hsColor = entity.attributes.hs_color as [number, number] | undefined;
      const brightness = entity.attributes.brightness as number | undefined;
      if (hsColor && Array.isArray(hsColor) && hsColor.length === 2) {
        const rgb = this._hsToRgb(hsColor[0], hsColor[1], brightness);
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      }

      // Lights without color capability (warmth only) - use amber with opacity
      return `rgba(255, 193, 7, ${opacity})`; // Amber color with opacity
    }

    // Lock entities
    if (domain === 'lock') {
      const stateColor = DOMAIN_STATE_COLORS[domain]?.[entity.state];
      if (stateColor) {
        return stateColor;
      }
    }

    // Default for other domains - amber active color with opacity
    return 'rgba(255, 167, 38, 0.3)';
  }

  /**
   * Get icon color for light entity based on its color attributes
   * Used when img_cell is disabled
   */
  private _getLightIconColor(entity: { entity_id: string; state: string; attributes: Record<string, unknown> }): string {
    // Check for rgb_color attribute
    const rgbColor = entity.attributes.rgb_color as [number, number, number] | undefined;
    if (rgbColor && Array.isArray(rgbColor) && rgbColor.length === 3) {
      return `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    }

    // Check for hs_color and convert to rgb
    const hsColor = entity.attributes.hs_color as [number, number] | undefined;
    const brightness = entity.attributes.brightness as number | undefined;
    if (hsColor && Array.isArray(hsColor) && hsColor.length === 2) {
      const rgb = this._hsToRgb(hsColor[0], hsColor[1], brightness);
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    // Lights without color capability - use HA's light active color
    return 'var(--state-light-active-color, var(--amber-color, #ffc107))';
  }

  /**
   * Get icon color for climate entity based on hvac_action attribute
   */
  private _getClimateIconColor(entity: { entity_id: string; state: string; attributes: Record<string, unknown> }): string {
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
   * Convert HS color to RGB
   */
  private _hsToRgb(h: number, s: number, brightness?: number): [number, number, number] {
    const sat = s / 100;
    const light = (brightness ?? 255) / 255 * 0.5;
    
    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = light - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }


  /**
   * Check if entity is unavailable
   */
  private _isUnavailable(entity: { state: string }): boolean {
    return ['unavailable', 'unknown'].includes(entity.state);
  }

  /**
   * Render persistent entities section
   * These entities are always visible regardless of state
   * @param legacyGrid - If true, uses grid-area: persistent for custom grid layouts
   */
  private _renderPersistentEntities(legacyGrid: boolean = false): TemplateResult | typeof nothing {
    if (!this._config?.persistent_entities?.entities?.length || !this.hass) {
      return nothing;
    }

    const config = this._config.persistent_entities;
    const position = config.position || 'right';
    const defaultIconSize = config.icon_size || '21px';
    const gap = config.gap || '4px';

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
          this._renderPersistentEntity(entityConfig, defaultIconSize)
        )}
      </div>
    `;
  }

  /**
   * Render a single persistent entity
   */
  private _renderPersistentEntity(
    entityConfig: { 
      entity: string; 
      icon?: string; 
      icon_size?: string; 
      states?: Array<{ state: string; icon?: string; color?: string; animation?: string }>;
      tap_action?: TapActionConfig;
      hold_action?: TapActionConfig;
      double_tap_action?: TapActionConfig;
    },
    defaultIconSize: string
  ): TemplateResult {
    const entity = this.hass?.states[entityConfig.entity];
    const isUnavailable = !entity || this._isUnavailable(entity);
    const state = entity?.state || 'unavailable';
    const domain = entityConfig.entity.split('.')[0];

    // Find state-specific config
    const stateConfig = entityConfig.states?.find(s => s.state === state);

    // Determine icon (priority: state config > entity config > entity attribute > domain default)
    let icon = stateConfig?.icon || entityConfig.icon;
    if (!icon && entity?.attributes.icon) {
      icon = entity.attributes.icon as string;
    }
    if (!icon) {
      icon = this._getPersistentEntityDefaultIcon(domain, state);
    }

    // Determine color (priority: state config > domain state colors > default)
    let color = stateConfig?.color;
    if (!color) {
      color = this._getPersistentEntityColor(domain, state, isUnavailable);
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
        this._handlePersistentAction(entityConfig.tap_action, entityConfig.entity);
      } else {
        // Default: show more-info dialog
        this._fireMoreInfo(entityConfig.entity);
      }
    };

    const handleHold = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      if (entityConfig.hold_action) {
        this._handlePersistentAction(entityConfig.hold_action, entityConfig.entity);
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

  /**
   * Get default icon for persistent entity based on domain and state
   */
  private _getPersistentEntityDefaultIcon(domain: string, state: string): string {
    // Lock icons
    if (domain === 'lock') {
      switch (state) {
        case 'locked': return 'mdi:lock';
        case 'unlocked': return 'mdi:lock-open';
        case 'locking': return 'mdi:lock-clock';
        case 'unlocking': return 'mdi:lock-clock';
        case 'jammed': return 'mdi:lock-alert';
        default: return 'mdi:lock-question';
      }
    }

    // Binary sensor icons
    if (domain === 'binary_sensor') {
      return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
    }

    // Door/window sensors (cover domain)
    if (domain === 'cover') {
      switch (state) {
        case 'open': return 'mdi:door-open';
        case 'closed': return 'mdi:door-closed';
        case 'opening': return 'mdi:door-open';
        case 'closing': return 'mdi:door-closed';
        default: return 'mdi:door';
      }
    }

    // Switch
    if (domain === 'switch') {
      return state === 'on' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off';
    }

    // Light
    if (domain === 'light') {
      return state === 'on' ? 'mdi:lightbulb' : 'mdi:lightbulb-off';
    }

    // Default
    return 'mdi:help-circle';
  }

  /**
   * Get color for persistent entity based on domain and state
   */
  private _getPersistentEntityColor(domain: string, state: string, isUnavailable: boolean): string {
    if (isUnavailable) {
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
   * Handle action for persistent entity
   */
  private _handlePersistentAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;

    switch (action.action) {
      case 'more-info':
        this._fireMoreInfo(entityId);
        break;
      case 'toggle':
        this.hass.callService('homeassistant', 'toggle', { entity_id: entityId });
        break;
      case 'navigate':
        if (action.navigation_path) {
          window.history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
        }
        break;
      case 'url':
        if (action.url_path) {
          window.open(action.url_path, '_blank');
        }
        break;
      case 'perform-action':
        if (action.service) {
          const [domain, service] = action.service.split('.');
          this.hass.callService(domain, service, action.service_data || {});
        }
        break;
      case 'none':
      default:
        break;
    }
  }

  /**
   * Fire more-info dialog for entity
   */
  private _fireMoreInfo(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  /**
   * Render intermittent entities section
   * Only shows entities when they are in an "active" state
   * @param legacyGrid - If true, uses grid-area: intermittent for custom grid layouts
   * @param includeBattery - If true, includes battery entities in this section
   * @param includeUpdate - If true, includes update entities in this section
   */
  private _renderIntermittentEntities(
    legacyGrid: boolean = false,
    includeBattery: boolean = false,
    includeUpdate: boolean = false
  ): TemplateResult | typeof nothing {
    const config = this._config?.intermittent_entities;
    const defaultIconSize = config?.icon_size || '21px';
    const gap = config?.gap || '4px';
    const sectionActiveStates = config?.active_states;
    const sectionAnimation = config?.animation;

    // Filter to only active entities
    const activeEntities = (config?.entities || []).filter(entityConfig => 
      this._isIntermittentEntityActive(entityConfig, sectionActiveStates)
    );

    // Check if battery/update have content
    const hasBatteryContent = includeBattery && this.hass && this._config?.battery_entities && 
      getLowBatteryCount(this.hass, this._config.battery_entities) > 0;
    const hasUpdateContent = includeUpdate && this.hass && this._config?.update_entities &&
      getPendingUpdateCount(this.hass, this._config.update_entities) > 0;

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
          this._renderIntermittentEntity(entityConfig, defaultIconSize, sectionAnimation)
        )}
        ${hasBatteryContent ? renderBatteryEntities(this.hass!, this._config!.battery_entities, this._handleEntityAction.bind(this)) : nothing}
        ${hasUpdateContent ? renderUpdateEntities(this.hass!, this._config!.update_entities, this._handleEntityAction.bind(this), this._updateAnimationState) : nothing}
      </div>
    `;
  }

  /**
   * Check if an intermittent entity should be displayed (is "active")
   */
  private _isIntermittentEntityActive(
    entityConfig: { entity: string; active_states?: string[] },
    sectionActiveStates?: string[]
  ): boolean {
    if (!this.hass) return false;
    
    const entity = this.hass.states[entityConfig.entity];
    if (!entity) return false;
    
    // Check if unavailable - don't show
    if (['unavailable', 'unknown'].includes(entity.state)) {
      return false;
    }

    const state = entity.state;
    const domain = entityConfig.entity.split('.')[0];
    
    // Priority: entity-specific > section-wide > domain defaults
    const activeStates = entityConfig.active_states || sectionActiveStates || DOMAIN_ACTIVE_STATES[domain] || ['on'];
    
    return activeStates.includes(state);
  }

  /**
   * Render a single intermittent entity
   */
  private _renderIntermittentEntity(
    entityConfig: { 
      entity: string; 
      icon?: string; 
      icon_size?: string; 
      states?: Array<{ state: string; icon?: string; color?: string; animation?: string }>;
      animation?: AnimationType;
      tap_action?: TapActionConfig;
      hold_action?: TapActionConfig;
    },
    defaultIconSize: string,
    sectionAnimation?: AnimationType
  ): TemplateResult | typeof nothing {
    if (!this.hass) return nothing;

    const entity = this.hass.states[entityConfig.entity];
    if (!entity) return nothing;

    const state = entity.state;
    const domain = entityConfig.entity.split('.')[0];

    // Determine icon
    let icon = entityConfig.icon;
    const stateConfig = entityConfig.states?.find(s => s.state === state);
    if (stateConfig?.icon) {
      icon = stateConfig.icon;
    } else if (!icon) {
      icon = this._getIntermittentEntityDefaultIcon(domain, state, entity);
    }

    // Determine color
    let color = this._getIntermittentEntityColor(domain, state);
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
        @click=${(e: Event) => { e.stopPropagation(); this._handleIntermittentAction(tapAction, entityConfig.entity); }}
        @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); this._handleIntermittentAction(holdAction, entityConfig.entity); }}
        title="${entity.attributes.friendly_name || entityConfig.entity}: ${state}"
      >
        <ha-icon
          .icon=${icon}
          style=${styleMap(iconStyles)}
        ></ha-icon>
      </div>
    `;
  }

  /**
   * Get default icon for intermittent entity based on domain and state
   */
  private _getIntermittentEntityDefaultIcon(domain: string, state: string, entity: { attributes: Record<string, unknown> }): string {
    // Check for entity-provided icon
    if (entity.attributes.icon) {
      return entity.attributes.icon as string;
    }

    // Binary sensor has device_class-specific icons
    if (domain === 'binary_sensor') {
      const deviceClass = entity.attributes.device_class as string;
      return this._getBinarySensorIcon(deviceClass, state);
    }

    // Check domain state icons
    if (DOMAIN_STATE_ICONS[domain]?.[state]) {
      return DOMAIN_STATE_ICONS[domain][state];
    }

    // Fall back to domain default
    return DOMAIN_DEFAULT_ICONS[domain] || 'mdi:alert-circle';
  }

  /**
   * Get binary sensor icon based on device_class and state
   */
  private _getBinarySensorIcon(deviceClass: string | undefined, state: string): string {
    const isOn = state === 'on';
    
    const deviceClassIcons: Record<string, { on: string; off: string }> = {
      motion: { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
      occupancy: { on: 'mdi:home-account', off: 'mdi:home-outline' },
      door: { on: 'mdi:door-open', off: 'mdi:door-closed' },
      window: { on: 'mdi:window-open', off: 'mdi:window-closed' },
      garage_door: { on: 'mdi:garage-open', off: 'mdi:garage' },
      opening: { on: 'mdi:square-outline', off: 'mdi:square' },
      lock: { on: 'mdi:lock-open', off: 'mdi:lock' },
      moisture: { on: 'mdi:water', off: 'mdi:water-off' },
      smoke: { on: 'mdi:smoke-detector-alert', off: 'mdi:smoke-detector' },
      gas: { on: 'mdi:gas-cylinder', off: 'mdi:gas-cylinder' },
      co: { on: 'mdi:molecule-co', off: 'mdi:molecule-co' },
      safety: { on: 'mdi:shield-alert', off: 'mdi:shield-check' },
      sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
      vibration: { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
      presence: { on: 'mdi:home', off: 'mdi:home-outline' },
      light: { on: 'mdi:brightness-7', off: 'mdi:brightness-5' },
      battery: { on: 'mdi:battery-alert', off: 'mdi:battery' },
      battery_charging: { on: 'mdi:battery-charging', off: 'mdi:battery' },
      plug: { on: 'mdi:power-plug', off: 'mdi:power-plug-off' },
      power: { on: 'mdi:flash', off: 'mdi:flash-off' },
      running: { on: 'mdi:play', off: 'mdi:stop' },
      problem: { on: 'mdi:alert-circle', off: 'mdi:check-circle' },
      tamper: { on: 'mdi:alert', off: 'mdi:check' },
      update: { on: 'mdi:package-up', off: 'mdi:package' },
      connectivity: { on: 'mdi:wifi', off: 'mdi:wifi-off' },
      cold: { on: 'mdi:snowflake', off: 'mdi:snowflake-off' },
      heat: { on: 'mdi:fire', off: 'mdi:fire-off' },
    };

    if (deviceClass && deviceClassIcons[deviceClass]) {
      return isOn ? deviceClassIcons[deviceClass].on : deviceClassIcons[deviceClass].off;
    }

    // Default binary sensor icon
    return isOn ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline';
  }

  /**
   * Get color for intermittent entity based on domain and state
   */
  private _getIntermittentEntityColor(domain: string, state: string): string {
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

  /**
   * Handle action for intermittent entity
   */
  private _handleIntermittentAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;

    switch (action.action) {
      case 'more-info':
        this._fireMoreInfo(entityId);
        break;
      case 'toggle':
        this.hass.callService('homeassistant', 'toggle', { entity_id: entityId });
        break;
      case 'navigate':
        if (action.navigation_path) {
          window.history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
        }
        break;
      case 'url':
        if (action.url_path) {
          window.open(action.url_path, '_blank');
        }
        break;
      case 'perform-action':
        if (action.service) {
          const [serviceDomain, service] = action.service.split('.');
          this.hass.callService(serviceDomain, service, action.service_data || {});
        }
        break;
      case 'none':
      default:
        break;
    }
  }


  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

  /**
   * Handle entity action (tap/hold) - generic handler for all entity types
   */
  private _handleEntityAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;

    switch (action.action) {
      case 'more-info':
        this._fireMoreInfo(entityId);
        break;
      case 'navigate':
        if (action.navigation_path) {
          window.history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
        }
        break;
      case 'url':
        if (action.url_path) {
          window.open(action.url_path, '_blank');
        }
        break;
      case 'none':
      default:
        break;
    }
  }

  /**
   * Extract domain from entity_id
   */
  private _getDomain(entityId: string): string {
    return entityId.split('.')[0];
  }

  /**
   * Check if entity is in an "active" state
   * Uses domain-specific active states, with config override
   * For climate entities, checks hvac_action attribute
   */
  private _isEntityActive(entityId: string, state: string, attributes?: Record<string, unknown>): boolean {
    // If custom active_states defined in config, use those
    if (this._config?.active_states && this._config.active_states.length > 0) {
      return this._config.active_states.includes(state);
    }

    const domain = this._getDomain(entityId);
    
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

  /**
   * Get default icon for entity based on domain and state
   * For climate entities, uses hvac_action attribute
   */
  private _getDefaultIcon(entity?: { entity_id: string; state: string; attributes: Record<string, unknown> }): string {
    if (!entity) {
      return 'mdi:home';
    }

    // Use entity's icon if available
    if (entity.attributes.icon) {
      return entity.attributes.icon as string;
    }

    const domain = this._getDomain(entity.entity_id);
    
    // Special handling for climate - use hvac_action for icon
    if (domain === 'climate') {
      const hvacAction = entity.attributes.hvac_action as string | undefined;
      if (hvacAction) {
        switch (hvacAction) {
          case 'heating':
          case 'preheating':
            return 'mdi:fire';
          case 'cooling':
            return 'mdi:snowflake';
          case 'drying':
            return 'mdi:water-percent';
          case 'fan':
            return 'mdi:fan';
          default:
            return 'mdi:thermostat';
        }
      }
    }
    
    // Check for state-specific icon 
    const stateIcons = DOMAIN_STATE_ICONS[domain];
    if (stateIcons && stateIcons[entity.state]) {
      return stateIcons[entity.state];
    }

    // Fall back to domain default icon
    return DOMAIN_DEFAULT_ICONS[domain] || 'mdi:home';
  }

  /**
   * Get state-specific color for entity
   */
  private _getEntityStateColor(entity?: { entity_id: string; state: string; attributes: Record<string, unknown> }): string | undefined {
    if (!entity) return undefined;

    const domain = this._getDomain(entity.entity_id);
    const stateColors = DOMAIN_STATE_COLORS[domain];
    
    if (stateColors && stateColors[entity.state]) {
      return stateColors[entity.state];
    }

    return undefined;
  }

  // ===========================================================================
  // TAP ACTION HANDLERS
  // ===========================================================================

  /**
   * Handle tap action with debounce to detect double-tap
   */
  private _handleTap(ev: Event): void {
    ev.stopPropagation();
    
    this._tapCount++;
    
    // If this is the first tap, start the timer
    if (this._tapCount === 1) {
      this._tapTimeout = setTimeout(() => {
        // Timer expired - it was a single tap
        if (this._tapCount === 1 && this._config?.tap_action) {
          this._handleAction(this._config.tap_action);
        }
        this._tapCount = 0;
      }, UnifiedRoomCard.TAP_DEBOUNCE_MS);
    } else if (this._tapCount === 2) {
      // Second tap arrived - it's a double tap
      if (this._tapTimeout) {
        clearTimeout(this._tapTimeout);
        this._tapTimeout = undefined;
      }
      this._tapCount = 0;
      
      if (this._config?.double_tap_action) {
        this._handleAction(this._config.double_tap_action);
      }
    }
  }

  /**
   * Handle hold (context menu) action
   */
  private _handleHold(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    
    // Cancel any pending tap action
    if (this._tapTimeout) {
      clearTimeout(this._tapTimeout);
      this._tapTimeout = undefined;
    }
    this._tapCount = 0;
    
    if (this._config?.hold_action) {
      this._handleAction(this._config.hold_action);
    }
  }

  /**
   * Execute tap action
   */
  private _handleAction(actionConfig: TapActionConfig): void {
    if (!this.hass || !this._config) return;

    const entityId = this._config.entity;

    switch (actionConfig.action) {
      case 'toggle':
        if (entityId) {
          this.hass.callService('homeassistant', 'toggle', {
            entity_id: entityId,
          });
        }
        break;

      case 'more-info':
        if (entityId) {
          const event = new CustomEvent('hass-more-info', {
            bubbles: true,
            composed: true,
            detail: { entityId },
          });
          this.dispatchEvent(event);
        }
        break;

      case 'navigate':
        if (actionConfig.navigation_path) {
          window.history.pushState(null, '', actionConfig.navigation_path);
          const event = new CustomEvent('location-changed', {
            bubbles: true,
            composed: true,
          });
          window.dispatchEvent(event);
        }
        break;

      case 'url':
        if (actionConfig.url_path) {
          window.open(actionConfig.url_path, '_blank');
        }
        break;

      case 'perform-action':
        if (actionConfig.service) {
          const [domain, service] = actionConfig.service.split('.');
          this.hass.callService(domain, service, actionConfig.service_data || {});
        }
        break;

      case 'assist':
        const assistEvent = new CustomEvent('hass-assist', {
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(assistEvent);
        break;

      case 'none':
      default:
        break;
    }
  }
}

// =============================================================================
// WINDOW REGISTRATION
// =============================================================================

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: UnifiedRoomCard;
  }
}

// Register with Home Assistant's custom card registry
(window as Window & { customCards?: Array<{ type: string; name: string; description: string }> }).customCards =
  (window as Window & { customCards?: Array<{ type: string; name: string; description: string }> }).customCards || [];

(window as Window & { customCards?: Array<{ type: string; name: string; description: string }> }).customCards.push({
  type: CARD_TAG,
  name: CARD_NAME.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  description: CARD_DESCRIPTION,
});

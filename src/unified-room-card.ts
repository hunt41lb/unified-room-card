/**
 * Unified Room Card
 * 
 * A comprehensive room status card for Home Assistant with support for
 * climate, persistent, and intermittent entities.
 * 
 * @version 1.0.0
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
} from './constants';

import {
  HomeAssistant,
  UnifiedRoomCardConfig,
  TapActionConfig,
  ClimateEntitiesConfig,
  PowerEntitiesConfig,
  AnimationType,
} from './types';

import {
  cardStyles,
  getCardDynamicStyles,
  getAnimationClass,
} from './styles';

// Import editor (side effect: registers the custom element)
import './editor';

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
      animate_icon: false,
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
  }

  protected override shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) {
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
      if (climate.primary_entity) entitiesToCheck.push(climate.primary_entity);
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

    // Check if user has custom grid with legacy persistent/intermittent areas
    const useLegacyGrid = this._usesLegacyGridAreas();

    return html`
      <ha-card
        class=${classMap(cardClasses)}
        style=${cardDynamicStyles}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
      >
        ${this._renderName()}
        ${this._renderIcon()}
        ${this._renderClimateSection()}
        ${useLegacyGrid
          ? html`
              ${this._renderPersistentEntities(true)}
              ${this._renderIntermittentEntities(true)}
            `
          : this._renderStatusSection()
        }
      </ha-card>
    `;
  }

  /**
   * Check if user is using legacy grid areas (separate persistent/intermittent)
   */
  private _usesLegacyGridAreas(): boolean {
    const customAreas = this._config?.grid?.template_areas;
    if (!customAreas) {
      return false; // Using default grid with "status" area
    }
    // If user specified custom grid with persistent or intermittent, use legacy mode
    return customAreas.includes('persistent') || customAreas.includes('intermittent');
  }

  /**
   * Render combined status section (persistent + intermittent)
   * Used with default grid layout
   */
  private _renderStatusSection(): TemplateResult | typeof nothing {
    const hasPersistent = this._config?.persistent_entities?.entities?.length;
    const hasIntermittent = this._config?.intermittent_entities?.entities?.length;
    const hasBattery = this._config?.battery_entities;
    const hasUpdate = this._config?.update_entities;

    // Check if any status content exists
    const lowBatteryCount = this._getLowBatteryCount();
    const pendingUpdateCount = this._getPendingUpdateCount();
    
    if (!hasPersistent && !hasIntermittent && lowBatteryCount === 0 && pendingUpdateCount === 0) {
      return nothing;
    }

    return html`
      <div class="status-section">
        ${this._renderPersistentEntities(false)}
        ${this._renderIntermittentEntities(false)}
        ${hasBattery ? this._renderBatteryIndicator(lowBatteryCount) : nothing}
        ${hasUpdate ? this._renderUpdateIndicator(pendingUpdateCount) : nothing}
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

    const iconContainerClasses = {
      'icon-container': true,
      'with-img-cell': showImgCell,
      active: isActive,
      [getAnimationClass(this._config?.animate_icon && isActive ? 'pulse' : undefined)]: true,
    };

    // Build icon container styles
    const iconContainerStyles: Record<string, string> = {};
    
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
   * Render climate section (temperature, humidity, air quality, illuminance, power)
   */
  private _renderClimateSection(): TemplateResult | typeof nothing {
    if (!this._config?.climate_entities && !this._config?.power_entities) {
      return nothing;
    }

    const climateConfig = this._config.climate_entities;
    const powerConfig = this._config.power_entities;
    const decimalPlaces = climateConfig?.decimal_places ?? 0;
    const powerDecimalPlaces = powerConfig?.decimal_places ?? 0;

    // Individual show unit settings (default to true)
    const showTempUnit = climateConfig?.show_temperature_unit !== false;
    const showHumidityUnit = climateConfig?.show_humidity_unit !== false;
    const showAirQualityUnit = climateConfig?.show_air_quality_unit !== false;
    const showIlluminanceUnit = climateConfig?.show_illuminance_unit !== false;
    const showPowerUnit = powerConfig?.show_unit !== false;

    // Calculate values
    const temperature = this._getTemperatureValue(climateConfig, decimalPlaces, showTempUnit);
    const humidity = this._getHumidityValue(climateConfig, decimalPlaces, showHumidityUnit);
    const airQuality = this._getAirQualityValue(climateConfig, decimalPlaces, showAirQualityUnit);
    const illuminance = this._getIlluminanceValue(climateConfig, decimalPlaces, showIlluminanceUnit);
    const power = this._getPowerValue(powerConfig, powerDecimalPlaces, showPowerUnit);

    // Build secondary values array
    const secondaryValues: { label: string; value: string }[] = [];
    
    if (humidity) {
      secondaryValues.push({ label: 'humidity', value: humidity });
    }
    if (airQuality) {
      secondaryValues.push({ label: 'air quality', value: airQuality });
    }
    if (illuminance) {
      secondaryValues.push({ label: 'illuminance', value: illuminance });
    }
    if (power) {
      secondaryValues.push({ label: 'power', value: power });
    }

    return html`
      <div class="climate-section">
        ${temperature ? html`
          <span class="climate-primary">${temperature}</span>
        ` : nothing}
        ${secondaryValues.length > 0 ? html`
          <div class="climate-secondary">
            ${secondaryValues.map((item) => html`
              <span class="climate-value">${item.value}</span>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  /**
   * Get temperature value from primary entity or averaged from multiple entities
   */
  private _getTemperatureValue(
    config?: ClimateEntitiesConfig,
    decimalPlaces: number = 0,
    showUnits: boolean = true
  ): string | null {
    if (!config || !this.hass) return null;

    // Check for primary entity first
    if (config.primary_entity) {
      const entity = this.hass.states[config.primary_entity];
      if (entity && !this._isUnavailable(entity)) {
        const value = parseFloat(entity.state);
        if (!isNaN(value)) {
          // Always show °, but hide F/C if showUnits is false
          const unit = showUnits ? (entity.attributes.unit_of_measurement || '°') : '°';
          return `${value.toFixed(decimalPlaces)}${unit}`;
        }
      }
    }

    // Fall back to temperature entities average
    if (config.temperature_entities && config.temperature_entities.length > 0) {
      const result = this._calculateAverage(config.temperature_entities, decimalPlaces);
      if (result.value !== null) {
        // Always show °, but hide F/C if showUnits is false
        const unit = showUnits ? (result.unit || '°') : '°';
        return `${result.value}${unit}`;
      }
    }

    return null;
  }

  /**
   * Get humidity value averaged from multiple entities
   */
  private _getHumidityValue(
    config?: ClimateEntitiesConfig,
    decimalPlaces: number = 0,
    showUnits: boolean = true
  ): string | null {
    if (!config?.humidity_entities || config.humidity_entities.length === 0 || !this.hass) {
      return null;
    }

    const result = this._calculateAverage(config.humidity_entities, decimalPlaces);
    if (result.value !== null) {
      const unit = showUnits ? '%' : '';
      return `${result.value}${unit}`;
    }

    return null;
  }

  /**
   * Get air quality value averaged from multiple entities
   */
  private _getAirQualityValue(
    config?: ClimateEntitiesConfig,
    decimalPlaces: number = 0,
    showUnits: boolean = true
  ): string | null {
    if (!config?.air_quality_entities || config.air_quality_entities.length === 0 || !this.hass) {
      return null;
    }

    const result = this._calculateAverage(config.air_quality_entities, decimalPlaces);
    if (result.value !== null) {
      const unit = showUnits && result.unit ? ` ${result.unit}` : '';
      return `${result.value}${unit}`;
    }

    return null;
  }

  /**
   * Get illuminance value averaged from multiple entities
   */
  private _getIlluminanceValue(
    config?: ClimateEntitiesConfig,
    decimalPlaces: number = 0,
    showUnits: boolean = true
  ): string | null {
    if (!config?.illuminance_entities || config.illuminance_entities.length === 0 || !this.hass) {
      return null;
    }

    const result = this._calculateAverage(config.illuminance_entities, decimalPlaces);
    if (result.value !== null) {
      const unit = showUnits ? ' lx' : '';
      return `${result.value}${unit}`;
    }

    return null;
  }

  /**
   * Get power consumption value summed from multiple entities
   */
  private _getPowerValue(
    config?: PowerEntitiesConfig,
    decimalPlaces: number = 0,
    showUnits: boolean = true
  ): string | null {
    if (!config?.entities || config.entities.length === 0 || !this.hass) {
      return null;
    }

    let totalWatts = 0;
    let validCount = 0;

    for (const entityId of config.entities) {
      const entity = this.hass.states[entityId];
      if (!entity || this._isUnavailable(entity)) continue;

      const value = parseFloat(entity.state);
      if (isNaN(value)) continue;

      const unitRaw = entity.attributes.unit_of_measurement;
      const unit = (typeof unitRaw === 'string' ? unitRaw : 'W').toLowerCase();
      
      // Normalize to watts
      if (unit === 'kw') {
        totalWatts += value * 1000;
      } else if (unit === 'mw') {
        totalWatts += value * 1000000;
      } else if (unit === 'gw') {
        totalWatts += value * 1000000000;
      } else {
        totalWatts += value;
      }
      validCount++;
    }

    if (validCount === 0) return null;

    // Format with appropriate unit (no space between value and unit)
    if (totalWatts >= 1000) {
      const kwValue = (totalWatts / 1000).toFixed(decimalPlaces);
      return showUnits ? `${kwValue}kW` : kwValue;
    }
    const wValue = totalWatts.toFixed(decimalPlaces);
    return showUnits ? `${wValue}W` : wValue;
  }

  /**
   * Calculate average from multiple entity states
   */
  private _calculateAverage(
    entityIds: string[],
    decimalPlaces: number = 1
  ): { value: number | null; unit: string; count: number } {
    if (!this.hass) return { value: null, unit: '', count: 0 };

    const values: number[] = [];
    let unit = '';

    for (const entityId of entityIds) {
      const entity = this.hass.states[entityId];
      if (!entity || this._isUnavailable(entity)) continue;

      const value = parseFloat(entity.state);
      if (!isNaN(value)) {
        values.push(value);
        if (!unit && entity.attributes.unit_of_measurement) {
          unit = entity.attributes.unit_of_measurement;
        }
      }
    }

    if (values.length === 0) {
      return { value: null, unit: '', count: 0 };
    }

    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    return {
      value: parseFloat(average.toFixed(decimalPlaces)),
      unit,
      count: values.length,
    };
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
   */
  private _renderIntermittentEntities(legacyGrid: boolean = false): TemplateResult | typeof nothing {
    if (!this._config?.intermittent_entities?.entities?.length || !this.hass) {
      return nothing;
    }

    const config = this._config.intermittent_entities;
    const defaultIconSize = config.icon_size || '21px';
    const gap = config.gap || '4px';
    const sectionActiveStates = config.active_states;
    const sectionAnimation = config.animation;

    // Filter to only active entities
    const activeEntities = (config.entities || []).filter(entityConfig => 
      this._isIntermittentEntityActive(entityConfig, sectionActiveStates)
    );

    // Don't render section if no active entities
    if (activeEntities.length === 0) {
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
  // BATTERY ENTITIES
  // ===========================================================================

  /**
   * Get count of entities with low battery
   */
  private _getLowBatteryCount(): number {
    if (!this.hass || !this._config?.battery_entities) return 0;

    const config = this._config.battery_entities;
    const lowThreshold = config.low_threshold ?? 20;
    
    // Get entities to check
    let entities: string[] = config.entities || [];
    
    // Auto-discover if no entities specified or auto_discover is true
    if (entities.length === 0 || config.auto_discover) {
      const discovered = this._discoverBatteryEntities();
      entities = [...new Set([...entities, ...discovered])];
    }

    let lowCount = 0;
    for (const entityId of entities) {
      const entity = this.hass.states[entityId];
      if (!entity) continue;
      
      const level = this._getBatteryLevel(entity);
      if (level !== null && level <= lowThreshold) {
        lowCount++;
      }
    }

    return lowCount;
  }

  /**
   * Discover battery entities automatically
   */
  private _discoverBatteryEntities(): string[] {
    if (!this.hass) return [];

    const batteryEntities: string[] = [];
    
    for (const [entityId, entity] of Object.entries(this.hass.states)) {
      // Check for battery domain
      if (entityId.startsWith('sensor.') && 
          (entity.attributes.device_class === 'battery' ||
           entityId.includes('battery') ||
           entity.attributes.unit_of_measurement === '%' && entityId.toLowerCase().includes('batt'))) {
        batteryEntities.push(entityId);
      }
    }

    return batteryEntities;
  }

  /**
   * Get battery level from entity
   */
  private _getBatteryLevel(entity: { state: string; attributes: Record<string, unknown> }): number | null {
    const state = parseFloat(entity.state);
    if (!isNaN(state)) {
      return state;
    }
    return null;
  }

  /**
   * Render battery indicator
   */
  private _renderBatteryIndicator(count: number): TemplateResult | typeof nothing {
    if (count === 0) return nothing;

    const config = this._config?.battery_entities;
    if (!config) return nothing;

    const iconSize = config.icon_size || '18px';
    const showCount = config.show_count !== false;
    const lowThreshold = config.low_threshold ?? 20;
    
    // Determine icon based on severity
    let icon = 'mdi:battery-alert';
    let color = 'var(--error-color, #db4437)';

    const iconStyles: Record<string, string> = {
      '--mdc-icon-size': iconSize,
      'color': color,
    };

    const tapAction = config.tap_action || { action: 'more-info' as const };
    const holdAction = config.hold_action || { action: 'none' as const };

    // Get first low battery entity for more-info
    const firstLowBattery = this._getFirstLowBatteryEntity(lowThreshold);

    return html`
      <div 
        class="battery-indicator status-indicator"
        @click=${(e: Event) => { e.stopPropagation(); this._handleBatteryAction(tapAction, firstLowBattery); }}
        @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); this._handleBatteryAction(holdAction, firstLowBattery); }}
        title="Low battery: ${count} device${count > 1 ? 's' : ''}"
      >
        <ha-icon
          .icon=${icon}
          style=${styleMap(iconStyles)}
        ></ha-icon>
        ${showCount && count > 1 ? html`<span class="indicator-count">${count}</span>` : nothing}
      </div>
    `;
  }

  /**
   * Get first entity with low battery
   */
  private _getFirstLowBatteryEntity(lowThreshold: number): string | undefined {
    if (!this.hass || !this._config?.battery_entities) return undefined;

    const config = this._config.battery_entities;
    let entities: string[] = config.entities || [];
    
    if (entities.length === 0 || config.auto_discover) {
      const discovered = this._discoverBatteryEntities();
      entities = [...new Set([...entities, ...discovered])];
    }

    for (const entityId of entities) {
      const entity = this.hass.states[entityId];
      if (!entity) continue;
      
      const level = this._getBatteryLevel(entity);
      if (level !== null && level <= lowThreshold) {
        return entityId;
      }
    }

    return undefined;
  }

  /**
   * Handle battery indicator action
   */
  private _handleBatteryAction(action: TapActionConfig, entityId?: string): void {
    if (!this.hass) return;

    switch (action.action) {
      case 'more-info':
        if (entityId) {
          this._fireMoreInfo(entityId);
        }
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

  // ===========================================================================
  // UPDATE ENTITIES
  // ===========================================================================

  /**
   * Get count of entities with pending updates
   */
  private _getPendingUpdateCount(): number {
    if (!this.hass || !this._config?.update_entities) return 0;

    const config = this._config.update_entities;
    
    // Get entities to check
    let entities: string[] = config.entities || [];
    
    // Auto-discover if no entities specified or auto_discover is true
    if (entities.length === 0 || config.auto_discover) {
      const discovered = this._discoverUpdateEntities();
      entities = [...new Set([...entities, ...discovered])];
    }

    let updateCount = 0;
    for (const entityId of entities) {
      const entity = this.hass.states[entityId];
      if (!entity) continue;
      
      // Update entities have state 'on' when update is available
      if (entity.state === 'on') {
        updateCount++;
      }
    }

    return updateCount;
  }

  /**
   * Discover update entities automatically
   */
  private _discoverUpdateEntities(): string[] {
    if (!this.hass) return [];

    const updateEntities: string[] = [];
    
    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith('update.')) {
        updateEntities.push(entityId);
      }
    }

    return updateEntities;
  }

  /**
   * Render update indicator
   */
  private _renderUpdateIndicator(count: number): TemplateResult | typeof nothing {
    if (count === 0) return nothing;

    const config = this._config?.update_entities;
    if (!config) return nothing;

    const icon = config.icon || 'mdi:package-up';
    const iconSize = config.icon_size || '18px';
    const color = config.color || 'var(--info-color, #039be5)';
    const showCount = config.show_count !== false;

    const iconStyles: Record<string, string> = {
      '--mdc-icon-size': iconSize,
      'color': color,
    };

    const tapAction = config.tap_action || { action: 'more-info' as const };
    const holdAction = config.hold_action || { action: 'none' as const };

    // Get first update entity for more-info
    const firstUpdate = this._getFirstPendingUpdateEntity();

    return html`
      <div 
        class="update-indicator status-indicator"
        @click=${(e: Event) => { e.stopPropagation(); this._handleUpdateAction(tapAction, firstUpdate); }}
        @contextmenu=${(e: Event) => { e.preventDefault(); e.stopPropagation(); this._handleUpdateAction(holdAction, firstUpdate); }}
        title="Updates available: ${count}"
      >
        <ha-icon
          .icon=${icon}
          style=${styleMap(iconStyles)}
        ></ha-icon>
        ${showCount && count > 1 ? html`<span class="indicator-count">${count}</span>` : nothing}
      </div>
    `;
  }

  /**
   * Get first entity with pending update
   */
  private _getFirstPendingUpdateEntity(): string | undefined {
    if (!this.hass || !this._config?.update_entities) return undefined;

    const config = this._config.update_entities;
    let entities: string[] = config.entities || [];
    
    if (entities.length === 0 || config.auto_discover) {
      const discovered = this._discoverUpdateEntities();
      entities = [...new Set([...entities, ...discovered])];
    }

    for (const entityId of entities) {
      const entity = this.hass.states[entityId];
      if (entity?.state === 'on') {
        return entityId;
      }
    }

    return undefined;
  }

  /**
   * Handle update indicator action
   */
  private _handleUpdateAction(action: TapActionConfig, entityId?: string): void {
    if (!this.hass) return;

    switch (action.action) {
      case 'more-info':
        if (entityId) {
          this._fireMoreInfo(entityId);
        }
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

  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

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
   * Handle double tap action (now handled in _handleTap with debounce)
   * @deprecated - kept for backwards compatibility, logic moved to _handleTap
   */
  private _handleDoubleTap(ev: Event): void {
    ev.stopPropagation();
    // Double-tap is now handled in _handleTap with debounce
    // This method is kept to prevent errors if @dblclick is still bound somewhere
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

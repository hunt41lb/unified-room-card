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
      ? this._isEntityActive(mainEntity.entity_id, mainEntity.state)
      : false;

    const cardClasses = {
      'state-on': isActive,
      'state-off': !isActive && !!mainEntity,
    };

    const cardDynamicStyles = getCardDynamicStyles({
      cardHeight: this._config.card_height,
      cardWidth: this._config.card_width,
      gridTemplateAreas: this._config.grid?.template_areas,
      gridTemplateColumns: this._config.grid?.template_columns,
      gridTemplateRows: this._config.grid?.template_rows,
      backgroundColor: this._config.background_color,
      activeBackgroundColor: isActive ? this._config.active_background_color : undefined,
      backgroundGradient: this._config.background_gradient,
    });

    return html`
      <ha-card
        class=${classMap(cardClasses)}
        style=${cardDynamicStyles}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
        @dblclick=${this._handleDoubleTap}
      >
        ${this._renderName()}
        ${this._renderIcon()}
        ${this._renderClimateSection()}
        ${this._renderPersistentEntities()}
        ${this._renderIntermittentEntities()}
      </ha-card>
    `;
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
      ? this._isEntityActive(mainEntity.entity_id, mainEntity.state)
      : false;

    const showIcon = this._config?.show_icon !== false;
    const showImgCell = this._config?.show_img_cell ?? true;
    const icon = this._config?.icon || this._getDefaultIcon(mainEntity);

    const iconContainerClasses = {
      'icon-container': true,
      'with-img-cell': showImgCell,
      active: isActive,
      [getAnimationClass(this._config?.animate_icon && isActive ? 'pulse' : undefined)]: true,
    };

    // Build icon container styles
    const iconContainerStyles: Record<string, string> = {};
    
    // Apply dynamic background color for active state
    if (isActive && showImgCell) {
      const bgColor = this._getEntityBackgroundColor(mainEntity);
      iconContainerStyles['background-color'] = bgColor;
      iconContainerStyles['background'] = bgColor;
    }

    // Icon styles
    const iconStyles: Record<string, string> = {};
    if (this._config?.icon_size) {
      iconStyles['--mdc-icon-size'] = this._config.icon_size;
    }
    
    // Determine icon color
    if (isActive && showImgCell) {
      // For active state with img-cell, use white/contrast color
      iconStyles['color'] = 'var(--text-primary-color, #fff)';
    } else if (mainEntity) {
      // Check for domain-specific state color
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
   * Get background color for icon based on entity attributes
   * Supports light entities with rgb_color attribute
   */
  private _getEntityBackgroundColor(entity?: { entity_id: string; state: string; attributes: Record<string, unknown> }): string {
    const opacity = 0.3; // Opacity for icon background when active
    
    if (!entity) {
      return `rgba(66, 133, 244, ${opacity})`;
    }

    // Check for rgb_color attribute (lights)
    const rgbColor = entity.attributes.rgb_color as [number, number, number] | undefined;
    if (rgbColor && Array.isArray(rgbColor) && rgbColor.length === 3) {
      return `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity})`;
    }

    // Check for hs_color and convert to rgb (lights)
    const hsColor = entity.attributes.hs_color as [number, number] | undefined;
    const brightness = entity.attributes.brightness as number | undefined;
    if (hsColor && Array.isArray(hsColor) && hsColor.length === 2) {
      const rgb = this._hsToRgb(hsColor[0], hsColor[1], brightness);
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }

    // For non-light entities, default to amber
    return `rgba(255, 167, 38, ${opacity})`;
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

    // Format with appropriate unit
    if (totalWatts >= 1000) {
      const kwValue = (totalWatts / 1000).toFixed(decimalPlaces);
      return showUnits ? `${kwValue} kW` : kwValue;
    }
    const wValue = totalWatts.toFixed(decimalPlaces);
    return showUnits ? `${wValue} W` : wValue;
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
   * Placeholder for Phase 4
   */
  private _renderPersistentEntities(): TemplateResult | typeof nothing {
    if (!this._config?.persistent_entities?.entities?.length) {
      return nothing;
    }

    return html`
      <div class="persistent-section">
        <!-- Persistent entities will be implemented in Phase 4 -->
      </div>
    `;
  }

  /**
   * Render intermittent entities section
   * Placeholder for Phase 5
   */
  private _renderIntermittentEntities(): TemplateResult | typeof nothing {
    if (!this._config?.intermittent_entities?.entities?.length) {
      return nothing;
    }

    return html`
      <div class="intermittent-section">
        <!-- Intermittent entities will be implemented in Phase 5 -->
      </div>
    `;
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
   */
  private _isEntityActive(entityId: string, state: string): boolean {
    // If custom active_states defined in config, use those
    if (this._config?.active_states && this._config.active_states.length > 0) {
      return this._config.active_states.includes(state);
    }

    // Otherwise, use domain-specific defaults
    const domain = this._getDomain(entityId);
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
    
    // Check for state-specific icon first
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
   * Handle tap action
   */
  private _handleTap(ev: Event): void {
    ev.stopPropagation();
    if (this._config?.tap_action) {
      this._handleAction(this._config.tap_action);
    }
  }

  /**
   * Handle hold (context menu) action
   */
  private _handleHold(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (this._config?.hold_action) {
      this._handleAction(this._config.hold_action);
    }
  }

  /**
   * Handle double tap action
   */
  private _handleDoubleTap(ev: Event): void {
    ev.stopPropagation();
    if (this._config?.double_tap_action) {
      this._handleAction(this._config.double_tap_action);
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

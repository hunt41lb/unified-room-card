/* Unified Room Card
 * unified-room-card/src/unified-room-card.ts
 *
 * A comprehensive room status card for Home Assistant with support for
 * climate, persistent, and intermittent entities.
 */

import { LitElement, html, PropertyValues, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
} from './constants';

import type {
  HomeAssistant,
  UnifiedRoomCardConfig,
  TapActionConfig,
} from './types';

import {
  cardStyles,
  getCardDynamicStyles,
  getTextSectionStyles,
} from './styles';

// Import editor (side effect: registers the custom element)
import './editor';

// Import components
import {
  renderClimateSection,
  renderBatteryEntities,
  renderBatteryBadge,
  getLowBatteryCount,
  isBatteryBadgeMode,
  renderUpdateEntities,
  renderUpdateBadge,
  getPendingUpdateCount,
  getSpinInterval,
  isSpinAnimationEnabled,
  isUpdateBadgeMode,
  renderPersistentEntities,
  renderIntermittentEntities,
  renderIconSection,
  type UpdateAnimationState
} from './components';

// Import utilities
import {
  getPrimaryEntity,
  isPrimaryEntityUnavailable,
  isGroupActive,
  getUnavailableConfig,
  hasRelevantStateChanged,
  getBorderEntityColor,
  getActiveGlowEffect,
  executeEntityAction,
  executeCardAction,
  fireMoreInfo,
} from './utils';

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
      return hasRelevantStateChanged(this._config, oldHass, this.hass!);
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

    // Get primary entity for display purposes
    const mainEntity = getPrimaryEntity(this.hass, this._config);

    // Check if ANY entity in the group is active
    const isActive = isGroupActive(this.hass, this._config);

    // Calculate border color from border_entity
    const borderStyle = this._getBorderStyle();

    // Get active glow effect (first matching)
    const activeGlow = getActiveGlowEffect(this.hass, this._config);

    // Check unavailable state
    const entityUnavailable = isPrimaryEntityUnavailable(this.hass, this._config);
    const unavailableConfig = getUnavailableConfig(this._config);
    const applyUnavailableStyles = entityUnavailable && unavailableConfig.behavior !== 'off';

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
      // Glow effect
      glowColor: activeGlow?.color,
      glowSpread: activeGlow?.spread,
      glowAnimation: activeGlow?.animation,
      // Unavailable Opacity
      unavailableOpacity: applyUnavailableStyles ? unavailableConfig.opacity : undefined,
    });

    // Build card classes including glow and unavailable
    const cardClasses: Record<string, boolean> = {
      'state-on': isActive && !applyUnavailableStyles,
      'state-off': !isActive && !!mainEntity && !applyUnavailableStyles,
      'state-unavailable': applyUnavailableStyles,
    };

    // Add glow classes if active (but not if unavailable)
    if (activeGlow && !applyUnavailableStyles) {
      if (activeGlow.animation === 'pulse') {
        cardClasses['card-glow-pulse'] = true;
      } else if (activeGlow.animation === 'breathe') {
        cardClasses['card-glow-breathe'] = true;
      } else {
        cardClasses['card-glow'] = true;
      }
    }

    // Detect which grid areas are defined in custom grid
    const gridAreas = this._getDefinedGridAreas();

    return html`
      <ha-card
        class=${classMap(cardClasses)}
        style=${cardDynamicStyles}
        @click=${this._handleTap}
        @contextmenu=${this._handleHold}
      >
        ${applyUnavailableStyles && unavailableConfig.show_badge ? html`
          <div class="unavailable-badge" title="Entity unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          </div>
        ` : nothing}
        ${this._renderBatteryBadge()}
        ${this._renderUpdateBadge()}
        ${this._renderName()}
        ${this._renderLabel()}
        ${this.hass && this._config ? renderIconSection(this.hass, this._config) : nothing}
        ${this._renderStateArea()}
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
    hasNameArea: boolean;
    hasLabelArea: boolean;
    hasStateArea: boolean;
    hasPersistentArea: boolean;
    hasIntermittentArea: boolean;
    hasBatteryArea: boolean;
    hasUpdateArea: boolean;
  } {
    const customAreas = this._config?.grid?.template_areas || '';
    return {
      hasCustomGrid: customAreas.length > 0,
      hasNameArea: customAreas.includes('name'),
      hasLabelArea: customAreas.includes('label'),
      hasStateArea: /\bstate\b/.test(customAreas),
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
    const { hasPersistentArea, hasIntermittentArea, hasBatteryArea, hasUpdateArea } = gridAreas;

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
      ${hasPersistentArea ? renderPersistentEntities(
        this.hass!,
        this._config?.persistent_entities,
        this._handlePersistentAction.bind(this),
        (entityId) => fireMoreInfo(this, entityId),
        true
      ) : nothing}
      ${hasIntermittentArea ? renderIntermittentEntities(
        this.hass!,
        this._config?.intermittent_entities,
        this._handleIntermittentAction.bind(this),
        true,
        includeBatteryWithIntermittent ? this._config?.battery_entities : undefined,
        includeUpdateWithIntermittent ? this._config?.update_entities : undefined,
        this._updateAnimationState
      ) : nothing}
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
   * Render battery badge if badge mode is enabled
   */
  private _renderBatteryBadge(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config?.battery_entities) return nothing;
    if (!isBatteryBadgeMode(this._config.battery_entities)) return nothing;

    return renderBatteryBadge(
      this.hass,
      this._config.battery_entities,
      this._handleEntityAction.bind(this)
    );
  }

  /**
   * Render update badge if badge mode is enabled
   */
  private _renderUpdateBadge(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config?.update_entities) return nothing;
    if (!isUpdateBadgeMode(this._config.update_entities)) return nothing;

    return renderUpdateBadge(
      this.hass,
      this._config.update_entities,
      this._handleEntityAction.bind(this),
      this._updateAnimationState
    );
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
        ${renderPersistentEntities(
          this.hass!,
          this._config?.persistent_entities,
          this._handlePersistentAction.bind(this),
          (entityId) => fireMoreInfo(this, entityId),
          false
        )}
        ${renderIntermittentEntities(
          this.hass!,
          this._config?.intermittent_entities,
          this._handleIntermittentAction.bind(this),
          false
        )}
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
    const borderColor = getBorderEntityColor(entity);

    if (!borderColor) {
      return undefined;
    }

    return `${borderWidth} ${borderStyle} ${borderColor}`;
  }

  // ===========================================================================
  // SECTION RENDERERS
  // ===========================================================================

  /**
   * Render card name section with optional custom styling
   */
  private _renderName(): TemplateResult | typeof nothing {
    if (!this._config?.show_name || !this._config.name) {
      return nothing;
    }

    // Generate dynamic inline styles from name_style config
    const customStyles = getTextSectionStyles(this._config.name_style);

    return html`
      <div class="name-section" style=${customStyles}>
        ${this._config.name}
      </div>
    `;
  }

  /**
   * Render card label section with optional custom styling
   */
  private _renderLabel(): TemplateResult | typeof nothing {
    if (!this._config?.show_label || !this._config.label) {
      return nothing;
    }

    // Generate dynamic inline styles from label_style config
    const customStyles = getTextSectionStyles(this._config.label_style);

    return html`
      <div class="label-section" style=${customStyles}>
        ${this._config.label}
      </div>
    `;
  }

  /**
   * Render standalone state area with optional custom styling
   */
  private _renderStateArea(): TemplateResult | typeof nothing {
    if (!this._config?.show_state) return nothing;

    const mainEntity = getPrimaryEntity(this.hass!, this._config!);
    if (!mainEntity) return nothing;

    // Only render as standalone grid area if 'state' is defined in grid template
    const templateAreas = this._config?.grid?.template_areas || '';
    if (!/\bstate\b/.test(templateAreas)) return nothing;

    // Generate dynamic inline styles from state_style config
    const customStyles = getTextSectionStyles(this._config.state_style);

    return html`
      <div class="state-section" style=${customStyles}>
        ${mainEntity.state}
      </div>
    `;
  }

  /**
   * Handle action for persistent entity
   */
  private _handlePersistentAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;
    executeEntityAction(this.hass, action, entityId, this);
  }

  /**
   * Handle action for intermittent entity
   */
  private _handleIntermittentAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;
    executeEntityAction(this.hass, action, entityId, this);
  }


  // ===========================================================================
  // HELPER METHODS
  // ===========================================================================

  /**
   * Handle entity action (tap/hold) - generic handler for all entity types
   */
  private _handleEntityAction(action: TapActionConfig, entityId: string): void {
    if (!this.hass) return;
    executeEntityAction(this.hass, action, entityId, this);
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
  /**
   * Execute tap action using action-handler utility
   */
  private _handleAction(actionConfig: TapActionConfig): void {
    if (!this.hass || !this._config) return;
    executeCardAction(this.hass, actionConfig, this._config, this);
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

(window as Window & { customCards?: Array<{ type: string; name: string; description: string }> }).customCards!.push({
  type: CARD_TAG,
  name: CARD_NAME.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  description: CARD_DESCRIPTION,
});
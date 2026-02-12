/**
 * Unified Room Card - Visual Editor
 *
 * GUI editor for configuring the card through Home Assistant's
 * card configuration dialog.
 */

import { LitElement, html, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Internal imports
import {
  CARD_EDITOR_TAG,
  ICON_HORIZONTAL_DROPDOWN_OPTIONS,
  ICON_VERTICAL_DROPDOWN_OPTIONS,
  HA_COLOR_OPTIONS,
  DOMAIN_STATE_DEFAULTS,
  DOMAINS_WITH_DEFAULTS,
  ANIMATION_OPTIONS,
  UNAVAILABLE_BEHAVIOR_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  BORDER_STYLE_OPTIONS,
  BADGE_POSITION_DROPDOWN_OPTIONS,
  type TapActionType,
} from './constants';

import type {
  HomeAssistant,
  UnifiedRoomCardConfig,
  EditorAccordionState,
} from './types';

import { editorStyles } from './styles';

import { getDomain } from './utils';

// =============================================================================
// EDITOR CLASS
// =============================================================================

@customElement(CARD_EDITOR_TAG)
export class UnifiedRoomCardEditor extends LitElement {
  // ===========================================================================
  // PROPERTIES
  // ===========================================================================

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UnifiedRoomCardConfig;
  @state() private _accordionState: EditorAccordionState = {
    main: true,
    // Sub-accordions for main section (Basic expanded by default)
    mainBasic: true,
    mainIcon: false,
    mainAppearance: false,
    mainActions: false,
    // Other sections
    persistent: false,
    intermittent: false,
    climate: false,
    power: false,
    battery: false,
    update: false,
    grid: false,
  };
  @state() private _persistentEntityExpanded: number = -1;
  @state() private _intermittentEntityExpanded: number = -1;
  @state() private _customColorInputs: Set<string> = new Set(); // Tracks which state configs show custom input (persistent)
  @state() private _intermittentCustomColorInputs: Set<string> = new Set(); // Tracks which state configs show custom input (intermittent)
  @state() private _showUnavailableCustomColorInput: boolean = false; // Tracks if custom color input is shown for unavailable handling
  @state() private _iconStateMapCustomColors: Set<string> = new Set(); // Tracks which icon_state_map entries show custom color input

  // ===========================================================================
  // STATIC STYLES
  // ===========================================================================

  static override styles = editorStyles;

  // ===========================================================================
  // LIFECYCLE
  // ===========================================================================

  /**
   * Set editor configuration
   */
  public setConfig(config: UnifiedRoomCardConfig): void {
    this._config = config;
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <div class="editor-container">
        ${this._renderMainSection()}
        ${this._renderPersistentSection()}
        ${this._renderIntermittentSection()}
        ${this._renderClimateSection()}
        ${this._renderPowerSection()}
        ${this._renderBatterySection()}
        ${this._renderUpdateSection()}
        ${this._renderGridSection()}
      </div>
    `;
  }

  // ===========================================================================
  // SECTION RENDERERS
  // ===========================================================================

  /**
   * Render main card configuration section with sub-accordions
   */
  private _renderMainSection(): TemplateResult {
    const expanded = this._accordionState.main;

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('main')}
        >
          <span>Main Configuration</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          ${this._renderBasicSettingsSubSection()}
          ${this._renderIconSubSection()}
          ${this._renderAppearanceSubSection()}
          ${this._renderActionsSubSection()}
        </div>
      </div>
    `;
  }

  /**
   * Render Basic Settings sub-accordion
   */
  private _renderBasicSettingsSubSection(): TemplateResult {
    const expanded = this._accordionState.mainBasic;
    const primaryDomain = this._config?.entity ? getDomain(this._config.entity) : undefined;

    return html`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('mainBasic')}
        >
          <span>Basic Settings</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="sub-accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Card Name with inline Show Name toggle -->
          <div class="form-row-inline">
            <span class="form-label">Name</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.name || ''}
                placeholder="Room Name"
                @input=${(e: Event) => this._valueChanged('name', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
            <div class="form-toggle">
              <span>Show</span>
              <ha-switch
                .checked=${this._config?.show_name !== false}
                @change=${(e: Event) => this._valueChanged('show_name', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Label with inline Show Label toggle -->
          <div class="form-row-inline">
            <span class="form-label">Label</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.label || ''}
                placeholder="e.g., Ground Floor"
                @input=${(e: Event) => this._valueChanged('label', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
            <div class="form-toggle">
              <span>Show</span>
              <ha-switch
                .checked=${this._config?.show_label || false}
                @change=${(e: Event) => this._valueChanged('show_label', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Entity -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: {} }}
                .value=${this._config?.entity || ''}
                @value-changed=${(e: CustomEvent) => this._valueChanged('entity', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Additional Entities (same domain) -->
          ${primaryDomain ? html`
            <div class="form-row">
              <span class="form-label">Additional Entities</span>
              <div class="form-input">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ entity: { domain: primaryDomain, multiple: true } }}
                  .value=${this._config?.entities || []}
                  @value-changed=${(e: CustomEvent) => this._valueChanged('entities', e.detail.value)}
                ></ha-selector>
              </div>
            </div>
            <p class="helper-text">Group multiple ${primaryDomain} entities - tap toggles all, colors are averaged</p>
          ` : ''}
          <!-- Show State -->
          <div class="form-row">
            <span class="form-label">Show State</span>
            <div class="form-input">
              <ha-switch
                .checked=${this._config?.show_state || false}
                @change=${(e: Event) => this._valueChanged('show_state', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>

          <!-- Unavailable State Handling Section -->
          ${this._renderUnavailableHandlingSection()}
        </div>
      </div>
    `;
  }

  /**
   * Render Unavailable State Handling section
   */
  private _renderUnavailableHandlingSection(): TemplateResult {
    // Only show if an entity is selected
    if (!this._config?.entity) {
      return html``;
    }

    const unavailableConfig = this._config?.unavailable_handling || { behavior: 'off' };
    const behavior = unavailableConfig.behavior || 'off';
    const showCustomOptions = behavior === 'custom' || behavior === 'unavailable';

    // Check if current icon_color is a custom value (not in predefined list)
    const currentIconColor = unavailableConfig.icon_color || '';
    const isCustomColor = this._showUnavailableCustomColorInput ||
      (currentIconColor && !HA_COLOR_OPTIONS.some(opt => opt.value === currentIconColor));
    const dropdownValue = isCustomColor ? 'custom' : (currentIconColor || 'var(--disabled-text-color)');

    return html`
      <div class="section-divider"></div>
      <div class="section-header">
        <ha-icon icon="mdi:help-circle-outline"></ha-icon>
        <span>Unavailable State Handling</span>
      </div>
      <p class="helper-text">Configure how the card appears when the entity is unavailable or unknown</p>

      <!-- Behavior Selection -->
      <div class="form-row">
        <span class="form-label">When Unavailable</span>
        <div class="form-input">
          <ha-select
            .value=${behavior}
            @selected=${(e: Event) => this._updateUnavailableHandling('behavior', (e.target as HTMLSelectElement).value)}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            ${UNAVAILABLE_BEHAVIOR_OPTIONS.map(
              (option) => html`
                <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
              `
            )}
          </ha-select>
        </div>
      </div>

      ${showCustomOptions ? html`
        <!-- Custom Icon when Unavailable -->
        <div class="form-row">
          <span class="form-label">Custom Icon</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${unavailableConfig.icon || ''}
              @value-changed=${(e: CustomEvent) => this._updateUnavailableHandling('icon', e.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <p class="helper-text">Icon to display when entity is unavailable (leave empty to use default icon)</p>

        <!-- Icon Color -->
        <div class="form-row">
          <span class="form-label">Icon Color</span>
          <div class="form-input">
            <ha-select
              .value=${dropdownValue}
              @selected=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                if (value === 'custom') {
                  this._showUnavailableCustomColorInput = true;
                } else {
                  this._showUnavailableCustomColorInput = false;
                  this._updateUnavailableHandling('icon_color', value);
                }
              }}
              @closed=${(e: Event) => e.stopPropagation()}
            >
              ${this._renderColorOptions()}
            </ha-select>
          </div>
        </div>
        ${isCustomColor ? html`
          <div class="form-row">
            <span class="form-label">Custom Color</span>
            <div class="form-input">
              <ha-textfield
                .value=${unavailableConfig.icon_color || ''}
                placeholder="var(--disabled-text-color)"
                @input=${(e: Event) => this._updateUnavailableHandling('icon_color', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
        ` : ''}

        <!-- Background Color -->
        <div class="form-row">
          <span class="form-label">Background Color</span>
          <div class="form-input">
            <ha-textfield
              .value=${unavailableConfig.background_color || ''}
              placeholder="var(--secondary-background-color)"
              @input=${(e: Event) => this._updateUnavailableHandling('background_color', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">CSS color or variable for icon background when unavailable</p>

        <!-- Opacity Slider -->
        <div class="form-row">
          <span class="form-label">Opacity</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ number: { min: 0, max: 1, step: 0.1, mode: 'slider' } }}
              .value=${unavailableConfig.opacity ?? 0.5}
              @value-changed=${(e: CustomEvent) => this._updateUnavailableHandling('opacity', e.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <p class="helper-text">Card opacity when entity is unavailable (0 = transparent, 1 = fully visible)</p>

        <!-- Show Badge Toggle -->
        <div class="form-row">
          <span class="form-label">Show Unavailable Badge</span>
          <div class="form-input">
            <ha-switch
              .checked=${unavailableConfig.show_badge || false}
              @change=${(e: Event) => this._updateUnavailableHandling('show_badge', (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
        </div>
        <p class="helper-text">Show a small indicator badge when entity is unavailable</p>
      ` : ''}
    `;
  }

  /**
   * Update unavailable handling configuration
   */
  private _updateUnavailableHandling(key: string, value: unknown): void {
    if (!this._config) return;

    const currentConfig = this._config.unavailable_handling || { behavior: 'off' };

    // Create new config with update
    const newConfig: Record<string, unknown> = {
      ...currentConfig,
      [key]: value,
    };

    // If value is empty/undefined and it's not the behavior, remove the key
    if (key !== 'behavior' && (value === '' || value === undefined || value === null)) {
      delete newConfig[key];
    }

    // If only behavior is 'off' with no other properties, remove the entire config
    const hasCustomProps = Object.keys(newConfig).some(k => k !== 'behavior' && newConfig[k] !== undefined);

    this._config = {
      ...this._config,
      unavailable_handling: (newConfig.behavior === 'off' && !hasCustomProps)
        ? undefined
        : newConfig as unknown as typeof currentConfig,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Render Icon sub-accordion
   */
  private _renderIconSubSection(): TemplateResult {
    const expanded = this._accordionState.mainIcon;
    const showIcon = this._config?.show_icon !== false;
    const showBackground = this._config?.show_img_cell !== false;

    return html`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('mainIcon')}
        >
          <span>Icon</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="sub-accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Show Icon toggle -->
          <div class="form-row">
            <span class="form-label">Show Icon</span>
            <div class="form-input">
              <ha-switch
                .checked=${showIcon}
                @change=${(e: Event) => this._valueChanged('show_icon', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>

          ${showIcon ? html`
            <!-- Icon selector -->
            <div class="form-row">
              <span class="form-label">Icon</span>
              <div class="form-input">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ icon: {} }}
                  .value=${this._config?.icon || ''}
                  @value-changed=${(e: CustomEvent) => this._valueChanged('icon', e.detail.value)}
                ></ha-selector>
              </div>
            </div>
            <!-- Position dropdowns -->
            <div class="form-row-dual expand-inputs">
              <div class="form-item">
                <span class="form-label">Horizontal</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.icon_horizontal_position || 'right'}
                    @selected=${(e: Event) => this._valueChanged('icon_horizontal_position', (e.target as HTMLSelectElement).value)}
                    @closed=${(e: Event) => e.stopPropagation()}
                  >
                    ${ICON_HORIZONTAL_DROPDOWN_OPTIONS.map(
                      (option) => html`
                        <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
                      `
                    )}
                  </ha-select>
                </div>
              </div>
              <div class="form-item">
                <span class="form-label">Vertical</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.icon_vertical_position || 'top'}
                    @selected=${(e: Event) => this._valueChanged('icon_vertical_position', (e.target as HTMLSelectElement).value)}
                    @closed=${(e: Event) => e.stopPropagation()}
                  >
                    ${ICON_VERTICAL_DROPDOWN_OPTIONS.map(
                      (option) => html`
                        <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
                      `
                    )}
                  </ha-select>
                </div>
              </div>
            </div>
            <!-- Icon Size -->
            <div class="form-row">
              <span class="form-label">Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.icon_size || ''}
                  placeholder="35px"
                  @input=${(e: Event) => this._valueChanged('icon_size', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <!-- Show Background toggle -->
            <div class="form-row">
              <span class="form-label">Show Background</span>
              <div class="form-input">
                <ha-switch
                  .checked=${showBackground}
                  @change=${(e: Event) => this._valueChanged('show_img_cell', (e.target as HTMLInputElement).checked)}
                ></ha-switch>
              </div>
            </div>
            ${showBackground ? html`
              <!-- Background Size -->
              <div class="form-row">
                <span class="form-label">Background Size</span>
                <div class="form-input">
                  <ha-textfield
                    .value=${this._config?.img_cell_size || ''}
                    placeholder="50px"
                    @input=${(e: Event) => this._valueChanged('img_cell_size', (e.target as HTMLInputElement).value)}
                  ></ha-textfield>
                </div>
              </div>
              <!-- Background Opacity -->
              <div class="form-row">
                <span class="form-label">Background Opacity</span>
                <div class="form-input">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ number: { min: 0, max: 1, step: 0.1, mode: 'slider' } }}
                    .value=${this._config?.icon_background_opacity ?? 0.3}
                    @value-changed=${(e: CustomEvent) => this._valueChanged('icon_background_opacity', e.detail.value)}
                  ></ha-selector>
                </div>
              </div>
              <p class="helper-text">Opacity of the icon background when entity is active</p>
            ` : ''}
            <!-- Animation dropdown -->
            <div class="form-row">
              <span class="form-label">Animation</span>
              <div class="form-input">
                <ha-select
                  .value=${this._config?.icon_animation || 'none'}
                  @selected=${(e: Event) => this._valueChanged('icon_animation', (e.target as HTMLSelectElement).value)}
                  @closed=${(e: Event) => e.stopPropagation()}
                >
                  ${ANIMATION_OPTIONS.map(
                    (option) => html`
                      <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
                    `
                  )}
                </ha-select>
              </div>
            </div>
            <!-- Spin Duration (only show when spin is selected) -->
            ${this._config?.icon_animation === 'spin' ? html`
              <div class="form-row">
                <span class="form-label">Spin Duration (sec)</span>
                <div class="form-input">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ number: { min: 1, max: 120, step: 1, mode: 'box' } }}
                    .value=${this._config?.spin_duration ?? 2}
                    @value-changed=${(e: CustomEvent) => this._valueChanged('spin_duration', e.detail.value)}
                  ></ha-selector>
                </div>
              </div>
              <p class="helper-text">Time for one complete 360° rotation (useful for timer visualization)</p>
            ` : ''}
            <!-- Icon State Map -->
            ${this._renderIconStateMapSection()}
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Render Card Appearance sub-accordion
   */
  private _renderAppearanceSubSection(): TemplateResult {
    const expanded = this._accordionState.mainAppearance;
    const hasBorderEntity = !!this._config?.border_entity;

    return html`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('mainAppearance')}
        >
          <span>Card Appearance</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="sub-accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Card Height / Width -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Height</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.card_height || ''}
                  placeholder="97px"
                  @input=${(e: Event) => this._valueChanged('card_height', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Width</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.card_width || ''}
                  placeholder="auto"
                  @input=${(e: Event) => this._valueChanged('card_width', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          </div>
          <!-- Border Entity -->
          <div class="form-row">
            <span class="form-label">Border Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: {} }}
                .value=${this._config?.border_entity || ''}
                @value-changed=${(e: CustomEvent) => this._valueChanged('border_entity', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <p class="helper-text">Border color changes based on this entity's state</p>

          ${hasBorderEntity ? html`
            <!-- Border Width / Style -->
            <div class="form-row-dual expand-inputs">
              <div class="form-item">
                <span class="form-label">Border Width</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.border_width || '2px'}
                    @selected=${(e: CustomEvent) => this._valueChanged('border_width', (e.target as HTMLSelectElement).value)}
                    @closed=${(e: Event) => e.stopPropagation()}
                  >
                    ${BORDER_WIDTH_OPTIONS.map(opt => html`
                      <mwc-list-item value=${opt.value}>${opt.label}</mwc-list-item>
                    `)}
                  </ha-select>
                </div>
              </div>
              <div class="form-item">
                <span class="form-label">Border Style</span>
                <div class="form-input">
                  <ha-select
                    .value=${this._config?.border_style || 'solid'}
                    @selected=${(e: CustomEvent) => this._valueChanged('border_style', (e.target as HTMLSelectElement).value)}
                    @closed=${(e: Event) => e.stopPropagation()}
                  >
                    ${BORDER_STYLE_OPTIONS.map(opt => html`
                      <mwc-list-item value=${opt.value}>${opt.label}</mwc-list-item>
                    `)}
                  </ha-select>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Glow Effects Section -->
          <div class="section-divider"></div>
          <div class="section-header">
            <span>Glow Effects</span>
          </div>
          <p class="helper-text">Add glow effects triggered by entity states. First matching effect wins.</p>
          ${this._renderGlowEffects()}
          <button
            class="add-entity-button"
            @click=${this._addGlowEffect}
          >
            <ha-icon .icon=${'mdi:plus'}></ha-icon>
            Add Glow Effect
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render Actions sub-accordion
   */
  private _renderActionsSubSection(): TemplateResult {
    const expanded = this._accordionState.mainActions;

    return html`
      <div class="sub-accordion">
        <div
          class="sub-accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('mainActions')}
        >
          <span>Actions</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="sub-accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Haptic Feedback -->
          <div class="form-row">
            <span class="form-label">Haptic Feedback</span>
            <div class="form-input">
              <ha-switch
                .checked=${this._config?.haptic !== false}
                @change=${(e: Event) => this._valueChanged('haptic', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.tap_action?.action || 'toggle'}
                @selected=${(e: CustomEvent) => this._tapActionChanged('tap_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${this._config?.tap_action?.action === 'navigate' ? html`
            <div class="form-row">
              <span class="form-label">Navigation Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.tap_action?.navigation_path || ''}
                  placeholder="/lovelace/0"
                  @input=${(e: Event) => this._tapActionDataChanged('tap_action', 'navigation_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}
          ${this._config?.tap_action?.action === 'url' ? html`
            <div class="form-row">
              <span class="form-label">URL Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.tap_action?.url_path || ''}
                  placeholder="https://example.com"
                  @input=${(e: Event) => this._tapActionDataChanged('tap_action', 'url_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}

          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.hold_action?.action || 'none'}
                @selected=${(e: CustomEvent) => this._tapActionChanged('hold_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="none">None</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${this._config?.hold_action?.action === 'navigate' ? html`
            <div class="form-row">
              <span class="form-label">Navigation Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.hold_action?.navigation_path || ''}
                  placeholder="/lovelace/0"
                  @input=${(e: Event) => this._tapActionDataChanged('hold_action', 'navigation_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}
          ${this._config?.hold_action?.action === 'url' ? html`
            <div class="form-row">
              <span class="form-label">URL Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.hold_action?.url_path || ''}
                  placeholder="https://example.com"
                  @input=${(e: Event) => this._tapActionDataChanged('hold_action', 'url_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}

          <!-- Double Tap Action -->
          <div class="form-row">
            <span class="form-label">Double Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${this._config?.double_tap_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._tapActionChanged('double_tap_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="url">URL</mwc-list-item>
                <mwc-list-item value="perform-action">Perform Action</mwc-list-item>
                <mwc-list-item value="assist">Assist</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          ${this._config?.double_tap_action?.action === 'navigate' ? html`
            <div class="form-row">
              <span class="form-label">Navigation Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.double_tap_action?.navigation_path || ''}
                  placeholder="/lovelace/0"
                  @input=${(e: Event) => this._tapActionDataChanged('double_tap_action', 'navigation_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}
          ${this._config?.double_tap_action?.action === 'url' ? html`
            <div class="form-row">
              <span class="form-label">URL Path</span>
              <div class="form-input">
                <ha-textfield
                  .value=${this._config?.double_tap_action?.url_path || ''}
                  placeholder="https://example.com"
                  @input=${(e: Event) => this._tapActionDataChanged('double_tap_action', 'url_path', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Render persistent entities section - Placeholder
   */
  private _renderPersistentSection(): TemplateResult {
    const expanded = this._accordionState.persistent;
    const persistentConfig = this._config?.persistent_entities || {};
    const entities = persistentConfig.entities || [];

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('persistent')}
        >
          <span>Persistent Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Position -->
          <div class="form-row">
            <span class="form-label">Position</span>
            <div class="form-input">
              <ha-select
                .value=${persistentConfig.position || 'right'}
                @selected=${(e: CustomEvent) => this._persistentValueChanged('position', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="left">Left</mwc-list-item>
                <mwc-list-item value="center">Center</mwc-list-item>
                <mwc-list-item value="right">Right</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Default Icon Size -->
          <div class="form-row">
            <span class="form-label">Default Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${persistentConfig.icon_size || ''}
                placeholder="21px"
                @input=${(e: Event) => this._persistentValueChanged('icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Padding & Gap -->
          <div class="form-row-dual expand-inputs">
            <div class="form-item">
              <span class="form-label">Padding</span>
              <div class="form-input">
                <ha-textfield
                  .value=${persistentConfig.padding || ''}
                  placeholder="Auto (based on position)"
                  @input=${(e: Event) => this._persistentValueChanged('padding', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Margin</span>
              <div class="form-input">
                <ha-textfield
                  .value=${persistentConfig.margin || ''}
                  placeholder="Auto"
                  @input=${(e: Event) => this._persistentValueChanged('margin', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          </div>
          <!-- Gap -->
          <div class="form-row">
            <span class="form-label">Gap (between icons)</span>
            <div class="form-input">
              <ha-textfield
                .value=${persistentConfig.gap || ''}
                placeholder="4px"
                @input=${(e: Event) => this._persistentValueChanged('gap', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entities List -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${entities.map((entityConfig, index) => this._renderPersistentEntityConfig(entityConfig, index))}
          <div class="add-entity-btn" @click=${this._addPersistentEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render configuration for a single persistent entity
   */
  private _renderPersistentEntityConfig(entityConfig: { entity: string; icon?: string; icon_size?: string; tap_action?: { action: string }; hold_action?: { action: string }; states?: Array<{ state: string; icon?: string; color?: string }> }, index: number): TemplateResult {
    const entityId = entityConfig.entity || '';
    const entityExists = entityId && this.hass?.states[entityId];
    const domain = entityId ? getDomain(entityId) : '';
    const hasDomainDefaults = DOMAINS_WITH_DEFAULTS.includes(domain);

    return html`
      <div class="entity-row">
        <div class="entity-header" @click=${() => this._togglePersistentEntityExpand(index)}>
          <div class="entity-name-wrapper">
            ${!entityExists && entityId ? html`
              <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
            ` : nothing}
            <span class="entity-name">${entityConfig.entity || 'New Entity'}</span>
          </div>
          <div class="entity-actions">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
            <ha-icon icon="mdi:delete" @click=${(e: Event) => { e.stopPropagation(); this._removePersistentEntity(index); }}></ha-icon>
          </div>
        </div>
        <div class="entity-config ${this._persistentEntityExpanded === index ? 'expanded' : ''}">
          <!-- Entity Selector -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: {} }}
                .value=${entityConfig.entity || ''}
                @value-changed=${(e: CustomEvent) => this._updatePersistentEntity(index, 'entity', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          ${!entityExists && entityId ? html`
            <div class="validation-warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>Entity "${entityId}" not found or unavailable</span>
            </div>
          ` : nothing}
          <!-- Default Icon -->
          <div class="form-row">
            <span class="form-label">Default Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ icon: {} }}
                .value=${entityConfig.icon || ''}
                @value-changed=${(e: CustomEvent) => this._updatePersistentEntity(index, 'icon', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${entityConfig.icon_size || ''}
                placeholder="Inherit from section"
                @input=${(e: Event) => this._updatePersistentEntity(index, 'icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${entityConfig.tap_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updatePersistentEntityAction(index, 'tap_action', (e.target as HTMLSelectElement).value as TapActionType)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${entityConfig.hold_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updatePersistentEntityAction(index, 'hold_action', (e.target as HTMLSelectElement).value as TapActionType)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- State Configuration Header with Apply Defaults -->
          <div class="form-row state-header-row">
            <span class="form-label">State-based Icons & Colors</span>
            ${hasDomainDefaults ? html`
              <button class="apply-defaults-btn" @click=${() => this._applyDomainDefaults(index, domain)}>
                <ha-icon icon="mdi:auto-fix"></ha-icon>
                Apply ${this._getDomainDisplayName(domain)} Defaults
              </button>
            ` : nothing}
          </div>
          ${(entityConfig.states || []).map((stateConfig, stateIndex) => {
            const colorKey = `${index}-${stateIndex}`;
            const currentColor = stateConfig.color || '';
            const isCustomColor = this._customColorInputs.has(colorKey) ||
              (currentColor && !HA_COLOR_OPTIONS.some(opt => opt.value === currentColor));
            const dropdownValue = isCustomColor ? 'custom' : currentColor;

            return html`
              <div class="state-config-row">
                <ha-textfield
                  .value=${stateConfig.state || ''}
                  placeholder="State (e.g., locked)"
                  @input=${(e: Event) => this._updatePersistentEntityState(index, stateIndex, 'state', (e.target as HTMLInputElement).value)}
                  style="flex: 1;"
                ></ha-textfield>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ icon: {} }}
                  .value=${stateConfig.icon || ''}
                  @value-changed=${(e: CustomEvent) => this._updatePersistentEntityState(index, stateIndex, 'icon', e.detail.value)}
                  style="flex: 1;"
                ></ha-selector>
                <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
                  <div class="color-select-with-preview">
                    <ha-select
                      .value=${dropdownValue}
                      @selected=${(e: CustomEvent) => this._handleColorSelect(index, stateIndex, (e.target as HTMLSelectElement).value)}
                      @closed=${(e: Event) => e.stopPropagation()}
                      style="flex: 1;"
                    >
                      ${this._renderColorOptions()}
                    </ha-select>
                    <div class="color-preview" style=${this._getColorPreviewStyle(currentColor)}></div>
                  </div>
                  ${isCustomColor ? html`
                    <ha-textfield
                      .value=${currentColor}
                      placeholder="CSS color value"
                      @input=${(e: Event) => this._updatePersistentEntityState(index, stateIndex, 'color', (e.target as HTMLInputElement).value)}
                      style="width: 100%;"
                    ></ha-textfield>
                  ` : nothing}
                </div>
                <ha-icon icon="mdi:delete" @click=${() => this._removePersistentEntityState(index, stateIndex)}></ha-icon>
              </div>
            `;
          })}
          <div class="add-state-btn" @click=${() => this._addPersistentEntityState(index)}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add State Config</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render intermittent entities section - Placeholder
   */
  private _renderIntermittentSection(): TemplateResult {
    const expanded = this._accordionState.intermittent;
    const intermittentConfig = this._config?.intermittent_entities || {};
    const entities = intermittentConfig.entities || [];

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('intermittent')}
        >
          <span>Intermittent Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <p class="section-description">Entities that only appear when in an "active" state (e.g., motion detected)</p>
          <!-- Default Icon Size -->
          <div class="form-row">
            <span class="form-label">Default Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${intermittentConfig.icon_size || ''}
                placeholder="21px"
                @input=${(e: Event) => this._intermittentValueChanged('icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Gap -->
          <div class="form-row">
            <span class="form-label">Gap (between icons)</span>
            <div class="form-input">
              <ha-textfield
                .value=${intermittentConfig.gap || ''}
                placeholder="4px"
                @input=${(e: Event) => this._intermittentValueChanged('gap', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Section Animation -->
          <div class="form-row">
            <span class="form-label">Animation (when active)</span>
            <div class="form-input">
              <ha-select
                .value=${intermittentConfig.animation || ''}
                @selected=${(e: CustomEvent) => this._intermittentValueChanged('animation', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="">None</mwc-list-item>
                <mwc-list-item value="pulse">Pulse</mwc-list-item>
                <mwc-list-item value="glow">Glow</mwc-list-item>
                <mwc-list-item value="flash">Flash</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities List -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${entities.map((entityConfig, index) => this._renderIntermittentEntityConfig(entityConfig, index))}
          <div class="add-entity-btn" @click=${this._addIntermittentEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render configuration for a single intermittent entity
   */
  private _renderIntermittentEntityConfig(entityConfig: { entity: string; icon?: string; icon_size?: string; active_states?: string[]; tap_action?: { action: string }; hold_action?: { action: string }; animation?: string; states?: Array<{ state: string; icon?: string; color?: string }> }, index: number): TemplateResult {
    const entityId = entityConfig.entity || '';
    const entityExists = entityId && this.hass?.states[entityId];
    const domain = entityId ? getDomain(entityId) : '';
    const hasDomainDefaults = DOMAINS_WITH_DEFAULTS.includes(domain);

    return html`
      <div class="entity-row">
        <div class="entity-header" @click=${() => this._toggleIntermittentEntityExpand(index)}>
          <div class="entity-name-wrapper">
            ${!entityExists && entityId ? html`
              <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
            ` : nothing}
            <span class="entity-name">${entityConfig.entity || 'New Entity'}</span>
          </div>
          <div class="entity-actions">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
            <ha-icon icon="mdi:delete" @click=${(e: Event) => { e.stopPropagation(); this._removeIntermittentEntity(index); }}></ha-icon>
          </div>
        </div>
        <div class="entity-config ${this._intermittentEntityExpanded === index ? 'expanded' : ''}">
          <!-- Entity Selector -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: {} }}
                .value=${entityConfig.entity || ''}
                @value-changed=${(e: CustomEvent) => this._updateIntermittentEntity(index, 'entity', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          ${!entityExists && entityId ? html`
            <div class="validation-warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>Entity "${entityId}" not found or unavailable</span>
            </div>
          ` : nothing}
          <!-- Default Icon -->
          <div class="form-row">
            <span class="form-label">Default Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ icon: {} }}
                .value=${entityConfig.icon || ''}
                @value-changed=${(e: CustomEvent) => this._updateIntermittentEntity(index, 'icon', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${entityConfig.icon_size || ''}
                placeholder="Inherit from section"
                @input=${(e: Event) => this._updateIntermittentEntity(index, 'icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Active States (entity-specific override) -->
          <div class="form-row">
            <span class="form-label">Active States</span>
            <div class="form-input">
              <ha-textfield
                .value=${(entityConfig.active_states || []).join(', ')}
                placeholder="Default: domain-based (e.g., on)"
                @input=${(e: Event) => this._updateIntermittentEntityActiveStates(index, (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entity Animation -->
          <div class="form-row">
            <span class="form-label">Animation</span>
            <div class="form-input">
              <ha-select
                .value=${entityConfig.animation || ''}
                @selected=${(e: CustomEvent) => this._updateIntermittentEntity(index, 'animation', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="">Inherit from section</mwc-list-item>
                <mwc-list-item value="pulse">Pulse</mwc-list-item>
                <mwc-list-item value="glow">Glow</mwc-list-item>
                <mwc-list-item value="flash">Flash</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${entityConfig.tap_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updateIntermittentEntityAction(index, 'tap_action', (e.target as HTMLSelectElement).value as TapActionType)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${entityConfig.hold_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updateIntermittentEntityAction(index, 'hold_action', (e.target as HTMLSelectElement).value as TapActionType)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="toggle">Toggle</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- State Configuration Header with Apply Defaults -->
          <div class="form-row state-header-row">
            <span class="form-label">State-based Icons & Colors</span>
            ${hasDomainDefaults ? html`
              <button class="apply-defaults-btn" @click=${() => this._applyIntermittentDomainDefaults(index, domain)}>
                <ha-icon icon="mdi:auto-fix"></ha-icon>
                Apply ${this._getDomainDisplayName(domain)} Defaults
              </button>
            ` : nothing}
          </div>
          ${(entityConfig.states || []).map((stateConfig, stateIndex) => {
            const colorKey = `i-${index}-${stateIndex}`;
            const currentColor = stateConfig.color || '';
            const isCustomColor = this._intermittentCustomColorInputs.has(colorKey) ||
              (currentColor && !HA_COLOR_OPTIONS.some(opt => opt.value === currentColor));
            const dropdownValue = isCustomColor ? 'custom' : currentColor;

            return html`
              <div class="state-config-row">
                <ha-textfield
                  .value=${stateConfig.state || ''}
                  placeholder="State (e.g., on)"
                  @input=${(e: Event) => this._updateIntermittentEntityState(index, stateIndex, 'state', (e.target as HTMLInputElement).value)}
                  style="flex: 1;"
                ></ha-textfield>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ icon: {} }}
                  .value=${stateConfig.icon || ''}
                  @value-changed=${(e: CustomEvent) => this._updateIntermittentEntityState(index, stateIndex, 'icon', e.detail.value)}
                  style="flex: 1;"
                ></ha-selector>
                <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
                  <div class="color-select-with-preview">
                    <ha-select
                      .value=${dropdownValue}
                      @selected=${(e: CustomEvent) => this._handleIntermittentColorSelect(index, stateIndex, (e.target as HTMLSelectElement).value)}
                      @closed=${(e: Event) => e.stopPropagation()}
                      style="flex: 1;"
                    >
                      ${this._renderColorOptions()}
                    </ha-select>
                    <div class="color-preview" style=${this._getColorPreviewStyle(currentColor)}></div>
                  </div>
                  ${isCustomColor ? html`
                    <ha-textfield
                      .value=${currentColor}
                      placeholder="CSS color value"
                      @input=${(e: Event) => this._updateIntermittentEntityState(index, stateIndex, 'color', (e.target as HTMLInputElement).value)}
                      style="width: 100%;"
                    ></ha-textfield>
                  ` : nothing}
                </div>
                <ha-icon icon="mdi:delete" @click=${() => this._removeIntermittentEntityState(index, stateIndex)}></ha-icon>
              </div>
            `;
          })}
          <div class="add-state-btn" @click=${() => this._addIntermittentEntityState(index)}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add State Config</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render climate entities section
   */
  private _renderClimateSection(): TemplateResult {
    const expanded = this._accordionState.climate;
    const climateConfig = this._config?.climate_entities || {};

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('climate')}
        >
          <span>Climate Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Primary Entities -->
          <div class="form-row">
            <span class="form-label">Primary Entities</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${this._getPrimaryEntitySelector()}
                .value=${climateConfig.primary_entities || []}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('primary_entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Primary Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${climateConfig.show_primary_unit !== false}
                @change=${(e: Event) => this._climateValueChanged('show_primary_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Temperature Entities -->
          <div class="form-row">
            <span class="form-label">Temperature</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'sensor', device_class: 'temperature', multiple: true } }}
                .value=${climateConfig.temperature_entities || []}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('temperature_entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Temperature Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${climateConfig.show_temperature_unit !== false}
                @change=${(e: Event) => this._climateValueChanged('show_temperature_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Humidity Entities -->
          <div class="form-row">
            <span class="form-label">Humidity</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'sensor', device_class: 'humidity', multiple: true } }}
                .value=${climateConfig.humidity_entities || []}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('humidity_entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Humidity Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${climateConfig.show_humidity_unit !== false}
                @change=${(e: Event) => this._climateValueChanged('show_humidity_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Air Quality Entities -->
          <div class="form-row">
            <span class="form-label">Air Quality</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'sensor', device_class: ['aqi', 'pm25', 'pm10', 'co2', 'volatile_organic_compounds'], multiple: true } }}
                .value=${climateConfig.air_quality_entities || []}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('air_quality_entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Air Quality Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${climateConfig.show_air_quality_unit !== false}
                @change=${(e: Event) => this._climateValueChanged('show_air_quality_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Illuminance Entities -->
          <div class="form-row">
            <span class="form-label">Illuminance</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'sensor', device_class: 'illuminance', multiple: true } }}
                .value=${climateConfig.illuminance_entities || []}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('illuminance_entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Show Illuminance Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${climateConfig.show_illuminance_unit !== false}
                @change=${(e: Event) => this._climateValueChanged('show_illuminance_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Decimal Places -->
          <div class="form-row">
            <span class="form-label">Decimal Places</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0, max: 3, mode: 'box' } }}
                .value=${climateConfig.decimal_places ?? 0}
                @value-changed=${(e: CustomEvent) => this._climateValueChanged('decimal_places', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render power entities section
   */
  private _renderPowerSection(): TemplateResult {
    const expanded = this._accordionState.power;
    const powerConfig = this._config?.power_entities || {};

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('power')}
        >
          <span>Power Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <!-- Power Entities -->
          <div class="form-row">
            <span class="form-label">Power Sensors</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${this._getPowerEntitySelector()}
                .value=${powerConfig.entities || []}
                @value-changed=${(e: CustomEvent) => this._powerValueChanged('entities', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Decimal Places -->
          <div class="form-row">
            <span class="form-label">Decimal Places</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0, max: 3, mode: 'box' } }}
                .value=${powerConfig.decimal_places ?? 0}
                @value-changed=${(e: CustomEvent) => this._powerValueChanged('decimal_places', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Show Unit -->
          <div class="form-row">
            <span class="form-label">Show Unit</span>
            <div class="form-input">
              <ha-switch
                .checked=${powerConfig.show_unit !== false}
                @change=${(e: Event) => this._powerValueChanged('show_unit', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render battery entities section
   */
  private _renderBatterySection(): TemplateResult {
    const expanded = this._accordionState.battery;
    const batteryConfig = this._config?.battery_entities || {};
    const entities = batteryConfig.entities || [];
    const showAsBadge = batteryConfig.show_as_badge || false;

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('battery')}
        >
          <span>Battery Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <p class="section-description">Shows icons for entities with low battery (only when below threshold)</p>
          <!-- Low Threshold -->
          <div class="form-row">
            <span class="form-label">Low Battery Threshold (%)</span>
            <div class="form-input">
              <ha-textfield
                type="number"
                min="0"
                max="100"
                .value=${String(batteryConfig.low_threshold ?? 20)}
                @input=${(e: Event) => this._batteryValueChanged('low_threshold', parseInt((e.target as HTMLInputElement).value) || 20)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${batteryConfig.icon_size || ''}
                placeholder="21px"
                @input=${(e: Event) => this._batteryValueChanged('icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Show as Badge Toggle (NEW) -->
          <div class="form-row">
            <span class="form-label">Show as Badge</span>
            <div class="form-input">
              <ha-switch
                .checked=${showAsBadge}
                @change=${(e: Event) => this._batteryValueChanged('show_as_badge', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <p class="helper-text">Display as a circular badge on the card corner instead of in the status section</p>
          <!-- Badge Options (only shown when badge mode enabled) (NEW) -->
          ${showAsBadge ? html`
            <div class="form-row">
              <span class="form-label">Badge Position</span>
              <div class="form-input">
                <ha-select
                  .value=${batteryConfig.badge_position || 'top-right'}
                  @selected=${(e: CustomEvent) => this._batteryValueChanged('badge_position', (e.target as HTMLSelectElement).value)}
                  @closed=${(e: Event) => e.stopPropagation()}
                >
                  ${BADGE_POSITION_DROPDOWN_OPTIONS.map(option => html`
                    <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
                  `)}
                </ha-select>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${batteryConfig.badge_size || ''}
                  placeholder="20px"
                  @input=${(e: Event) => this._batteryValueChanged('badge_size', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${batteryConfig.badge_icon_size || ''}
                  placeholder="12px"
                  @input=${(e: Event) => this._batteryValueChanged('badge_icon_size', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Color</span>
              <div class="form-input">
                <ha-textfield
                  .value=${batteryConfig.badge_color || ''}
                  placeholder="var(--error-color)"
                  @input=${(e: Event) => this._batteryValueChanged('badge_color', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : nothing}
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${batteryConfig.tap_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._batteryActionChanged('tap_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${batteryConfig.hold_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._batteryActionChanged('hold_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${entities.map((entityId, index) => {
            const entityExists = entityId && this.hass?.states[entityId];
            return html`
              <div class="entity-list-item">
                ${!entityExists && entityId ? html`
                  <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
                ` : nothing}
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ entity: { domain: 'sensor' } }}
                  .value=${entityId}
                  @value-changed=${(e: CustomEvent) => this._updateBatteryEntity(index, e.detail.value)}
                ></ha-selector>
                <ha-icon icon="mdi:delete" @click=${() => this._removeBatteryEntity(index)}></ha-icon>
              </div>
            `;
          })}
          <div class="add-entity-btn" @click=${this._addBatteryEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render update entities section
   */
  private _renderUpdateSection(): TemplateResult {
    const expanded = this._accordionState.update;
    const updateConfig = this._config?.update_entities || {};
    const entities = updateConfig.entities || [];
    const showAsBadge = updateConfig.show_as_badge || false;

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('update')}
        >
          <span>Update Entities</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <p class="section-description">Shows a single icon when any entities have available updates</p>
          <!-- Icon -->
          <div class="form-row">
            <span class="form-label">Icon</span>
            <div class="form-input">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ icon: {} }}
                .value=${updateConfig.icon || ''}
                placeholder="mdi:update"
                @value-changed=${(e: CustomEvent) => this._updateValueChanged('icon', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
          <!-- Icon Size -->
          <div class="form-row">
            <span class="form-label">Icon Size</span>
            <div class="form-input">
              <ha-textfield
                .value=${updateConfig.icon_size || ''}
                placeholder="21px"
                @input=${(e: Event) => this._updateValueChanged('icon_size', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Color -->
          <div class="form-row">
            <span class="form-label">Color</span>
            <div class="form-input">
              <ha-select
                .value=${updateConfig.color || ''}
                @selected=${(e: CustomEvent) => this._updateValueChanged('color', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                ${this._renderColorOptions()}
              </ha-select>
            </div>
          </div>
          <!-- Spin Animation -->
          <div class="form-row">
            <span class="form-label">Spin Animation</span>
            <div class="form-input">
              <ha-switch
                .checked=${updateConfig.spin_animation === true}
                @change=${(e: Event) => this._updateValueChanged('spin_animation', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Spin Interval (only show if spin animation enabled) -->
          ${updateConfig.spin_animation === true ? html`
            <div class="form-row">
              <span class="form-label">Spin Interval (seconds)</span>
              <div class="form-input">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ number: { min: 10, max: 300, step: 5, mode: 'box' } }}
                  .value=${updateConfig.spin_interval ?? 60}
                  @value-changed=${(e: CustomEvent) => this._updateValueChanged('spin_interval', e.detail.value)}
                ></ha-selector>
              </div>
            </div>
          ` : nothing}
          <!-- Show as Badge Toggle (NEW) -->
          <div class="form-row">
            <span class="form-label">Show as Badge</span>
            <div class="form-input">
              <ha-switch
                .checked=${showAsBadge}
                @change=${(e: Event) => this._updateValueChanged('show_as_badge', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <p class="helper-text">Display as a circular badge on the card corner instead of in the status section</p>
          <!-- Badge Options (only shown when badge mode enabled) (NEW) -->
          ${showAsBadge ? html`
            <div class="form-row">
              <span class="form-label">Badge Position</span>
              <div class="form-input">
                <ha-select
                  .value=${updateConfig.badge_position || 'top-right'}
                  @selected=${(e: CustomEvent) => this._updateValueChanged('badge_position', (e.target as HTMLSelectElement).value)}
                  @closed=${(e: Event) => e.stopPropagation()}
                >
                  ${BADGE_POSITION_DROPDOWN_OPTIONS.map(option => html`
                    <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>
                  `)}
                </ha-select>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${updateConfig.badge_size || ''}
                  placeholder="20px"
                  @input=${(e: Event) => this._updateValueChanged('badge_size', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Icon Size</span>
              <div class="form-input">
                <ha-textfield
                  .value=${updateConfig.badge_icon_size || ''}
                  placeholder="12px"
                  @input=${(e: Event) => this._updateValueChanged('badge_icon_size', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
            <div class="form-row">
              <span class="form-label">Badge Color</span>
              <div class="form-input">
                <ha-textfield
                  .value=${updateConfig.badge_color || ''}
                  placeholder="var(--info-color)"
                  @input=${(e: Event) => this._updateValueChanged('badge_color', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
              </div>
            </div>
          ` : nothing}
          <!-- Tap Action -->
          <div class="form-row">
            <span class="form-label">Tap Action</span>
            <div class="form-input">
              <ha-select
                .value=${updateConfig.tap_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updateActionChanged('tap_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Hold Action -->
          <div class="form-row">
            <span class="form-label">Hold Action</span>
            <div class="form-input">
              <ha-select
                .value=${updateConfig.hold_action?.action || 'more-info'}
                @selected=${(e: CustomEvent) => this._updateActionChanged('hold_action', (e.target as HTMLSelectElement).value)}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                <mwc-list-item value="more-info">More Info</mwc-list-item>
                <mwc-list-item value="navigate">Navigate</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
          <!-- Entities -->
          <div class="form-row">
            <span class="form-label">Entities</span>
          </div>
          ${entities.map((entityId, index) => {
            const entityExists = entityId && this.hass?.states[entityId];
            return html`
              <div class="entity-list-item">
                ${!entityExists && entityId ? html`
                  <ha-icon icon="mdi:alert-circle" class="entity-warning" title="Entity not found or unavailable"></ha-icon>
                ` : nothing}
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ entity: { domain: 'update' } }}
                  .value=${entityId}
                  @value-changed=${(e: CustomEvent) => this._updateUpdateEntity(index, e.detail.value)}
                ></ha-selector>
                <ha-icon icon="mdi:delete" @click=${() => this._removeUpdateEntity(index)}></ha-icon>
              </div>
            `;
          })}
          <div class="add-entity-btn" @click=${this._addUpdateEntity}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Entity</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render grid layout section - Placeholder
   */
  private _renderGridSection(): TemplateResult {
    const expanded = this._accordionState.grid;

    return html`
      <div class="accordion">
        <div
          class="accordion-header ${expanded ? 'expanded' : ''}"
          @click=${() => this._toggleAccordion('grid')}
        >
          <span>Grid Layout</span>
          <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        <div class="accordion-content ${expanded ? 'expanded' : ''}">
          <div class="form-row">
            <span class="form-label">Grid Template Areas</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_areas || ''}
                placeholder='"name name icon icon" "climate climate persistent intermittent"'
                @input=${(e: Event) => this._gridValueChanged('template_areas', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Template Columns</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_columns || ''}
                placeholder="1fr 1fr 1fr 1fr"
                @input=${(e: Event) => this._gridValueChanged('template_columns', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Template Rows</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid?.template_rows || ''}
                placeholder="auto auto"
                @input=${(e: Event) => this._gridValueChanged('template_rows', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <div class="form-row">
            <span class="form-label">Grid Area</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.grid_area || ''}
                placeholder="Optional grid area name"
                @input=${(e: Event) => this._valueChanged('grid_area', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // ENTITY FILTER HELPERS
  // ===========================================================================

  /**
   * Get the device_class of the first primary entity for filtering
   * Returns undefined if no entities selected or device_class not found
   */
  private _getPrimaryEntityDeviceClass(): string | undefined {
    const primaryEntities = this._config?.climate_entities?.primary_entities;
    if (!primaryEntities || primaryEntities.length === 0 || !this.hass) {
      return undefined;
    }

    const firstEntity = this.hass.states[primaryEntities[0]];
    if (!firstEntity) return undefined;

    return firstEntity.attributes.device_class as string | undefined;
  }

  /**
   * Build the entity selector config for primary entities
   * Filters by device_class if entities are already selected
   */
  private _getPrimaryEntitySelector(): Record<string, unknown> {
    const deviceClass = this._getPrimaryEntityDeviceClass();

    if (deviceClass) {
      // Filter to same device_class as first entity
      return {
        entity: {
          domain: 'sensor',
          device_class: deviceClass,
          multiple: true
        }
      };
    }

    // No entities selected - allow any sensor
    return {
      entity: {
        domain: ['sensor', 'climate', 'weather'],
        multiple: true
      }
    };
  }

  /**
   * Get the unit_of_measurement of the first power entity for filtering
   * Returns undefined if no entities selected
   */
  private _getPowerEntityUnit(): string | undefined {
    const powerEntities = this._config?.power_entities?.entities;
    if (!powerEntities || powerEntities.length === 0 || !this.hass) {
      return undefined;
    }

    const firstEntity = this.hass.states[powerEntities[0]];
    if (!firstEntity) return undefined;

    const unit = firstEntity.attributes.unit_of_measurement;
    return typeof unit === 'string' ? unit : undefined;
  }

  /**
   * Build the entity selector config for power entities
   * Before selection: Shows entities with power-related device classes
   * After selection: Filters to same unit_of_measurement as first entity
   */
  private _getPowerEntitySelector(): Record<string, unknown> {
    const unit = this._getPowerEntityUnit();

    if (unit) {
      // Filter to same unit as first entity
      // We use a filter function approach via device_class matching
      // Since ha-selector doesn't support unit filtering directly,
      // we'll use device_class as a proxy
      const deviceClassMap: Record<string, string[]> = {
        'W': ['power'],
        'kW': ['power'],
        'MW': ['power'],
        'Wh': ['energy'],
        'kWh': ['energy'],
        'MWh': ['energy'],
        'A': ['current'],
        'mA': ['current'],
        'V': ['voltage'],
        'mV': ['voltage'],
      };

      const deviceClasses = deviceClassMap[unit] || ['power', 'energy', 'voltage', 'current'];

      return {
        entity: {
          domain: 'sensor',
          device_class: deviceClasses,
          multiple: true
        }
      };
    }

    // No entities selected - allow any power-related sensors
    return {
      entity: {
        domain: 'sensor',
        device_class: ['power', 'energy', 'voltage', 'current'],
        multiple: true
      }
    };
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================

  /**
   * Toggle accordion section
   */
  private _toggleAccordion(section: keyof EditorAccordionState): void {
    this._accordionState = {
      ...this._accordionState,
      [section]: !this._accordionState[section],
    };
  }

  /**
   * Handle value changes and dispatch config update
   */
  private _valueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    // Guard against unnecessary updates when value hasn't changed
    const currentValue = (this._config as unknown as Record<string, unknown>)[key];
    if (currentValue === value) {
      return;
    }

    // Also guard against empty string vs undefined
    if ((currentValue === undefined || currentValue === null) && (value === '' || value === undefined || value === null)) {
      return;
    }

    const newConfig = {
      ...this._config,
      [key]: value,
    };

    // Remove empty values
    if (value === '' || value === undefined || value === null) {
      delete (newConfig as unknown as Record<string, unknown>)[key];
    }

    this._config = newConfig;
    this._dispatchConfigChanged();
  }

  /**
   * Handle grid value changes
   */
  private _gridValueChanged(key: string, value: string): void {
    if (!this._config) return;

    const grid = { ...this._config.grid };

    if (value) {
      (grid as Record<string, string>)[key] = value;
    } else {
      delete (grid as Record<string, unknown>)[key];
    }

    this._config = {
      ...this._config,
      grid: Object.keys(grid).length > 0 ? grid : undefined,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Handle tap action type changes
   */
  private _tapActionChanged(actionKey: 'tap_action' | 'hold_action' | 'double_tap_action', action: string): void {
    if (!this._config) return;

    // Get existing action config
    const existingAction = this._config[actionKey];

    // Guard against ha-select firing on initial render with same value
    if (existingAction?.action === action) {
      return;
    }

    // Preserve existing properties when changing action type
    const newConfig = {
      ...this._config,
      [actionKey]: {
        ...existingAction,
        action,
      },
    };

    this._config = newConfig;
    this._dispatchConfigChanged();
  }

  /**
   * Handle tap action data changes (navigation_path, url_path, etc.)
   */
  private _tapActionDataChanged(
    actionKey: 'tap_action' | 'hold_action' | 'double_tap_action',
    dataKey: string,
    value: string
  ): void {
    if (!this._config) return;

    const currentAction = this._config[actionKey] || { action: 'none' };

    const newConfig = {
      ...this._config,
      [actionKey]: {
        ...currentAction,
        [dataKey]: value || undefined,
      },
    };

    // Clean up empty values
    if (!value) {
      delete (newConfig[actionKey] as unknown as Record<string, unknown>)[dataKey];
    }

    this._config = newConfig;
    this._dispatchConfigChanged();
  }

  /**
   * Handle climate entity value changes
   */
  private _climateValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const climateEntities = { ...this._config.climate_entities };

    // Handle arrays vs single values
    if (Array.isArray(value) && value.length === 0) {
      delete (climateEntities as Record<string, unknown>)[key];
    } else if (value === '' || value === undefined || value === null) {
      delete (climateEntities as Record<string, unknown>)[key];
    } else {
      (climateEntities as Record<string, unknown>)[key] = value;
    }

    this._config = {
      ...this._config,
      climate_entities: Object.keys(climateEntities).length > 0 ? climateEntities : undefined,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Handle power entity value changes
   */
  private _powerValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const powerEntities = { ...this._config.power_entities } ;

    // Handle arrays vs single values
    if (Array.isArray(value) && value.length === 0) {
      delete (powerEntities as Record<string, unknown>)[key];
    } else if (value === '' || value === undefined || value === null) {
      delete (powerEntities as Record<string, unknown>)[key];
    } else {
      (powerEntities as Record<string, unknown>)[key] = value;
    }

    this._config = {
      ...this._config,
      power_entities: Object.keys(powerEntities).length > 0 ? powerEntities : undefined,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Handle persistent entities config changes
   */
  private _persistentValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities } ;

    if (value === '' || value === undefined || value === null) {
      delete (persistentEntities as unknown as Record<string, unknown>)[key];
    } else {
      (persistentEntities as unknown as Record<string, unknown>)[key] = value;
    }

    this._config = {
      ...this._config,
      persistent_entities: Object.keys(persistentEntities).length > 0 ? persistentEntities : undefined,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Toggle persistent entity expand state
   */
  private _togglePersistentEntityExpand(index: number): void {
    this._persistentEntityExpanded = this._persistentEntityExpanded === index ? -1 : index;
  }

  /**
   * Add new persistent entity
   */
  private _addPersistentEntity(): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    entities.push({ entity: '' });
    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._persistentEntityExpanded = entities.length - 1;
    this._dispatchConfigChanged();
  }

  /**
   * Remove persistent entity
   */
  private _removePersistentEntity(index: number): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    entities.splice(index, 1);
    persistentEntities.entities = entities.length > 0 ? entities : undefined;

    this._config = {
      ...this._config,
      persistent_entities: Object.keys(persistentEntities).filter(k => persistentEntities[k as keyof typeof persistentEntities] !== undefined).length > 0 ? persistentEntities : undefined,
    };

    if (this._persistentEntityExpanded === index) {
      this._persistentEntityExpanded = -1;
    }
    this._dispatchConfigChanged();
  }

  /**
   * Update persistent entity property
   */
  private _updatePersistentEntity(index: number, key: string, value: unknown): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[index]) {
      (entities[index] as unknown as Record<string, unknown>)[key] = value || undefined;
      if (!value) {
        delete (entities[index] as unknown as Record<string, unknown>)[key];
      }
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Add state config to persistent entity
   */
  private _addPersistentEntityState(entityIndex: number): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      entity.states = [...(entity.states || []), { state: '', icon: '', color: '' }];
      entities[entityIndex] = entity;
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Remove state config from persistent entity
   */
  private _removePersistentEntityState(entityIndex: number, stateIndex: number): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      const states = [...(entity.states || [])];
      states.splice(stateIndex, 1);
      entity.states = states.length > 0 ? states : undefined;
      entities[entityIndex] = entity;
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update state config in persistent entity
   */
  private _updatePersistentEntityState(entityIndex: number, stateIndex: number, key: string, value: unknown): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      const states = [...(entity.states || [])];

      if (states[stateIndex]) {
        (states[stateIndex] as unknown as Record<string, unknown>)[key] = value || undefined;
        if (!value) {
          delete (states[stateIndex] as unknown as Record<string, unknown>)[key];
        }
      }

      entity.states = states;
      entities[entityIndex] = entity;
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Render color dropdown options grouped by category
   */
  private _renderColorOptions(): TemplateResult[] {
    const options: TemplateResult[] = [];
    let currentCategory = '';

    for (const opt of HA_COLOR_OPTIONS) {
      // Add category header (optgroup-like behavior)
      if (opt.category !== currentCategory) {
        currentCategory = opt.category;
        // Use a disabled item as a category header
        if (currentCategory !== 'Default') {
          options.push(html`
            <mwc-list-item disabled noninteractive style="font-weight: 500; opacity: 0.7; font-size: 12px; text-transform: uppercase;">
              ${currentCategory}
            </mwc-list-item>
          `);
        }
      }

      options.push(html`
        <mwc-list-item value=${opt.value}>${opt.label}</mwc-list-item>
      `);
    }

    return options;
  }

  /**
   * Handle color dropdown selection
   */
  private _handleColorSelect(entityIndex: number, stateIndex: number, value: string): void {
    const colorKey = `${entityIndex}-${stateIndex}`;

    if (value === 'custom') {
      // Show custom input
      this._customColorInputs = new Set([...this._customColorInputs, colorKey]);
    } else {
      // Hide custom input and set the value
      this._customColorInputs.delete(colorKey);
      this._customColorInputs = new Set(this._customColorInputs);
      this._updatePersistentEntityState(entityIndex, stateIndex, 'color', value);
    }
  }

  /**
   * Update tap/hold action for persistent entity
   */
  private _updatePersistentEntityAction(index: number, actionKey: 'tap_action' | 'hold_action', actionValue: TapActionType): void {
    if (!this._config) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[index]) {
      const entity = { ...entities[index] };
      const existingAction = entity[actionKey];

      // Guard against unnecessary updates
      if (existingAction?.action === actionValue) {
        return;
      }

      // Preserve existing properties when changing action type
      entity[actionKey] = {
        ...existingAction,
        action: actionValue,
      };
      entities[index] = entity;
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Apply domain defaults to persistent entity
   */
  private _applyDomainDefaults(index: number, domain: string): void {
    if (!this._config) return;

    const defaults = DOMAIN_STATE_DEFAULTS[domain];
    if (!defaults) return;

    const persistentEntities = { ...this._config.persistent_entities };
    const entities = [...(persistentEntities.entities || [])];

    if (entities[index]) {
      const entity = { ...entities[index] };
      // Replace existing states with domain defaults
      entity.states = defaults.map(d => ({
        state: d.state,
        icon: d.icon,
        color: d.color,
      }));
      entities[index] = entity;
    }

    persistentEntities.entities = entities;

    this._config = {
      ...this._config,
      persistent_entities: persistentEntities,
    };

    // Clear any custom color inputs for this entity
    const newCustomInputs = new Set(this._customColorInputs);
    for (const key of this._customColorInputs) {
      if (key.startsWith(`${index}-`)) {
        newCustomInputs.delete(key);
      }
    }
    this._customColorInputs = newCustomInputs;

    this._dispatchConfigChanged();
  }

  // ===========================================================================
  // ICON STATE MAP METHODS
  // ===========================================================================

  /**
   * Render the icon state map section inside the Icon sub-accordion
   */
  private _renderIconStateMapSection(): TemplateResult {
    const stateMap = this._config?.icon_state_map;
    const hasStates = stateMap?.states && Object.keys(stateMap.states).length > 0;

    return html`
      <div class="form-row state-header-row" style="margin-top: 12px;">
        <span class="form-label">Icon State Map</span>
      </div>
      <p class="helper-text" style="margin-top: 0;">Change icon and color based on an entity's state</p>
      <!-- Entity selector (optional - defaults to primary entity) -->
      <div class="form-row">
        <span class="form-label">Watch Entity</span>
        <div class="form-input">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${stateMap?.entity || ''}
            @value-changed=${(e: CustomEvent) => this._updateIconStateMapEntity(e.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
        </div>
      </div>
      <p class="helper-text">Entity whose state drives the icon change (defaults to primary entity if empty)</p>
      ${hasStates ? Object.entries(stateMap!.states).map(([stateValue, entry], idx) => {
        const colorKey = `ism-${idx}`;
        const currentColor = entry.color || '';
        const isCustomColor = this._iconStateMapCustomColors.has(colorKey) ||
          (currentColor && !HA_COLOR_OPTIONS.some(opt => opt.value === currentColor));
        const dropdownValue = isCustomColor ? 'custom' : currentColor;

        return html`
          <div class="state-config-row">
            <ha-textfield
              .value=${stateValue}
              placeholder="State (e.g., on)"
              @input=${(e: Event) => this._updateIconStateMapState(stateValue, 'state', (e.target as HTMLInputElement).value)}
              style="flex: 1;"
            ></ha-textfield>
            <ha-selector
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${entry.icon || ''}
              @value-changed=${(e: CustomEvent) => this._updateIconStateMapState(stateValue, 'icon', e.detail.value)}
              style="flex: 1;"
            ></ha-selector>
            <div class="color-select-wrapper" style="flex: 1.5; display: flex; flex-direction: column; gap: 4px;">
              <div class="color-select-with-preview">
                <ha-select
                  .value=${dropdownValue}
                  @selected=${(e: CustomEvent) => this._handleIconStateMapColorSelect(stateValue, idx, (e.target as HTMLSelectElement).value)}
                  @closed=${(e: Event) => e.stopPropagation()}
                  style="flex: 1;"
                >
                  ${this._renderColorOptions()}
                </ha-select>
                <div class="color-preview" style=${this._getColorPreviewStyle(currentColor)}></div>
              </div>
              ${isCustomColor ? html`
                <ha-textfield
                  .value=${currentColor}
                  placeholder="CSS color value"
                  @input=${(e: Event) => this._updateIconStateMapState(stateValue, 'color', (e.target as HTMLInputElement).value)}
                  style="width: 100%;"
                ></ha-textfield>
              ` : nothing}
            </div>
            <ha-icon icon="mdi:delete" @click=${() => this._removeIconStateMapState(stateValue)}></ha-icon>
          </div>
        `;
      }) : nothing}
      <div class="add-state-btn" @click=${() => this._addIconStateMapState()}>
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>Add State Mapping</span>
      </div>
    `;
  }

  /**
   * Update icon_state_map.entity
   */
  private _updateIconStateMapEntity(value: string): void {
    if (!this._config) return;

    const stateMap = { ...(this._config.icon_state_map || { states: {} }) };

    if (value) {
      stateMap.entity = value;
    } else {
      delete stateMap.entity;
    }

    // Clean up: remove icon_state_map entirely if empty
    if (!stateMap.entity && (!stateMap.states || Object.keys(stateMap.states).length === 0)) {
      const { icon_state_map: _, ...rest } = this._config;
      this._config = { ...rest } as UnifiedRoomCardConfig;
    } else {
      this._config = { ...this._config, icon_state_map: stateMap };
    }

    this._dispatchConfigChanged();
  }

  /**
   * Add a new empty state entry to icon_state_map
   */
  private _addIconStateMapState(): void {
    if (!this._config) return;

    const stateMap = { ...(this._config.icon_state_map || { states: {} }) };
    const states = { ...stateMap.states };

    // Find a unique placeholder key
    let key = '';
    let counter = 1;
    do {
      key = `state_${counter}`;
      counter++;
    } while (key in states);

    states[key] = {};
    stateMap.states = states;

    this._config = { ...this._config, icon_state_map: stateMap };
    this._dispatchConfigChanged();
  }

  /**
   * Remove a state entry from icon_state_map
   */
  private _removeIconStateMapState(stateValue: string): void {
    if (!this._config?.icon_state_map?.states) return;

    const stateMap = { ...this._config.icon_state_map };
    const states = { ...stateMap.states };
    delete states[stateValue];
    stateMap.states = states;

    // Clean up: remove icon_state_map entirely if no states and no entity
    if (Object.keys(states).length === 0 && !stateMap.entity) {
      const { icon_state_map: _, ...rest } = this._config;
      this._config = { ...rest } as UnifiedRoomCardConfig;
    } else {
      this._config = { ...this._config, icon_state_map: stateMap };
    }

    this._dispatchConfigChanged();
  }

  /**
   * Update a specific field of an icon_state_map state entry
   * When field is 'state', the key itself is renamed
   */
  private _updateIconStateMapState(oldStateValue: string, field: string, value: string): void {
    if (!this._config?.icon_state_map?.states) return;

    const stateMap = { ...this._config.icon_state_map };
    const states = { ...stateMap.states };

    if (field === 'state') {
      // Rename key: copy entry to new key, delete old
      const entry = states[oldStateValue] || {};
      delete states[oldStateValue];
      if (value) {
        states[value] = { ...entry };
      }
    } else {
      // Update icon or color on the existing entry
      const entry = { ...(states[oldStateValue] || {}) };
      if (value) {
        (entry as Record<string, string>)[field] = value;
      } else {
        delete (entry as Record<string, string>)[field];
      }
      states[oldStateValue] = entry;
    }

    stateMap.states = states;
    this._config = { ...this._config, icon_state_map: stateMap };
    this._dispatchConfigChanged();
  }

  /**
   * Handle color dropdown selection for icon_state_map
   */
  private _handleIconStateMapColorSelect(stateValue: string, idx: number, value: string): void {
    const colorKey = `ism-${idx}`;

    if (value === 'custom') {
      this._iconStateMapCustomColors = new Set([...this._iconStateMapCustomColors, colorKey]);
    } else {
      this._iconStateMapCustomColors.delete(colorKey);
      this._iconStateMapCustomColors = new Set(this._iconStateMapCustomColors);
      this._updateIconStateMapState(stateValue, 'color', value);
    }
  }

  // ===========================================================================
  // INTERMITTENT ENTITY METHODS
  // ===========================================================================

  /**
   * Toggle intermittent entity expand state
   */
  private _toggleIntermittentEntityExpand(index: number): void {
    this._intermittentEntityExpanded = this._intermittentEntityExpanded === index ? -1 : index;
  }

  /**
   * Add new intermittent entity
   */
  private _addIntermittentEntity(): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    entities.push({ entity: '' });
    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._intermittentEntityExpanded = entities.length - 1;
    this._dispatchConfigChanged();
  }

  /**
   * Remove intermittent entity
   */
  private _removeIntermittentEntity(index: number): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    entities.splice(index, 1);
    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    if (this._intermittentEntityExpanded === index) {
      this._intermittentEntityExpanded = -1;
    }
    this._dispatchConfigChanged();
  }

  /**
   * Update intermittent section property
   */
  private _intermittentValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };

    if (value) {
      (intermittentEntities as Record<string, unknown>)[key] = value;
    } else {
      delete (intermittentEntities as Record<string, unknown>)[key];
    }

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update intermittent entity property
   */
  private _updateIntermittentEntity(index: number, key: string, value: unknown): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[index]) {
      (entities[index] as unknown as Record<string, unknown>)[key] = value || undefined;
      if (!value) {
        delete (entities[index] as unknown as Record<string, unknown>)[key];
      }
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update intermittent entity active_states from comma-separated string
   */
  private _updateIntermittentEntityActiveStates(index: number, value: string): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[index]) {
      const entity = { ...entities[index] };
      if (value.trim()) {
        entity.active_states = value.split(',').map(s => s.trim()).filter(s => s);
      } else {
        delete entity.active_states;
      }
      entities[index] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update tap/hold action for intermittent entity
   */
  private _updateIntermittentEntityAction(index: number, actionKey: 'tap_action' | 'hold_action', actionValue: TapActionType): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[index]) {
      const entity = { ...entities[index] };
      const existingAction = entity[actionKey];

      // Guard against unnecessary updates
      if (existingAction?.action === actionValue) {
        return;
      }

      // Preserve existing properties when changing action type
      entity[actionKey] = {
        ...existingAction,
        action: actionValue,
      };
      entities[index] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Add state config to intermittent entity
   */
  private _addIntermittentEntityState(entityIndex: number): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      entity.states = [...(entity.states || []), { state: '', icon: '', color: '' }];
      entities[entityIndex] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Remove state config from intermittent entity
   */
  private _removeIntermittentEntityState(entityIndex: number, stateIndex: number): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      const states = [...(entity.states || [])];
      states.splice(stateIndex, 1);
      entity.states = states;
      entities[entityIndex] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update state config in intermittent entity
   */
  private _updateIntermittentEntityState(entityIndex: number, stateIndex: number, key: string, value: unknown): void {
    if (!this._config) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[entityIndex]) {
      const entity = { ...entities[entityIndex] };
      const states = [...(entity.states || [])];

      if (states[stateIndex]) {
        (states[stateIndex] as unknown as Record<string, unknown>)[key] = value || undefined;
        if (!value) {
          delete (states[stateIndex] as unknown as Record<string, unknown>)[key];
        }
      }

      entity.states = states;
      entities[entityIndex] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Handle color dropdown selection for intermittent entity
   */
  private _handleIntermittentColorSelect(entityIndex: number, stateIndex: number, value: string): void {
    const colorKey = `i-${entityIndex}-${stateIndex}`;

    if (value === 'custom') {
      // Show custom input
      this._intermittentCustomColorInputs = new Set([...this._intermittentCustomColorInputs, colorKey]);
    } else {
      // Hide custom input and set the value
      this._intermittentCustomColorInputs.delete(colorKey);
      this._intermittentCustomColorInputs = new Set(this._intermittentCustomColorInputs);
      this._updateIntermittentEntityState(entityIndex, stateIndex, 'color', value);
    }
  }

  /**
   * Apply domain defaults to intermittent entity
   */
  private _applyIntermittentDomainDefaults(index: number, domain: string): void {
    if (!this._config) return;

    const defaults = DOMAIN_STATE_DEFAULTS[domain];
    if (!defaults) return;

    const intermittentEntities = { ...this._config.intermittent_entities };
    const entities = [...(intermittentEntities.entities || [])];

    if (entities[index]) {
      const entity = { ...entities[index] };
      // Replace existing states with domain defaults
      entity.states = defaults.map(d => ({
        state: d.state,
        icon: d.icon,
        color: d.color,
      }));
      entities[index] = entity;
    }

    intermittentEntities.entities = entities;

    this._config = {
      ...this._config,
      intermittent_entities: intermittentEntities,
    };

    // Clear any custom color inputs for this entity
    const newCustomInputs = new Set(this._intermittentCustomColorInputs);
    for (const key of this._intermittentCustomColorInputs) {
      if (key.startsWith(`i-${index}-`)) {
        newCustomInputs.delete(key);
      }
    }
    this._intermittentCustomColorInputs = newCustomInputs;

    this._dispatchConfigChanged();
  }

  /**
   * Get human-readable domain name
   */
  private _getDomainDisplayName(domain: string): string {
    const displayNames: Record<string, string> = {
      'lock': 'Lock',
      'binary_sensor': 'Binary Sensor',
      'cover': 'Cover',
      'light': 'Light',
      'switch': 'Switch',
      'fan': 'Fan',
      'climate': 'Climate',
      'input_boolean': 'Input Boolean',
    };
    return displayNames[domain] || domain;
  }

  /**
   * Get color preview style - handles HA CSS variables
   */
  private _getColorPreviewStyle(color: string): string {
    if (!color) {
      return 'background-color: transparent; border: 1px dashed var(--secondary-text-color);';
    }
    return `background-color: ${color};`;
  }

  // ===========================================================================
  // BATTERY ENTITY METHODS
  // ===========================================================================

  /**
   * Update battery config property
   */
  private _batteryValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const batteryEntities = { ...this._config.battery_entities };

    if (value !== undefined && value !== '' && value !== null) {
      (batteryEntities as Record<string, unknown>)[key] = value;
    } else {
      delete (batteryEntities as Record<string, unknown>)[key];
    }

    this._config = {
      ...this._config,
      battery_entities: batteryEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update battery action config
   */
  private _batteryActionChanged(actionKey: string, actionValue: string): void {
    if (!this._config) return;

    const batteryEntities = { ...this._config.battery_entities };
    const existingAction = (batteryEntities as Record<string, unknown>)[actionKey] as { action?: string } | undefined;

    // Guard against unnecessary updates
    if (existingAction?.action === actionValue) {
      return;
    }

    // Preserve existing properties when changing action type
    (batteryEntities as Record<string, unknown>)[actionKey] = {
      ...existingAction,
      action: actionValue,
    };

    this._config = {
      ...this._config,
      battery_entities: batteryEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Add battery entity
   */
  private _addBatteryEntity(): void {
    if (!this._config) return;

    const batteryEntities = { ...this._config.battery_entities };
    const entities = [...(batteryEntities.entities || [])];

    entities.push('');
    batteryEntities.entities = entities;

    this._config = {
      ...this._config,
      battery_entities: batteryEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Remove battery entity
   */
  private _removeBatteryEntity(index: number): void {
    if (!this._config) return;

    const batteryEntities = { ...this._config.battery_entities };
    const entities = [...(batteryEntities.entities || [])];

    entities.splice(index, 1);
    batteryEntities.entities = entities.length > 0 ? entities : undefined;

    this._config = {
      ...this._config,
      battery_entities: batteryEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update battery entity
   */
  private _updateBatteryEntity(index: number, value: string): void {
    if (!this._config) return;

    const batteryEntities = { ...this._config.battery_entities };
    const entities = [...(batteryEntities.entities || [])];

    entities[index] = value;
    batteryEntities.entities = entities;

    this._config = {
      ...this._config,
      battery_entities: batteryEntities,
    };

    this._dispatchConfigChanged();
  }

  // ===========================================================================
  // UPDATE ENTITY METHODS
  // ===========================================================================

  /**
   * Update update config property
   */
  private _updateValueChanged(key: string, value: unknown): void {
    if (!this._config) return;

    const updateEntities = { ...this._config.update_entities };

    if (value !== undefined && value !== '' && value !== null) {
      (updateEntities as Record<string, unknown>)[key] = value;
    } else {
      delete (updateEntities as Record<string, unknown>)[key];
    }

    this._config = {
      ...this._config,
      update_entities: updateEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update update action config
   */
  private _updateActionChanged(actionKey: string, actionValue: string): void {
    if (!this._config) return;

    const updateEntities = { ...this._config.update_entities };
    const existingAction = (updateEntities as Record<string, unknown>)[actionKey] as { action?: string } | undefined;

    // Guard against unnecessary updates
    if (existingAction?.action === actionValue) {
      return;
    }

    // Preserve existing properties when changing action type
    (updateEntities as Record<string, unknown>)[actionKey] = {
      ...existingAction,
      action: actionValue,
    };

    this._config = {
      ...this._config,
      update_entities: updateEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Add update entity
   */
  private _addUpdateEntity(): void {
    if (!this._config) return;

    const updateEntities = { ...this._config.update_entities };
    const entities = [...(updateEntities.entities || [])];

    entities.push('');
    updateEntities.entities = entities;

    this._config = {
      ...this._config,
      update_entities: updateEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Remove update entity
   */
  private _removeUpdateEntity(index: number): void {
    if (!this._config) return;

    const updateEntities = { ...this._config.update_entities };
    const entities = [...(updateEntities.entities || [])];

    entities.splice(index, 1);
    updateEntities.entities = entities.length > 0 ? entities : undefined;

    this._config = {
      ...this._config,
      update_entities: updateEntities,
    };

    this._dispatchConfigChanged();
  }

  /**
   * Update update entity
   */
  private _updateUpdateEntity(index: number, value: string): void {
    if (!this._config) return;

    const updateEntities = { ...this._config.update_entities };
    const entities = [...(updateEntities.entities || [])];

    entities[index] = value;
    updateEntities.entities = entities;

    this._config = {
      ...this._config,
      update_entities: updateEntities,
    };

    this._dispatchConfigChanged();
  }

  // ===========================================================================
  // GLOW EFFECTS METHODS
  // ===========================================================================

  /**
   * Render glow effects list
   */
  private _renderGlowEffects(): TemplateResult {
    const glowEffects = this._config?.glow_effects || [];

    if (glowEffects.length === 0) {
      return html``;
    }

    return html`
      <div class="glow-effects-list">
        ${glowEffects.map((effect, index) => this._renderGlowEffect(effect, index))}
      </div>
    `;
  }

  /**
   * Render a single glow effect configuration
   */
  private _renderGlowEffect(effect: { entity: string; state?: string; states?: string[]; color?: string; spread?: number; animation?: string }, index: number): TemplateResult {
    // Combine state and states for display
    const displayStates = effect.states?.length
      ? effect.states.join(', ')
      : effect.state || '';

    return html`
      <div class="glow-effect-config">
        <div class="glow-effect-header">
          <span class="glow-effect-title">Glow Effect ${index + 1}</span>
          <ha-icon-button
            .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
            @click=${() => this._removeGlowEffect(index)}
            title="Remove glow effect"
          ></ha-icon-button>
        </div>

        <!-- Entity -->
        <div class="form-row">
          <span class="form-label">Entity</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${effect.entity || ''}
              @value-changed=${(e: CustomEvent) => this._updateGlowEffect(index, 'entity', e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <!-- States (comma-separated) -->
        <div class="form-row">
          <span class="form-label">Trigger States</span>
          <div class="form-input">
            <ha-textfield
              .value=${displayStates}
              placeholder="error, jammed, unlocked"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                const states = value.split(',').map(s => s.trim()).filter(s => s);
                this._updateGlowEffect(index, 'states', states);
                // Clear single state when using states array
                if (effect.state) {
                  this._updateGlowEffect(index, 'state', undefined);
                }
              }}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">Comma-separated list of states that trigger this glow</p>

        <!-- Color -->
        <div class="form-row">
          <span class="form-label">Glow Color</span>
          <div class="form-input">
            <ha-textfield
              .value=${effect.color || ''}
              placeholder="auto"
              @input=${(e: Event) => this._updateGlowEffect(index, 'color', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
          </div>
        </div>
        <p class="helper-text">Use "auto" for entity color, or CSS color/variable (e.g., #ff0000, var(--error-color))</p>

        <!-- Spread -->
        <div class="form-row">
          <span class="form-label">Spread (px)</span>
          <div class="form-input">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ number: { min: 1, max: 30, step: 1, mode: 'box' } }}
              .value=${effect.spread ?? 4}
              @value-changed=${(e: CustomEvent) => this._updateGlowEffect(index, 'spread', e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <!-- Animation -->
        <div class="form-row">
          <span class="form-label">Animation</span>
          <div class="form-input">
            <ha-select
              .value=${effect.animation || 'none'}
              @selected=${(e: Event) => this._updateGlowEffect(index, 'animation', (e.target as HTMLSelectElement).value)}
              @closed=${(e: Event) => e.stopPropagation()}
            >
              <mwc-list-item value="none">None (Static)</mwc-list-item>
              <mwc-list-item value="pulse">Pulse</mwc-list-item>
              <mwc-list-item value="breathe">Breathe</mwc-list-item>
            </ha-select>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Add a new glow effect
   */
  private _addGlowEffect(): void {
    if (!this._config) return;

    const glowEffects = [...(this._config.glow_effects || [])];
    glowEffects.push({
      entity: '',
      states: [],
      color: 'auto',
      spread: 4,
      animation: 'none',
    });

    this._config = {
      ...this._config,
      glow_effects: glowEffects,
    };
    this._dispatchConfigChanged();
  }

  /**
   * Update a glow effect property
   */
  private _updateGlowEffect(index: number, key: string, value: unknown): void {
    if (!this._config?.glow_effects) return;

    const glowEffects = [...this._config.glow_effects];
    glowEffects[index] = {
      ...glowEffects[index],
      [key]: value,
    };

    this._config = {
      ...this._config,
      glow_effects: glowEffects,
    };
    this._dispatchConfigChanged();
  }

  /**
   * Remove a glow effect
   */
  private _removeGlowEffect(index: number): void {
    if (!this._config?.glow_effects) return;

    const glowEffects = [...this._config.glow_effects];
    glowEffects.splice(index, 1);

    this._config = {
      ...this._config,
      glow_effects: glowEffects.length > 0 ? glowEffects : undefined,
    };
    this._dispatchConfigChanged();
  }

  /**
   * Dispatch config changed event to Home Assistant
   */
  private _dispatchConfigChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// =============================================================================
// WINDOW REGISTRATION
// =============================================================================

declare global {
  interface HTMLElementTagNameMap {
    [CARD_EDITOR_TAG]: UnifiedRoomCardEditor;
  }
}
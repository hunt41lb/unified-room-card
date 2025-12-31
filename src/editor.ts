/**
 * Unified Room Card - Visual Editor
 * 
 * GUI editor for configuring the card through Home Assistant's
 * card configuration dialog.
 * 
 * Full implementation in Phase 6.
 */

import { LitElement, html, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Internal imports
import {
  CARD_EDITOR_TAG,
  CARD_NAME,
  ANIMATION_OPTIONS,
  TAP_ACTION_OPTIONS,
  POSITION_DROPDOWN_OPTIONS,
} from './constants';

import {
  HomeAssistant,
  UnifiedRoomCardConfig,
  EditorAccordionState,
} from './types';

import { editorStyles } from './styles';

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
    persistent: false,
    intermittent: false,
    climate: false,
    power: false,
    battery: false,
    update: false,
    grid: false,
  };

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
   * Render main card configuration section
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
          <!-- Card Name -->
          <div class="form-row">
            <span class="form-label">Card Name</span>
            <div class="form-input">
              <ha-textfield
                .value=${this._config?.name || ''}
                @input=${(e: Event) => this._valueChanged('name', (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            </div>
          </div>
          <!-- Entity -->
          <div class="form-row">
            <span class="form-label">Entity</span>
            <div class="form-input">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this._config?.entity || ''}
                .configValue=${'entity'}
                @value-changed=${(e: CustomEvent) => this._valueChanged('entity', e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
            </div>
          </div>
          <!-- Icon -->
          <div class="form-row">
            <span class="form-label">Icon</span>
            <div class="form-input">
              <ha-icon-picker
                .hass=${this.hass}
                .value=${this._config?.icon || ''}
                @value-changed=${(e: CustomEvent) => this._valueChanged('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>
          </div>
          <!-- Show Name / Show Icon (dual row) -->
          <div class="form-row-dual">
            <div class="form-item">
              <span class="form-label">Show Name</span>
              <div class="form-input">
                <ha-switch
                  .checked=${this._config?.show_name !== false}
                  @change=${(e: Event) => this._valueChanged('show_name', (e.target as HTMLInputElement).checked)}
                ></ha-switch>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Show Icon</span>
              <div class="form-input">
                <ha-switch
                  .checked=${this._config?.show_icon !== false}
                  @change=${(e: Event) => this._valueChanged('show_icon', (e.target as HTMLInputElement).checked)}
                ></ha-switch>
              </div>
            </div>
          </div>
          <!-- Show State Text / Show Icon Background (dual row) -->
          <div class="form-row-dual">
            <div class="form-item">
              <span class="form-label">Show State</span>
              <div class="form-input">
                <ha-switch
                  .checked=${this._config?.show_state || false}
                  @change=${(e: Event) => this._valueChanged('show_state', (e.target as HTMLInputElement).checked)}
                ></ha-switch>
              </div>
            </div>
            <div class="form-item">
              <span class="form-label">Icon Background</span>
              <div class="form-input">
                <ha-switch
                  .checked=${this._config?.show_img_cell !== false}
                  @change=${(e: Event) => this._valueChanged('show_img_cell', (e.target as HTMLInputElement).checked)}
                ></ha-switch>
              </div>
            </div>
          </div>
          <!-- Animate Icon (single row) -->
          <div class="form-row">
            <span class="form-label">Animate Icon</span>
            <div class="form-input">
              <ha-switch
                .checked=${this._config?.animate_icon || false}
                @change=${(e: Event) => this._valueChanged('animate_icon', (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </div>
          </div>
          <!-- Card Height / Card Width (dual row) -->
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
          <p>Persistent entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `;
  }

  /**
   * Render intermittent entities section - Placeholder
   */
  private _renderIntermittentSection(): TemplateResult {
    const expanded = this._accordionState.intermittent;

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
          <p>Intermittent entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `;
  }

  /**
   * Render climate entities section - Placeholder
   */
  private _renderClimateSection(): TemplateResult {
    const expanded = this._accordionState.climate;

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
          <p>Climate entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `;
  }

  /**
   * Render power entities section - Placeholder
   */
  private _renderPowerSection(): TemplateResult {
    const expanded = this._accordionState.power;

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
          <p>Power entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `;
  }

  /**
   * Render battery entities section - Placeholder
   */
  private _renderBatterySection(): TemplateResult {
    const expanded = this._accordionState.battery;

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
          <p>Battery entities configuration - Coming in Phase 6</p>
        </div>
      </div>
    `;
  }

  /**
   * Render update entities section - Placeholder
   */
  private _renderUpdateSection(): TemplateResult {
    const expanded = this._accordionState.update;

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
          <p>Update entities configuration - Coming in Phase 6</p>
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

    const newConfig = {
      ...this._config,
      [key]: value,
    };

    // Remove empty values
    if (value === '' || value === undefined || value === null) {
      delete (newConfig as Record<string, unknown>)[key];
    }

    this._config = newConfig;
    this._dispatchConfigChanged();
  }

  /**
   * Handle grid value changes
   */
  private _gridValueChanged(key: string, value: string): void {
    if (!this._config) return;

    const grid = { ...this._config.grid } || {};
    
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

    const newConfig = {
      ...this._config,
      [actionKey]: { action },
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
      delete (newConfig[actionKey] as Record<string, unknown>)[dataKey];
    }

    this._config = newConfig;
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

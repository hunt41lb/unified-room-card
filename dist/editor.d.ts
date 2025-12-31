/**
 * Unified Room Card - Visual Editor
 *
 * GUI editor for configuring the card through Home Assistant's
 * card configuration dialog.
 *
 * Full implementation in Phase 6.
 */
import { LitElement, TemplateResult, nothing } from 'lit';
import { CARD_EDITOR_TAG } from './constants';
import { HomeAssistant, UnifiedRoomCardConfig } from './types';
export declare class UnifiedRoomCardEditor extends LitElement {
    hass?: HomeAssistant;
    private _config?;
    private _accordionState;
    static styles: import("lit").CSSResult;
    /**
     * Set editor configuration
     */
    setConfig(config: UnifiedRoomCardConfig): void;
    protected render(): TemplateResult | typeof nothing;
    /**
     * Render main card configuration section
     */
    private _renderMainSection;
    /**
     * Render persistent entities section - Placeholder
     */
    private _renderPersistentSection;
    /**
     * Render intermittent entities section - Placeholder
     */
    private _renderIntermittentSection;
    /**
     * Render climate entities section - Placeholder
     */
    private _renderClimateSection;
    /**
     * Render power entities section - Placeholder
     */
    private _renderPowerSection;
    /**
     * Render battery entities section - Placeholder
     */
    private _renderBatterySection;
    /**
     * Render update entities section - Placeholder
     */
    private _renderUpdateSection;
    /**
     * Render grid layout section - Placeholder
     */
    private _renderGridSection;
    /**
     * Toggle accordion section
     */
    private _toggleAccordion;
    /**
     * Handle value changes and dispatch config update
     */
    private _valueChanged;
    /**
     * Handle grid value changes
     */
    private _gridValueChanged;
    /**
     * Dispatch config changed event to Home Assistant
     */
    private _dispatchConfigChanged;
}
declare global {
    interface HTMLElementTagNameMap {
        [CARD_EDITOR_TAG]: UnifiedRoomCardEditor;
    }
}
//# sourceMappingURL=editor.d.ts.map

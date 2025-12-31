/**
 * Unified Room Card
 *
 * A comprehensive room status card for Home Assistant with support for
 * climate, persistent, and intermittent entities.
 *
 * @version 1.0.0
 */
import { LitElement, PropertyValues, TemplateResult, nothing } from 'lit';
import { CARD_TAG } from './constants';
import { HomeAssistant, UnifiedRoomCardConfig } from './types';
import './editor';
export declare class UnifiedRoomCard extends LitElement {
    hass?: HomeAssistant;
    private _config?;
    static styles: import("lit").CSSResult;
    /**
     * Set card configuration from YAML
     */
    setConfig(config: UnifiedRoomCardConfig): void;
    /**
     * Get card size for layout calculations
     */
    getCardSize(): number;
    /**
     * Return static configuration element for editor
     */
    static getConfigElement(): HTMLElement;
    /**
     * Return stub configuration for card picker
     */
    static getStubConfig(): Partial<UnifiedRoomCardConfig>;
    protected shouldUpdate(changedProps: PropertyValues): boolean;
    /**
     * Check if any entity relevant to this card has changed state
     */
    private _hasRelevantStateChanged;
    protected render(): TemplateResult | typeof nothing;
    /**
     * Render card name section
     */
    private _renderName;
    /**
     * Render main icon section
     */
    private _renderIcon;
    /**
     * Render climate section (temperature, humidity, etc.)
     * Placeholder for Phase 3
     */
    private _renderClimateSection;
    /**
     * Render persistent entities section
     * Placeholder for Phase 4
     */
    private _renderPersistentEntities;
    /**
     * Render intermittent entities section
     * Placeholder for Phase 5
     */
    private _renderIntermittentEntities;
    /**
     * Check if entity is in an "active" state
     */
    private _isEntityActive;
    /**
     * Get default icon for entity based on domain
     */
    private _getDefaultIcon;
    /**
     * Handle tap action
     */
    private _handleTap;
    /**
     * Handle hold (context menu) action
     */
    private _handleHold;
    /**
     * Handle double tap action
     */
    private _handleDoubleTap;
    /**
     * Execute tap action
     */
    private _handleAction;
}
declare global {
    interface HTMLElementTagNameMap {
        [CARD_TAG]: UnifiedRoomCard;
    }
}
//# sourceMappingURL=unified-room-card.d.ts.map
/**
 * Unified Room Card - Styles
 *
 * Central source of truth for all CSS styles.
 * All styles reference Home Assistant CSS variables where applicable
 * to ensure theme compatibility.
 */
export declare const HA_CSS_VARIABLES: {
    readonly cardBackground: "var(--ha-card-background, var(--card-background-color, white))";
    readonly cardBorderRadius: "var(--ha-card-border-radius, 12px)";
    readonly cardBoxShadow: "var(--ha-card-box-shadow, none)";
    readonly primaryColor: "var(--primary-color)";
    readonly primaryTextColor: "var(--primary-text-color)";
    readonly secondaryTextColor: "var(--secondary-text-color)";
    readonly disabledTextColor: "var(--disabled-text-color)";
    readonly stateOnColor: "var(--state-light-on-color, var(--state-on-color, var(--primary-color)))";
    readonly stateOffColor: "var(--state-light-off-color, var(--state-off-color, var(--disabled-text-color)))";
    readonly stateActiveColor: "var(--state-active-color, var(--primary-color))";
    readonly stateInactiveColor: "var(--state-inactive-color, var(--disabled-text-color))";
    readonly batteryLowColor: "var(--state-sensor-battery-low-color, #db4437)";
    readonly batteryMediumColor: "var(--state-sensor-battery-medium-color, #ffa600)";
    readonly batteryHighColor: "var(--state-sensor-battery-high-color, #43a047)";
    readonly updateActiveColor: "var(--state-update-on-color, var(--primary-color))";
    readonly climateIdleColor: "var(--state-climate-idle-color, var(--disabled-text-color))";
    readonly climateHeatColor: "var(--state-climate-heat-color, #ff8100)";
    readonly climateCoolColor: "var(--state-climate-cool-color, #2196f3)";
    readonly lockLockedColor: "var(--state-lock-locked-color, var(--primary-color))";
    readonly lockUnlockedColor: "var(--state-lock-unlocked-color, #db4437)";
    readonly binarySensorOnColor: "var(--state-binary-sensor-on-color, var(--primary-color))";
    readonly binarySensorOffColor: "var(--state-binary-sensor-off-color, var(--disabled-text-color))";
    readonly iconColor: "var(--paper-item-icon-color, #44739e)";
    readonly iconActiveColor: "var(--paper-item-icon-active-color, var(--primary-color))";
    readonly dividerColor: "var(--divider-color, #e0e0e0)";
    readonly unavailableColor: "var(--state-unavailable-color, var(--disabled-text-color))";
};
export declare const animationKeyframes: import("lit").CSSResult;
export declare const animationClasses: import("lit").CSSResult;
export declare const cardBaseStyles: import("lit").CSSResult;
export declare const nameStyles: import("lit").CSSResult;
export declare const iconStyles: import("lit").CSSResult;
export declare const climateStyles: import("lit").CSSResult;
export declare const persistentStyles: import("lit").CSSResult;
export declare const intermittentStyles: import("lit").CSSResult;
export declare const overflowStyles: import("lit").CSSResult;
export declare const unavailableStyles: import("lit").CSSResult;
export declare const cardStyles: import("lit").CSSResult;
export declare const editorStyles: import("lit").CSSResult;
/**
 * Generate dynamic styles for card based on configuration
 */
export declare function getCardDynamicStyles(config: {
    cardHeight?: string;
    cardWidth?: string;
    gridTemplateAreas?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    backgroundGradient?: string;
}): string;
/**
 * Get animation class based on animation type
 */
export declare function getAnimationClass(animation: string | undefined): string;
/**
 * Get position class for entity sections
 */
export declare function getPositionClass(position: string | undefined): string;
//# sourceMappingURL=styles.d.ts.map
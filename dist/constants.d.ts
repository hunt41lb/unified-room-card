/**
 * Unified Room Card - Constants
 *
 * Central source of truth for all card metadata, default values,
 * and configuration constants. Update values here for global changes.
 */
export declare const CARD_VERSION = "1.0.0";
export declare const CARD_NAME = "unified-room-card";
export declare const CARD_DESCRIPTION = "A comprehensive room status card for Home Assistant with support for climate, persistent, and intermittent entities.";
export declare const CARD_EDITOR_NAME = "unified-room-card-editor";
export declare const CARD_TAG = "unified-room-card";
export declare const CARD_EDITOR_TAG = "unified-room-card-editor";
export declare const DEFAULT_GRID_TEMPLATE_AREAS = "\"name name icon icon\" \"climate climate persistent intermittent\"";
export declare const DEFAULT_GRID_TEMPLATE_COLUMNS = "1fr 1fr 1fr 1fr";
export declare const DEFAULT_GRID_TEMPLATE_ROWS = "auto auto";
export declare const DEFAULT_CARD_HEIGHT = "97px";
export declare const DEFAULT_CARD_WIDTH = "auto";
export declare const DEFAULT_ICON_WIDTH = "35px";
export declare const DEFAULT_ICON_HEIGHT = "35px";
export declare const DEFAULT_IMG_CELL_WIDTH = "50px";
export declare const DEFAULT_IMG_CELL_HEIGHT = "50px";
export declare const DEFAULT_PERSISTENT_ICON_SIZE = "20px";
export declare const DEFAULT_INTERMITTENT_ICON_SIZE = "20px";
export declare const DEFAULT_PRIMARY_FONT_SIZE = "18px";
export declare const DEFAULT_SECONDARY_FONT_SIZE = "12px";
export declare const DEFAULT_SECONDARY_FONT_WEIGHT = "400";
export declare const DEFAULT_SECONDARY_OPACITY = "0.7";
export declare const DEFAULT_CLIMATE_DECIMAL_PLACES = 1;
export declare const DEFAULT_BATTERY_LOW_THRESHOLD = 10;
export declare const DEFAULT_BATTERY_MEDIUM_THRESHOLD = 20;
export declare const DEFAULT_BATTERY_LOW_ICON = "mdi:battery-10";
export declare const DEFAULT_BATTERY_MEDIUM_ICON = "mdi:battery-20";
export declare const DEFAULT_UPDATE_ICON = "mdi:update";
export declare const DEFAULT_UNAVAILABLE_ICON = "mdi:alert-circle-outline";
export declare const OVERFLOW_INDICATOR_PREFIX = "+";
export declare const ANIMATION_TYPES: {
    readonly NONE: "none";
    readonly PULSE: "pulse";
    readonly GLOW: "glow";
    readonly FLASH: "flash";
};
export type AnimationType = typeof ANIMATION_TYPES[keyof typeof ANIMATION_TYPES];
export declare const ANIMATION_OPTIONS: ({
    value: "none";
    label: string;
} | {
    value: "pulse";
    label: string;
} | {
    value: "glow";
    label: string;
} | {
    value: "flash";
    label: string;
})[];
export declare const TAP_ACTION_TYPES: {
    readonly DEFAULT: "default";
    readonly MORE_INFO: "more-info";
    readonly TOGGLE: "toggle";
    readonly NAVIGATE: "navigate";
    readonly URL: "url";
    readonly PERFORM_ACTION: "perform-action";
    readonly ASSIST: "assist";
    readonly NONE: "none";
};
export type TapActionType = typeof TAP_ACTION_TYPES[keyof typeof TAP_ACTION_TYPES];
export declare const TAP_ACTION_OPTIONS: ({
    value: "default";
    label: string;
} | {
    value: "more-info";
    label: string;
} | {
    value: "toggle";
    label: string;
} | {
    value: "navigate";
    label: string;
} | {
    value: "url";
    label: string;
} | {
    value: "perform-action";
    label: string;
} | {
    value: "assist";
    label: string;
} | {
    value: "none";
    label: string;
})[];
export declare const DEFAULT_TAP_ACTION: "toggle";
export declare const DEFAULT_HOLD_ACTION: "none";
export declare const DEFAULT_DOUBLE_TAP_ACTION: "more-info";
export declare const POSITION_OPTIONS: {
    readonly LEFT: "left";
    readonly CENTER: "center";
    readonly RIGHT: "right";
};
export type PositionType = typeof POSITION_OPTIONS[keyof typeof POSITION_OPTIONS];
export declare const POSITION_DROPDOWN_OPTIONS: ({
    value: "left";
    label: string;
} | {
    value: "center";
    label: string;
} | {
    value: "right";
    label: string;
})[];
export declare const UNIT_HANDLING: {
    readonly NORMALIZE: "normalize";
    readonly SEPARATE: "separate";
};
export type UnitHandlingType = typeof UNIT_HANDLING[keyof typeof UNIT_HANDLING];
export declare const POWER_UNITS: {
    readonly mW: 0.001;
    readonly W: 1;
    readonly kW: 1000;
    readonly MW: 1000000;
    readonly GW: 1000000000;
    readonly TW: 1000000000000;
    readonly mA: 0.001;
    readonly A: 1;
};
export declare const COMMON_STATES: {
    readonly ON: "on";
    readonly OFF: "off";
    readonly UNAVAILABLE: "unavailable";
    readonly UNKNOWN: "unknown";
    readonly LOCKED: "locked";
    readonly UNLOCKED: "unlocked";
    readonly OPEN: "open";
    readonly CLOSED: "closed";
    readonly HOME: "home";
    readonly AWAY: "away";
    readonly IDLE: "idle";
    readonly HEATING: "heating";
    readonly COOLING: "cooling";
};
export declare const MAX_PERSISTENT_ENTITIES_DISPLAY = 4;
export declare const MAX_INTERMITTENT_ENTITIES_DISPLAY = 4;
//# sourceMappingURL=constants.d.ts.map

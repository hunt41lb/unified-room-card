/**
 * Unified Room Card - Constants
 * 
 * Central source of truth for all card metadata, default values,
 * and configuration constants. Update values here for global changes.
 */

// =============================================================================
// CARD METADATA
// =============================================================================

export const CARD_VERSION = '1.0.2';
export const CARD_NAME = 'unified-room-card';
export const CARD_DESCRIPTION = 'A comprehensive room status card for Home Assistant with support for climate, persistent, and intermittent entities.';
export const CARD_EDITOR_NAME = 'unified-room-card-editor';

// Used for console logging and registration
export const CARD_TAG = 'unified-room-card';
export const CARD_EDITOR_TAG = 'unified-room-card-editor';

// =============================================================================
// DEFAULT GRID LAYOUT
// =============================================================================

export const DEFAULT_GRID_TEMPLATE_AREAS = '"name name icon icon" "climate climate persistent intermittent"';
export const DEFAULT_GRID_TEMPLATE_COLUMNS = 'min-content 1fr';
export const DEFAULT_GRID_TEMPLATE_ROWS = '1fr min-content';

// =============================================================================
// DEFAULT CARD DIMENSIONS
// =============================================================================

export const DEFAULT_CARD_HEIGHT = '97px';
export const DEFAULT_CARD_WIDTH = 'auto';
export const DEFAULT_ICON_WIDTH = '35px';
export const DEFAULT_ICON_HEIGHT = '35px';
export const DEFAULT_IMG_CELL_WIDTH = '50px';
export const DEFAULT_IMG_CELL_HEIGHT = '50px';

// =============================================================================
// DEFAULT ENTITY ICON SIZES
// =============================================================================

export const DEFAULT_PERSISTENT_ICON_SIZE = '20px';
export const DEFAULT_INTERMITTENT_ICON_SIZE = '20px';

// =============================================================================
// DEFAULT CLIMATE SECTION STYLES
// =============================================================================

export const DEFAULT_PRIMARY_FONT_SIZE = '18px';
export const DEFAULT_SECONDARY_FONT_SIZE = '12px';
export const DEFAULT_SECONDARY_FONT_WEIGHT = '400';
export const DEFAULT_SECONDARY_OPACITY = '0.7';
export const DEFAULT_CLIMATE_DECIMAL_PLACES = 0;

// =============================================================================
// DEFAULT BATTERY THRESHOLDS
// =============================================================================

export const DEFAULT_BATTERY_LOW_THRESHOLD = 10;
export const DEFAULT_BATTERY_MEDIUM_THRESHOLD = 20;
export const DEFAULT_BATTERY_LOW_ICON = 'mdi:battery-10';
export const DEFAULT_BATTERY_MEDIUM_ICON = 'mdi:battery-20';

// =============================================================================
// DEFAULT UPDATE ENTITY SETTINGS
// =============================================================================

export const DEFAULT_UPDATE_ICON = 'mdi:update';

// =============================================================================
// DEFAULT UNAVAILABLE ICON
// =============================================================================

export const DEFAULT_UNAVAILABLE_ICON = 'mdi:alert-circle-outline';

// =============================================================================
// OVERFLOW INDICATOR
// =============================================================================

export const OVERFLOW_INDICATOR_PREFIX = '+';

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export const ANIMATION_TYPES = {
  NONE: 'none',
  PULSE: 'pulse',
  GLOW: 'glow',
  FLASH: 'flash',
} as const;

export type AnimationType = typeof ANIMATION_TYPES[keyof typeof ANIMATION_TYPES];

// Animation options for dropdown menus
export const ANIMATION_OPTIONS = [
  { value: ANIMATION_TYPES.NONE, label: 'None' },
  { value: ANIMATION_TYPES.PULSE, label: 'Pulse' },
  { value: ANIMATION_TYPES.GLOW, label: 'Glow' },
  { value: ANIMATION_TYPES.FLASH, label: 'Flash' },
];

// =============================================================================
// TAP ACTION TYPES
// =============================================================================

export const TAP_ACTION_TYPES = {
  DEFAULT: 'default',
  MORE_INFO: 'more-info',
  TOGGLE: 'toggle',
  NAVIGATE: 'navigate',
  URL: 'url',
  PERFORM_ACTION: 'perform-action',
  ASSIST: 'assist',
  NONE: 'none',
} as const;

export type TapActionType = typeof TAP_ACTION_TYPES[keyof typeof TAP_ACTION_TYPES];

// Tap action options for dropdown menus
export const TAP_ACTION_OPTIONS = [
  { value: TAP_ACTION_TYPES.DEFAULT, label: 'Default' },
  { value: TAP_ACTION_TYPES.MORE_INFO, label: 'More Info' },
  { value: TAP_ACTION_TYPES.TOGGLE, label: 'Toggle' },
  { value: TAP_ACTION_TYPES.NAVIGATE, label: 'Navigate' },
  { value: TAP_ACTION_TYPES.URL, label: 'URL' },
  { value: TAP_ACTION_TYPES.PERFORM_ACTION, label: 'Perform Action' },
  { value: TAP_ACTION_TYPES.ASSIST, label: 'Assist' },
  { value: TAP_ACTION_TYPES.NONE, label: 'Nothing' },
];

// Default tap actions
export const DEFAULT_TAP_ACTION = TAP_ACTION_TYPES.TOGGLE;
export const DEFAULT_HOLD_ACTION = TAP_ACTION_TYPES.NONE;
export const DEFAULT_DOUBLE_TAP_ACTION = TAP_ACTION_TYPES.MORE_INFO;

// =============================================================================
// ENTITY POSITION OPTIONS
// =============================================================================

export const POSITION_OPTIONS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export type PositionType = typeof POSITION_OPTIONS[keyof typeof POSITION_OPTIONS];

export const POSITION_DROPDOWN_OPTIONS = [
  { value: POSITION_OPTIONS.LEFT, label: 'Left' },
  { value: POSITION_OPTIONS.CENTER, label: 'Center' },
  { value: POSITION_OPTIONS.RIGHT, label: 'Right' },
];

// =============================================================================
// UNIT NORMALIZATION OPTIONS
// =============================================================================

export const UNIT_HANDLING = {
  NORMALIZE: 'normalize',
  SEPARATE: 'separate',
} as const;

export type UnitHandlingType = typeof UNIT_HANDLING[keyof typeof UNIT_HANDLING];

// Power units for normalization (base unit: W)
export const POWER_UNITS = {
  mW: 0.001,
  W: 1,
  kW: 1000,
  MW: 1000000,
  GW: 1000000000,
  TW: 1000000000000,
  mA: 0.001,
  A: 1,
} as const;

// =============================================================================
// COMMON ENTITY STATES
// =============================================================================

export const COMMON_STATES = {
  ON: 'on',
  OFF: 'off',
  UNAVAILABLE: 'unavailable',
  UNKNOWN: 'unknown',
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  OPEN: 'open',
  CLOSED: 'closed',
  HOME: 'home',
  AWAY: 'away',
  IDLE: 'idle',
  HEATING: 'heating',
  COOLING: 'cooling',
} as const;

// =============================================================================
// ICON POSITION OPTIONS
// =============================================================================

export const ICON_POSITION_OPTIONS = {
  AUTO: 'auto',
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  CENTER: 'center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;

export type IconPositionType = typeof ICON_POSITION_OPTIONS[keyof typeof ICON_POSITION_OPTIONS];

export const ICON_POSITION_DROPDOWN_OPTIONS = [
  { value: ICON_POSITION_OPTIONS.AUTO, label: 'Auto' },
  { value: ICON_POSITION_OPTIONS.TOP_RIGHT, label: 'Top Right' },
  { value: ICON_POSITION_OPTIONS.TOP_LEFT, label: 'Top Left' },
  { value: ICON_POSITION_OPTIONS.CENTER, label: 'Center' },
  { value: ICON_POSITION_OPTIONS.BOTTOM_RIGHT, label: 'Bottom Right' },
  { value: ICON_POSITION_OPTIONS.BOTTOM_LEFT, label: 'Bottom Left' },
];

// Grid template areas for each icon position
export const ICON_POSITION_GRIDS: Record<IconPositionType, { areas: string; columns: string; rows: string }> = {
  [ICON_POSITION_OPTIONS.AUTO]: {
    areas: '"name name icon icon" "climate climate persistent intermittent"',
    columns: 'min-content 1fr',
    rows: '1fr min-content',
  },
  [ICON_POSITION_OPTIONS.TOP_RIGHT]: {
    areas: '"name name icon icon" "climate climate persistent intermittent"',
    columns: 'min-content 1fr',
    rows: '1fr min-content',
  },
  [ICON_POSITION_OPTIONS.TOP_LEFT]: {
    areas: '"icon icon name name" "climate climate persistent intermittent"',
    columns: 'min-content 1fr',
    rows: '1fr min-content',
  },
  [ICON_POSITION_OPTIONS.CENTER]: {
    areas: '". icon icon ." "climate climate persistent intermittent"',
    columns: '1fr 1fr 1fr 1fr',
    rows: '1fr min-content',
  },
  [ICON_POSITION_OPTIONS.BOTTOM_RIGHT]: {
    areas: '"name name name name" "climate climate persistent icon"',
    columns: 'min-content 1fr 1fr 1fr',
    rows: '1fr min-content',
  },
  [ICON_POSITION_OPTIONS.BOTTOM_LEFT]: {
    areas: '"name name name name" "icon climate persistent intermittent"',
    columns: 'min-content 1fr 1fr 1fr',
    rows: '1fr min-content',
  },
};

// Icon-only centered grid (used when auto and name is hidden)
export const ICON_ONLY_CENTERED_GRID = {
  areas: '"icon icon icon icon" "climate climate persistent intermittent"',
  columns: '1fr',
  rows: '1fr min-content',
};

// =============================================================================
// ENTITY DOMAIN CONFIGURATION
// =============================================================================

export const ENTITY_DOMAINS = {
  LIGHT: 'light',
  SWITCH: 'switch',
  CLIMATE: 'climate',
  LOCK: 'lock',
  COVER: 'cover',
  FAN: 'fan',
  BINARY_SENSOR: 'binary_sensor',
  SENSOR: 'sensor',
  MEDIA_PLAYER: 'media_player',
  VACUUM: 'vacuum',
  SCENE: 'scene',
  SCRIPT: 'script',
  AUTOMATION: 'automation',
  INPUT_BOOLEAN: 'input_boolean',
} as const;

export type EntityDomainType = typeof ENTITY_DOMAINS[keyof typeof ENTITY_DOMAINS];

// Default active states per entity domain
export const DOMAIN_ACTIVE_STATES: Record<string, string[]> = {
  [ENTITY_DOMAINS.LIGHT]: ['on'],
  [ENTITY_DOMAINS.SWITCH]: ['on'],
  [ENTITY_DOMAINS.CLIMATE]: ['cooling', 'heating', 'drying', 'fan_only', 'heat_cool', 'auto'],
  [ENTITY_DOMAINS.LOCK]: ['unlocked'],
  [ENTITY_DOMAINS.COVER]: ['open', 'opening'],
  [ENTITY_DOMAINS.FAN]: ['on'],
  [ENTITY_DOMAINS.BINARY_SENSOR]: ['on'],
  [ENTITY_DOMAINS.MEDIA_PLAYER]: ['playing', 'paused', 'buffering', 'on'],
  [ENTITY_DOMAINS.VACUUM]: ['cleaning', 'returning'],
  [ENTITY_DOMAINS.INPUT_BOOLEAN]: ['on'],
};

// Default icon per entity domain
export const DOMAIN_DEFAULT_ICONS: Record<string, string> = {
  [ENTITY_DOMAINS.LIGHT]: 'mdi:lightbulb',
  [ENTITY_DOMAINS.SWITCH]: 'mdi:toggle-switch',
  [ENTITY_DOMAINS.CLIMATE]: 'mdi:thermostat',
  [ENTITY_DOMAINS.LOCK]: 'mdi:lock',
  [ENTITY_DOMAINS.COVER]: 'mdi:window-shutter',
  [ENTITY_DOMAINS.FAN]: 'mdi:fan',
  [ENTITY_DOMAINS.BINARY_SENSOR]: 'mdi:checkbox-blank-circle',
  [ENTITY_DOMAINS.SENSOR]: 'mdi:eye',
  [ENTITY_DOMAINS.MEDIA_PLAYER]: 'mdi:cast',
  [ENTITY_DOMAINS.VACUUM]: 'mdi:robot-vacuum',
  [ENTITY_DOMAINS.SCENE]: 'mdi:palette',
  [ENTITY_DOMAINS.SCRIPT]: 'mdi:script',
  [ENTITY_DOMAINS.AUTOMATION]: 'mdi:robot',
  [ENTITY_DOMAINS.INPUT_BOOLEAN]: 'mdi:toggle-switch',
};

// State-specific icons for certain domains
export const DOMAIN_STATE_ICONS: Record<string, Record<string, string>> = {
  [ENTITY_DOMAINS.LOCK]: {
    locked: 'mdi:lock',
    unlocked: 'mdi:lock-open',
    jammed: 'mdi:lock-alert',
    locking: 'mdi:lock-clock',
    unlocking: 'mdi:lock-clock',
  },
  [ENTITY_DOMAINS.CLIMATE]: {
    off: 'mdi:thermostat',
    idle: 'mdi:thermostat',
    heating: 'mdi:fire',
    cooling: 'mdi:snowflake',
    drying: 'mdi:water-percent',
    fan_only: 'mdi:fan',
    auto: 'mdi:thermostat-auto',
    heat_cool: 'mdi:thermostat-auto',
  },
  [ENTITY_DOMAINS.COVER]: {
    open: 'mdi:window-shutter-open',
    closed: 'mdi:window-shutter',
    opening: 'mdi:window-shutter-open',
    closing: 'mdi:window-shutter',
  },
};

// State-specific colors for certain domains
export const DOMAIN_STATE_COLORS: Record<string, Record<string, string>> = {
  [ENTITY_DOMAINS.LOCK]: {
    locked: 'var(--success-color, #4caf50)',
    unlocked: 'var(--warning-color, #ff9800)',
    jammed: 'var(--error-color, #f44336)',
  },
  [ENTITY_DOMAINS.CLIMATE]: {
    heating: 'var(--error-color, #f44336)',
    cooling: 'var(--info-color, #2196f3)',
    idle: 'var(--primary-text-color)',
    off: 'var(--primary-text-color)',
  },
};

// =============================================================================
// MAX DISPLAY LIMITS (before overflow indicator)
// =============================================================================

export const MAX_PERSISTENT_ENTITIES_DISPLAY = 4;
export const MAX_INTERMITTENT_ENTITIES_DISPLAY = 4;

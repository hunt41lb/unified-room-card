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
export const DEFAULT_GRID_TEMPLATE_COLUMNS = '1fr 1fr 1fr 1fr';
export const DEFAULT_GRID_TEMPLATE_ROWS = 'auto auto';

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
export const DEFAULT_CLIMATE_DECIMAL_PLACES = 1;

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
// MAX DISPLAY LIMITS (before overflow indicator)
// =============================================================================

export const MAX_PERSISTENT_ENTITIES_DISPLAY = 4;
export const MAX_INTERMITTENT_ENTITIES_DISPLAY = 4;

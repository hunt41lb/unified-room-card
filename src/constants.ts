/**
 * Unified Room Card - Constants
 * 
 * Central source of truth for all card metadata, default values,
 * and configuration constants. Update values here for global changes.
 */

// =============================================================================
// CARD METADATA
// =============================================================================

export const CARD_VERSION = '2.0.2';
export const CARD_NAME = 'Unified Room Card';
export const CARD_DESCRIPTION = 'A comprehensive room status card for Home Assistant';
export const CARD_EDITOR_NAME = 'unified-room-card-editor';

// Used for console logging and registration
export const CARD_TAG = 'unified-room-card';
export const CARD_EDITOR_TAG = 'unified-room-card-editor';

// =============================================================================
// DEFAULT GRID LAYOUT
// =============================================================================

// Icon spans all columns in row 1, name overlays on top
export const DEFAULT_GRID_TEMPLATE_AREAS = '"icon icon icon icon" "climate climate status status"';
export const DEFAULT_GRID_TEMPLATE_COLUMNS = '1fr 1fr 1fr 1fr';
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
  SPIN: 'spin',
} as const;

export type AnimationType = typeof ANIMATION_TYPES[keyof typeof ANIMATION_TYPES];

// Animation options for dropdown menus
export const ANIMATION_OPTIONS = [
  { value: ANIMATION_TYPES.NONE, label: 'None' },
  { value: ANIMATION_TYPES.PULSE, label: 'Pulse' },
  { value: ANIMATION_TYPES.GLOW, label: 'Glow' },
  { value: ANIMATION_TYPES.FLASH, label: 'Flash' },
  { value: ANIMATION_TYPES.SPIN, label: 'Spin' },
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

export const ICON_HORIZONTAL_POSITION_OPTIONS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export type IconHorizontalPositionType = typeof ICON_HORIZONTAL_POSITION_OPTIONS[keyof typeof ICON_HORIZONTAL_POSITION_OPTIONS];

export const ICON_HORIZONTAL_DROPDOWN_OPTIONS = [
  { value: ICON_HORIZONTAL_POSITION_OPTIONS.LEFT, label: 'Left' },
  { value: ICON_HORIZONTAL_POSITION_OPTIONS.CENTER, label: 'Center' },
  { value: ICON_HORIZONTAL_POSITION_OPTIONS.RIGHT, label: 'Right' },
];

export const ICON_VERTICAL_POSITION_OPTIONS = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
} as const;

export type IconVerticalPositionType = typeof ICON_VERTICAL_POSITION_OPTIONS[keyof typeof ICON_VERTICAL_POSITION_OPTIONS];

export const ICON_VERTICAL_DROPDOWN_OPTIONS = [
  { value: ICON_VERTICAL_POSITION_OPTIONS.TOP, label: 'Top' },
  { value: ICON_VERTICAL_POSITION_OPTIONS.CENTER, label: 'Center' },
  { value: ICON_VERTICAL_POSITION_OPTIONS.BOTTOM, label: 'Bottom' },
];

// =============================================================================
// BORDER OPTIONS
// =============================================================================

export const BORDER_WIDTH_OPTIONS = [
  { value: '1px', label: '1px' },
  { value: '2px', label: '2px' },
  { value: '3px', label: '3px' },
  { value: '4px', label: '4px' },
  { value: '5px', label: '5px' },
];

export const BORDER_STYLE_OPTIONS = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'double', label: 'Double' },
  { value: 'groove', label: 'Groove' },
  { value: 'ridge', label: 'Ridge' },
];

// =============================================================================
// HOME ASSISTANT COLOR VARIABLES
// =============================================================================

export const HA_COLOR_OPTIONS = [
  // Semantic/Theme Colors
  { value: '', label: 'Default (auto)', category: 'Default' },
  { value: 'var(--primary-color)', label: 'Primary', category: 'Theme' },
  { value: 'var(--accent-color)', label: 'Accent', category: 'Theme' },
  { value: 'var(--primary-text-color)', label: 'Primary Text', category: 'Theme' },
  { value: 'var(--secondary-text-color)', label: 'Secondary Text', category: 'Theme' },
  { value: 'var(--disabled-text-color)', label: 'Disabled', category: 'Theme' },
  
  // Status Colors
  { value: 'var(--success-color)', label: 'Success (Green)', category: 'Status' },
  { value: 'var(--warning-color)', label: 'Warning (Amber)', category: 'Status' },
  { value: 'var(--error-color)', label: 'Error (Red)', category: 'Status' },
  { value: 'var(--info-color)', label: 'Info (Blue)', category: 'Status' },
  
  // Base Colors
  { value: 'var(--amber-color)', label: 'Amber', category: 'Colors' },
  { value: 'var(--blue-color)', label: 'Blue', category: 'Colors' },
  { value: 'var(--green-color)', label: 'Green', category: 'Colors' },
  { value: 'var(--red-color)', label: 'Red', category: 'Colors' },
  { value: 'var(--orange-color)', label: 'Orange', category: 'Colors' },
  { value: 'var(--cyan-color)', label: 'Cyan', category: 'Colors' },
  { value: 'var(--purple-color)', label: 'Purple', category: 'Colors' },
  { value: 'var(--pink-color)', label: 'Pink', category: 'Colors' },
  { value: 'var(--yellow-color)', label: 'Yellow', category: 'Colors' },
  
  // Binary Sensor States
  { value: 'var(--state-binary_sensor-active-color)', label: 'Binary Sensor Active', category: 'Binary Sensor' },
  { value: 'var(--state-binary_sensor-inactive-color)', label: 'Binary Sensor Inactive', category: 'Binary Sensor' },
  
  // Lock States
  { value: 'var(--state-lock-locked-color)', label: 'Lock Locked', category: 'Lock' },
  { value: 'var(--state-lock-unlocked-color)', label: 'Lock Unlocked', category: 'Lock' },
  { value: 'var(--state-lock-jammed-color)', label: 'Lock Jammed', category: 'Lock' },
  { value: 'var(--state-lock-pending-color)', label: 'Lock Pending', category: 'Lock' },
  
  // Light States
  { value: 'var(--state-light-active-color)', label: 'Light Active', category: 'Light' },
  { value: 'var(--state-light-inactive-color)', label: 'Light Inactive', category: 'Light' },
  
  // Switch States
  { value: 'var(--state-switch-active-color)', label: 'Switch Active', category: 'Switch' },
  { value: 'var(--state-switch-inactive-color)', label: 'Switch Inactive', category: 'Switch' },
  
  // Cover States
  { value: 'var(--state-cover-open-color)', label: 'Cover Open', category: 'Cover' },
  { value: 'var(--state-cover-closed-color)', label: 'Cover Closed', category: 'Cover' },
  
  // Climate States
  { value: 'var(--state-climate-heat-color)', label: 'Climate Heat', category: 'Climate' },
  { value: 'var(--state-climate-cool-color)', label: 'Climate Cool', category: 'Climate' },
  { value: 'var(--state-climate-idle-color)', label: 'Climate Idle', category: 'Climate' },
  { value: 'var(--state-climate-fan_only-color)', label: 'Climate Fan', category: 'Climate' },
  { value: 'var(--state-climate-dry-color)', label: 'Climate Dry', category: 'Climate' },
  
  // Person/Presence
  { value: 'var(--state-person-home-color)', label: 'Person Home', category: 'Presence' },
  { value: 'var(--state-person-away-color)', label: 'Person Away', category: 'Presence' },
  
  // Alarm States
  { value: 'var(--state-alarm-armed-color)', label: 'Alarm Armed', category: 'Alarm' },
  { value: 'var(--state-alarm-disarmed-color)', label: 'Alarm Disarmed', category: 'Alarm' },
  { value: 'var(--state-alarm-triggered-color)', label: 'Alarm Triggered', category: 'Alarm' },
  { value: 'var(--state-alarm-pending-color)', label: 'Alarm Pending', category: 'Alarm' },
  
  // Generic Active/Inactive
  { value: 'var(--state-active-color)', label: 'Active (Generic)', category: 'Generic' },
  { value: 'var(--state-inactive-color)', label: 'Inactive (Generic)', category: 'Generic' },
  
  // Custom option
  { value: 'custom', label: '↳ Custom CSS...', category: 'Custom' },
];

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
  [ENTITY_DOMAINS.LOCK]: ['unlocked', 'unlocking', 'locking', 'open', 'opening'],
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
    open: 'mdi:lock-open-variant',
    opening: 'mdi:lock-open-variant',
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

// State-specific colors for certain domains using HA CSS variables
export const DOMAIN_STATE_COLORS: Record<string, Record<string, string>> = {
  [ENTITY_DOMAINS.LIGHT]: {
    on: 'var(--state-light-active-color, var(--amber-color, #ffc107))',
    off: 'var(--primary-text-color)',
  },
  [ENTITY_DOMAINS.LOCK]: {
    jammed: 'var(--state-lock-jammed-color, #db4437)',
    locked: 'var(--state-lock-locked-color, #43a047)',
    locking: 'var(--state-lock-locking-color, #ffc107)',
    unlocked: 'var(--state-lock-unlocked-color, #ffc107)',
    unlocking: 'var(--state-lock-unlocking-color, #ffc107)',
    open: 'var(--state-lock-open-color, #db4437)',
    opening: 'var(--state-lock-opening-color, #ffc107)',
  },
  [ENTITY_DOMAINS.CLIMATE]: {
    heating: 'var(--state-climate-heat-color, #ff8c00)',
    cooling: 'var(--state-climate-cool-color, #2196f3)',
    drying: 'var(--state-climate-dry-color, #8bc34a)',
    fan_only: 'var(--state-climate-fan_only-color, #00bcd4)',
    auto: 'var(--state-climate-auto-color, #9c27b0)',
    heat_cool: 'var(--state-climate-auto-color, #9c27b0)',
    idle: 'var(--primary-text-color)',
    off: 'var(--primary-text-color)',
  },
  [ENTITY_DOMAINS.BINARY_SENSOR]: {
    on: 'var(--state-binary_sensor-active-color, var(--amber-color, #ffc107))',
    off: 'var(--primary-text-color)',
  },
  [ENTITY_DOMAINS.SWITCH]: {
    on: 'var(--state-switch-active-color, var(--amber-color, #ffc107))',
    off: 'var(--primary-text-color)',
  },
  [ENTITY_DOMAINS.COVER]: {
    open: 'var(--state-cover-open-color, #ffc107)',
    opening: 'var(--state-cover-open-color, #ffc107)',
    closed: 'var(--state-cover-closed-color, #43a047)',
    closing: 'var(--state-cover-closed-color, #43a047)',
  },
};

// =============================================================================
// MAX DISPLAY LIMITS (before overflow indicator)
// =============================================================================

export const MAX_PERSISTENT_ENTITIES_DISPLAY = 4;
export const MAX_INTERMITTENT_ENTITIES_DISPLAY = 4;

// =============================================================================
// DOMAIN STATE DEFAULTS (for "Apply Defaults" button in editor)
// =============================================================================

export interface DomainStateDefault {
  state: string;
  icon: string;
  color: string;
}

export const DOMAIN_STATE_DEFAULTS: Record<string, DomainStateDefault[]> = {
  [ENTITY_DOMAINS.LOCK]: [
    { state: 'locked', icon: 'mdi:lock', color: 'var(--state-lock-locked-color)' },
    { state: 'unlocked', icon: 'mdi:lock-open', color: 'var(--state-lock-unlocked-color)' },
    { state: 'jammed', icon: 'mdi:lock-alert', color: 'var(--state-lock-jammed-color)' },
    { state: 'locking', icon: 'mdi:lock-clock', color: 'var(--state-lock-pending-color)' },
    { state: 'unlocking', icon: 'mdi:lock-clock', color: 'var(--state-lock-pending-color)' },
  ],
  [ENTITY_DOMAINS.BINARY_SENSOR]: [
    { state: 'on', icon: 'mdi:motion-sensor', color: 'var(--state-binary_sensor-active-color)' },
    { state: 'off', icon: 'mdi:motion-sensor-off', color: 'var(--primary-text-color)' },
  ],
  [ENTITY_DOMAINS.COVER]: [
    { state: 'open', icon: 'mdi:window-shutter-open', color: 'var(--state-cover-open-color)' },
    { state: 'closed', icon: 'mdi:window-shutter', color: 'var(--state-cover-closed-color)' },
    { state: 'opening', icon: 'mdi:window-shutter-open', color: 'var(--warning-color)' },
    { state: 'closing', icon: 'mdi:window-shutter', color: 'var(--warning-color)' },
  ],
  [ENTITY_DOMAINS.LIGHT]: [
    { state: 'on', icon: 'mdi:lightbulb', color: 'var(--state-light-active-color)' },
    { state: 'off', icon: 'mdi:lightbulb-off', color: 'var(--primary-text-color)' },
  ],
  [ENTITY_DOMAINS.SWITCH]: [
    { state: 'on', icon: 'mdi:toggle-switch', color: 'var(--state-switch-active-color)' },
    { state: 'off', icon: 'mdi:toggle-switch-off', color: 'var(--primary-text-color)' },
  ],
  [ENTITY_DOMAINS.FAN]: [
    { state: 'on', icon: 'mdi:fan', color: 'var(--state-active-color)' },
    { state: 'off', icon: 'mdi:fan-off', color: 'var(--primary-text-color)' },
  ],
  [ENTITY_DOMAINS.CLIMATE]: [
    { state: 'heating', icon: 'mdi:fire', color: 'var(--state-climate-heat-color)' },
    { state: 'cooling', icon: 'mdi:snowflake', color: 'var(--state-climate-cool-color)' },
    { state: 'idle', icon: 'mdi:thermostat', color: 'var(--primary-text-color)' },
    { state: 'off', icon: 'mdi:thermostat-off', color: 'var(--disabled-text-color)' },
  ],
  [ENTITY_DOMAINS.INPUT_BOOLEAN]: [
    { state: 'on', icon: 'mdi:toggle-switch', color: 'var(--state-active-color)' },
    { state: 'off', icon: 'mdi:toggle-switch-off', color: 'var(--primary-text-color)' },
  ],
};

// Domains that have state defaults available
export const DOMAINS_WITH_DEFAULTS = Object.keys(DOMAIN_STATE_DEFAULTS);

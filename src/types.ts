/**
 * Unified Room Card - Type Definitions
 *
 * All TypeScript interfaces and types for card configuration.
 * These types define the structure of the card's YAML configuration.
 */

import type {
  AnimationType,
  TapActionType,
  UnitHandlingType,
  IconHorizontalPositionType,
  IconVerticalPositionType,
  BadgePositionType,
} from './constants';

// =============================================================================
// HOME ASSISTANT TYPES
// =============================================================================

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: HassThemes;
  language: string;
  config: HassConfig;
  localize: (key: string, ...args: unknown[]) => string;
  callService: (domain: string, service: string, data?: Record<string, unknown>) => Promise<void>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HassThemes {
  default_theme: string;
  themes: Record<string, Record<string, string>>;
}

export interface HassConfig {
  unit_system: {
    temperature: string;
    length: string;
    mass: string;
    volume: string;
  };
}

// =============================================================================
// TAP ACTION CONFIGURATION
// =============================================================================

export interface TapActionConfig {
  action: TapActionType;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: {
    entity_id?: string | string[];
    device_id?: string | string[];
    area_id?: string | string[];
  };
}

// =============================================================================
// STATE-BASED CONFIGURATION
// =============================================================================

export interface StateConfig {
  state: string;
  icon?: string;
  color?: string;
  animation?: AnimationType;
}

// =============================================================================
// ICON STATE MAP CONFIGURATION
// =============================================================================

export interface IconStateMapEntry {
  icon?: string;               // Icon to display for this state
  color?: string;              // Icon color override for this state
}

export interface IconStateMapConfig {
  entity?: string;             // Entity to monitor (defaults to primary entity if omitted)
  states: Record<string, IconStateMapEntry>;  // Map of state values to icon/color overrides
}

// =============================================================================
// UNAVAILABLE STATE HANDLING CONFIGURATION
// =============================================================================

export type UnavailableBehavior = 'off' | 'on' | 'unavailable' | 'custom';

export interface UnavailableHandlingConfig {
  behavior: UnavailableBehavior;
  icon?: string;
  icon_color?: string;
  background_color?: string;
  opacity?: number;
  show_badge?: boolean;
}

// =============================================================================
// TEXT STYLE CONFIGURATION (for name, label, state sections)
// =============================================================================

export type TextAlignType = 'left' | 'center' | 'right';

export interface TextStyleConfig {
  padding?: string;            // CSS padding (e.g., "0 14px 2px 14px")
  margin?: string;             // CSS margin (e.g., "0 0 0 0")
  font_size?: string;          // Font size (e.g., "12px", "1rem")
  font_weight?: string;        // Font weight (e.g., "400", "500", "bold")
  text_align?: TextAlignType;  // Text alignment: left, center, right
  color?: string;              // Text color (CSS variable or color value)
  line_height?: string;        // Line height (e.g., "1.2", "16px")
}

// =============================================================================
// INDIVIDUAL ENTITY CONFIGURATION
// =============================================================================

export interface EntityConfig {
  entity: string;
  icon?: string;
  icon_size?: string;
  states?: StateConfig[];
  active_states?: string[];    // Custom states considered "active" (for intermittent)
  animation?: AnimationType;
  unavailable_icon?: string;
  tap_action?: TapActionConfig;
  hold_action?: TapActionConfig;
  double_tap_action?: TapActionConfig;
}

// =============================================================================
// PERSISTENT ENTITIES CONFIGURATION
// =============================================================================

export interface PersistentEntitiesConfig {
  position?: 'left' | 'center' | 'right';  // Horizontal position
  icon_size?: string;        // Default icon size for all entities
  padding?: string;          // Custom padding (e.g., "0 0 1px 14px")
  margin?: string;           // Custom margin
  gap?: string;              // Gap between entities (default: 4px)
  entities?: EntityConfig[];
}

// =============================================================================
// INTERMITTENT ENTITIES CONFIGURATION
// =============================================================================

export interface IntermittentEntitiesConfig {
  icon_size?: string;         // Default icon size for all entities
  gap?: string;               // Gap between entities (default: 4px)
  active_states?: string[];   // Section-wide custom active states
  animation?: AnimationType;  // Section-wide animation for active entities
  entities?: EntityConfig[];
}

// =============================================================================
// CLIMATE ENTITIES CONFIGURATION
// =============================================================================

export interface ClimateEntitiesConfig {
  primary_entities?: string[];         // Override for climate-primary display (any entities, averaged)
  show_primary_unit?: boolean;         // Show/hide unit for primary entity (default: true)
  temperature_entities?: string[];
  humidity_entities?: string[];
  air_quality_entities?: string[];
  illuminance_entities?: string[];
  decimal_places?: number;
  show_temperature_unit?: boolean;
  show_humidity_unit?: boolean;
  show_air_quality_unit?: boolean;
  show_illuminance_unit?: boolean;
}

// =============================================================================
// POWER ENTITIES CONFIGURATION
// =============================================================================

export interface PowerEntitiesConfig {
  entities?: string[];
  unit_handling?: UnitHandlingType;
  decimal_places?: number;
  show_unit?: boolean;
}

// =============================================================================
// BATTERY ENTITIES CONFIGURATION
// =============================================================================

export interface BatteryEntitiesConfig {
  entities?: string[];              // Specific entities to monitor
  low_threshold?: number;           // Low battery threshold (default: 20)
  icon_size?: string;               // Icon size (default: 21px)
  tap_action?: TapActionConfig;
  hold_action?: TapActionConfig;
  // NEW: Badge mode options
  show_as_badge?: boolean;          // Show as badge instead of in status section (default: false)
  badge_position?: BadgePositionType;   // Badge position (default: 'top-right')
  badge_size?: string;              // Badge circle size (default: '20px')
  badge_icon_size?: string;         // Icon size inside badge (default: '12px')
  badge_color?: string;             // Badge background color (default: battery low color)
}

// =============================================================================
// UPDATE ENTITIES CONFIGURATION
// =============================================================================

export interface UpdateEntitiesConfig {
  entities?: string[];              // Specific entities to monitor
  icon?: string;                    // Custom icon (default: mdi:update)
  icon_size?: string;               // Icon size (default: 21px)
  color?: string;                   // Icon color when updates available
  tap_action?: TapActionConfig;
  hold_action?: TapActionConfig;
  // Animation settings
  spin_animation?: boolean;         // Enable periodic spin animation (default: false)
  spin_interval?: number;           // Seconds between spins (default: 60)
  // NEW: Badge mode options
  show_as_badge?: boolean;          // Show as badge instead of in status section (default: false)
  badge_position?: BadgePositionType;   // Badge position (default: 'top-right')
  badge_size?: string;              // Badge circle size (default: '20px')
  badge_icon_size?: string;         // Icon size inside badge (default: '12px')
  badge_color?: string;             // Badge background color (default: update active color)
}

// =============================================================================
// GLOW EFFECT CONFIGURATION
// =============================================================================

export type GlowAnimationType = 'none' | 'pulse' | 'breathe';

export interface GlowEffectConfig {
  entity: string;                    // Entity to monitor for glow trigger
  state?: string;                    // Single state that triggers this glow effect
  states?: string[];                 // Multiple states that trigger this glow effect
  color?: string;                    // Glow color - CSS variable, color value, or 'auto' (default: auto)
  spread?: number;                   // Box-shadow blur/spread in px (default: 4)
  animation?: GlowAnimationType;     // Glow animation type (default: none)
}

// =============================================================================
// GRID LAYOUT CONFIGURATION
// =============================================================================

export interface GridConfig {
  template_areas?: string;
  template_columns?: string;
  template_rows?: string;
}

// =============================================================================
// MAIN CARD CONFIGURATION
// =============================================================================

export interface UnifiedRoomCardConfig {
  // Card Metadata
  type: string;
  name?: string;

  // Main Entity (single or multiple)
  entity?: string;              // Primary entity (backwards compatible)
  entities?: string[];          // Additional entities (same domain, grouped control)

  // Display Options
  show_name?: boolean;
  show_icon?: boolean;
  show_state?: boolean;
  show_label?: boolean;
  show_img_cell?: boolean;
  icon_animation?: string;  // Animation type: none, pulse, glow, flash, spin
  spin_duration?: number;   // Duration of full 360° spin in seconds (default: 2)

  // Main Icon
  icon?: string;
  icon_size?: string;
  img_cell_size?: string;
  icon_horizontal_position?: IconHorizontalPositionType;
  icon_vertical_position?: IconVerticalPositionType;
  icon_background_opacity?: number;  // Opacity of icon background when active (0-1, default: 0.3)

  // Icon State Map - Dynamic icon/color based on entity state
  icon_state_map?: IconStateMapConfig;

  // Entity Domain/State Handling
  active_states?: string[];  // Custom states considered "active" (overrides domain defaults)
  label?: string;            // Custom label text

  // Unavailable State Handling
  unavailable_handling?: UnavailableHandlingConfig;

  // Border Indicator Entity
  border_entity?: string;  // Entity that controls border color
  border_width?: string;   // Border width (default: 2px)
  border_style?: string;   // Border style (default: solid)

  // Tap Actions
  tap_action?: TapActionConfig;
  hold_action?: TapActionConfig;
  double_tap_action?: TapActionConfig;

  // Card Dimensions
  card_height?: string;
  card_width?: string;

  // Grid Layout
  grid?: GridConfig;
  grid_area?: string;

  // Entity Groups
  persistent_entities?: PersistentEntitiesConfig;
  intermittent_entities?: IntermittentEntitiesConfig;
  climate_entities?: ClimateEntitiesConfig;
  power_entities?: PowerEntitiesConfig;
  battery_entities?: BatteryEntitiesConfig;
  update_entities?: UpdateEntitiesConfig;

  // Styling
  background_color?: string;
  active_background_color?: string;
  background_gradient?: string;

  // Text Section Styling (NEW)
  name_style?: TextStyleConfig;    // Custom styling for card name
  label_style?: TextStyleConfig;   // Custom styling for card label
  state_style?: TextStyleConfig;   // Custom styling for state display

  // Glow Effects
  glow_effects?: GlowEffectConfig[];
}

// =============================================================================
// EDITOR STATE TYPES
// =============================================================================

export interface EditorAccordionState {
  main: boolean;
  // Sub-accordions for main section
  mainBasic: boolean;
  mainIcon: boolean;
  mainAppearance: boolean;
  mainActions: boolean;
  // Other sections
  persistent: boolean;
  intermittent: boolean;
  climate: boolean;
  power: boolean;
  battery: boolean;
  update: boolean;
  grid: boolean;
}

// =============================================================================
// COMPUTED VALUES (for rendering)
// =============================================================================

export interface ComputedClimateValue {
  value: number | null;
  unit: string;
  label: string;
}

export interface ComputedPowerValue {
  value: number;
  unit: string;
  normalized?: {
    value: number;
    unit: string;
  };
}

export interface EntityDisplayInfo {
  entity_id: string;
  state: string;
  icon: string;
  color: string;
  animation: AnimationType;
  visible: boolean;
  unavailable: boolean;
}

// =============================================================================
// CARD ELEMENT INTERFACE
// =============================================================================

export interface UnifiedRoomCardElement extends HTMLElement {
  hass?: HomeAssistant;
  config?: UnifiedRoomCardConfig;
  setConfig(config: UnifiedRoomCardConfig): void;
  getCardSize(): number;
}

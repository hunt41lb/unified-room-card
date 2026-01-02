/**
 * Unified Room Card - Type Definitions
 * 
 * All TypeScript interfaces and types for card configuration.
 * These types define the structure of the card's YAML configuration.
 */

import {
  AnimationType,
  TapActionType,
  PositionType,
  UnitHandlingType,
  IconHorizontalPositionType,
  IconVerticalPositionType,
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
  primary_entity?: string;
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

export interface BatteryThresholdConfig {
  threshold: number;
  icon: string;
  color?: string;
}

export interface BatteryEntitiesConfig {
  entities?: string[];
  low_threshold?: BatteryThresholdConfig;
  medium_threshold?: BatteryThresholdConfig;
}

// =============================================================================
// UPDATE ENTITIES CONFIGURATION
// =============================================================================

export interface UpdateEntitiesConfig {
  entities?: string[];
  icon?: string;
  color?: string;
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
  
  // Main Entity
  entity?: string;
  
  // Display Options
  show_name?: boolean;
  show_icon?: boolean;
  show_state?: boolean;
  show_img_cell?: boolean;
  animate_icon?: boolean;
  
  // Main Icon
  icon?: string;
  icon_size?: string;
  img_cell_size?: string;
  icon_horizontal_position?: IconHorizontalPositionType;
  icon_vertical_position?: IconVerticalPositionType;
  
  // Entity Domain/State Handling
  active_states?: string[];  // Custom states considered "active" (overrides domain defaults)
  
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
}

// =============================================================================
// EDITOR STATE TYPES
// =============================================================================

export interface EditorAccordionState {
  main: boolean;
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

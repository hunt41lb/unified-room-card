# Unified Room Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![Version](https://img.shields.io/badge/version-2.0.1-blue)](https://github.com/hunt41lb/unified-room-card/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A comprehensive room status card for Home Assistant that consolidates climate data, persistent entities, intermittent entities, battery warnings, and firmware updates into a single, customizable card.

![Card Preview](docs/images/preview.png)

## Features

- **🌡️ Climate Display** - Temperature and humidity with automatic averaging across multiple sensors
- **🔒 Persistent Entities** - Always-visible entities like locks, door/window sensors with state-based icons and colors
- **👁️ Intermittent Entities** - Auto-hiding entities like motion sensors that only appear when active
- **🔋 Battery Monitoring** - Shows low battery warnings only when devices fall below threshold
- **📦 Update Notifications** - Displays firmware update availability for devices in the room
- **✨ Animations** - Pulse, glow, and flash effects for attention-grabbing alerts
- **🎨 Theme Compatible** - Uses Home Assistant CSS variables for seamless theme integration
- **📝 Visual Editor** - Full GUI configuration support - no YAML required!

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add `https://github.com/hunt41lb/unified-room-card` and select "Lovelace" as the category
6. Search for "Unified Room Card" and install it
7. Refresh your browser

### Manual Installation

1. Download `unified-room-card.js` from the [latest release](https://github.com/hunt41lb/unified-room-card/releases)
2. Copy it to your `config/www` folder
3. Add the resource in your Lovelace configuration:

```yaml
resources:
  - url: /local/unified-room-card.js
    type: module
```

## Quick Start

### Minimal Configuration

```yaml
type: custom:unified-room-card
name: Living Room
entity: light.living_room
```

### Typical Room Configuration

```yaml
type: custom:unified-room-card
name: Living Room
entity: light.living_room
icon: mdi:sofa

tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: navigate
  navigation_path: /lovelace/living-room

climate_entities:
  temperature_entities:
    - sensor.living_room_temperature
  humidity_entities:
    - sensor.living_room_humidity

persistent_entities:
  entities:
    - entity: lock.front_door
    - entity: binary_sensor.front_door_contact

intermittent_entities:
  entities:
    - entity: binary_sensor.living_room_motion

battery_entities:
  low_threshold: 20
  entities:
    - sensor.motion_sensor_battery
    - sensor.door_sensor_battery

update_entities:
  entities:
    - update.living_room_hub_firmware
```

## Configuration Options

### Main Card Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | `custom:unified-room-card` |
| `name` | string | - | Card name displayed in the header |
| `entity` | string | - | Main entity for card state and actions |
| `icon` | string | auto | Main icon (auto-detected from entity if not specified) |
| `show_name` | boolean | `true` | Show/hide card name |
| `show_icon` | boolean | `true` | Show/hide main icon |
| `show_state` | boolean | `false` | Show entity state text below name |
| `animate_icon` | boolean | `false` | Animate icon when entity is active |
| `card_height` | string | `97px` | Card height |
| `card_width` | string | `auto` | Card width |

### Tap Actions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tap_action` | object | `{ action: 'toggle' }` | Action on single tap |
| `hold_action` | object | `{ action: 'none' }` | Action on long press |
| `double_tap_action` | object | `{ action: 'more-info' }` | Action on double tap |

**Action Types:** `toggle`, `more-info`, `navigate`, `url`, `perform-action`, `none`

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/room-details

hold_action:
  action: perform-action
  service: light.turn_on
  service_data:
    brightness: 255
```

### Climate Entities

Display temperature, humidity, air quality, and illuminance data. Multiple sensors are automatically averaged. Use `primary_entities` to override the main display with any sensor type.

> **Smart Editor Filtering:** When adding Primary Entities via the visual editor, once you select your first entity, subsequent selections are automatically filtered to show only entities with the same device class (e.g., humidity, temperature, illuminance) to ensure accurate averaging.

```yaml
climate_entities:
  # Option 1: Use temperature sensors (default)
  temperature_entities:
    - sensor.room_temperature
    - sensor.room_temperature_2  # Will be averaged
  humidity_entities:
    - sensor.room_humidity
  decimal_places: 1

  # Option 2: Override with any entities as primary display
  primary_entities:
    - sensor.room_humidity        # Multiple entities will be averaged
    - sensor.room_humidity_2
  show_primary_unit: true         # Auto-detects unit (%)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `primary_entities` | array | - | Override primary display with any sensor entities (averaged) |
| `show_primary_unit` | boolean | `true` | Show/hide unit for primary (auto-detected) |
| `temperature_entities` | array | - | Temperature sensor entity IDs (used if no primary_entities) |
| `show_temperature_unit` | boolean | `true` | Show/hide temperature unit |
| `humidity_entities` | array | - | Humidity sensor entity IDs |
| `show_humidity_unit` | boolean | `true` | Show/hide humidity unit |
| `air_quality_entities` | array | - | Air quality sensor entity IDs |
| `show_air_quality_unit` | boolean | `true` | Show/hide air quality unit |
| `illuminance_entities` | array | - | Illuminance sensor entity IDs |
| `show_illuminance_unit` | boolean | `true` | Show/hide illuminance unit |
| `decimal_places` | number | `0` | Decimal places for all displayed values |

### Persistent Entities

Always-visible entities with state-based icons and colors. Perfect for locks, door sensors, and other important status indicators.

```yaml
persistent_entities:
  icon_size: 21px
  gap: 4px
  entities:
    - entity: lock.front_door
      states:
        - state: locked
          icon: mdi:lock
          color: var(--state-lock-locked-color)
        - state: unlocked
          icon: mdi:lock-open
          color: var(--state-lock-unlocked-color)
          animation: pulse
    - entity: binary_sensor.front_door
      # Uses automatic domain defaults for binary_sensor
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon_size` | string | `21px` | Icon size for all entities |
| `gap` | string | `4px` | Gap between entity icons |
| `entities` | array | - | List of entity configurations |

**Entity Options:**

| Option | Type | Description |
|--------|------|-------------|
| `entity` | string | Entity ID |
| `icon` | string | Default icon (overrides entity icon) |
| `icon_size` | string | Override section icon size |
| `tap_action` | object | Tap action (default: more-info) |
| `hold_action` | object | Hold action (default: more-info) |
| `states` | array | State-based icon/color/animation overrides |

### Intermittent Entities

Entities that only appear when in an "active" state. Perfect for motion sensors, door open alerts, etc.

```yaml
intermittent_entities:
  icon_size: 21px
  gap: 4px
  animation: pulse  # Section-wide animation
  entities:
    - entity: binary_sensor.living_room_motion
      # Auto-detects device_class for icon (motion-sensor)
    - entity: binary_sensor.front_door_contact
      active_states:
        - "on"
      states:
        - state: "on"
          icon: mdi:door-open
          color: var(--warning-color)
          animation: glow
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon_size` | string | `21px` | Icon size for all entities |
| `gap` | string | `4px` | Gap between entity icons |
| `animation` | string | - | Section-wide animation: `pulse`, `glow`, `flash` |
| `active_states` | array | domain-specific | States considered "active" |
| `entities` | array | - | List of entity configurations |

**Supported Device Classes with Auto-Icons:**
- `motion` - Motion sensor icons
- `door` - Door open/closed icons
- `window` - Window open/closed icons
- `occupancy` - Home/away icons
- `moisture` - Water leak icons
- `smoke` - Smoke detector icons
- And 20+ more...

### Battery Entities

Shows battery icons only when devices fall below the threshold. Each low battery device appears as an individual icon.

```yaml
battery_entities:
  low_threshold: 20  # Show when ≤ 20%
  icon_size: 21px
  tap_action:
    action: more-info
  hold_action:
    action: more-info
  entities:
    - sensor.motion_sensor_battery
    - sensor.door_sensor_battery
    - sensor.remote_battery
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `low_threshold` | number | `20` | Battery percentage threshold |
| `icon_size` | string | `21px` | Icon size |
| `tap_action` | object | more-info | Action on tap |
| `hold_action` | object | more-info | Action on hold |
| `entities` | array | - | Battery sensor entity IDs |

**Battery Icon Behavior:**
- Icons automatically change based on battery level (battery-alert, battery-10, battery-20, etc.)
- Uses `var(--state-sensor-battery-low-color)` for color

### Update Entities

Shows a **single update icon** when any monitored entities have available updates. If multiple updates are pending, a badge shows the count.

> **Periodic Spin Animation:** Enable `spin_animation` to make the icon spin periodically to draw attention to pending updates.

```yaml
update_entities:
  icon: mdi:update              # Default icon
  icon_size: 21px
  color: var(--state-update-active-color)
  spin_animation: true          # Enable periodic spin
  spin_interval: 60             # Spin every 60 seconds
  tap_action:
    action: more-info
  entities:
    - update.living_room_hub
    - update.thermostat_firmware
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | `mdi:update` | Icon to display |
| `icon_size` | string | `21px` | Icon size |
| `color` | string | `var(--state-update-active-color)` | Icon color |
| `spin_animation` | boolean | `false` | Enable periodic spin animation |
| `spin_interval` | number | `60` | Seconds between spins (min: 10) |
| `tap_action` | object | more-info | Action on tap |
| `hold_action` | object | more-info | Action on hold |
| `entities` | array | - | Update entity IDs to monitor |

### Border Entity

Add a colored border based on an entity's state:

```yaml
border_entity: binary_sensor.alarm_armed
border_width: 2px
border_style: solid
```

### Power Entities

Display power, energy, voltage, or current measurements. Multiple sensors are summed (for power) or can be used for other electrical measurements.

> **Smart Editor Filtering:** When adding Power Entities via the visual editor, before selecting any entities, all power-related sensors (power, energy, voltage, current) are shown. Once you select your first entity, subsequent selections are filtered to show only entities with the same measurement type to ensure consistency.

```yaml
power_entities:
  entities:
    - sensor.living_room_power
    - sensor.kitchen_power        # Multiple power sensors are summed
  decimal_places: 1
  show_unit: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entities` | array | - | Power/energy/voltage/current sensor entity IDs |
| `decimal_places` | number | `0` | Decimal places for displayed value |
| `show_unit` | boolean | `true` | Show/hide unit (W, kW, etc.) |

**Supported Units:** W, kW, MW (power), Wh, kWh, MWh (energy), V, mV (voltage), A, mA (current)

### Grid Layout (Advanced)

The card uses CSS Grid for layout. By default, it uses a unified layout:

```
┌─────────────────────────────────────────────────┐
│  Name                              [Icon]       │  ← icon area
├────────────────────┬────────────────────────────┤
│  72°F  45%         │  [persistent] [intermittent]│  ← climate + status
│                    │  [battery] [update]        │
└────────────────────┴────────────────────────────┘
```

**Default Grid:**
```yaml
grid:
  template_areas: '"icon icon icon icon" "climate climate status status"'
  template_columns: '1fr 1fr 1fr 1fr'
  template_rows: '1fr min-content'
```

**Available Grid Areas:**

| Area | Description |
|------|-------------|
| `icon` | Icon and name overlay area |
| `climate` | Temperature, humidity, air quality, illuminance, power |
| `status` | Combined: persistent + intermittent + battery + update |
| `persistent` | Persistent entities only (legacy mode) |
| `intermittent` | Intermittent entities + battery + update (legacy mode) |
| `battery` | Battery entities only (advanced) |
| `update` | Update entities only (advanced) |

**Example: Split persistent and intermittent:**
```yaml
grid:
  template_areas: '"icon icon icon icon" "persistent persistent intermittent intermittent"'
  template_columns: '1fr 1fr 1fr 1fr'
  template_rows: '1fr min-content'
```
Battery and update icons will automatically flow with the intermittent section.

**Example: Separate all sections:**
```yaml
grid:
  template_areas: '"icon icon" "persistent intermittent" "battery update"'
  template_columns: '1fr 1fr'
  template_rows: '1fr auto auto'
```

## Visual Editor

The card includes a full visual editor accessible through Home Assistant's UI. All options can be configured without writing YAML.

![Editor Preview](docs/images/editor.png)

## Animations

Five animation types are available for the main icon, persistent, and intermittent entities:

| Animation | Description |
|-----------|-------------|
| `none` | No animation (default) |
| `pulse` | Subtle pulsing opacity effect |
| `glow` | Glowing shadow effect |
| `flash` | Attention-grabbing flash |
| `spin` | Continuous rotation |

**Main icon animation** (active when entity is on):
```yaml
icon_animation: pulse  # or glow, flash, spin, none
```

**Spin animation with custom duration:**

Use `spin_duration` to control how long each 360° rotation takes. This is useful as a visual timer - for example, if an automation turns lights on for 60 seconds, set the spin duration to 60 and the icon will complete exactly one rotation during that time.

```yaml
icon_animation: spin
spin_duration: 60  # Seconds for one complete rotation (default: 2)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon_animation` | string | `none` | Animation type: none, pulse, glow, flash, spin |
| `spin_duration` | number | `2` | Duration of one 360° rotation in seconds (1-120) |

**Entity-specific animation:**
```yaml
persistent_entities:
  entities:
    - entity: lock.front_door
      states:
        - state: unlocked
          animation: pulse
```

## Theme Variables

The card uses Home Assistant's CSS variables for colors:

| Variable | Usage |
|----------|-------|
| `--state-lock-locked-color` | Locked state |
| `--state-lock-unlocked-color` | Unlocked state |
| `--state-binary-sensor-on-color` | Binary sensor on |
| `--state-sensor-battery-low-color` | Low battery |
| `--state-update-active-color` | Update available |
| `--primary-color` | Primary accent |
| `--warning-color` | Warnings |
| `--error-color` | Errors |

## Development

```bash
# Clone the repository
git clone https://github.com/hunt41lb/unified-room-card.git
cd unified-room-card

# Install dependencies
npm install

# Build for development (with watch)
npm run watch

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 🐛 [Report a bug](https://github.com/hunt41lb/unified-room-card/issues)
- 💡 [Request a feature](https://github.com/hunt41lb/unified-room-card/issues)
- ⭐ Star the repository if you find it useful!

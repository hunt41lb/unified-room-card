# Unified Room Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A comprehensive room status card for Home Assistant that consolidates climate data, persistent entities (like locks and door sensors), and intermittent entities (like motion sensors) into a single, customizable card.

## Features

- **Unified room overview** - See temperature, humidity, air quality, and illuminance at a glance
- **Persistent entities** - Always-visible entities like locks, door/window sensors
- **Intermittent entities** - Conditionally visible entities like motion sensors, battery warnings, and firmware updates
- **Flexible grid layout** - Customize the card layout to fit your needs
- **Theme compatible** - Uses Home Assistant CSS variables for seamless theme integration
- **Visual editor** - Full GUI configuration support
- **Animations** - Pulse, glow, and flash effects for attention-grabbing alerts
- **Automatic calculations** - Average temperature, humidity, power consumption across multiple sensors

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add the repository URL and select "Lovelace" as the category
6. Search for "Unified Room Card" and install it
7. Refresh your browser

### Manual Installation

1. Download `unified-room-card.js` from the latest release
2. Copy it to your `config/www` folder
3. Add the resource in your Lovelace configuration:

```yaml
resources:
  - url: /local/unified-room-card.js
    type: module
```

## Configuration

### Basic Example

```yaml
type: custom:unified-room-card
name: Living Room
entity: light.living_room_main
icon: mdi:sofa
```

### Full Example

```yaml
type: custom:unified-room-card
name: Living Room
entity: light.living_room_main
icon: mdi:sofa
show_name: true
show_icon: true
show_state: false
show_img_cell: true
animate_icon: true

tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: navigate
  navigation_path: /lovelace/living-room

card_height: 97px
card_width: auto

climate_entities:
  primary_entity: sensor.living_room_temperature
  temperature_entities:
    - sensor.living_room_temperature
    - sensor.living_room_temperature_2
  humidity_entities:
    - sensor.living_room_humidity
  air_quality_entities:
    - sensor.living_room_aqi
  illuminance_entities:
    - sensor.living_room_illuminance
  decimal_places: 1

power_entities:
  entities:
    - sensor.living_room_power
  unit_handling: normalize

persistent_entities:
  position: left
  icon_size: 20px
  active_color: var(--primary-color)
  inactive_color: var(--disabled-text-color)
  animation: pulse
  entities:
    - entity: lock.front_door
      icon: mdi:lock
      states:
        - state: locked
          icon: mdi:lock
          color: var(--state-lock-locked-color)
        - state: unlocked
          icon: mdi:lock-open
          color: var(--state-lock-unlocked-color)
          animation: pulse

intermittent_entities:
  position: right
  icon_size: 18px
  active_color: var(--primary-color)
  active_states:
    - 'on'
  animation: glow
  entities:
    - entity: binary_sensor.living_room_motion
      icon: mdi:motion-sensor
      states:
        - state: 'on'
          color: var(--state-binary-sensor-on-color)

battery_entities:
  entities:
    - sensor.motion_sensor_battery
  low_threshold:
    threshold: 10
    icon: mdi:battery-10
    color: var(--state-sensor-battery-low-color)
  medium_threshold:
    threshold: 20
    icon: mdi:battery-20
    color: var(--state-sensor-battery-medium-color)

update_entities:
  entities:
    - update.motion_sensor_firmware
  icon: mdi:update
  color: var(--state-update-on-color)

grid:
  template_areas: '"name name icon icon" "climate climate persistent intermittent"'
  template_columns: 1fr 1fr 1fr 1fr
  template_rows: auto auto
```

## Configuration Options

### Main Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | `custom:unified-room-card` |
| `name` | string | - | Card name displayed in the top left |
| `entity` | string | - | Main entity for card state |
| `icon` | string | auto | Main icon (auto-detected from entity) |
| `show_name` | boolean | `true` | Show/hide card name |
| `show_icon` | boolean | `true` | Show/hide main icon |
| `show_state` | boolean | `false` | Show/hide entity state text |
| `show_img_cell` | boolean | `false` | Show circular background behind icon |
| `animate_icon` | boolean | `false` | Animate icon when entity is active |
| `card_height` | string | `97px` | Card height |
| `card_width` | string | `auto` | Card width |
| `grid_area` | string | - | Grid area name for placement |

### Tap Actions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tap_action` | object | `toggle` | Action on tap |
| `hold_action` | object | `none` | Action on hold |
| `double_tap_action` | object | `more-info` | Action on double tap |

Action types: `default`, `more-info`, `toggle`, `navigate`, `url`, `perform-action`, `assist`, `none`

### Climate Entities

| Option | Type | Description |
|--------|------|-------------|
| `primary_entity` | string | Primary display entity |
| `temperature_entities` | array | Temperature sensors (averaged) |
| `humidity_entities` | array | Humidity sensors (averaged) |
| `air_quality_entities` | array | AQI sensors (averaged) |
| `illuminance_entities` | array | Lux sensors (averaged) |
| `decimal_places` | number | Decimal places for values (default: 1) |

### Animations

Three animation types available: `pulse`, `glow`, `flash`

## Development

```bash
# Install dependencies
npm install

# Build for development (with watch)
npm run watch

# Build for production
npm run build

# Lint
npm run lint
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

If you find this card useful, consider starring the repository!

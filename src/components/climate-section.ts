/**
 * Climate Section Component
 * 
 * Renders temperature, humidity, air quality, illuminance, and power data.
 * Handles averaging calculations and unit normalization.
 */

import { html, TemplateResult, nothing } from 'lit';
import type { HomeAssistant, ClimateEntitiesConfig, PowerEntitiesConfig } from '../types';

// =============================================================================
// TYPES
// =============================================================================

interface AverageResult {
  value: number | null;
  unit: string;
  count: number;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if entity is unavailable
 */
function isUnavailable(entity: { state: string }): boolean {
  return ['unavailable', 'unknown'].includes(entity.state);
}

/**
 * Calculate average from multiple entity states
 */
function calculateAverage(
  hass: HomeAssistant,
  entityIds: string[],
  decimalPlaces: number = 1
): AverageResult {
  const values: number[] = [];
  let unit = '';

  for (const entityId of entityIds) {
    const entity = hass.states[entityId];
    if (!entity || isUnavailable(entity)) continue;

    const value = parseFloat(entity.state);
    if (!isNaN(value)) {
      values.push(value);
      if (!unit && entity.attributes.unit_of_measurement) {
        unit = entity.attributes.unit_of_measurement as string;
      }
    }
  }

  if (values.length === 0) {
    return { value: null, unit: '', count: 0 };
  }

  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  return {
    value: parseFloat(average.toFixed(decimalPlaces)),
    unit,
    count: values.length,
  };
}

// =============================================================================
// VALUE GETTERS
// =============================================================================

/**
 * Get primary entity value (can be any entity type)
 * Supports multiple entities with averaging
 * Auto-detects unit from entity attributes
 */
function getPrimaryValue(
  hass: HomeAssistant,
  config: ClimateEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.primary_entities || config.primary_entities.length === 0) {
    return null;
  }

  const result = calculateAverage(hass, config.primary_entities, decimalPlaces);
  if (result.value === null) return null;

  if (!showUnits || !result.unit) {
    return String(result.value);
  }

  // No space between value and unit for consistency
  return `${result.value}${result.unit}`;
}

/**
 * Get temperature value averaged from multiple entities
 * Only used if no primary_entities are specified
 */
function getTemperatureValue(
  hass: HomeAssistant,
  config: ClimateEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.temperature_entities || config.temperature_entities.length === 0) {
    return null;
  }

  const result = calculateAverage(hass, config.temperature_entities, decimalPlaces);
  if (result.value !== null) {
    // Always show °, but hide F/C if showUnits is false
    const unit = showUnits ? (result.unit || '°') : '°';
    return `${result.value}${unit}`;
  }

  return null;
}

/**
 * Get humidity value averaged from multiple entities
 */
function getHumidityValue(
  hass: HomeAssistant,
  config: ClimateEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.humidity_entities || config.humidity_entities.length === 0) {
    return null;
  }

  const result = calculateAverage(hass, config.humidity_entities, decimalPlaces);
  if (result.value !== null) {
    const unit = showUnits ? '%' : '';
    return `${result.value}${unit}`;
  }

  return null;
}

/**
 * Get air quality value averaged from multiple entities
 */
function getAirQualityValue(
  hass: HomeAssistant,
  config: ClimateEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.air_quality_entities || config.air_quality_entities.length === 0) {
    return null;
  }

  const result = calculateAverage(hass, config.air_quality_entities, decimalPlaces);
  if (result.value !== null) {
    const unit = showUnits && result.unit ? result.unit : '';
    return `${result.value}${unit}`;
  }

  return null;
}

/**
 * Get illuminance value averaged from multiple entities
 */
function getIlluminanceValue(
  hass: HomeAssistant,
  config: ClimateEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.illuminance_entities || config.illuminance_entities.length === 0) {
    return null;
  }

  const result = calculateAverage(hass, config.illuminance_entities, decimalPlaces);
  if (result.value !== null) {
    const unit = showUnits ? 'lx' : '';
    return `${result.value}${unit}`;
  }

  return null;
}

/**
 * Get power consumption value summed from multiple entities
 */
function getPowerValue(
  hass: HomeAssistant,
  config: PowerEntitiesConfig | undefined,
  decimalPlaces: number = 0,
  showUnits: boolean = true
): string | null {
  if (!config?.entities || config.entities.length === 0) {
    return null;
  }

  let totalWatts = 0;
  let validCount = 0;

  for (const entityId of config.entities) {
    const entity = hass.states[entityId];
    if (!entity || isUnavailable(entity)) continue;

    const value = parseFloat(entity.state);
    if (isNaN(value)) continue;

    const unitRaw = entity.attributes.unit_of_measurement;
    const unit = (typeof unitRaw === 'string' ? unitRaw : 'W').toLowerCase();
    
    // Normalize to watts
    if (unit === 'kw') {
      totalWatts += value * 1000;
    } else if (unit === 'mw') {
      totalWatts += value * 1000000;
    } else if (unit === 'gw') {
      totalWatts += value * 1000000000;
    } else {
      totalWatts += value;
    }
    validCount++;
  }

  if (validCount === 0) return null;

  // Format with appropriate unit (no space between value and unit)
  if (totalWatts >= 1000) {
    const kwValue = (totalWatts / 1000).toFixed(decimalPlaces);
    return showUnits ? `${kwValue}kW` : kwValue;
  }
  const wValue = totalWatts.toFixed(decimalPlaces);
  return showUnits ? `${wValue}W` : wValue;
}

// =============================================================================
// MAIN RENDER FUNCTION
// =============================================================================

/**
 * Render climate section (temperature, humidity, air quality, illuminance, power)
 */
export function renderClimateSection(
  hass: HomeAssistant,
  climateConfig?: ClimateEntitiesConfig,
  powerConfig?: PowerEntitiesConfig
): TemplateResult | typeof nothing {
  if (!climateConfig && !powerConfig) {
    return nothing;
  }

  const decimalPlaces = climateConfig?.decimal_places ?? 0;
  const powerDecimalPlaces = powerConfig?.decimal_places ?? 0;

  // Individual show unit settings (default to true)
  const showPrimaryUnit = climateConfig?.show_primary_unit !== false;
  const showTempUnit = climateConfig?.show_temperature_unit !== false;
  const showHumidityUnit = climateConfig?.show_humidity_unit !== false;
  const showAirQualityUnit = climateConfig?.show_air_quality_unit !== false;
  const showIlluminanceUnit = climateConfig?.show_illuminance_unit !== false;
  const showPowerUnit = powerConfig?.show_unit !== false;

  // Calculate primary value - check for primary_entities override first, then fall back to temperature
  let primaryValue: string | null = null;
  if (climateConfig?.primary_entities && climateConfig.primary_entities.length > 0) {
    primaryValue = getPrimaryValue(hass, climateConfig, decimalPlaces, showPrimaryUnit);
  }
  if (!primaryValue) {
    primaryValue = getTemperatureValue(hass, climateConfig, decimalPlaces, showTempUnit);
  }

  // Calculate secondary values
  const humidity = getHumidityValue(hass, climateConfig, decimalPlaces, showHumidityUnit);
  const airQuality = getAirQualityValue(hass, climateConfig, decimalPlaces, showAirQualityUnit);
  const illuminance = getIlluminanceValue(hass, climateConfig, decimalPlaces, showIlluminanceUnit);
  const power = getPowerValue(hass, powerConfig, powerDecimalPlaces, showPowerUnit);

  // Build secondary values array
  const secondaryValues: { label: string; value: string }[] = [];
  
  if (humidity) {
    secondaryValues.push({ label: 'humidity', value: humidity });
  }
  if (airQuality) {
    secondaryValues.push({ label: 'air quality', value: airQuality });
  }
  if (illuminance) {
    secondaryValues.push({ label: 'illuminance', value: illuminance });
  }
  if (power) {
    secondaryValues.push({ label: 'power', value: power });
  }

  return html`
    <div class="climate-section">
      ${primaryValue ? html`
        <span class="climate-primary">${primaryValue}</span>
      ` : nothing}
      ${secondaryValues.length > 0 ? html`
        <div class="climate-secondary">
          ${secondaryValues.map((item) => html`
            <span class="climate-value">${item.value}</span>
          `)}
        </div>
      ` : nothing}
    </div>
  `;
}

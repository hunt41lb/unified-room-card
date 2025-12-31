/**
 * Calculations Utility
 * 
 * Helper functions for calculating averages and normalizing units
 * across multiple sensor entities.
 */

import { HassEntity, HomeAssistant, ComputedPowerValue } from '../types';
import { POWER_UNITS, DEFAULT_CLIMATE_DECIMAL_PLACES, UNIT_HANDLING } from '../constants';
import { getNumericState, getUnitOfMeasurement, isUnavailable } from './entity-helpers';

/**
 * Calculate average value from multiple entities
 */
export function calculateAverage(
  hass: HomeAssistant,
  entityIds: string[],
  decimalPlaces: number = DEFAULT_CLIMATE_DECIMAL_PLACES
): { value: number | null; unit: string; count: number } {
  const values: number[] = [];
  let unit = '';

  for (const entityId of entityIds) {
    const entity = hass.states[entityId];
    if (!entity || isUnavailable(entity)) continue;

    const value = getNumericState(entity);
    if (value !== null) {
      values.push(value);
      if (!unit) {
        unit = getUnitOfMeasurement(entity);
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

/**
 * Format temperature with unit
 */
export function formatTemperature(
  value: number | null,
  unit: string,
  decimalPlaces: number = DEFAULT_CLIMATE_DECIMAL_PLACES
): string {
  if (value === null) return '--';
  return `${value.toFixed(decimalPlaces)}${unit}`;
}

/**
 * Format humidity with percentage
 */
export function formatHumidity(
  value: number | null,
  decimalPlaces: number = 0
): string {
  if (value === null) return '--%';
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Format illuminance with lux unit
 */
export function formatIlluminance(
  value: number | null,
  decimalPlaces: number = 0
): string {
  if (value === null) return '-- lx';
  return `${value.toFixed(decimalPlaces)} lx`;
}

/**
 * Format air quality index
 */
export function formatAirQuality(
  value: number | null,
  unit: string = '',
  decimalPlaces: number = 0
): string {
  if (value === null) return '--';
  const formatted = value.toFixed(decimalPlaces);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Normalize power value to base unit (Watts)
 */
export function normalizePowerValue(value: number, unit: string): number {
  const normalizedUnit = unit.toLowerCase().replace(/\s/g, '');
  
  // Check for known power units
  for (const [unitKey, multiplier] of Object.entries(POWER_UNITS)) {
    if (normalizedUnit === unitKey.toLowerCase()) {
      return value * multiplier;
    }
  }
  
  // Default to Watts if unit not recognized
  return value;
}

/**
 * Format power value with appropriate unit
 */
export function formatPower(watts: number): string {
  if (watts >= 1000000000000) {
    return `${(watts / 1000000000000).toFixed(2)} TW`;
  }
  if (watts >= 1000000000) {
    return `${(watts / 1000000000).toFixed(2)} GW`;
  }
  if (watts >= 1000000) {
    return `${(watts / 1000000).toFixed(2)} MW`;
  }
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(2)} kW`;
  }
  if (watts < 1) {
    return `${(watts * 1000).toFixed(0)} mW`;
  }
  return `${watts.toFixed(1)} W`;
}

/**
 * Calculate power consumption from multiple entities
 * Handles mixed units based on configuration
 */
export function calculatePowerConsumption(
  hass: HomeAssistant,
  entityIds: string[],
  unitHandling: string = UNIT_HANDLING.NORMALIZE
): ComputedPowerValue[] {
  if (unitHandling === UNIT_HANDLING.NORMALIZE) {
    // Normalize all to Watts and sum
    let totalWatts = 0;
    let validCount = 0;

    for (const entityId of entityIds) {
      const entity = hass.states[entityId];
      if (!entity || isUnavailable(entity)) continue;

      const value = getNumericState(entity);
      const unit = getUnitOfMeasurement(entity);

      if (value !== null) {
        totalWatts += normalizePowerValue(value, unit);
        validCount++;
      }
    }

    if (validCount === 0) {
      return [{ value: 0, unit: 'W' }];
    }

    return [{ value: totalWatts, unit: 'W' }];
  } else {
    // Keep separate by unit type
    const byUnit: Record<string, number[]> = {};

    for (const entityId of entityIds) {
      const entity = hass.states[entityId];
      if (!entity || isUnavailable(entity)) continue;

      const value = getNumericState(entity);
      const unit = getUnitOfMeasurement(entity) || 'W';

      if (value !== null) {
        if (!byUnit[unit]) {
          byUnit[unit] = [];
        }
        byUnit[unit].push(value);
      }
    }

    const results: ComputedPowerValue[] = [];
    for (const [unit, values] of Object.entries(byUnit)) {
      const sum = values.reduce((a, b) => a + b, 0);
      results.push({ value: sum, unit });
    }

    return results.length > 0 ? results : [{ value: 0, unit: 'W' }];
  }
}

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimalPlaces: number): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}

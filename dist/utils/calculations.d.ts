/**
 * Calculations Utility
 *
 * Helper functions for calculating averages and normalizing units
 * across multiple sensor entities.
 */
import { HomeAssistant, ComputedPowerValue } from '../types';
/**
 * Calculate average value from multiple entities
 */
export declare function calculateAverage(hass: HomeAssistant, entityIds: string[], decimalPlaces?: number): {
    value: number | null;
    unit: string;
    count: number;
};
/**
 * Format temperature with unit
 */
export declare function formatTemperature(value: number | null, unit: string, decimalPlaces?: number): string;
/**
 * Format humidity with percentage
 */
export declare function formatHumidity(value: number | null, decimalPlaces?: number): string;
/**
 * Format illuminance with lux unit
 */
export declare function formatIlluminance(value: number | null, decimalPlaces?: number): string;
/**
 * Format air quality index
 */
export declare function formatAirQuality(value: number | null, unit?: string, decimalPlaces?: number): string;
/**
 * Normalize power value to base unit (Watts)
 */
export declare function normalizePowerValue(value: number, unit: string): number;
/**
 * Format power value with appropriate unit
 */
export declare function formatPower(watts: number): string;
/**
 * Calculate power consumption from multiple entities
 * Handles mixed units based on configuration
 */
export declare function calculatePowerConsumption(hass: HomeAssistant, entityIds: string[], unitHandling?: string): ComputedPowerValue[];
/**
 * Round to specified decimal places
 */
export declare function roundTo(value: number, decimalPlaces: number): number;
//# sourceMappingURL=calculations.d.ts.map

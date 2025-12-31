/**
 * Entity Helpers Utility
 *
 * Helper functions for working with Home Assistant entities:
 * - State fetching
 * - Unit detection
 * - Domain extraction
 * - Icon resolution
 */
import { HassEntity } from '../types';
/**
 * Extract domain from entity ID
 */
export declare function getDomain(entityId: string): string;
/**
 * Extract object ID from entity ID
 */
export declare function getObjectId(entityId: string): string;
/**
 * Check if entity is in an unavailable state
 */
export declare function isUnavailable(entity: HassEntity | undefined): boolean;
/**
 * Check if entity is in an active state
 */
export declare function isActive(state: string): boolean;
/**
 * Get unit of measurement from entity attributes
 */
export declare function getUnitOfMeasurement(entity: HassEntity | undefined): string;
/**
 * Get numeric value from entity state
 */
export declare function getNumericState(entity: HassEntity | undefined): number | null;
/**
 * Get default icon for entity based on domain
 */
export declare function getDefaultIcon(entity: HassEntity | undefined): string;
/**
 * Get icon based on binary sensor device class
 */
export declare function getBinarySensorIcon(entity: HassEntity, stateOn: boolean): string;
//# sourceMappingURL=entity-helpers.d.ts.map
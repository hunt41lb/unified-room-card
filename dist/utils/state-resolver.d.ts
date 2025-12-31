/**
 * State Resolver Utility
 *
 * Helper functions for resolving and auto-populating entity states
 * based on entity type, state class, and history.
 */
import { HassEntity, StateConfig } from '../types';
/**
 * Get possible states for an entity
 * Auto-populates based on domain, device class, or state class
 */
export declare function getPossibleStates(entity: HassEntity | undefined): string[];
/**
 * Create default state configurations for an entity
 */
export declare function createDefaultStateConfigs(entity: HassEntity | undefined): StateConfig[];
/**
 * Get state label for display (human-readable)
 */
export declare function getStateLabel(state: string): string;
/**
 * Find matching state config for current entity state
 */
export declare function findStateConfig(currentState: string, stateConfigs: StateConfig[] | undefined): StateConfig | undefined;
/**
 * Resolve icon for entity based on state
 */
export declare function resolveIcon(entity: HassEntity, stateConfigs: StateConfig[] | undefined, defaultIcon?: string): string;
/**
 * Resolve color for entity based on state
 */
export declare function resolveColor(entity: HassEntity, stateConfigs: StateConfig[] | undefined, defaultColor?: string): string;
/**
 * Resolve animation for entity based on state
 */
export declare function resolveAnimation(entity: HassEntity, stateConfigs: StateConfig[] | undefined, defaultAnimation?: string): string;
//# sourceMappingURL=state-resolver.d.ts.map
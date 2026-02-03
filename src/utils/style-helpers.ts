/**
 * Style Helpers
 * unified-room-card/src/utils/style-helpers.ts
 *
 * Shared style utility functions for components.
 */

import {
  BADGE_POSITION_OPTIONS,
  type BadgePositionType,
} from '../constants';

// =============================================================================
// BADGE POSITIONING
// =============================================================================

/**
 * Get CSS position styles for badge placement
 * Used by battery-entities and update-entities for badge mode
 */
export function getBadgePositionStyles(position: BadgePositionType): Record<string, string> {
  switch (position) {
    case BADGE_POSITION_OPTIONS.TOP_LEFT:
      return { top: '-10px', left: '-10px', right: 'auto', bottom: 'auto' };
    case BADGE_POSITION_OPTIONS.BOTTOM_RIGHT:
      return { top: 'auto', left: 'auto', right: '-10px', bottom: '-10px' };
    case BADGE_POSITION_OPTIONS.BOTTOM_LEFT:
      return { top: 'auto', left: '-10px', right: 'auto', bottom: '-10px' };
    case BADGE_POSITION_OPTIONS.TOP_RIGHT:
    default:
      return { top: '-10px', left: 'auto', right: '-10px', bottom: 'auto' };
  }
}
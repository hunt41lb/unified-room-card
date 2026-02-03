/* Animations Component
 * unified-room-card/src/components/animations.ts
 * 
 * Reusable animation utilities for periodic and state-based animations.
 * Supports spin, pulse, glow, and flash effects.
 */

import { css } from 'lit';

// =============================================================================
// ANIMATION KEYFRAMES (CSS)
// =============================================================================

/**
 * CSS keyframes for all supported animations
 * Import and include in component styles
 */
export const animationKeyframes = css`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
      filter: drop-shadow(0 0 8px currentColor);
    }
  }

  @keyframes flash {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.3;
    }
  }
`;

/**
 * CSS classes for animations
 * Apply these classes to elements to trigger animations
 */
export const animationClasses = css`
  .animate-spin {
    animation: spin 1s ease-in-out;
  }

  .animate-spin-continuous {
    animation: spin 2s linear infinite;
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-flash {
    animation: flash 1s ease-in-out infinite;
  }
`;

// =============================================================================
// PERIODIC ANIMATION CONTROLLER
// =============================================================================

/**
 * Controller for periodic animations (e.g., spin every X seconds)
 * Usage:
 *   const controller = new PeriodicAnimationController(60, () => triggerSpin());
 *   controller.start();
 *   // Later...
 *   controller.stop();
 */
export class PeriodicAnimationController {
  private intervalId: number | null = null;
  private intervalSeconds: number;
  private callback: () => void;
  private isRunning: boolean = false;

  constructor(intervalSeconds: number, callback: () => void) {
    this.intervalSeconds = intervalSeconds;
    this.callback = callback;
  }

  /**
   * Start the periodic animation
   */
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    // Trigger immediately on start
    this.callback();
    
    // Then trigger at intervals
    this.intervalId = window.setInterval(() => {
      this.callback();
    }, this.intervalSeconds * 1000);
  }

  /**
   * Stop the periodic animation
   */
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  /**
   * Update the interval (restarts if running)
   */
  setInterval(seconds: number): void {
    this.intervalSeconds = seconds;
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  /**
   * Check if currently running
   */
  get running(): boolean {
    return this.isRunning;
  }
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export type AnimationName = 'spin' | 'pulse' | 'glow' | 'flash' | 'none';

/**
 * Get CSS class for animation name
 */
export function getAnimationClass(animation: AnimationName | string | undefined): string {
  switch (animation) {
    case 'spin':
      return 'animation-spin';
    case 'pulse':
      return 'animation-pulse';
    case 'glow':
      return 'animation-glow';
    case 'flash':
      return 'animation-flash';
    default:
      return '';
  }
}

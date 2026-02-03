/* Action Handler Utilities
 * unified-room-card/src/utils/action-handler.ts
 *
 * Functions for handling tap, hold, and double-tap actions.
 * These handle navigation, service calls, and Home Assistant events.
 * Most functions require hass and/or an element to dispatch events from.
 */

import type { HomeAssistant, TapActionConfig, UnifiedRoomCardConfig } from '../types';
import { getAllPrimaryEntities } from './entity-helpers';

// =============================================================================
// EVENT DISPATCHERS
// =============================================================================

/**
 * Fire the more-info dialog for an entity
 * @param element - Element to dispatch the event from (needed for event bubbling)
 * @param entityId - Entity ID to show info for
 */
export function fireMoreInfo(element: HTMLElement, entityId: string): void {
  const event = new CustomEvent('hass-more-info', {
    bubbles: true,
    composed: true,
    detail: { entityId },
  });
  element.dispatchEvent(event);
}

/**
 * Fire the assist dialog
 * @param element - Element to dispatch the event from
 */
export function fireAssist(element: HTMLElement): void {
  const event = new CustomEvent('hass-assist', {
    bubbles: true,
    composed: true,
  });
  element.dispatchEvent(event);
}

// =============================================================================
// NAVIGATION ACTIONS
// =============================================================================

/**
 * Navigate to a path within Home Assistant
 * @param path - Navigation path (e.g., '/lovelace/0', '/config/dashboard')
 */
export function navigate(path: string): void {
  window.history.pushState(null, '', path);
  const event = new CustomEvent('location-changed', {
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(event);
}

/**
 * Open a URL in a new browser tab
 * @param url - URL to open
 */
export function openUrl(url: string): void {
  window.open(url, '_blank');
}

// =============================================================================
// SERVICE CALLS
// =============================================================================

/**
 * Toggle an entity or group of entities
 * @param hass - Home Assistant instance
 * @param entityIds - Single entity ID or array of entity IDs
 */
export function toggleEntity(
  hass: HomeAssistant,
  entityIds: string | string[],
): void {
  hass.callService('homeassistant', 'toggle', {
    entity_id: entityIds,
  });
}

/**
 * Call a Home Assistant service
 * @param hass - Home Assistant instance
 * @param service - Service in format 'domain.service'
 * @param data - Service data
 */
export function callService(
  hass: HomeAssistant,
  service: string,
  data?: Record<string, unknown>,
): void {
  const [domain, serviceName] = service.split('.');
  hass.callService(domain, serviceName, data || {});
}

// =============================================================================
// UNIFIED ACTION EXECUTORS
// =============================================================================

/**
 * Execute an action for a specific entity
 * Used by persistent entities, intermittent entities, battery, update sections
 *
 * @param hass - Home Assistant instance
 * @param action - Action configuration
 * @param entityId - Entity ID to act on
 * @param element - Element to dispatch events from
 */
export function executeEntityAction(
  hass: HomeAssistant,
  action: TapActionConfig,
  entityId: string,
  element: HTMLElement,
): void {
  switch (action.action) {
    case 'more-info':
      fireMoreInfo(element, entityId);
      break;

    case 'toggle':
      toggleEntity(hass, entityId);
      break;

    case 'navigate':
      if (action.navigation_path) {
        navigate(action.navigation_path);
      }
      break;

    case 'url':
      if (action.url_path) {
        openUrl(action.url_path);
      }
      break;

    case 'perform-action':
      if (action.service) {
        callService(hass, action.service, action.service_data);
      }
      break;

    case 'assist':
      fireAssist(element);
      break;

    case 'none':
    default:
      break;
  }
}

/**
 * Execute an action for the main card
 * Handles actions that may affect multiple entities (entity groups)
 *
 * @param hass - Home Assistant instance
 * @param action - Action configuration
 * @param config - Card configuration (needed for entity groups)
 * @param element - Element to dispatch events from
 */
export function executeCardAction(
  hass: HomeAssistant,
  action: TapActionConfig,
  config: UnifiedRoomCardConfig,
  element: HTMLElement,
): void {
  const primaryEntityId = config.entity;
  const allEntities = getAllPrimaryEntities(config);

  switch (action.action) {
    case 'toggle':
      if (allEntities.length > 0) {
        // Toggle all entities in the group
        toggleEntity(hass, allEntities);
      }
      break;

    case 'more-info':
      if (primaryEntityId) {
        fireMoreInfo(element, primaryEntityId);
      }
      break;

    case 'navigate':
      if (action.navigation_path) {
        navigate(action.navigation_path);
      }
      break;

    case 'url':
      if (action.url_path) {
        openUrl(action.url_path);
      }
      break;

    case 'perform-action':
      if (action.service) {
        callService(hass, action.service, action.service_data);
      }
      break;

    case 'assist':
      fireAssist(element);
      break;

    case 'none':
    default:
      break;
  }
}
/**
 * Named-import runtime wrappers. These all delegate to `window.deskifier.*`
 * after asserting Deskifier is available. If the SDK is imported in a
 * non-Deskifier context (e.g. a browser preview), calls throw a clear error
 * rather than failing in some obscure way.
 *
 * Example:
 * ```ts
 * import { windows, menus } from '@deskifier/sdk';
 * await windows.create({ ... });
 * ```
 *
 * Equivalent to `window.deskifier.windows.create(...)`, just with an import-
 * friendly form and a guard.
 */

import { assertDeskifier } from './guard';
import type { DeskifierAPI } from '../types';

function api(): DeskifierAPI {
  assertDeskifier();
  return window.deskifier;
}

// We use Proxy to forward all method calls so the surface stays in sync with
// the DeskifierAPI interface without having to mirror each method manually.
function makeProxy<K extends keyof DeskifierAPI>(ns: K): DeskifierAPI[K] {
  return new Proxy({} as DeskifierAPI[K], {
    get(_target, prop) {
      const nsObj = api()[ns] as any;
      const value = nsObj?.[prop];
      if (typeof value === 'function') return value.bind(nsObj);
      return value;
    },
  });
}

export const windows = makeProxy('windows');
export const menus = makeProxy('menus');
export const tray = makeProxy('tray');
export const system = makeProxy('system');
export const applications = makeProxy('applications');
export const printers = makeProxy('printers');
export const shortcuts = makeProxy('shortcuts');
export const deeplink = makeProxy('deeplink');
export const permissions = makeProxy('permissions');
export const notifications = makeProxy('notifications');
export const purchases = makeProxy('purchases');
export const dock = makeProxy('dock');
export const filesystem = makeProxy('filesystem');
export const webSocket = makeProxy('webSocket');
export const dialog = makeProxy('dialog');
export const autoUpdate = makeProxy('autoUpdate');

export { isDeskifier, assertDeskifier } from './guard';

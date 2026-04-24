/**
 * Ambient declaration of `window.deskifier`. Importing the `@deskifier/sdk`
 * package anywhere in your project causes TypeScript to pick this up, giving
 * you full typing on `window.deskifier` everywhere.
 */

import type { DeskifierAPI } from './types';

declare global {
  interface Window {
    /**
     * The Deskifier bridge. Available only when the app is running inside a
     * Deskifier-wrapped desktop app. Use `isDeskifier()` to check at runtime.
     */
    deskifier: DeskifierAPI;
  }
}

// Marker export so this file is a module (enabling the `declare global` above).
export {};

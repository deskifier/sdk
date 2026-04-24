/**
 * @deskifier/sdk — TypeScript SDK for building apps on the Deskifier desktop platform.
 *
 * Importing this package anywhere in your project gives you:
 *
 * 1. **Ambient types** on `window.deskifier` (no import needed at call sites)
 * 2. **Named imports** for each namespace (`import { windows } from '@deskifier/sdk'`)
 * 3. **Runtime guards** (`isDeskifier()`, `assertDeskifier()`) for safely checking
 *    whether you're in a Deskifier environment
 *
 * @example Ambient usage
 * ```ts
 * import '@deskifier/sdk';
 *
 * await window.deskifier.windows.create({
 *   constructorOptions: { url: 'https://example.com' },
 *   windowProperties: { width: 800, height: 600 },
 * });
 * ```
 *
 * @example Named import usage
 * ```ts
 * import { windows, tray, isDeskifier } from '@deskifier/sdk';
 *
 * if (isDeskifier()) {
 *   await windows.create({ ... });
 * }
 * ```
 */

// Register the ambient `window.deskifier` declaration.
import './global';

// Re-export all public types.
export * from './types';

// Re-export the named-import runtime wrappers + guards.
export * from './runtime';

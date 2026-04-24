/**
 * Runtime guards for detecting whether code is running inside a Deskifier
 * environment. Use these before calling native APIs to avoid errors in
 * unit tests, browser previews, or non-Deskifier contexts.
 */

/**
 * Returns `true` if `window.deskifier` is available (i.e., the code is
 * running inside a Deskifier-wrapped app).
 */
export function isDeskifier(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).deskifier !== 'undefined';
}

/**
 * Throws a descriptive error if the code is NOT running inside a Deskifier
 * environment. Useful as the first line of any function that assumes
 * `window.deskifier` exists.
 *
 * @throws {Error} If `window.deskifier` is undefined.
 */
export function assertDeskifier(): void {
  if (!isDeskifier()) {
    throw new Error(
      '@deskifier/sdk: window.deskifier is not available. This code must run ' +
        'inside a Deskifier-wrapped desktop app.',
    );
  }
}

/**
 * Re-exports all public types from the Deskifier SDK. Import from here
 * (or from `@deskifier/sdk` directly) for any type you need.
 */

export * from './common.js';
export * from './app.js';
export * from './system.js';
export * from './windows.js';
export * from './webviews.js';
export * from './menus.js';
export * from './tray.js';
export * from './applications.js';
export * from './printers.js';
export * from './shortcuts.js';
export * from './deeplink.js';
export * from './permissions.js';
export * from './notifications.js';
export * from './purchases.js';
export * from './dock.js';
export * from './filesystem.js';
export * from './webSocket.js';
export * from './dialog.js';
export * from './autoUpdate.js';

// ── Top-level DeskifierAPI interface ──────────────────────────────────────────

import type { PlatformInfo } from './common.js';
import type { AppAPI } from './app.js';
import type { WindowsAPI } from './windows.js';
import type { WebviewsAPI } from './webviews.js';
import type { MenusAPI } from './menus.js';
import type { TrayAPI } from './tray.js';
import type { SystemAPI } from './system.js';
import type { ApplicationsAPI } from './applications.js';
import type { PrintersAPI } from './printers.js';
import type { ShortcutsAPI } from './shortcuts.js';
import type { DeeplinkAPI } from './deeplink.js';
import type { PermissionsAPI } from './permissions.js';
import type { NotificationsAPI } from './notifications.js';
import type { PurchasesAPI } from './purchases.js';
import type { DockAPI } from './dock.js';
import type { FilesystemAPI } from './filesystem.js';
import type { WebSocketAPI } from './webSocket.js';
import type { DialogAPI } from './dialog.js';
import type { AutoUpdateAPI } from './autoUpdate.js';

/**
 * The full shape of `window.deskifier` inside a Deskifier-wrapped app.
 *
 * See the namespace-specific types (`WindowsAPI`, `MenusAPI`, etc.) for the
 * methods and events each namespace exposes.
 */
export interface DeskifierAPI {
  /**
   * Static platform flags (synchronous).
   * App metadata is available asynchronously via `app.getAppInfo()`.
   */
  platform: PlatformInfo;

  // ── Escape hatches (legacy, for backwards compatibility) ──

  /** Generic IPC invoke — prefer the namespaced methods. */
  invoke(channel: string, data?: unknown): Promise<unknown>;

  /** Generic IPC send — prefer the namespaced methods. */
  send(channel: string, data: unknown): void;

  /** Generic IPC event listener — prefer the namespaced `on*` methods. */
  on(channel: string, handler: (...args: unknown[]) => void): void;

  // ── Legacy top-level path utilities (prefer `filesystem.path.*`) ──

  basename(pathStr: string, ext?: string): Promise<string>;
  extname(pathStr: string): Promise<string>;
  join(...paths: string[]): Promise<string>;
  relative(from: string, to: string): Promise<string>;
  normalize(pathStr: string): Promise<string>;
  resolve(...pathSegments: string[]): Promise<string>;
  dirname(pathStr: string): Promise<string>;
  separator(): Promise<string>;
  getPathForFile(files: File[]): Promise<{ success: boolean; message: string; paths: string[] }>;

  // ── Namespaced APIs ──

  app: AppAPI;
  windows: WindowsAPI;
  /** Embedded web content inside a window (template v3.0.5+; feature-detect in older apps). */
  webviews: WebviewsAPI;
  menus: MenusAPI;
  tray: TrayAPI;
  system: SystemAPI;
  applications: ApplicationsAPI;
  printers: PrintersAPI;
  shortcuts: ShortcutsAPI;
  deeplink: DeeplinkAPI;
  permissions: PermissionsAPI;
  notifications: NotificationsAPI;
  purchases: PurchasesAPI;
  dock: DockAPI;
  filesystem: FilesystemAPI;
  webSocket: WebSocketAPI;
  dialog: DialogAPI;
  autoUpdate: AutoUpdateAPI;
}

/**
 * Re-exports all public types from the Deskifier SDK. Import from here
 * (or from `@deskifier/sdk` directly) for any type you need.
 */

export * from './common';
export * from './app';
export * from './system';
export * from './windows';
export * from './menus';
export * from './tray';
export * from './applications';
export * from './printers';
export * from './shortcuts';
export * from './deeplink';
export * from './permissions';
export * from './notifications';
export * from './purchases';
export * from './dock';
export * from './filesystem';
export * from './webSocket';
export * from './dialog';
export * from './autoUpdate';

// ── Top-level DeskifierAPI interface ──────────────────────────────────────────

import type { PlatformInfo, AppInfoStatic } from './common';
import type { AppAPI } from './app';
import type { WindowsAPI } from './windows';
import type { MenusAPI } from './menus';
import type { TrayAPI } from './tray';
import type { SystemAPI } from './system';
import type { ApplicationsAPI } from './applications';
import type { PrintersAPI } from './printers';
import type { ShortcutsAPI } from './shortcuts';
import type { DeeplinkAPI } from './deeplink';
import type { PermissionsAPI } from './permissions';
import type { NotificationsAPI } from './notifications';
import type { PurchasesAPI } from './purchases';
import type { DockAPI } from './dock';
import type { FilesystemAPI } from './filesystem';
import type { WebSocketAPI } from './webSocket';
import type { DialogAPI } from './dialog';
import type { AutoUpdateAPI } from './autoUpdate';

/**
 * The full shape of `window.deskifier` inside a Deskifier-wrapped app.
 *
 * See the namespace-specific types (`WindowsAPI`, `MenusAPI`, etc.) for the
 * methods and events each namespace exposes.
 */
export interface DeskifierAPI {
  /** Static platform flags. */
  platform: PlatformInfo;

  /** Static app metadata (name, version, distribution, deeplink URL). */
  appInfo: AppInfoStatic;

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

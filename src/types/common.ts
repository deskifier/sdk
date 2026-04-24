/**
 * Common types used across all Deskifier SDK namespaces.
 */

/** A cleanup function returned by every `on*` event listener. Call it to stop listening. */
export type Unsubscribe = () => void;

/** Return shape common to most IPC methods. */
export type BaseResult = {
  success: boolean;
  message: string;
};

/** Platform flags for conditional logic. */
export type PlatformInfo = {
  isMacOs: boolean;
  isWindows: boolean;
  isLinux: boolean;
};

/** Metadata about the running Deskifier app — available synchronously via `window.deskifier.appInfo`. */
export type AppInfoStatic = {
  appName: string;
  appVersion: string;
  appBuild: string;
  launchAtStartup: boolean;
  launchedWithDeeplink: boolean;
  deeplinkUrl: string;
  autoUpdatesEnabled: boolean;
};

/** Distribution type the app was built as. */
export type DistributionType =
  | 'DEV'
  | 'MAS'
  | 'DMG'
  | 'APPX'
  | 'NSIS'
  | 'SNAP'
  | 'APPIMAGE'
  | 'LINUX-GENERIC'
  | 'UNKNOWN';

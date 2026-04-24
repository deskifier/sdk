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

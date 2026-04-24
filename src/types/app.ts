import type { BaseResult } from './common';

export type AppInfo = BaseResult & {
  appName: string;
  appVersion: string;
  appDist: string;
  launchAtStartup: boolean;
  launchedWithDeeplink: boolean;
  deeplinkUrl: string;
  willAutoUpdate: boolean;
};

/**
 * App-level lifecycle API. Exposed at `window.deskifier.app`.
 */
export interface AppAPI {
  /** Force-closes all windows and quits the app. */
  exit(): Promise<BaseResult>;

  /** Enables or disables launching the app on system startup. */
  setLaunchAtStartup(args: { launchAtStartup: boolean }): Promise<BaseResult>;

  /**
   * Returns metadata about the running app — name, version, distribution
   * type, deeplink state, and whether auto-updates are enabled.
   */
  getAppInfo(): Promise<AppInfo>;
}

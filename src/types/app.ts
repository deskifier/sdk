import type { BaseResult } from './common';

/**
 * Response shape of `app.getAppInfo()`. Always reflects the current
 * main-process state at the moment of the call.
 */
export type AppInfo = BaseResult & {
  appName?: string;
  appVersion?: string;
  appDist?: string;
  launchAtStartup?: boolean;
  launchedWithDeeplink?: boolean;
  deeplinkUrl?: string;
  willAutoUpdate?: boolean;
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
   * Returns current app metadata. **Synchronous** — safe to call in contexts
   * that require immediate values (e.g. plugin state initializers). Each call
   * reads live values, so the result is always fresh.
   */
  getAppInfo(): AppInfo;
}

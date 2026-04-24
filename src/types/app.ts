import type { BaseResult } from './common';

/**
 * App-level lifecycle API. Exposed at `window.deskifier.app`.
 */
export interface AppAPI {
  /** Force-closes all windows and quits the app. */
  exit(): Promise<BaseResult>;

  /** Enables or disables launching the app on system startup. */
  setLaunchAtStartup(args: { launchAtStartUp: boolean }): Promise<BaseResult>;
}

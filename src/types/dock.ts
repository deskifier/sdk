import type { BaseResult, Unsubscribe } from './common';

export type AppActivatedPayload = { hasVisibleWindows: boolean };
export type DockVisibilityPayload = { visible: boolean };

export interface DockAPI {
  show(): Promise<BaseResult>;
  hide(): Promise<BaseResult>;
  isVisible(): Promise<{ success: boolean; visible?: boolean }>;
  setIcon(args: { iconPath: string }): Promise<BaseResult>;

  onAppActivated(handler: (payload: AppActivatedPayload) => void): Unsubscribe;
  onVisibilityChanged(handler: (payload: DockVisibilityPayload) => void): Unsubscribe;
}

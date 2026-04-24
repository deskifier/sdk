import type { BaseResult, Unsubscribe } from './common';

export type ApplicationDetails = {
  id: number;
  title: string;
  processId: number;
  path: string;
  bounds?: { x: number; y: number; width: number; height: number };
  isVisible?: boolean;
  isWindow?: boolean;
  zOrder?: number;
  icon?: string | null;
};

export type OverlayStartOptions = {
  applicationId?: number;
  windowId?: string;
  refreshInterval?: number;
  idleRefreshInterval?: number;
};

export type OverlayStartResult = BaseResult & {
  windowId?: string;
  applicationId?: number | null;
  followsFocus?: boolean;
  refreshInterval?: number;
  idleRefreshInterval?: number;
};

export type OverlayStartedPayload = {
  windowId: string;
  applicationId: number | null;
  followsFocus: boolean;
  refreshInterval: number;
  idleRefreshInterval: number;
};

export type OverlayStopReason = 'manual' | 'replaced' | 'window-destroyed' | 'target-gone';

export type OverlayStoppedPayload = {
  windowId: string;
  reason: OverlayStopReason;
};

export interface ApplicationsAPI {
  getAll(): Promise<BaseResult & { applicationDetails?: ApplicationDetails[] }>;
  getActive(): Promise<BaseResult & { applicationDetails?: ApplicationDetails }>;
  bringToTop(args: { id: number }): Promise<BaseResult>;
  setBounds(args: { id: number; x?: number; y?: number; width?: number; height?: number }): Promise<BaseResult>;
  minimize(args: { id: number }): Promise<BaseResult>;
  restore(args: { id: number }): Promise<BaseResult>;
  maximize(args: { id: number }): Promise<BaseResult>;
  overlay(args?: OverlayStartOptions): Promise<OverlayStartResult>;
  stopOverlay(args?: { windowId?: string }): Promise<BaseResult>;
  getTrackedOverlays(): Promise<BaseResult & { overlays?: unknown[] }>;

  onExternalActivated(handler: (payload: { activeApplication: ApplicationDetails }) => void): Unsubscribe;
  onOverlayStarted(handler: (payload: OverlayStartedPayload) => void): Unsubscribe;
  onOverlayStopped(handler: (payload: OverlayStoppedPayload) => void): Unsubscribe;
}

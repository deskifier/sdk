import type { BaseResult, Unsubscribe } from './common';

export type TrayIconOptions = {
  url?: string;
  path?: string;
  darkModeSupport?: boolean;
};

export type TrayBalloonOptions = {
  iconType?: 'none' | 'info' | 'warning' | 'error' | 'custom';
  title: string;
  content: string;
};

export type TrayClickPayload = {
  trayId: string;
  event?: unknown;
  bounds?: { x: number; y: number; width: number; height: number };
  position?: { x: number; y: number };
};

export type TrayMousePayload = {
  trayId: string;
  event?: unknown;
  position?: { x: number; y: number };
};

export type TrayEnterLeavePayload = {
  trayId: string;
  event?: unknown;
  args?: unknown;
};

export type TrayIdPayload = { trayId: string };
export type TrayDropFilesPayload = { trayId: string; files: string[] };
export type TrayDropTextPayload = { trayId: string; text: string };

export interface TrayAPI {
  create(args?: { iconOptions?: TrayIconOptions }): Promise<BaseResult & { trayId?: string }>;
  destroy(args: { id: string }): Promise<BaseResult>;
  getAll(): Promise<BaseResult & { trays?: unknown[] }>;
  setIcon(args: { id: string; iconOptions: TrayIconOptions }): Promise<BaseResult>;
  setToolTip(args: { id: string; toolTip: string }): Promise<BaseResult>;
  setMenu(args: { trayId: string; menuId: string }): Promise<BaseResult>;
  setTitle(args: { id: string; title: string }): Promise<BaseResult>;
  getTitle(args: { trayId: string }): Promise<BaseResult & { title?: string }>;
  displayBalloon(args: { id: string; balloonOptions: TrayBalloonOptions }): Promise<BaseResult>;
  removeBalloon(args: { id: string }): Promise<BaseResult>;
  isDestroyed(args: { trayId: string }): Promise<BaseResult & { destroyed?: boolean }>;

  onClick(handler: (payload: TrayClickPayload) => void): Unsubscribe;
  onRightClick(handler: (payload: TrayClickPayload) => void): Unsubscribe;
  onDoubleClick(handler: (payload: TrayClickPayload) => void): Unsubscribe;
  onMiddleClick(handler: (payload: TrayClickPayload) => void): Unsubscribe;
  onBalloonShow(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onBalloonClick(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onBalloonClosed(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onDrop(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onDropFiles(handler: (payload: TrayDropFilesPayload) => void): Unsubscribe;
  onDropText(handler: (payload: TrayDropTextPayload) => void): Unsubscribe;
  onDragEnter(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onDragLeave(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onDragEnd(handler: (payload: TrayIdPayload) => void): Unsubscribe;
  onMouseUp(handler: (payload: TrayMousePayload) => void): Unsubscribe;
  onMouseDown(handler: (payload: TrayMousePayload) => void): Unsubscribe;
  onMouseMove(handler: (payload: TrayMousePayload) => void): Unsubscribe;
  onMouseEnter(handler: (payload: TrayEnterLeavePayload) => void): Unsubscribe;
  onMouseLeave(handler: (payload: TrayEnterLeavePayload) => void): Unsubscribe;
}

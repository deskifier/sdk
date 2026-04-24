import type { BaseResult, Unsubscribe } from './common';
import type { Rectangle } from './system';

// ── WindowProperties (runtime-updatable state) ────────────────────────────────

export interface WindowProperties {
  closable?: boolean;
  /** When true, user-initiated closes fire `onCloseAttempt` instead of actually closing. */
  interceptClose?: boolean;
  resizable?: boolean;
  kiosk?: boolean;
  width?: number;
  height?: number;
  fullscreen?: boolean;
  fullscreenable?: boolean;
  maximized?: boolean;
  alwaysOnTop?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  opacity?: number;
  title?: string;
  movable?: boolean;
  backgroundColor?: string;
  hasShadow?: boolean;
  show?: boolean;
  x?: number;
  y?: number;
  ignoreMouseEvents?: boolean;
  forwardMouseEvents?: boolean;
  skipTaskbar?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  visibleOnAllWorkspaces?: boolean;
  /** macOS: show/hide traffic light buttons. */
  trafficLightVisibility?: boolean;
  /** macOS: position the traffic light buttons. */
  trafficLightPosition?: { x: number; y: number };
  /** Windows/Linux: title bar overlay colors and height. */
  titleBarOverlay?: {
    color?: string;
    symbolColor?: string;
    height?: number;
  };
  /** macOS: vibrancy (blur) material. */
  vibrancy?:
    | 'appearance-based'
    | 'light'
    | 'dark'
    | 'titlebar'
    | 'selection'
    | 'menu'
    | 'popover'
    | 'sidebar'
    | 'medium-light'
    | 'ultra-dark'
    | 'header'
    | 'sheet'
    | 'window'
    | 'hud'
    | 'fullscreen-ui'
    | 'tooltip'
    | 'content'
    | 'under-window'
    | 'under-page'
    | null;
  /** Windows 11+: background material (mica, acrylic, etc.). */
  backgroundMaterial?: 'auto' | 'none' | 'mica' | 'acrylic' | 'tabbed';
}

// ── ConstructorOptions (creation-time options) ────────────────────────────────

export type TitleBarPreset =
  | 'Window Frame'
  | 'None'
  | 'Overlay'
  | 'Overlay Inset'
  | 'Custom Overlay';

export interface ConstructorOptions {
  url?: string;
  windowId?: string;
  frame?: boolean;
  titleBarStyle?: 'default' | 'hidden' | 'hiddenInset' | 'customButtonsOnHover';
  /** High-level titlebar preset — maps to frame + titleBarStyle combinations. */
  presetTitleBar?: TitleBarPreset;
  titleBarOverlay?: {
    color?: string;
    symbolColor?: string;
    height?: number;
  };
  trafficLightPosition?: { x: number; y: number };
  transparent?: boolean;
  show?: boolean;
  center?: boolean;
  /** Delay show until content has loaded (calls `window.show()` on `did-finish-load`). */
  showAfterLoading?: boolean;
}

// ── Event payloads ────────────────────────────────────────────────────────────

export type WindowEventPayload = { windowId: string };
export type FilesDroppedPayload = { paths: string[] };
export type WindowMessagePayload = { fromWindowId: string; message: string };

// ── API interface ─────────────────────────────────────────────────────────────

type WindowIdArg = { windowId?: string };

export interface WebContentsProperties {
  isDevToolsOpened: boolean;
  isDevToolsFocused: boolean;
  isLoading: boolean;
  isWaitingForResponse: boolean;
  currentURL: string;
  canGoBack: boolean;
  canGoForward: boolean;
  zoomFactor: number;
  zoomLevel: number;
  [key: string]: unknown;
}

export interface WindowsAPI {
  create(options: { constructorOptions: ConstructorOptions; windowProperties: WindowProperties }): Promise<BaseResult & { windowId?: string }>;
  destroy(args: { windowId: string }): Promise<BaseResult>;
  focus(args?: WindowIdArg): Promise<BaseResult>;
  blur(args?: WindowIdArg): Promise<BaseResult>;
  show(args?: WindowIdArg): Promise<BaseResult>;
  hide(args?: WindowIdArg): Promise<BaseResult>;
  maximize(args?: WindowIdArg): Promise<BaseResult>;
  unmaximize(args?: WindowIdArg): Promise<BaseResult>;
  minimize(args?: WindowIdArg): Promise<BaseResult>;
  restore(args?: WindowIdArg): Promise<BaseResult>;
  reload(args?: WindowIdArg): Promise<BaseResult>;
  toggleDevTools(args: { windowId?: string; show: boolean }): Promise<BaseResult>;
  center(args?: WindowIdArg): Promise<BaseResult>;
  navigateBack(args?: WindowIdArg): Promise<BaseResult>;
  navigateForward(args?: WindowIdArg): Promise<BaseResult>;
  sendMessage(args: { toWindowId: string; message: string }): Promise<BaseResult>;
  getCurrentId(): Promise<BaseResult & { windowId?: string }>;
  getAllIds(): Promise<BaseResult & { windowIds?: string[] }>;
  getProperties(args?: WindowIdArg): Promise<{ success: boolean; windowProperties?: WindowProperties & { bounds?: Rectangle } }>;
  updateProperties(args: { windowId?: string; windowProperties: WindowProperties }): Promise<BaseResult>;
  getWebContentsProperties(args?: WindowIdArg): Promise<{ success: boolean; webContentsProperties?: WebContentsProperties }>;
  subscribeToEvent(args: { windowID: string; windowEvent: string }): Promise<{ success: boolean; error?: string }>;
  executeJavaScript(args: { windowId?: string; code: string }): Promise<{ success: boolean; result?: unknown }>;
  startDrag(args: { filePaths: string[] }): Promise<BaseResult>;
  getDesktopCapturerSources(): Promise<Array<{ id: string; name: string; display_id?: string }>>;

  onCloseAttempt(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onContentsLoaded(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onUnresponsive(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onResponsive(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onBlurred(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onFocused(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onShown(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onHidden(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onReadyToShow(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onMaximized(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onUnmaximized(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onMinimized(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onRestored(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onResized(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onMoved(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onEnteredFullscreen(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onLeftFullscreen(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onEnteredHTMLFullscreen(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onLeftHTMLFullscreen(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onClosed(handler: (payload: WindowEventPayload) => void): Unsubscribe;
  onFilesDropped(handler: (payload: FilesDroppedPayload) => void): Unsubscribe;
  onFileDropCanceled(handler: () => void): Unsubscribe;
  onMessageReceived(handler: (payload: WindowMessagePayload) => void): Unsubscribe;
}

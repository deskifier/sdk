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
  /** macOS: vibrancy (blur) material. (Runtime property — only the modern
   *  material names; the deprecated `appearance-based`/`light`/`dark` family
   *  is constructor-only in Electron and not accepted here.) */
  vibrancy?:
    | 'titlebar'
    | 'selection'
    | 'menu'
    | 'popover'
    | 'sidebar'
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
  /** Toggle the Cmd/Ctrl+F find-in-page bar at runtime (per-window). */
  findInPage?: boolean;
  /** Toggle the built-in spell checker. Note: spell-check is session-level, so
   *  this affects windows sharing the same session. */
  spellcheck?: boolean;
  /** Toggle this window's right-click menus (default + custom) at runtime. When
   *  false, neither the default items nor any custom context menus fire. */
  contextMenuEnabled?: boolean;
}

// ── Page features (context menus) ─────────────────────────────────────────────

/** Which built-in items the default right-click menu shows (copy, save image,
 *  look up, spell-check suggestions, …). Omitted flags default to on. */
export interface DefaultContextMenuItems {
  showCopyLink?: boolean;
  showCopyImage?: boolean;
  showSaveImage?: boolean;
  showSaveImageAs?: boolean;
  showSaveVideo?: boolean;
  showSaveVideoAs?: boolean;
  showSaveLinkAs?: boolean;
  showCopyImageAddress?: boolean;
  showCopyVideoAddress?: boolean;
  showSelectAll?: boolean;
  showLearnSpelling?: boolean;
  showLookUpSelection?: boolean;
  showSearchWithGoogle?: boolean;
}

/** A custom menu (by its per-app `menuId` slug) shown on right-click, optionally
 *  limited to elements matching a CSS selector. Empty `selectors` = show on any
 *  right-click. */
export interface WindowContextMenuBinding {
  menuId: string;
  selectors: string[];
}

/**
 * A window's complete right-click configuration:
 *  - `enabled`: master switch — when false, NO menus fire (default or custom).
 *  - `defaultItems`: which built-in browser items appear.
 *  - `menus`: your custom menu-template menus, selector-targeted.
 */
export interface WindowContextMenuConfig {
  enabled?: boolean;
  defaultItems?: DefaultContextMenuItems;
  menus?: WindowContextMenuBinding[];
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

  // ── Page features (also configurable per-window in the dashboard) ──────────
  /** Attach the Cmd/Ctrl+F find-in-page bar to this window. */
  findInPage?: boolean;
  /** Enable the built-in spell checker (red-squiggle in editable fields). */
  spellcheck?: boolean;
  /** Right-click menu config: `enabled` master switch, `defaultItems` (which
   *  built-in items show), and `menus` (custom menu-template menus, selector-
   *  targeted). Null/omitted = default menu on, all items on, no custom menus. */
  contextMenu?: WindowContextMenuConfig | null;
}

// ── Event payloads ────────────────────────────────────────────────────────────

export type WindowEventPayload = { windowId: string };
export type FilesDroppedPayload = { paths: string[] };
export type WindowMessagePayload = { fromWindowId: string; message: string };

// ── API interface ─────────────────────────────────────────────────────────────

type WindowIdArg = { windowId?: string };

export interface WebContentsProperties {
  devToolsOpen: boolean;
  /** Current zoom factor (1 = 100%). */
  zoomLevel: number;
  url: string;
  title: string;
  loading: boolean;
  canNavigateBack: boolean;
  canNavigateForward: boolean;
}

export interface WindowsAPI {
  create(options: {
    /** Spawn from a dashboard-defined window template (by its per-app slug). */
    templateId?: string;
    constructorOptions?: ConstructorOptions;
    windowProperties?: WindowProperties;
  }): Promise<BaseResult & { windowId?: string }>;
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

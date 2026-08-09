/**
 * Types for the `webviews` namespace — embedded web content inside a window.
 *
 * A webview is a rectangle of web content layered over one of your windows
 * (unlike `windows.*`, which are native OS windows). Use it to wrap third-party
 * pages (an OAuth screen, an in-app browser) in your own chrome (a back button,
 * a URL bar) instead of navigating the window away.
 *
 * Security: embedded content is treated as untrusted — it does NOT receive the
 * Deskifier SDK and cannot call sensitive commands. With `messaging: true` it
 * gets only a message channel to your host page, which runs the actual logic.
 *
 * Availability: apps built from template v3.0.5+. If your page may also run in
 * older builds, feature-detect first: `if (window.deskifier.webviews) { ... }`.
 */

import type { BaseResult, Unsubscribe } from './common';

/** Absolute pixel rectangle inside the host window. */
export interface WebviewBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Fill the host window, inset by these edges (auto-resizes with the window). */
export interface WebviewInsets {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/** Navigation / lifecycle event emitted for a webview. Filter by `webviewId`. */
export interface WebviewEvent {
  webviewId: string;
  type: 'did-navigate' | 'did-fail-load' | 'page-title-updated' | 'loading';
  url?: string;
  canGoBack?: boolean;
  canGoForward?: boolean;
  title?: string;
  loading?: boolean;
  code?: number;
  description?: string;
}

export interface WebviewCreateOptions {
  /** Host window to attach to; defaults to the calling window. */
  hostWindowId?: string;
  /** Remote URL to load. */
  url?: string;
  /** Or inline app-owned HTML (loaded via a data: URL) — no hosting needed. */
  html?: string;
  /** Fixed pixel position, or… */
  bounds?: WebviewBounds;
  /** …cover the window inset by these edges, auto-resizing (e.g. `{ top: 44 }`
   *  for "everything below a 44px bar"). */
  fill?: WebviewInsets;
  backgroundColor?: string;
  /**
   * Enable the host↔webview message channel (`postMessage`/`onMessage`). Only
   * turn this on for content you trust to talk to your app (e.g. your own UI) —
   * a third-party page (OAuth) should be left off so it gets no bridge at all.
   * Even with it on, the webview gets NO capability access; it can only message
   * the host, which runs the actual logic.
   */
  messaging?: boolean;
}

/** Methods available on `window.deskifier.webviews`. */
export interface WebviewsAPI {
  /** Create a webview inside a host window. Returns `{ success, message, webviewId }`. */
  create(options: WebviewCreateOptions): Promise<BaseResult & { webviewId?: string }>;

  /** Navigate a webview to a URL. */
  loadURL(args: { webviewId: string; url: string }): Promise<BaseResult>;

  /** Go back in the webview's history (no-op if it can't). */
  goBack(args: { webviewId: string }): Promise<BaseResult>;

  /** Go forward in the webview's history (no-op if it can't). */
  goForward(args: { webviewId: string }): Promise<BaseResult>;

  /** Reload the webview. */
  reload(args: { webviewId: string }): Promise<BaseResult>;

  /** Stop the current load. */
  stop(args: { webviewId: string }): Promise<BaseResult>;

  /** Reposition a webview — fixed `bounds` or auto-filling `fill` insets. */
  setBounds(args: { webviewId: string; bounds?: WebviewBounds; fill?: WebviewInsets }): Promise<BaseResult>;

  /** Show a webview without recreating it. */
  show(args: { webviewId: string }): Promise<BaseResult>;

  /** Hide a webview without destroying it. */
  hide(args: { webviewId: string }): Promise<BaseResult>;

  /** Destroy a webview and remove it from its host window. */
  destroy(args: { webviewId: string }): Promise<BaseResult>;

  /** Send a message down to a webview's page (created with `messaging: true`). */
  postMessage(args: { webviewId: string; data: unknown }): Promise<BaseResult>;

  /**
   * Receive messages a webview posts up (via `window.deskifier.webview.postMessage`
   * inside the webview). `msg.webviewId` tells you which one. Returns unsubscribe.
   */
  onMessage(handler: (msg: { webviewId: string; data: unknown }) => void): Unsubscribe;

  /**
   * Subscribe to navigation/lifecycle events for webviews (did-navigate,
   * loading, page-title-updated, did-fail-load). Filter by `event.webviewId`.
   * Returns an unsubscribe function.
   */
  onEvent(handler: (event: WebviewEvent) => void): Unsubscribe;
}

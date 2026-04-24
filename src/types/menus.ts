import type { BaseResult, Unsubscribe } from './common';

export type MenuAttachmentType = 'menuBar' | 'contextMenu' | 'trayMenu' | 'dockMenu';

/** Keyboard accelerator string (e.g., `"CommandOrControl+Shift+K"`). */
export type Accelerator = string;

/** A single menu item. Mirrors Electron's MenuItemConstructorOptions with a few additions. */
export interface MenuItemOptions {
  id?: string;
  label?: string;
  role?: string;
  type?: 'normal' | 'separator' | 'submenu' | 'checkbox' | 'radio';
  enabled?: boolean;
  visible?: boolean;
  checked?: boolean;
  accelerator?: Accelerator;
  icon?: string;
  sublabel?: string;
  toolTip?: string;
  submenu?: MenuItemOptions[];
  acceleratorWorksWhenHidden?: boolean;
  registerAccelerator?: boolean;
}

export type MenuTemplate = MenuItemOptions[];

export type MenuObjectUpdatedPayload = { menus: unknown[] };

export type MenuItemClickedPayload = {
  menuId: string;
  itemId: string;
  contextId: string | undefined;
  label: string;
  checked: boolean;
};

export type ContextMenuEventPayload = { menuId: string | null };
export type PopupMenuClosedPayload = { menuId: string };

export interface MenusAPI {
  createContext(args: { template?: MenuTemplate; templateId?: string; id?: string; selectors?: string[] }): Promise<BaseResult & { menuId?: string }>;
  createTray(args: { template?: MenuTemplate; templateId?: string; id?: string; trayId: string }): Promise<BaseResult & { menuId?: string }>;
  createDock(args: { template?: MenuTemplate; templateId?: string; id?: string }): Promise<BaseResult & { menuId?: string }>;
  createMenubar(args: { template?: MenuTemplate; templateId?: string; id?: string; windowId?: string }): Promise<BaseResult & { menuId?: string }>;
  destroy(args: { menuId: string }): Promise<BaseResult>;
  attach(args: {
    menuId: string;
    type: MenuAttachmentType;
    trayId?: string;
    windowId?: string;
    selectors?: string[];
  }): Promise<BaseResult>;
  detach(args: { menuId: string; type: MenuAttachmentType }): Promise<BaseResult>;
  getAll(): Promise<BaseResult & { menus?: unknown[] }>;
  getAllSync(): unknown[];
  popup(args: { menuId: string; x?: number; y?: number; windowId?: string }): Promise<{ success: boolean }>;
  addTemplate(args: { id: string; name?: string; menuType?: MenuAttachmentType; template: MenuTemplate }): Promise<BaseResult>;
  deleteTemplate(args: { id: string }): Promise<BaseResult>;
  getAvailableTemplates(): Promise<BaseResult & { templates?: unknown[] }>;

  onObjectUpdated(handler: (payload: MenuObjectUpdatedPayload) => void): Unsubscribe;
  onItemClicked(handler: (payload: MenuItemClickedPayload) => void): Unsubscribe;
  onContextMenuOpened(handler: (payload: ContextMenuEventPayload) => void): Unsubscribe;
  onContextMenuClosed(handler: (payload: ContextMenuEventPayload) => void): Unsubscribe;
  onPopupClosed(handler: (payload: PopupMenuClosedPayload) => void): Unsubscribe;
}

import type { BaseResult, Unsubscribe } from './common';

export type ShortcutRegistration = {
  id: string;
  accelerator: string;
};

export type ShortcutTriggeredPayload = {
  id: string;
  accelerator: string;
};

export interface ShortcutsAPI {
  register(args: { id?: string; accelerator: string }): Promise<BaseResult & { id?: string; error?: string }>;
  unregister(args: { id: string }): Promise<BaseResult & { error?: string }>;
  unregisterAll(): Promise<BaseResult & { error?: string }>;
  getAll(): Promise<BaseResult & { shortcuts?: ShortcutRegistration[] }>;
  onTriggered(handler: (payload: ShortcutTriggeredPayload) => void): Unsubscribe;
}

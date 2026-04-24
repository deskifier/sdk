import type { BaseResult } from './common';
import type { FileFilter } from './filesystem';

export type OpenDialogOptions = {
  title?: string;
  defaultPath?: string;
  buttonLabel?: string;
  filters?: FileFilter[];
  openFile?: boolean;
  openDirectory?: boolean;
  multiSelections?: boolean;
  showHiddenFiles?: boolean;
  createDirectory?: boolean;
  promptToCreate?: boolean;
  treatPackageAsDirectory?: boolean;
  dontAddToRecent?: boolean;
};

export type DialogSaveOptions = {
  title?: string;
  defaultPath?: string;
  buttonLabel?: string;
  filters?: FileFilter[];
  message?: string;
  nameFieldLabel?: string;
  showsTagField?: boolean;
  showHiddenFiles?: boolean;
  createDirectory?: boolean;
  treatPackageAsDirectory?: boolean;
  dontAddToRecent?: boolean;
};

export type MessageBoxOptions = {
  message: string;
  type?: 'none' | 'info' | 'error' | 'question' | 'warning';
  buttons?: string[];
  defaultId?: number;
  title?: string;
  detail?: string;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  cancelId?: number;
  noLink?: boolean;
  normalizeAccessKeys?: boolean;
};

export type ErrorBoxOptions = {
  title: string;
  content: string;
};

export interface DialogAPI {
  showOpen(args?: OpenDialogOptions): Promise<BaseResult & { canceled: boolean; filePaths: string[] }>;
  showSave(args?: DialogSaveOptions): Promise<BaseResult & { canceled: boolean; filePath: string }>;
  showMessageBox(args: MessageBoxOptions): Promise<BaseResult & { response: number; checkboxChecked: boolean }>;
  showError(args: ErrorBoxOptions): Promise<BaseResult>;
}

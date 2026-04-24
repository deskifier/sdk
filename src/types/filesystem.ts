import type { BaseResult, Unsubscribe } from './common';

export interface FileInfo {
  name: string;
  extension: string;
  directory: string;
  path: string;
  isFile: boolean;
  isDirectory: boolean;
}

export type DefaultDirectories = {
  desktop: string;
  documents: string;
  downloads: string;
  music: string;
  pictures: string;
  videos: string;
  appData: string;
  temp: string;
  exe: string;
};

export type FileStats = {
  size: number;
  sizeHuman: string;
  extension: string;
  parentDirectory: string;
  fileName: string;
  isFile: boolean;
  isDirectory: boolean;
  createdAt: string;
  modifiedAt: string;
  accessedAt: string;
};

export type AccessPermissions = {
  readable: boolean;
  writable: boolean;
  executable: boolean;
};

export type DriveInfo = {
  mount: string;
  fs: string;
  size: number;
  used: number;
  use: number;
  label?: string;
  rw?: boolean;
};

export type FileFilter = {
  name: string;
  extensions: string[];
};

export type SaveDialogOptions = {
  title?: string;
  defaultPath?: string;
  buttonLabel?: string;
  filters?: FileFilter[];
  message?: string;
  nameFieldLabel?: string;
  showsTagField?: boolean;
  properties?: string[];
};

export type DownloadOptions = {
  url: string;
  dialogOptions?: SaveDialogOptions;
};

export type DownloadProgressPayload = {
  id: string;
  percentCompleted: number;
  savePath: string;
  mimeType: string;
  fileName: string;
  state: string;
  transferredBytes: number;
  totalBytes: number;
  speed: number;
  transferredHuman: string;
  totalHuman: string;
  speedHuman: string;
  isPaused: boolean;
  canResume: boolean;
};

export type DownloadIdPayload = { id: string };

export type PathUpdatePayload = {
  watchId: string;
  eventType: 'rename' | 'change';
  filename: string | null;
  path: string;
};

export interface FilesystemPathAPI {
  basename(pathStr: string, ext?: string): Promise<string>;
  extname(pathStr: string): Promise<string>;
  join(...paths: string[]): Promise<string>;
  relative(from: string, to: string): Promise<string>;
  normalize(pathStr: string): Promise<string>;
  resolve(...pathSegments: string[]): Promise<string>;
  dirname(pathStr: string): Promise<string>;
  sep(): Promise<string>;
}

export interface FilesystemAPI {
  getDefaultDirectories(): Promise<BaseResult & { directories?: DefaultDirectories }>;
  createThumbnail(args: { path: string; size: { width: number; height: number } }): Promise<BaseResult & { dataURL?: string }>;
  uploadFile(args: { windowID?: string; filePaths: string[]; selector: string }): Promise<BaseResult>;
  readDirectory(args: { path: string }): Promise<BaseResult & { files?: FileInfo[] }>;
  getDrives(): Promise<BaseResult & { drives?: DriveInfo[] }>;
  showInFolder(args: { path: string }): Promise<BaseResult>;
  createDirectory(args: { path: string; dirName: string }): Promise<BaseResult>;
  readFile(args: { path: string }): Promise<{ success: boolean; content?: string }>;
  writeFile(args: { path: string; content: string }): Promise<BaseResult>;
  renameFile(args: { path: string; newFileName: string }): Promise<BaseResult>;
  createFile(args: { path: string }): Promise<BaseResult>;
  moveFile(args: { path: string; destinationPath: string }): Promise<BaseResult>;
  trashFile(args: { path: string }): Promise<BaseResult>;
  checkAccess(args: { path: string }): Promise<BaseResult & { permissions?: AccessPermissions; isInAllowedDirectory?: boolean }>;
  getStats(args: { path: string }): Promise<BaseResult & { stats?: FileStats }>;
  watch(args: { path: string; recursive?: boolean }): Promise<BaseResult & { watchId?: string }>;
  unwatch(args: { watchId: string }): Promise<BaseResult>;
  requestDownload(args: DownloadOptions): Promise<BaseResult>;
  cancelDownload(args: { downloadId: string }): Promise<BaseResult>;
  pauseDownload(args: { downloadId: string }): Promise<BaseResult>;
  resumeDownload(args: { downloadId: string }): Promise<BaseResult>;
  getAllowedPaths(): Promise<{ success: boolean; directoryRoots?: string[]; explicitFiles?: string[]; explicitDirectories?: string[] }>;
  path: FilesystemPathAPI;

  onPathUpdate(handler: (payload: PathUpdatePayload) => void): Unsubscribe;
  onDownloadStarted(handler: (payload: DownloadProgressPayload) => void): Unsubscribe;
  onDownloadUpdated(handler: (payload: DownloadProgressPayload) => void): Unsubscribe;
  onDownloadCompleted(handler: (payload: DownloadIdPayload) => void): Unsubscribe;
  onDownloadCanceled(handler: (payload: DownloadIdPayload) => void): Unsubscribe;
}

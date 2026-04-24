import type { BaseResult } from './common';

export type PermissionName = 'camera' | 'microphone' | 'screenSharing' | 'accessiblity';

export type SettingsTarget = 'camera' | 'microphone' | 'screenSharing' | 'accessibility' | 'notification';

export type PermissionStatus = 'not-determined' | 'granted' | 'denied' | 'restricted' | 'unknown';

export type PermissionsSnapshot = {
  success: boolean;
  cameraPermissionStatus: PermissionStatus;
  microphonePermissionStatus: PermissionStatus;
  screenPermissionStatus: PermissionStatus;
  notificationPermissionStatus: PermissionStatus;
  accessibilityPermissionStatus: PermissionStatus;
};

export interface PermissionsAPI {
  request(args: { permission: PermissionName }): Promise<BaseResult>;
  getAll(): Promise<PermissionsSnapshot>;
  openSystemPreferences(args: { target: SettingsTarget }): Promise<BaseResult>;
}

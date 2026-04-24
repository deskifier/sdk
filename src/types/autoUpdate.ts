import type { BaseResult, Unsubscribe } from './common';

export type UpdateProgressPayload = {
  percent: number;
  transferred: number;
  total: number;
  bytesPerSecond: number;
};

export type UpdateAvailablePayload = {
  updateAvailable: boolean;
  nextVersion?: string;
  downloaded: boolean;
};

export type UpdateErrorPayload = { message: string };

export interface AutoUpdateAPI {
  check(): Promise<BaseResult & { updateAvailable?: boolean; nextVersion?: string }>;
  startUpdate(): Promise<BaseResult>;

  onProgress(handler: (payload: UpdateProgressPayload) => void): Unsubscribe;
  onAvailable(handler: (payload: UpdateAvailablePayload) => void): Unsubscribe;
  onError(handler: (payload: UpdateErrorPayload) => void): Unsubscribe;
}

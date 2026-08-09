import type { Unsubscribe } from './common.js';

export type DeeplinkPayload = { url: string };

export interface DeeplinkAPI {
  onUsed(handler: (payload: DeeplinkPayload) => void): Unsubscribe;
}

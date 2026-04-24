import type { Unsubscribe } from './common';

export type DeeplinkPayload = { url: string };

export interface DeeplinkAPI {
  onUsed(handler: (payload: DeeplinkPayload) => void): Unsubscribe;
}

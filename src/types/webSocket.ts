import type { BaseResult, Unsubscribe } from './common';

export type WebSocketServerStatus = {
  isRunning: boolean;
  clientIds: string[];
  port: number;
};

export type ClientConnectedPayload = { id: string };
export type ClientDisconnectedPayload = { id: string };
export type WebSocketMessagePayload = { id: string; content: string };

export interface WebSocketAPI {
  startServer(args: { possiblePorts: number[]; token: string }): Promise<{ success: boolean; port?: number }>;
  stopServer(): Promise<BaseResult>;
  getServer(): Promise<WebSocketServerStatus>;
  broadcast(args: { message: string }): Promise<BaseResult>;
  send(args: { clientId: string; message: string }): Promise<BaseResult>;

  onClientConnected(handler: (payload: ClientConnectedPayload) => void): Unsubscribe;
  onClientDisconnected(handler: (payload: ClientDisconnectedPayload) => void): Unsubscribe;
  onMessage(handler: (payload: WebSocketMessagePayload) => void): Unsubscribe;
}

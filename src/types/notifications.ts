import type { BaseResult, Unsubscribe } from './common';

export type NotificationOptions = {
  notificationId?: string;
  title: string;
  body: string;
  silent?: boolean;
  iconDataURL?: string;
  subtitle?: string;
  hasReply?: boolean;
  replyPlaceholder?: string;
  closeButtonText?: string;
  timeoutType?: 'default' | 'never';
  toastXml?: string;
};

export type NotificationClickedPayload = { notificationId: string };
export type NotificationReplyPayload = { notificationId: string; reply: string };

export interface NotificationsAPI {
  create(args: NotificationOptions): Promise<BaseResult & { notificationId?: string }>;
  setBadgeCount(args: { count: number }): Promise<BaseResult>;
  flashFrame(args: { flash: boolean; windowId?: string }): Promise<BaseResult>;

  onClicked(handler: (payload: NotificationClickedPayload) => void): Unsubscribe;
  onReply(handler: (payload: NotificationReplyPayload) => void): Unsubscribe;
}

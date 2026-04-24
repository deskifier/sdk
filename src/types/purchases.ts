import type { BaseResult, Unsubscribe } from './common';

export type PurchaseArgs = {
  productId: string;
  quantity?: number;
  username?: string;
};

export type TransactionUpdatedPayload = {
  transactions: unknown[];
};

export interface PurchasesAPI {
  purchase(args: PurchaseArgs): Promise<BaseResult>;
  restore(): Promise<BaseResult>;
  finish(args: { transactionDateIso: string }): Promise<BaseResult>;
  finishAll(): Promise<BaseResult>;
  getProducts(args: { productIds: string[] }): Promise<BaseResult & { products?: unknown[] }>;
  getActiveTransactions(): Promise<BaseResult & { activeTransactions?: unknown[] }>;
  getReceiptUrl(): Promise<BaseResult & { receiptUrl?: string }>;
  canMakePayments(): Promise<{ canMakePayments: boolean }>;

  onTransactionUpdated(handler: (payload: TransactionUpdatedPayload) => void): Unsubscribe;
}

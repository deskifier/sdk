import type { BaseResult } from './common';
import type { SystemPrinterBase } from './system';

// Re-export so users can `import { SystemPrinter } from '@deskifier/sdk'`
export type SystemPrinter = SystemPrinterBase;
export type { PrinterStatus } from './system';

export type Margins = {
  marginType?: 'default' | 'none' | 'printableArea' | 'custom';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type PrintOptions = {
  windowId?: string;
  silent?: boolean;
  printBackground?: boolean;
  deviceName?: string;
  color?: boolean;
  margins?: Margins;
  landscape?: boolean;
  scaleFactor?: number;
  pagesPerSheet?: number;
  collate?: boolean;
  copies?: number;
  pageRanges?: { from: number; to: number }[];
  duplexMode?: 'simplex' | 'shortEdge' | 'longEdge';
  dpi?: { horizontal: number; vertical: number };
  header?: string;
  footer?: string;
  pageSize?: string | { height: number; width: number };
};

export type PrintToPdfOptions = {
  windowId?: string;
  filePath: string;
  landscape?: boolean;
  displayHeaderFooter?: boolean;
  printBackground?: boolean;
  scale?: number;
  pageSize?: string | { height: number; width: number };
  margins?: { top?: number; bottom?: number; left?: number; right?: number };
  pageRanges?: string;
  headerTemplate?: string;
  footerTemplate?: string;
  preferCSSPageSize?: boolean;
};

export interface PrintersAPI {
  getAll(): Promise<BaseResult & { printers?: SystemPrinter[] }>;
  print(args?: PrintOptions): Promise<BaseResult>;
  printToPdf(args: PrintToPdfOptions): Promise<BaseResult & { path?: string }>;
}

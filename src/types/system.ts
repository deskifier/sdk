import type { BaseResult, Unsubscribe, PlatformInfo } from './common';

// ── Display (re-declared from Electron to avoid depending on @types/electron in the SDK) ─

export type Point = { x: number; y: number };

export type Rectangle = { x: number; y: number; width: number; height: number };

/** An individual screen attached to the system. */
export type Display = {
  accelerometerSupport: 'available' | 'unavailable' | 'unknown';
  bounds: Rectangle;
  colorDepth: number;
  colorSpace: string;
  depthPerComponent: number;
  detected: boolean;
  displayFrequency: number;
  id: number;
  internal: boolean;
  label: string;
  monochrome: boolean;
  nativeOrigin: Point;
  rotation: number;
  scaleFactor: number;
  size: { width: number; height: number };
  touchSupport: 'available' | 'unavailable' | 'unknown';
  workArea: Rectangle;
  workAreaSize: { width: number; height: number };
};

export type ScreenData = {
  screenID: number;
  rotation: number;
  scaleFactor: number;
  displayFrequency: number;
  displayHeight: number;
  displayWidth: number;
  workAreaHeight: number;
  workAreaWidth: number;
  isPrimaryDisplay: boolean;
};

export type ProcessMemoryInfo = {
  residentSet: number;
  private: number;
  shared: number;
};

// ── Normalized SystemDetails ─────────────────────────────────────────────────

export interface SystemOSInfo {
  platform: string;
  distro: string;
  release: string;
  codename: string;
  kernel: string;
  arch: string;
  hostname: string;
  fqdn: string;
  codepage: string;
  serial: string;
  build: string;
  servicepack: string;
  uefi: boolean;
  hypervisor: boolean;
  remoteSession: boolean;
}

export interface SystemHardwareInfo {
  manufacturer: string;
  model: string;
  version: string;
  serial: string;
  uuid: string;
  sku: string;
  virtual: boolean;
  virtualHost: string;
  raspberry: string;
}

export interface SystemBiosInfo {
  vendor: string;
  version: string;
  releaseDate: string;
  revision: string;
  serial: string;
  language: string;
  features: string[];
}

export interface SystemBaseboardInfo {
  manufacturer: string;
  model: string;
  version: string;
  serial: string;
  assetTag: string;
  memMax: number;
  memSlots: number;
}

export interface SystemChassisInfo {
  manufacturer: string;
  model: string;
  type: string;
  version: string;
  serial: string;
  assetTag: string;
  sku: string;
}

export interface SystemUuidInfo {
  os: string;
  hardware: string;
  macs: string[];
}

export interface SystemVersionsInfo {
  kernel: string;
  openssl: string;
  systemOpenssl: string;
  systemOpensslLib: string;
  node: string;
  v8: string;
  npm: string;
  yarn: string;
  pm2: string;
  gulp: string;
  grunt: string;
  git: string;
  tsc: string;
  mysql: string;
  redis: string;
  mongodb: string;
  apache: string;
  nginx: string;
  php: string;
  docker: string;
  postfix: string;
  postgresql: string;
  perl: string;
  python: string;
  python3: string;
  pip: string;
  pip3: string;
  java: string;
  gcc: string;
  virtualbox: string;
  dotnet: string;
}

export interface SystemCpuCacheInfo {
  l1d: number;
  l1i: number;
  l2: number;
  l3: number;
}

export interface SystemCpuInfo {
  manufacturer: string;
  brand: string;
  vendor: string;
  family: string;
  model: string;
  stepping: string;
  revision: string;
  voltage: string;
  speed: number;
  speedMin: number;
  speedMax: number;
  governor: string;
  cores: number;
  physicalCores: number;
  performanceCores: number;
  efficiencyCores: number;
  processors: number;
  socket: string;
  flags: string;
  virtualization: boolean;
  cache: SystemCpuCacheInfo;
}

export interface SystemGraphicsController {
  vendor: string;
  subVendor: string;
  model: string;
  bus: string;
  busAddress: string;
  vram: number;
  vramDynamic: boolean;
  external: boolean;
  cores: number;
  metalVersion: string;
  subDeviceId: string;
  driverVersion: string;
  name: string;
  pciBus: string;
  fanSpeed: number;
  memoryTotal: number;
  memoryUsed: number;
  memoryFree: number;
  utilizationGpu: number;
  utilizationMemory: number;
  temperatureGpu: number;
  temperatureMemory: number;
  powerDraw: number;
  powerLimit: number;
  clockCore: number;
  clockMemory: number;
}

export interface SystemGraphicsDisplay {
  vendor: string;
  vendorId: string;
  deviceName: string;
  model: string;
  main: boolean;
  builtin: boolean;
  connection: string;
  sizeX: number;
  sizeY: number;
  pixelDepth: number;
  resolutionX: number;
  resolutionY: number;
  currentResX: number;
  currentResY: number;
  positionX: number;
  positionY: number;
  currentRefreshRate: number;
}

export interface SystemGraphicsInfo {
  controllers: SystemGraphicsController[];
  displays: SystemGraphicsDisplay[];
}

export interface SystemMemoryModule {
  size: number;
  bank: string;
  type: string;
  ecc: boolean;
  clockSpeed: number;
  formFactor: string;
  manufacturer: string;
  partNum: string;
  serialNum: string;
  voltageConfigured: number;
  voltageMin: number;
  voltageMax: number;
}

export interface SystemDisk {
  device: string;
  type: string;
  name: string;
  vendor: string;
  size: number;
  bytesPerSector: number;
  totalCylinders: number;
  totalHeads: number;
  totalSectors: number;
  totalTracks: number;
  tracksPerCylinder: number;
  sectorsPerTrack: number;
  firmwareRevision: string;
  serialNum: string;
  interfaceType: string;
  smartStatus: string;
  temperature: number;
}

export interface SystemNetworkInterface {
  iface: string;
  ifaceName: string;
  default: boolean;
  ip4: string;
  ip4subnet: string;
  ip6: string;
  ip6subnet: string;
  mac: string;
  internal: boolean;
  virtual: boolean;
  operstate: string;
  type: string;
  duplex: string;
  mtu: number;
  speed: number;
  dhcp: boolean;
  dnsSuffix: string;
  ieee8021xAuth: string;
  ieee8021xState: string;
  carrierChanges: number;
}

export interface SystemUsbDevice {
  id: string;
  bus: string;
  deviceId: string;
  name: string;
  type: string;
  removable: boolean;
  vendor: string;
  manufacturer: string;
  maxPower: string;
  serialNumber: string;
}

export interface SystemAudioDevice {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  revision: string;
  driver: string;
  default: boolean;
  channel: string;
  type: string;
  in: boolean;
  out: boolean;
  interfaceType: string;
  status: string;
}

export interface SystemBluetoothDevice {
  device: string;
  name: string;
  manufacturer: string;
  macDevice: string;
  macHost: string;
  batteryPercent: number;
  type: string;
  connected: boolean;
}

export interface SystemPrinterBase {
  id: number;
  name: string;
  model: string;
  uri: string;
  uuid: string;
  status: PrinterStatus;
  rawStatus: string;
  local: boolean;
  default: boolean;
  shared: boolean;
  published: boolean;
}

/** Canonical printer statuses — normalized across OSes. */
export type PrinterStatus =
  | 'idle'
  | 'printing'
  | 'warming-up'
  | 'stopped'
  | 'offline'
  | 'unknown';

export interface SystemDetails {
  libVersion: string;
  os: SystemOSInfo;
  system: SystemHardwareInfo;
  bios: SystemBiosInfo;
  baseboard: SystemBaseboardInfo;
  chassis: SystemChassisInfo;
  uuid: SystemUuidInfo;
  versions: SystemVersionsInfo;
  cpu: SystemCpuInfo;
  graphics: SystemGraphicsInfo;
  memLayout: SystemMemoryModule[];
  diskLayout: SystemDisk[];
  net: SystemNetworkInterface[];
  usb: SystemUsbDevice[];
  printer: SystemPrinterBase[];
  audio: SystemAudioDevice[];
  bluetooth: SystemBluetoothDevice[];
}

// ── Convenience return shapes ─────────────────────────────────────────────────

export type MemoryInfo = BaseResult & {
  total: number;
  free: number;
  totalHuman: string;
  freeHuman: string;
  swapTotal?: number | null;
  swapFree?: number | null;
};

// ── API interface ─────────────────────────────────────────────────────────────

/** System-level API surface. Exposed at `window.deskifier.system`. */
export interface SystemAPI {
  getDetails(): Promise<BaseResult & { details?: SystemDetails }>;
  getPlatform(): Promise<PlatformInfo>;
  getVersion(): Promise<BaseResult & { versionSpecific?: string; versionGeneric?: string }>;
  getColor(args: { element: string }): Promise<BaseResult & { color?: string }>;
  getAccentColor(): Promise<BaseResult & { accentColor?: string }>;
  getSystemColor(args: { color: string }): Promise<BaseResult & { color?: string }>;
  getCursorPoint(): Promise<BaseResult & { point?: Point }>;
  getPrimaryDisplay(): Promise<BaseResult & { display?: Display }>;
  getAllDisplays(): Promise<BaseResult & { displays?: Display[] }>;
  getCpuUsage(): Promise<BaseResult & { cpuUsage?: number }>;
  getMemoryInfo(): Promise<MemoryInfo>;
  getProcessMemoryInfo(): Promise<BaseResult & { ProcessMemoryInfo?: ProcessMemoryInfo }>;
  getIdleTime(): Promise<BaseResult & { idleTime?: number }>;
  getScreenDetails(): Promise<ScreenData[]>;

  onDisplayAdded(handler: (display: Display) => void): Unsubscribe;
  onDisplayRemoved(handler: (display: Display) => void): Unsubscribe;
}

export type { PlatformInfo };

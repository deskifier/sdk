/**
 * Preload ↔ SDK parity check (never emitted, never published).
 *
 * The SDK's types are a hand-written mirror of the app template's preload —
 * which means they can silently drift (this file exists because a page typed
 * `platform` wrong and shipped a broken layout). This assignability check makes
 * the preload's REAL exposed object satisfy the SDK's `DeskifierAPI`, so any
 * mismatch — a renamed field, a changed flag shape, a missing namespace —
 * fails `npm run check:parity` (also run on every publish).
 *
 * Direction: preload → SDK. The SDK may lag (a preload addition not yet typed
 * here compiles fine); it may never LIE (typing something the preload doesn't
 * actually expose that way is an error).
 */

import type { Deskifier } from '../../app/src/preload/index';
import type { DeskifierAPI } from '../src/types';

// The real preload object must be assignable to what the SDK promises users.
const _parity: DeskifierAPI = {} as Deskifier;
void _parity;

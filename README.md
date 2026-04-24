# @deskifier/sdk

The official TypeScript SDK for building apps on the [Deskifier](https://deskifier.com) desktop platform.

Deskifier wraps your web app into a native desktop app on macOS, Windows, and Linux. This SDK gives your renderer-side code typed access to native desktop features — windows, menus, tray icons, filesystem, notifications, in-app purchases, and more.

## Installation

```bash
npm install @deskifier/sdk
```

## Usage

The Deskifier preload injects a global `window.deskifier` object into your wrapped app. This SDK provides TypeScript types for that global so your editor gets autocomplete and your compiler catches typos.

### Ambient types (primary usage)

Import the SDK once anywhere in your project — TypeScript picks up the ambient `window.deskifier` declaration automatically:

```ts
import '@deskifier/sdk';

async function openSettingsWindow() {
  const result = await window.deskifier.windows.create({
    constructorOptions: { url: 'https://mysite.com/settings' },
    windowProperties: { width: 800, height: 600, title: 'Settings' },
  });

  if (result.success) {
    console.log('Opened window', result.windowId);
  }
}

// Listen for window events — the handler payload is fully typed
const unsubscribe = window.deskifier.windows.onClosed(({ windowId }) => {
  console.log('Window closed:', windowId);
});
```

### Named imports (optional)

If you prefer not to access `window.deskifier` directly, import specific namespaces:

```ts
import { windows, menus, tray } from '@deskifier/sdk';

await windows.create({ /* ... */ });
await menus.createContext({ /* ... */ });
```

Named imports include a runtime guard — they throw a descriptive error if called outside a Deskifier environment (e.g., during unit tests), helping catch environment mismatches early.

### Checking for Deskifier at runtime

```ts
import { isDeskifier, assertDeskifier } from '@deskifier/sdk';

if (isDeskifier()) {
  await window.deskifier.tray.create({ /* ... */ });
}

// Or throw if not in Deskifier
assertDeskifier();
```

## Namespaces

- **`windows`** — Create, control, and observe native windows
- **`menus`** — Context menus, menu bars, tray menus, dock menus
- **`tray`** — System tray icons and notifications
- **`system`** — System info (OS, CPU, displays, idle time, accent color)
- **`applications`** — List and control other apps' windows, overlays
- **`printers`** — Printing and print-to-PDF
- **`shortcuts`** — Global OS hotkeys
- **`deeplink`** — Custom protocol URL handling
- **`permissions`** — Camera, microphone, screen recording, accessibility
- **`notifications`** — Native OS notifications, badge counts, window flashing
- **`purchases`** — In-app purchases (macOS / MAS)
- **`dock`** — macOS dock visibility and icon
- **`filesystem`** — File I/O, watching, downloads, path utilities
- **`webSocket`** — Secure in-app WSS server
- **`dialog`** — Open/save/message/error native dialogs
- **`autoUpdate`** — Check for and install app updates

## Documentation

Full API reference and guides: [docs.deskifier.com](https://docs.deskifier.com)

## License

MIT

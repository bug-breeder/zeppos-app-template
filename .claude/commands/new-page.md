Scaffold a new ZeppOS page: $ARGUMENTS

Follow these steps exactly in order. Do not skip any step.

---

## Step 1: Determine names

From `$ARGUMENTS`, derive:

- **PascalCase name** for use in comments (e.g. `Settings`, `TimerSelect`)
- **kebab-case path** for the file system (e.g. `settings`, `timer-select`)
- **File path:** `pages/<kebab-case>/index.js`
- **Registration path:** `pages/<kebab-case>/index` (no .js extension — for app.json)

---

## Step 2: Create the page file

Create `pages/<kebab-case>/index.js` with this exact content (replace `[PageName]` throughout):

```js
/**
 * [PageName] page
 */

import hmUI from '@zos/ui';
import { COLOR, TYPOGRAPHY } from '../../utils/constants';
// import { push, pop } from '@zos/router'; // uncomment when you need navigation

Page({
  onInit(params) {
    // Reset module-level state here (vars persist across page visits)
    try {
      const p = params ? JSON.parse(params) : {};
      console.log('[[PageName]] onInit params:', JSON.stringify(p));
    } catch {
      console.log('[[PageName]] onInit: no params');
    }
  },

  build() {
    console.log('[[PageName]] build');

    // Black OLED background
    hmUI.createWidget(hmUI.widget.FILL_RECT, { x: 0, y: 0, w: 480, h: 480, color: COLOR.BG });

    // Page title — centered on 480×480 canvas
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 60,
      y: 200,
      w: 360,
      h: 48,
      text: '[PageName]',
      text_size: TYPOGRAPHY.title,
      color: COLOR.TEXT,
      align_h: hmUI.align.CENTER_H,
    });
  },

  onDestroy() {
    console.log('[[PageName]] onDestroy');
    // hmUI widgets destroyed automatically
    // offGesture() / offKey() — from '@zos/interaction'
    // vibrator.stop()         — if Vibrator was started
  },
});
```

---

## Step 3: Register in app.json

Open `app.json`. Find the `targets.common.module.page.pages` array and add the new page path (no .js extension):

```json
"page": {
  "pages": [
    "pages/home/index",
    "pages/<kebab-case>/index"
  ]
}
```

---

## Step 4: Verify

Run `npm run verify` — expect 0 errors (lint + format + zeus build).

---

## Step 5: Confirm

Report back:

- Created file: `pages/<kebab-case>/index.js`
- Registered in `app.json`: `"pages/<kebab-case>/index"` added to pages array
- Lint: passes

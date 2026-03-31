/**
 * Home page — golden example of a ZeRoUI page.
 *
 * Key patterns:
 *   - renderPage() handles bg, column creation, masks, title, and action in correct z-order
 *   - buildFn receives the Column as a parameter — no need to create it manually
 *   - col.clearContent() + re-add + col.finalize() for rebuilds
 *   - Reset ALL module-level state in onInit (vars persist across page visits)
 *   - col?.destroyAll() in onDestroy()
 */

import { renderPage, LAYOUT } from '@bug-breeder/zeroui';
// import { push } from '@zos/router'; // uncomment when you need navigation

// Module-level state — MUST reset in onInit (persists across page visits)
let col = null;

Page({
  onInit(params) {
    col = null;

    try {
      const p = params ? JSON.parse(params) : {};
      console.log('[Home] onInit params:', JSON.stringify(p));
    } catch {
      console.log('[Home] onInit: no params');
    }
  },

  build() {
    console.log('[Home] build');

    renderPage({
      layout: LAYOUT.FULL,
      title: 'My App',
      buildFn(c) {
        col = c;
        col.label('Welcome');
        col.chip('Get Started', {
          onPress: () => {
            console.log('[Home] Get Started pressed');
            // push({ url: 'pages/next/index', params: JSON.stringify({ key: 'value' }) });
          },
        });
        col.finalize();
      },
      action: {
        text: 'Start',
        onPress: () => {
          console.log('[Home] action pressed');
        },
      },
    });
  },

  onDestroy() {
    console.log('[Home] onDestroy');
    col?.destroyAll();
    col = null;
    // offGesture(); offKey(); vibrator.stop(); — if used
  },
});

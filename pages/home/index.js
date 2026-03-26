/**
 * Home page — golden example of a ZeRoUI page.
 *
 * Key patterns:
 *   - Import from '@bug-breeder/zeroui' for layout, tokens, and components
 *   - renderPage() handles bg, masks, title, and action button in correct z-order
 *   - column() + col.finalize() for scrollable content
 *   - Parse params in onInit with try/catch guard
 *   - Reset ALL module-level state in onInit (vars persist across page visits)
 */

import { renderPage, column, LAYOUT } from '@bug-breeder/zeroui';
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

    col = column(LAYOUT.FULL.MAIN, { scrollable: true });

    renderPage({
      layout: LAYOUT.FULL,
      title: 'My App',
      buildFn() {
        col.sectionLabel('Welcome');
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
    if (col) {
      col.destroyAll();
      col = null;
    }
    // offGesture(); offKey(); vibrator.stop(); — if used
  },
});

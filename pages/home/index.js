/**
 * Home page — the "golden example" of a raw-hmUI ZeppOS page.
 *
 * Copy this file for new pages. Key patterns:
 *   - Use raw hmUI (import hmUI from '@zos/ui') for all layout — explicit { x, y, w, h }
 *   - Import COLOR and TYPOGRAPHY from '../../utils/constants' for design tokens
 *   - Parse params in onInit with try/catch guard
 *   - Build UI in build() — runs after onInit
 *   - Reset all module-level state in onInit (vars persist across page visits)
 *
 * WHY NOT zeppos-zui?
 *   ZUI's VStack/CircularLayout calculates child positions before children know
 *   their own size, so all children render at y=0 (broken on device).
 *   Raw hmUI with explicit x/y/w/h is reliable and predictable.
 */

import hmUI from '@zos/ui';
import { COLOR, DEVICE_WIDTH, TYPOGRAPHY } from '../../utils/constants';
// import { push } from '@zos/router'; // uncomment when you need navigation

Page({
  onInit(params) {
    // Parse navigation params — always guard with try/catch
    try {
      const p = params ? JSON.parse(params) : {};
      console.log('[Home] onInit params:', JSON.stringify(p));
    } catch {
      console.log('[Home] onInit: no params');
    }
  },

  build() {
    console.log('[Home] build');

    // Black OLED background — zero power draw for black pixels
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: DEVICE_WIDTH,
      h: DEVICE_WIDTH,
      color: COLOR.BG,
    });

    // App title — centered on 480×480 canvas
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 60,
      y: 162,
      w: 360,
      h: 56,
      text: 'My App',
      text_size: TYPOGRAPHY.largeTitle,
      color: COLOR.TEXT,
      align_h: hmUI.align.CENTER_H,
    });

    // Subtitle
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 60,
      y: 226,
      w: 360,
      h: 36,
      text: 'Welcome',
      text_size: TYPOGRAPHY.subheadline,
      color: COLOR.TEXT_MUTED,
      align_h: hmUI.align.CENTER_H,
    });

    // Primary action button
    // IMPORTANT: Always use BUTTON with click_func — not FILL_RECT + addEventListener (unreliable)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 140,
      y: 280,
      w: 200,
      h: 52,
      radius: 26,
      normal_color: COLOR.SECONDARY,
      press_color: COLOR.SECONDARY_PRESSED,
      text: 'Get Started',
      text_size: 22,
      color: COLOR.TEXT,
      click_func: () => {
        console.log('[Home] Get Started pressed');
        // TODO: Navigate to your next page
        // push({ url: 'pages/next/index', params: JSON.stringify({ key: 'value' }) });
      },
    });
  },

  onDestroy() {
    console.log('[Home] onDestroy');
    // hmUI widgets are destroyed automatically — no manual cleanup needed
    // Clean up if you used:
    //   offGesture() — from '@zos/interaction'
    //   offKey()     — from '@zos/interaction'
    //   vibrator.stop() — if Vibrator was started
  },
});

import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

// Load Inter — the free SF-Pro-alike used by shadcn/Vercel/Figma.
// Only loaded in Storybook; the real app uses whatever system font the
// device provides.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '../src/styles/global.css';

// Custom viewports that match the physical devices this app targets.
// Storybook's defaults are generic (Small mobile / Large mobile). These
// give pixel-exact frames for iPhone / iPad / Android so the preview
// matches what the real device renders.
const customViewports = {
  iPhone15: {
    name: 'iPhone 15',
    styles: { width: '393px', height: '852px' },
    type: 'mobile' as const,
  },
  iPhone15ProMax: {
    name: 'iPhone 15 Pro Max',
    styles: { width: '430px', height: '932px' },
    type: 'mobile' as const,
  },
  iPhoneSE: {
    name: 'iPhone SE',
    styles: { width: '375px', height: '667px' },
    type: 'mobile' as const,
  },
  pixel7: {
    name: 'Pixel 7',
    styles: { width: '412px', height: '915px' },
    type: 'mobile' as const,
  },
  iPadMini: {
    name: 'iPad Mini',
    styles: { width: '744px', height: '1133px' },
    type: 'tablet' as const,
  },
  desktop: {
    name: 'Desktop',
    // 100% fills the available Storybook canvas instead of a fixed width,
    // so the preview responds to the browser window size.
    styles: { width: '100%', height: '100%' },
    type: 'desktop' as const,
  },
};

const preview: Preview = {
  // Toolbar toggle between the light and dark theme variants defined in
  // global.css. The decorator below reflects the current choice into
  // Uniwind's runtime so every className driven by `@variant light/dark`
  // re-renders with the right tokens.
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / dark mode',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  // Force initial globals on every session. `defaultValue` / `defaultViewport`
  // only kick in when the user has no existing choice in localStorage, so
  // once you ever pick a viewport those defaults stop applying — the iPhone
  // preset would then only show after a manual refresh. `initialGlobals` wins.
  initialGlobals: {
    theme: 'dark',
    viewport: { value: 'iPhone15', isRotated: false },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as 'light' | 'dark';
      useEffect(() => {
        Uniwind.setTheme(theme);
      }, [theme]);
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // No `default` — we let `body { background-color: var(--color-background) }`
    // in global.css follow Uniwind's theme automatically. The entries stay so
    // you can still force a specific colour from the toolbar when needed.
    backgrounds: {
      disable: true,
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: 'iPhone15',
    },
  },
};

export default preview;

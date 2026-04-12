import type { Preview } from '@storybook/react';

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
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#1C1C1E' },
      ],
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: 'iPhone15',
    },
  },
};

export default preview;

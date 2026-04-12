import type { Preview } from '@storybook/react';

// Load Inter — the free SF-Pro-alike used by shadcn/Vercel/Figma.
// Only loaded in Storybook; the real app uses whatever system font the
// device provides.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '../src/styles/global.css';

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
  },
};

export default preview;

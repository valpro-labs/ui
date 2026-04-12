import type { Preview } from '@storybook/react';

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

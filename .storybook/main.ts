import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { uniwind } = await import('uniwind/vite');
    const tailwindcss = (await import('@tailwindcss/vite')).default;

    // Prepend our plugins so they transform CSS before Storybook's default pipeline.
    config.plugins = [
      tailwindcss(),
      uniwind({
        cssEntryFile: './src/styles/global.css',
        dtsFile: './uniwind-types.d.ts',
      }),
      ...(config.plugins || []),
    ];

    // Force postcss transformer; lightningcss rejects Tailwind v4 / UniWind directives
    // (e.g. `@variant`, `@theme`, `hairlineWidth()`).
    config.css = {
      ...(config.css || {}),
      transformer: 'postcss',
    };

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
    };
    return config;
  },
};

export default config;

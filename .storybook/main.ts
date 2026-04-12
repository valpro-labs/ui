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

    // `__DEV__` is a React Native global that Metro injects at build time.
    // Vite doesn't know about it, but several RN-ecosystem packages (e.g. uniwind's
    // web components) reference it directly. Define it here so we don't crash.
    config.define = {
      ...(config.define || {}),
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    };

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
    };
    // Prefer `.web.tsx` / `.web.ts` / `.web.js` so platform-specific files
    // (e.g. image.web.tsx) take precedence on the web target. Keeps the same
    // behavior Metro gives us on native.
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
      ...(config.resolve.extensions || []),
    ];
    return config;
  },
};

export default config;

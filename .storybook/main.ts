import path from 'node:path';

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
    // Vite doesn't know about it, but uniwind's web components reference it
    // at module load. Define it here so we don't crash.
    config.define = {
      ...(config.define || {}),
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    };

    // Several RN-ecosystem packages ship .js/.mjs files containing JSX (e.g.
    // @rn-primitives/*, react-native-svg). Force-include them in Vite's dep
    // pre-bundling so the `.js` -> jsx loader is actually applied; without
    // this some packages slip past pre-bundling and hit the browser raw.
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: [
        ...(config.optimizeDeps?.include || []),
        '@rn-primitives/progress',
        '@rn-primitives/slot',
      ],
      esbuildOptions: {
        ...(config.optimizeDeps?.esbuildOptions || {}),
        loader: {
          ...(config.optimizeDeps?.esbuildOptions?.loader || {}),
          '.js': 'jsx',
          '.mjs': 'jsx',
        },
      },
    };

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mirror the `@/*` -> `./src/*` alias from tsconfig.json so Storybook
      // can resolve absolute imports the same way TypeScript does.
      '@': path.resolve(process.cwd(), 'src'),
    };
    // Prefer `.web.tsx` etc. so platform-specific files take precedence on
    // the web target. Same behaviour Metro gives us on native.
    // Components that don't work on web (reanimated-backed, etc.) can ship a
    // `.web.tsx` sibling that swaps in CSS / plain RNW implementations.
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

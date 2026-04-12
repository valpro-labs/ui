// Ambient declarations for the Storybook config/preview files.
// (They live outside `src/`, so src-level .d.ts files don't cover them.)

declare module '*.css';

// `@fontsource/*` packages ship CSS under subpaths (e.g. `@fontsource/inter/400.css`)
// that their `exports` map doesn't surface to TypeScript. The ambient `*.css`
// pattern is shadowed by the package's own types resolution, so declare the
// namespace explicitly.
declare module '@fontsource/*';

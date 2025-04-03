/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/design-system',

  plugins: [
    nxViteTsPaths(),
    react(),
    dtsPlugin({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:meta";
          @use "sass:math";
        `,
        includePaths: [path.resolve(__dirname, 'src')],
      },
    },
  },

  resolve: {
    alias: {
      '@design-system': path.resolve(__dirname, 'src'), // 전체 디렉토리 접근
    },
  },

  optimizeDeps: {
    // 디펜던시 최적화 옵션
    include: ['@storybook/blocks', '@mdx-js/react'],
  },

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: '@my-monorepo/design-system',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});

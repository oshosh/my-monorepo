import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  // stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  stories: [
    '../src/**/*.mdx', // MDX 파일
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', // Stories 파일
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: join(__dirname, '../vite.config.ts'),
      },
    },
  },
  core: {
    // Storybook 원격 수집 비활성화
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@design-system': join(__dirname, '../src'),
        },
      },
    };
  },
};

export default config;

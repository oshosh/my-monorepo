import '@design-system/styles/_colors.scss';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

// 초기 테마 설정을 위한 스크립트
const initializeTheme = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.add('dark-mode', 'standard-contrast');
    document.body.style.setProperty('background-color', 'var(--osh-color-surface)');
    document.body.style.setProperty('color', 'var(--osh-color-on-surface)');
  }
};

// 스크립트 즉시 실행
initializeTheme();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'light-mode standard-contrast', color: '#fff8f6' },
        { name: 'dark', class: 'dark-mode standard-contrast', color: '#1a110f' },
      ],
    },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
  },
  // tags: ['autodocs'],
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light-mode standard-contrast',
        dark: 'dark-mode standard-contrast',
      },
      defaultTheme: 'light',
    }),
  ],
};

// 페이지 로드 완료 후 다시 한번 테마 적용
if (typeof window !== 'undefined') {
  window.addEventListener('load', initializeTheme);
}

export default preview;

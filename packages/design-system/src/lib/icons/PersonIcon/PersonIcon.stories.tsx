import type { Meta, StoryObj } from '@storybook/react';
import { PersonIcon } from '.';

const meta: Meta<typeof PersonIcon> = {
  component: PersonIcon,
  args: {
    color: 'black',
  },
  argTypes: {
    size: {
      control: 'number',
      defaultValue: 44,
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'black'],
      defaultValue: 'black',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PersonIcon>;

export const Size: Story = {
  args: {
    size: 100,
  },
};

export const Color: Story = {
  args: {
    color: 'primary',
  },
};

/**
 * PersonIcon 디버그 입니다.
 * 사용이 완료되면 주석 처리 해주세요.
 */
// export const Debug: Story = {
//   render: () => {
//     return <PersonIcon size={100} color="primary" />;
//   },
// };

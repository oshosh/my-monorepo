import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@design-system/lib/Avatar';
import { PersonIcon } from '@design-system/lib/icons/PersonIcon';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: true },
    },
  },
  argTypes: {
    alt: {
      description: 'image를 설명하기 위한 대체 텍스트',
      type: 'string',
    },
    children: {
      description: '주로 텍스트나 icon이 들어가며, src prop이 없는 경우 적용됨',
      table: { type: { summary: 'React.ReactNode' } },
    },
    imgProps: {
      description: '(src, alt 속성은 제외한) img 요소의 나머지 속성값 (ex) loading)',
      table: {
        type: {
          summary: 'crossOrigin | width | height | loading | sizes | ...',
        },
      },
    },
    shape: {
      description: '아바타의 모양',
      table: {
        type: { summary: 'circle | square | rounded' },
        defaultValue: { summary: 'circle' },
      },
    },
    size: {
      description: 'image의 사이즈',
      table: { type: { summary: 'xs | sm | md | lg | xl | number' } },
      defaultValue: { summary: 'md' },
    },
    src: {
      description: 'image 주소',
      type: 'string',
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// export const ImageAvatars: Story = {
//   render: () => {
//     return (
//       <>
//         <Avatar src={dogImage1} alt="강아지 사진1" />
//         <Avatar
//           src={dogImage2}
//           alt="강아지 사진2"
//           imgProps={{
//             width: 100,
//             height: 100,
//           }}
//         />
//       </>
//     );
//   },
// };

// export const LetterAvatars: Story = {
//   render: () => {
//     return (
//       <>
//         <Avatar>N</Avatar>
//         <Avatar style={{ backgroundColor: 'yellow-400', color: 'yellow-50' }}>N</Avatar>
//         <Avatar style={{ fontSize: '12px' }}>Name</Avatar>
//       </>
//     );
//   },
// };

// export const IconAvatars: Story = {
//   render: () => {
//     return (
//       <>
//         <Avatar>
//           <PersonIcon />
//         </Avatar>
//         <Avatar
//           style={{
//             backgroundColor: 'yellow-400',
//           }}
//         >
//           <PersonIcon color="yellow-50" />
//         </Avatar>
//       </>
//     );
//   },
// };

export const Sizes: Story = {
  name: '크기 변형',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs">N</Avatar>
          <Avatar size="sm">N</Avatar>
          <Avatar>N</Avatar>
          <Avatar size="lg">N</Avatar>
          <Avatar size="xl">N</Avatar>
          <Avatar size={200} style={{ fontSize: '100px', fontWeight: 900 }}>
            N
          </Avatar>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs">
            <PersonIcon />
          </Avatar>
          <Avatar size="sm">
            <PersonIcon />
          </Avatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar size="lg">
            <PersonIcon />
          </Avatar>
          <Avatar size="xl">
            <PersonIcon />
          </Avatar>
          <Avatar size={200}>
            <PersonIcon size={100} />
          </Avatar>
        </div>
      </div>
    );
  },
};

export const Shape: Story = {
  name: '모양 변경',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar>N</Avatar>
          <Avatar shape="square">N</Avatar>
          <Avatar shape="rounded">N</Avatar>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar shape="square">
            <PersonIcon />
          </Avatar>
          <Avatar shape="rounded">
            <PersonIcon />
          </Avatar>
        </div>
      </div>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar>N</Avatar>
          <Avatar
            style={{
              backgroundColor: 'secondary',
              color: 'on-secondary',
            }}
          >
            N
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'tertiary',
              color: 'on-tertiary',
            }}
          >
            N
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'green',
            }}
          >
            N
          </Avatar>
          <Avatar
            style={{
              backgroundColor: '#123',
            }}
          >
            N
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'rgb(100,100,100)',
            }}
          >
            N
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'rgba(100,100,100, 0.5)',
            }}
          >
            N
          </Avatar>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'secondary',
              color: 'on-secondary',
            }}
          >
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'tertiary',
              color: 'on-tertiary',
            }}
          >
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'green',
            }}
          >
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: '#123',
            }}
          >
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'rgb(100,100,100)',
            }}
          >
            <PersonIcon />
          </Avatar>
          <Avatar
            style={{
              backgroundColor: 'rgba(100,100,100, 0.5)',
            }}
          >
            <PersonIcon />
          </Avatar>
        </div>
      </div>
    );
  },
};

export const AvatarFallbacks: Story = {
  render: () => {
    return (
      <>
        <Avatar src="./no-image.png" alt="alt" style={{ fontSize: '10px' }}>
          children
        </Avatar>
        <Avatar src="./no-image.png" alt="alt" style={{ fontSize: '15px' }} />
        <Avatar src="./no-image.png" />
      </>
    );
  },
};

import { ComponentPropsWithoutRef, ReactNode } from 'react';

export const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const AVATAR_SHAPES = ['circle', 'square', 'rounded'] as const;
export interface AvatarProps extends ComponentPropsWithoutRef<'span'> {
  src?: string;
  alt?: string;
  imgProps?: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;
  size?: (typeof AVATAR_SIZES)[number] | number;
  shape?: (typeof AVATAR_SHAPES)[number];
  children?: ReactNode;
  className?: string;
}

import { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface AvatarProps extends ComponentPropsWithoutRef<'span'> {
  src?: string;
  alt?: string;
  imgProps?: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  children?: ReactNode;
  className?: string;
}

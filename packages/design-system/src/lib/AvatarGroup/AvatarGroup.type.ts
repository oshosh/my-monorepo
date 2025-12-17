import { ComponentPropsWithoutRef, ReactElement } from 'react';
import { AvatarProps } from '../Avatar/Avatar.type';

export interface AvatarGroupProps extends ComponentPropsWithoutRef<'span'> {
  children: Array<ReactElement<AvatarProps>>;
  max?: number;
  total?: number;
  renderSurplus?: (surplus: number) => React.ReactElement<AvatarProps>;
  spacing?: 'sm' | 'md' | 'lg';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  className?: string;
}

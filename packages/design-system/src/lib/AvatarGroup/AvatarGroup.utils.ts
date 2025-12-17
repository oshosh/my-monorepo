import { ReactElement } from 'react';
import { AvatarProps } from '../Avatar/Avatar.type';
import { AvatarGroupProps } from './AvatarGroup.type';
import { cloneElement } from 'react';

export const insertProps = <T extends ReactElement<AvatarProps>>(
  elements: ReadonlyArray<T>,
  { size, shape, style }: Pick<AvatarGroupProps, 'size' | 'shape' | 'style'>
): Array<T> => {
  return elements.map((element) =>
    cloneElement(element, { size, shape, style })
  ) as unknown as Array<T>;
};

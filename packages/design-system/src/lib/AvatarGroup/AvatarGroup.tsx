import './AvatarGroup.scss';
import cn from 'classnames';
import Avatar from '../Avatar/Avatar';
import withStyle from '../withStyle';
import { AvatarGroupProps } from './AvatarGroup.type';
import { insertProps } from './AvatarGroup.utils';
import { Children, ReactElement } from 'react';
import { AvatarProps } from '../Avatar/Avatar.type';

const AvatarGroup = ({
  children,
  max,
  total,
  renderSurplus,
  spacing = 'md',
  size = 'md',
  shape = 'circle',
  className,
  style,
}: AvatarGroupProps) => {
  const childrenArray = Children.toArray(children);
  const safeMax = Math.min(max ?? childrenArray.length, childrenArray.length);
  const safeTotal = total ?? childrenArray.length;
  const surplusNum = Math.max(0, safeTotal - safeMax);

  const displayedAvatars = childrenArray.slice(0, safeMax) as ReactElement<AvatarProps>[];

  let avatars = displayedAvatars;

  if (surplusNum > 0) {
    const surplusAvatar = (
      <Avatar key="surplus-avatar" className="surplus-avatar">
        {renderSurplus ? renderSurplus(surplusNum) : `+${surplusNum}`}
      </Avatar>
    );

    avatars = [...displayedAvatars, surplusAvatar];
  }

  return (
    <span className={cn('osh-avatar-group', `spacing-${spacing}`, `size-${size}`, className)}>
      {insertProps(avatars, { size, shape, style }).reverse()}
    </span>
  );
};

const AvatarGroupWithStyle = withStyle(AvatarGroup);
export default AvatarGroupWithStyle;

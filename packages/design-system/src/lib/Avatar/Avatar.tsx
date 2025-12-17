import './Avatar.scss';
import cn from 'classnames';
import { memo, useMemo, useState } from 'react';
import { editColorStyle } from '../../utils/styles';
import { PersonIcon } from '../../lib/icons/PersonIcon';
import withStyle from '../../lib/withStyle';
import { AvatarProps } from './Avatar.type';

const Avatar = (props: AvatarProps) => {
  const { src, alt, imgProps, size = 'md', shape = 'circle', children, className, style } = props;
  const [hasSrc, setHasSrc] = useState(!!src);

  const hasNumberTypeSize = typeof size === 'number';
  const newStyle = useMemo(() => {
    let baseStyle = editColorStyle(style);
    if (hasNumberTypeSize) baseStyle = { ...baseStyle, width: size, height: size };
    return baseStyle;
  }, [style, hasNumberTypeSize, size]);

  let content = children || alt || <PersonIcon />;
  if (hasSrc) {
    content = <img src={src} alt={alt} {...imgProps} onError={() => setHasSrc(false)} />;
  }

  const classNames = cn(
    'osh-avatar',
    { 'image-avatar': hasSrc },
    { [size]: !hasNumberTypeSize },
    shape,
    className
  );

  return (
    <span className={classNames} style={newStyle}>
      {content}
    </span>
  );
};

const AvatarWithStyle = withStyle(Avatar);
export default memo(AvatarWithStyle);

import './Avatar.scss';
import cn from 'classnames';
import { memo, useMemo, useState } from 'react';
import { editColorStyle } from '@design-system/utils/styles';
import { PersonIcon } from '@design-system/lib/icons/PersonIcon';
import withStyle from '@design-system/lib/withStyle';

interface AvatarProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  children?: React.ReactNode;
  className?: string;
}

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

  return (
    <span
      className={cn(
        'osh-avatar',
        { 'image-avatar': hasSrc },
        { [size]: !hasNumberTypeSize },
        shape,
        className
      )}
      style={newStyle}
    >
      {content}
    </span>
  );
};

const AvatarWithStyle = withStyle(Avatar);
export default memo(AvatarWithStyle);

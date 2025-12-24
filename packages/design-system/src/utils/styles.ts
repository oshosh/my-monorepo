import { CSS_COLOR_PROPERTIES } from '../lib/constants/css-color-properties';
import { CSSProperties } from 'react';

const getColorValue = (colorVariable: string) => {
  const rootEl = document.querySelector(':root');
  if (!rootEl) throw Error('root element를 가져오지 못함');
  const rootStyles = window.getComputedStyle(rootEl);
  const colorValue = rootStyles.getPropertyValue(`--osh-color-${colorVariable}`);
  if (!colorValue) throw Error(`${colorValue} 색상은 존재하지 않습니다`);

  return colorValue;
};

export const editColor = (color: string) => {
  try {
    const colorValue = getColorValue(color);
    return colorValue;
  } catch {
    return color;
  }
};

export const editColorStyle = (style: CSSProperties | undefined): CSSProperties | undefined => {
  if (!style) return;

  const editedStyle = Object.keys(style).reduce((rst, key) => {
    const propName = key as keyof CSSProperties;
    const propValue = style[propName];
    const isColorProperty = CSS_COLOR_PROPERTIES.some((item) => item === propName);
    const isStringType = typeof propValue === 'string';
    return {
      ...rst,
      [propName]: isColorProperty && isStringType ? editColor(propValue) : propValue,
    };
  }, {});

  return editedStyle;
};

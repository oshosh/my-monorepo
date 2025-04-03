import { ColorType } from '@design-system/types/color';
import { CSS_COLOR_PROPERTIES } from './constants/css-color-properties';
import { ComponentType, CSSProperties } from 'react';

/**
 * TupleToUnion<T> : 배열의 모든 요소를 유니온 타입으로 변환 하는 유틸리티 Types 입니다.
 */
type TupleToUnion<T> = T extends Array<infer U> ? U : never;
type CSSColorPropertiesUnion = TupleToUnion<typeof CSS_COLOR_PROPERTIES>;

/**
 * 기존의 색상은 전부 제외 시키고 ColorType으로 결정한 색상을 전부 타입으로 추가 한다.
 */
type CustomStyleType = Omit<CSSProperties, CSSColorPropertiesUnion> &
  Partial<Record<CSSColorPropertiesUnion, ColorType>>;

/**
 * ComponentType<P>의 어떤 React Component의 속성 중 CustomStyleType으로 다시 랩핑합니다.
 */
const withStyle = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithStyle = (
    props: Omit<P, 'style'> & {
      style?: CustomStyleType;
    }
  ) => {
    return <WrappedComponent {...(props as P)} />;
  };
  ComponentWithStyle.displayName = WrappedComponent.displayName || WrappedComponent.name;
  return ComponentWithStyle;
};

export default withStyle;

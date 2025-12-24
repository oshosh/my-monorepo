import { describe, it, expect, vi } from 'vitest';
import { editColor, editColorStyle } from './styles';

describe('styles 유틸 테스트', () => {
  it('editColor: CSS 변수 값이 존재하면 해당 값을 반환한다', () => {
    // :root element mock
    vi.spyOn(document, 'querySelector').mockReturnValue(document.documentElement);

    // getComputedStyle mock
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'rgb(255, 0, 0)',
    } as any);

    expect(editColor('primary')).toBe('rgb(255, 0, 0)');
  });

  it('editColor: CSS 변수 값이 없으면 원본 color를 반환한다(catch)', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(document.documentElement);

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => '',
    } as any);

    expect(editColor('not-exist')).toBe('not-exist');
  });

  it('editColorStyle: style이 undefined이면 undefined를 반환한다', () => {
    expect(editColorStyle(undefined)).toBeUndefined();
  });

  it('editColorStyle: 색상 속성(string)은 editColor가 적용되고, 숫자/비색상 속성은 그대로 유지된다', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(document.documentElement);
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'rgb(0, 0, 0)',
    } as any);

    // color 속성 + string -> editColor 적용
    // non-color 속성 -> 그대로 유지
    // color 속성이라도 number -> 그대로 유지 (isStringType false 분기 커버)
    const result = editColorStyle({
      color: 'primary',
      fontSize: 14,
      marginTop: 10,
    });

    expect(result?.color).toBe('rgb(0, 0, 0)');
    expect(result?.fontSize).toBe(14);
    expect(result?.marginTop).toBe(10);
  });
});

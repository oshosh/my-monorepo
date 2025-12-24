import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';
import { AVATAR_SIZES, AVATAR_SHAPES } from './Avatar.type';

describe('Avatar 컴포넌트', () => {
  it('기본 렌더링: children, alt, src가 모두 없으면 PersonIcon(기본 아이콘)이 렌더링된다', () => {
    const { container } = render(<Avatar />);
    // PersonIcon은 svg로 렌더링되므로 svg 존재 여부 확인
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('우선순위: src가 있으면 children보다 img가 우선 렌더링된다', () => {
    render(
      <Avatar src="test.jpg" alt="AltText">
        Children Content
      </Avatar>
    );

    // img가 렌더링되고
    expect(screen.getByRole('img')).toBeInTheDocument();
    // children은 렌더링되지 않는다
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  it('이미지 렌더링: src가 제공되면 img 태그가 렌더링된다', () => {
    render(<Avatar src="valid-image.jpg" alt="User Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'valid-image.jpg');
    expect(img).toHaveAttribute('alt', 'User Avatar');
  });

  it('이미지 에러 핸들링: 이미지 로드 실패 시 alt 텍스트로 폴백된다', () => {
    render(<Avatar src="invalid-image.jpg" alt="Fallback Text" />);
    const img = screen.getByRole('img');

    // 이미지 에러 이벤트 강제 발생
    fireEvent.error(img);

    // 이미지가 사라지고 alt 텍스트가 텍스트로 렌더링됨
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('Fallback Text')).toBeInTheDocument();
  });

  it('imgProps: 전달된 imgProps가 img 태그에 적용된다', () => {
    render(<Avatar src="test.jpg" imgProps={{ className: 'custom-class' }} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('custom-class');
  });

  describe('디자인 토큰 (Size & Shape)', () => {
    it.each(AVATAR_SIZES)('사이즈 클래스 테스트: size="%s" 클래스가 적용된다', (size) => {
      const { container } = render(<Avatar size={size} />);
      expect(container.firstChild).toHaveClass(size);
    });

    it.each(AVATAR_SHAPES)('모양 클래스 테스트: shape="%s" 클래스가 적용된다', (shape) => {
      const { container } = render(<Avatar shape={shape} />);
      expect(container.firstChild).toHaveClass(shape);
    });

    it('커스텀 숫자 사이즈: style 속성에 width/height가 직접 적용된다', () => {
      const { container } = render(<Avatar size={42} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.width).toBe('42px');
      expect(wrapper.style.height).toBe('42px');
      // 프리셋 사이즈 클래스는 없어야 함
      AVATAR_SIZES.forEach((size) => expect(wrapper).not.toHaveClass(size));
    });
  });

  it('추가 속성: className과 style이 정상적으로 병합된다', () => {
    const { container } = render(<Avatar className="my-custom-class" style={{ opacity: 0.5 }} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('osh-avatar');
    expect(wrapper).toHaveClass('my-custom-class');
    expect(wrapper.style.opacity).toBe('0.5');
  });
});

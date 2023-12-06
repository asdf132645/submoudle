import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/button';

describe('버튼 컴포넌트 실험', () => {
  it('라벨이 제대로 동작하는지', () => {
    render(<Button label='라벨테스트' />);
    const btnElement = screen.getByText(/라벨테스트/i);
    expect(btnElement).toBeInTheDocument();
  });
});

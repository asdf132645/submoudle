import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('버튼 컴포넌트 실험', () => {
  it('test for rendering', () => {
    render(<Button />);
  });
});

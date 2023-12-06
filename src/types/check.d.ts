import { InputHTMLAttributes } from 'react';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'checkbox' | 'radio';
  /** rectangle when true and round when false */
  rectangle?: boolean;
  isBig?: boolean;
}

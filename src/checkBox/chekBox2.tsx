import { useId } from 'react';
import { CheckBoxProps } from '../types/check';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './index.module.css';

export const CheckBox = ({
  type = 'checkbox',
  className,
  children,
  disabled,
  isBig,
  rectangle = true,
  ...props
}: CheckBoxProps) => {
  const id = useId();
  return (
    <div className={styles.chk}>
      <input
        type={type}
        id={id}
        disabled={disabled}
        className={className ?? ''}
        {...props}
      />
      <label htmlFor={id}>
        <span
          className={[
            isBig ? styles.big : '',
            rectangle ? styles.rectangle : '',
            className ?? '',
          ].join(' ')}
        />
        {children}
      </label>
    </div>
  );
};

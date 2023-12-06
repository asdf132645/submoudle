import { forwardRef, InputHTMLAttributes } from 'react';
import { LabelAbove } from '../label';
import styles from '../component.module.css';
import global from '../global.module.css';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'crossOrigin'> {
  /**
   * 성공/실패 사용
   */
  considerSucc?: boolean;
  /**
   * 성공여부
   */
  isSuccess?: boolean;
  /**
   * 성공/실패 시 메세지
   */
  statusMsg?: string;
  /**
   * placeholder
   */
  className?: string;
  /**
   * Button contents
   */
  label?: string;
  /**
   * name: formData로 전송시 사용할 key 값
   */
  name?: string;
  /**
   * Optional click handler
   */
  isLine?: boolean;
}

/**
 * 입력상자 ui component
 */
export const InputBox = forwardRef<HTMLInputElement, InputProps>(
  function InputBox(
    {
      considerSucc = false,
      isSuccess = true,
      statusMsg = '메세지',
      label,
      className = '',
      isLine = true,
      ...props
    },
    ref
  ) {
    return (
      <>
        {label ? <LabelAbove label={label} /> : null}
        <input
          style={{ width: '100%' }}
          type='text'
          ref={ref}
          className={[
            styles['frm-input'],
            considerSucc
              ? isSuccess
                ? styles['frm-ok']
                : styles['frm-fail']
              : '',
            isLine ? '' : styles.noline,
            global[className],
          ].join(' ')}
          {...props}
        />
        {considerSucc ? (
          <span className={styles[`msg-${isSuccess ? 'ok' : 'fail'}`]}>
            {statusMsg}
          </span>
        ) : null}
      </>
    );
  }
);

import { TextareaHTMLAttributes } from 'react';
import styles from '../component.module.css';

export interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 성공/실패 사용
   */
  considerSuccess?: boolean;
  /**
   * 메세지 내용
   */
  message?: string;
  /**
   * 성공 실패 여부
   */
  isSuccess?: boolean;
}

export const TextArea = ({
                           message,
                           considerSuccess,
                           isSuccess,
                           className = 'col-100',
                           ...props
                         }: TextAreaProps) => {
  return (
      <>
      <textarea
          className={[styles['frm-textarea'], className].join(' ')}
          placeholder='내용을 입력하세요.'
          {...props}
      ></textarea>
        {considerSuccess ? (
            <span className={styles[`msg-${isSuccess ? 'ok' : 'fail'}`]}>
          {message}
        </span>
        ) : message ? (
            <span className={styles['msg-normal']}>{message}</span>
        ) : null}
      </>
  );
};

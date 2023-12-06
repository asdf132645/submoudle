import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../component.module.css';
import global from '../global.module.css';

const styleObj = {
  pri: 1,
  sec: 2,
  ter: 3,
  qua: 4,
  qui: 5,
  sen: 6,
  sep: 7,
};

const sizeObj = {
  vsm: 1,
  sm: 2,
  md: 3,
  lg: 4,
  vlg: 5,
};

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * type of Button
   */
  types?: 'outline' | 'solid' | 'excel' | 'delete' | 'upload';
  /**
   * style
   */
  style?: 'pri' | 'sec' | 'ter' | 'qua' | 'qui' | 'sen' | 'sep';
  /**
   * How large should the button be?
   */
  size?: 'vsm' | 'sm' | 'md' | 'lg' | 'vlg';
  /**
   * 버튼의 margin 값을 변경합니다.
   */
  margin?: string;
  /**
   * 버튼의 비활성화 여부를 변경합니다.
   */
  disabled?: boolean;
  /**
   * 버튼의 padding 값을 변경합니다.
   */
  padding?: string;
  /**
   * 버튼에 global css를 적용합니다.
   */
  className?: string;
  /**
   * Button contents
   */
  label?: string;
  /**
   * 아이콘과 label을 같이 넘김
   */
  children?: ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  types = 'outline',
  size = 'vsm',
  style = 'pri',
  label,
  children,
  margin,
  padding,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const defined = styleObj[style] < 5 || types === 'outline';
  return types === 'excel' ? (
    <button
      type='button'
      className={[styles.btn, styles['btn-auto'], styles['data-excel']].join(
        ' '
      )}
      style={{
        margin,
        padding,
      }}
      {...props}
    >
      <i className={[styles.ico, styles['ico-download']].join(' ')}></i>Excel
      다운로드
    </button>
  ) : types === 'delete' ? (
    <button
      type='button'
      className={[styles.btn, styles['btn-auto'], styles['btn-gray']].join(' ')}
      style={{
        margin,
        padding,
      }}
      {...props}
    >
      <i
        className={[styles.ico, styles['ico-delete'], global['mr-05']].join(
          ' '
        )}
      ></i>
      삭제
    </button>
  ) : types === 'upload' ? (
    <button
      type='button'
      className={[
        styles.btn,
        styles['btn-auto'],
        styles['data-upload'],
        disabled ? styles.disabled : '',
      ].join(' ')}
      disabled={disabled}
      {...props}
      style={{
        margin,
        padding,
      }}
    >
      <i
        className={[styles.ico, styles['ico-upload'], global['mr-05']].join(
          ' '
        )}
      ></i>
      업로드
    </button>
  ) : (
    <button
      type='button'
      className={[
        styles.btn,
        styles[`btn-${types}`],
        styles[
          `sy${
            styleObj[style] !== 1
              ? `${styleObj[style]}-${sizeObj[size]}`
              : `${sizeObj[size]}`
          }`
        ],
        disabled ? styles.disabled : '',
        className,
      ].join(' ')}
      disabled={disabled}
      style={{
        margin,
        padding,
      }}
      {...props}
    >
      {children}
      {defined ? label : '해당 스타일이 없습니다'}
    </button>
  );
};

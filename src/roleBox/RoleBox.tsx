import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useId,
} from 'react';
import styles from '../component.module.css';

interface RoleBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange?: (input: string) => void;
}

export const RoleBox = ({
  type = 'checkbox',
  label = '',
  onChange,
  ...props
}: RoleBoxProps) => {
  const id = useId();
  const Change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };
  return (
    <div
      className={[
        styles.rolebox,
        props.checked ? styles.checked : '',
        props.className,
      ].join(' ')}
    >
      <input id={id} type={type} onChange={Change} {...props} hidden />
      <label htmlFor={id}></label>
      <p>{label}</p>
    </div>
  );
};

import { ChangeEvent, useEffect, useState } from 'react';
import { InputBox } from '@/index';
import { useDebounce } from '@/hooks';

type InputBoxPageProps = {
  /**
   * 성공/실패 사용
   */
  considerSucc?: boolean;
  disabled?: boolean;
  label?: string;
};

export const InputBoxPage = ({
  considerSucc,
  disabled = false,
  label,
}: InputBoxPageProps) => {
  const [value, setValue] = useState('');
  // 성공 실패 여부
  const [isSuccess, setSuccess] = useState(true);
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValue(target.value);

  /** debounce로 관리할 state */
  const debouncedValue = useDebounce(value, 500);

  /** 조건 변경에 debounce 적용 */
  useEffect(() => {
    if (debouncedValue) {
      debouncedValue.length > 3 && debouncedValue.length < 9
        ? setSuccess(true)
        : setSuccess(false);
    }
  }, [debouncedValue]);

  return (
    <InputBox
      label={label}
      value={value}
      considerSucc={considerSucc}
      isSuccess={isSuccess}
      disabled={disabled}
      onChange={onChange}
      statusMsg={
        isSuccess ? '조건을 만족합니다.' : '올바른 형식이 아닙니다.(4~8자리)'
      }
    />
  );
};

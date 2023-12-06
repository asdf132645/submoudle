import { useEffect, useState } from 'react';
import { useToggle } from '../hooks';
import { IOption } from '../types/option';
import { LabelAbove } from '../label';
import styles from '../component.module.css';

// TODO: stories > components > selectBox 내의 컴포넌트로 교체
interface SelectProps {
  /**
   * select 가 label을 가지는가
   */
  label?: string;
  /**
   * 처음 mount 시 select에서의 위치, n - 1번째
   */
  defaultPOS?: number;
  /**
   * 다중 선택 여부
   */
  isMultiple?: boolean;
  /**
   * true인 경우 아래 직각, false인 경우 모두 뭉툭하게
   */
  isRadius?: boolean;
  /**
   * select box 모서리 설정
   */
  border?: string;
  /**
   * formData로 관리하는 키값
   */
  name?: string;
  /**
   * select 의 옵션 리스트
   */
  option?: IOption[];
  /**
   * select박스의 너비 (단위: rem)
   */
  width?: string;
  onChange?: (input: any) => void;
  onClick?: () => void;
}

/**
 * css가 적용된 콤보박스
 */
export const SelectBox = ({
  label = '',
  isMultiple = false,
  isRadius = false,
  option = [],
  defaultPOS = 0,
  name,
  border,
  onChange,
  width,
  ...props
}: SelectProps) => {
  const [selected, selector] = useState<string>('');
  const [list, setList] = useState<boolean[]>([]);
  const [toggle, onToggle] = useToggle();

  const listOnClick = (idx: number) =>
    setList((prev) => {
      if (!isMultiple)
        return Array.from(
          { length: option.length },
          (_, index) => idx === index
        );
      const tempIdx = idx;
      const tempBool = prev[tempIdx];
      return [...prev.slice(0, tempIdx), !tempBool, ...prev.slice(tempIdx + 1)];
    });




  useEffect(() => {
    if (option.length > 0) selector(option[defaultPOS].name);
    setList(
      Array.from({ length: option.length }, (_, idx) => idx === defaultPOS)
    );
  }, [option,defaultPOS]);

  useEffect(() => {
    if (list.includes(true)) {
      const tempList = option.reduce(
        (sum: Array<any>, { value }, idx) =>
          list[idx] ? [...sum, value] : sum,
        []
      );
      if (onChange) isMultiple ? onChange(tempList) : onChange(tempList[0]);
    }
  }, [selected]);


  return (
    <>
      {label.length > 0 ? <LabelAbove label={label} /> : null}
      <div
        className={[
          styles['select-c'],
          isRadius ? styles['border-radius'] : '',
        ].join(' ')}
        style={{ width, border }}
      >
        <div className={styles['select-styled']} onClick={onToggle}>
          {option
            .reduce(
              (sum: string[], { name }, idx) =>
                list[idx] ? [...sum, name] : sum,
              []
            )
            .join(', ')}
        </div>
        {option.length > 0 ? (
          <select
            multiple={isMultiple}
            value={
              isMultiple
                ? option.reduce(
                    (sum: string[], { value }, idx) =>
                      list[idx] ? [...sum, value] : sum,
                    []
                  )
                : option[list.findIndex((e) => e)]?.value
            }
            style={{ display: 'none' }}
            name={name}
            onChange={() => name}
          >
            {option.map(({ value, name }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </select>
        ) : null}
        <ul
          className={
            isMultiple ? styles['select-options2'] : styles['select-options']
          }
          style={{ display: toggle ? 'block' : 'none' }}
        >
          {option.length > 0
            ? option.map(({ value, name }, idx) => (
                <li
                  key={value}
                  className={list[idx] ? styles.active : ''}
                  onClick={() => {
                    listOnClick(idx);
                    selector(name);
                    isMultiple ? idx : onToggle();
                  }}
                >
                  {name}
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};

import { useState, useEffect, useRef } from 'react';
import { CheckBox } from '../checkBox/chekBox2';
import { IOption, SelectProps } from '../types/select';
import styles from './select.module.css';

const defaultOptions = [
  { value: 'option1', name: 'Option 1' },
  { value: 'option2', name: 'Option 2' },
  { value: 'option3', name: 'Option 3' },
];

export function SelectBox({
  options = defaultOptions,
  isMultiple,
  onClick,
  className = '',
  name = 'dropdown',
}: SelectProps) {
  /** 열림 닫힘 관리 */
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((prev) => !prev);
  const ref = useRef<HTMLDivElement>(null);

  /** state 내부 관리 */
  const [selectedValues, setSelectedValues] = useState<IOption[]>([]);
  const values = selectedValues.map(({ value }) => value);
  const names =
    selectedValues.reduce(
      (acc, { name }) => (acc ? `${acc}, ${name}` : name),
      ''
    ) || 'Select';

  /** 드롭다운 외부 클릭시 제거 */
  useEffect(() => {
    const onCheckClickOutside = (e: MouseEvent) => {
      if (toggle && ref.current && !ref.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };
    document.addEventListener('mousedown', onCheckClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', onCheckClickOutside);
    };
  }, [toggle, ref.current]);

  /** 부모에서 값 받도록 설정 */
  useEffect(() => {
    if (!onClick) return;
    isMultiple ? onClick(values) : onClick(values[0]);
  }, [values]);

  const handleSelectChange = (option: IOption) => () =>
    isMultiple
      ? setSelectedValues((prev) =>
          prev.some(({ value }) => value === option.value)
            ? prev.filter((opt) => opt.value !== option.value)
            : [...prev, option].sort((a, b) => {
                const indexA = options.findIndex(
                  (option) => option.value === a.value
                );
                const indexB = options.findIndex(
                  (option) => option.value === b.value
                );
                return indexA - indexB;
              })
        )
      : (setSelectedValues([option]), onToggle());

  return (
    <div ref={ref} className={[styles.dropdown, className].join(' ')}>
      <div
        className={[
          styles.picker,
          toggle ? styles.open : '',
          selectedValues.length > 0 ? styles.selected : '',
        ].join(' ')}
        onClick={onToggle}
      >
        <span>{names}</span>
      </div>
      <select value={values} name={name} multiple hidden disabled>
        <option value={''}>select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {toggle ? (
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              value={option.value}
              onClick={handleSelectChange(option)}
              className={
                values.some((value) => value === option.value)
                  ? styles.selected
                  : ''
              }
            >
              {isMultiple ? (
                <CheckBox
                  className='mr-1'
                  rectangle
                  checked={values.some((value) => value === option.value)}
                  onChange={handleSelectChange(option)}
                />
              ) : null}
              {option.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

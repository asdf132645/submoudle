import { RoleBox } from '@/roleBox';
import { HTMLInputTypeAttribute, useState } from 'react';

interface RoleBoxProps {
  type?: HTMLInputTypeAttribute;
  multiple?: boolean;
}

const arr: [number, string][] = [
  [1, '슈퍼관리자'],
  [2, '일반관리자'],
  [3, 'cs관리자'],
  [4, 'PM'],
];

export const RoleBoxPage = ({ type, multiple }: RoleBoxProps) => {
  const [checked, setCheck] = useState('슈퍼관리자');
  const [checkedMultiple, setCheckMultiple] = useState<string[]>([]);
  const onCheckChange = (input: string) => {
    multiple
      ? setCheckMultiple((prev) =>
          prev.includes(input)
            ? [...prev.filter((item) => item !== input)]
            : [...prev, input]
        )
      : setCheck(input);
  };

  return (
    <div>
      {checked}
      <div className='contents d-flex justify-content-center'>
        {arr.map(([key, name]) => (
          <RoleBox
            key={key}
            value={name}
            label={name}
            type={type}
            checked={
              multiple ? checkedMultiple.includes(name) : name === checked
            }
            onChange={onCheckChange}
            className={'mr-1'}
          />
        ))}
      </div>
    </div>
  );
};

import { QueryBox } from '@/querybox';
import { ITypeOption, SelectOptionType } from '@/types/option';
import { useRef, useState } from 'react';

interface QueryBoxPageProps {
  option: ITypeOption[];
  selectOptions?: SelectOptionType;
}

export const QueryBoxPage = ({ option, selectOptions }: QueryBoxPageProps) => {
  const [searchString, setSearchString] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const onClick = () => {
    const form = new FormData(formRef.current || undefined);
    setSearchString(JSON.stringify(Object.fromEntries(form)));
  };
  const onReset = () => setSearchString('');

  return (
    <div>
      <div>검색 결과: {searchString} </div>
      <QueryBox
        option={option}
        selectOptions={selectOptions}
        onClick={onClick}
        onReset={onReset}
        ref={formRef}
      />
    </div>
  );
};

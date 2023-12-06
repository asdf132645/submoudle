import React, { useDeferredValue, useState } from 'react';

export const useInput = (
  txt: string
): [
  input: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [input, setInput] = useState(txt);
  const deferredInput = useDeferredValue(input);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setInput(e.target.value);
  };
  return [deferredInput, onChange];
};

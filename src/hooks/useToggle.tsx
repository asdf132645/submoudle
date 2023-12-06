import { useCallback, useState } from 'react';

export const useToggle = <T,>(): [
  toggle: boolean,
  onToggle: (e?: React.MouseEvent<T>) => void
] => {
  const [toggle, setToggle] = useState(false);

  const onToggle = useCallback((e?: React.MouseEvent<T>) => {
    e && e.preventDefault();
    setToggle((hiddenState) => !hiddenState);
  }, []);

  return [toggle, onToggle];
};

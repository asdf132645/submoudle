import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const Inner = forwardRef<any, any>(function Inner({}, ref) {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  useImperativeHandle(
    ref,
    () => ({ count: () => count, count2: () => count2 }),
    [count]
  );
  return (
    <div>
      count: {count}
      <button onClick={() => setCount((cnt) => cnt + 1)}>[1증가]</button>
      count2: {count2}
      <button onClick={() => setCount2((cnt) => cnt + 1)}>[2증가]</button>
    </div>
  );
});

interface ImperativeProps {
  type?: string;
}

export const Imperative = ({ type }: ImperativeProps) => {
  const [, render] = useState(false);
  const refref = useRef<any>(null);
  return (
    <div>
      {refref.current?.count() || 0}
      {refref.current?.count2() || 0}
      <Inner ref={refref} />
      <button onClick={() => render((prev) => !prev)}>render</button>
    </div>
  );
};

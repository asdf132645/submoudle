import { useEffect, useState } from 'react';

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;

    (async () => {
      try {
        const res: T[] = await fetch(url, { signal }).then((res) => res.json());
        setData(res);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => data && ctl.abort();
  }, []);

  return data;
};

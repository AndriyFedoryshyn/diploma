import { useState, useEffect } from 'react';

type LoadingT = boolean;
type ErrorT = string | null;

type FetchingOptionsT = {
  url: string;
  options?: RequestInit;
};

export const useFetch = <T>({ url, options }: FetchingOptionsT) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingT>(true);
  const [error, setError] = useState<ErrorT>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

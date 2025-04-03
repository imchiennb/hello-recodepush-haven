import { useState, useEffect } from 'react';
import { QueryObserver, useQueryClient } from '@tanstack/react-query';

export const useQueryObserver = <T>(queryKey: string[], defaultValue?: (() => T) | T) => {
  const queryClient = useQueryClient();
  const [queryData, setQueryData] = useState<T | undefined>(defaultValue ?? queryClient.getQueryData(queryKey));
  useEffect(() => {
    const observer = new QueryObserver<T>(queryClient, { queryKey: queryKey, notifyOnChangeProps: ['data', 'error'], enabled: false });
    const unsubscribe = observer.subscribe(result => {
      setQueryData(result.data);
    });
    return () => {
      unsubscribe();
    };
  }, [queryClient, queryKey]);

  return queryData;
};

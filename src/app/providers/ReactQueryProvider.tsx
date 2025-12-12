'use client';

import {useState} from 'react';
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useSetGlobalError} from '@/entities/error';
import {RequestError, RequestGetError} from '@/shared/apis';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({children}: Props) {
  const setGlobalError = useSetGlobalError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,

            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,

            retry: 0,

            throwOnError: (error: Error) =>
              error instanceof RequestGetError && error.errorHandlingType === 'errorBoundary',
          },
        },
        queryCache: new QueryCache({
          onError(error) {
            if (error instanceof RequestGetError && error.errorHandlingType === 'errorBoundary') return;
            if (error instanceof RequestError) setGlobalError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError(error) {
            if (error instanceof RequestError) setGlobalError(error);
          },
        }),
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

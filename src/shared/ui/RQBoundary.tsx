'use client';

import {Suspense} from 'react';
import {QueryErrorResetBoundary} from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import Spinner from './Spinner';

type Props = {
  children: React.ReactNode;
  LoadingFallback?: React.ReactNode;
  ErrorFallbackClassName?: string;
};

export default function RQBoundary({children, LoadingFallback = <Spinner />, ErrorFallbackClassName}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({error, resetErrorBoundary}) => (
            <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} className={ErrorFallbackClassName} />
          )}
        >
          <Suspense fallback={LoadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

'use client';

import {ErrorBoundary} from 'react-error-boundary';
import {GlobalErrorFallback} from '@/shared/ui';

type Props = {
  children: React.ReactNode;
};

export default function GlobalErrorBoundary({children}: Props) {
  return <ErrorBoundary FallbackComponent={GlobalErrorFallback}>{children}</ErrorBoundary>;
}

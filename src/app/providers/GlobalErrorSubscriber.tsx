'use client';

import {useEffect} from 'react';
import {useErrorBoundary} from 'react-error-boundary';
import {useGlobalError, useResetGlobalError} from '@/entities/error';
import {toast} from '@/shared/ui';
import {isClientError, isPredictableServerError} from '@/shared/lib';
import {SERVER_ERROR_MESSAGE} from '@/shared/consts/errorMessage';

type Props = {
  children: React.ReactNode;
};

export default function GlobalErrorSubscriber({children}: Props) {
  const globalError = useGlobalError();
  const resetGlobalError = useResetGlobalError();

  const {showBoundary} = useErrorBoundary();

  useEffect(() => {
    if (!globalError) return;

    if (isClientError(globalError)) {
      toast.error({
        title: '알림',
        description: globalError.message,
      });

      resetGlobalError();
      return;
    }

    if (isPredictableServerError(globalError)) {
      toast.error({
        title: '에러가 발생했어요.',
        description: SERVER_ERROR_MESSAGE[globalError.name],
      });

      resetGlobalError();
      return;
    }

    showBoundary(globalError);
  }, [globalError, resetGlobalError, showBoundary]);

  return children;
}

'use client';

import {Button} from './Button';
import {cn} from '../lib/cn';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type ErrorFallbackProps = FallbackProps & {
  className?: string;
  title?: string;
};

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  className,
  title = '데이터를 가져오는 데 실패했어요.',
}: ErrorFallbackProps) {
  return (
    <section className={cn('flex flex-col items-center p-4 text-sm md:text-base', className)}>
      <h2 className="text-xl md:text-2xl mb-3">{title}</h2>
      <p className="mb-4">{error.message}</p>
      <p>인터넷 연결 상태 혹은 서버의 응답 오류일 수 있어요.</p>
      <p className="mb-4">아래 버튼을 클릭해 다시 시도해주세요.</p>
      <Button onClick={resetErrorBoundary} className="cursor-pointer">
        다시 시도하기
      </Button>
    </section>
  );
}

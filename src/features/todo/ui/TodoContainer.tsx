'use client';

import dynamic from 'next/dynamic';
import TodoInput from './TodoInput';
import {RQBoundary, Spinner} from '@/shared/ui';

type Props = {
  flag: number;
};

const TodoList = dynamic(() => import('./TodoList'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function TodoContainer({flag}: Props) {
  return (
    <section className="flex flex-col w-full max-w-[700px] p-10 gap-4">
      <ul className="flex flex-col h-[700px] rounded-md shadow-md p-4 overflow-auto">
        <RQBoundary ErrorFallbackClassName="h-full justify-center">
          <TodoList flag={flag} />
        </RQBoundary>
      </ul>
      <TodoInput />
    </section>
  );
}

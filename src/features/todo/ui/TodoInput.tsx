'use client';

import {FormEvent, useRef} from 'react';
import {useSetGlobalError} from '@/entities/error';
import {usePostTodo} from '@/entities/todo';
import {createClientError} from '@/shared/lib';
import {Button, Input} from '@/shared/ui';
import {ClientErrorCode} from '@/shared/consts/errorMessage';

const validateTodo = (text: string): ClientErrorCode | null => {
  if (text.length < 3) return 'INPUT_TOO_SHORT';
  if (text.length > 20) return 'INPUT_TOO_LONG';
  return null;
};

export default function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setGlobalError = useSetGlobalError();
  const {postTodo, isPending} = usePostTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!inputRef.current) return;
    e.preventDefault();

    const value = inputRef.current.value || '';
    const trimmed = value.trim();

    const errorCode = validateTodo(trimmed);

    if (errorCode) {
      setGlobalError(createClientError(errorCode));

      return;
    }

    postTodo({description: trimmed});
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-5">
      <Input ref={inputRef} placeholder="투두를 입력하세요." disabled={isPending} className="h-[55px] text-lg" />
      <Button type="submit" disabled={isPending} variant="default" className="cursor-pointer h-[55px] text-lg px-6">
        등록
      </Button>
    </form>
  );
}

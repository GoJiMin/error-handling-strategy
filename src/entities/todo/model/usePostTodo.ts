import {TodoPayload} from './type';
import {useMutation} from '@tanstack/react-query';
import {postTodo} from '../api';

export default function usePostTodo() {
  const {mutate, ...rest} = useMutation({
    mutationFn: (payload: TodoPayload) => postTodo(payload),
  });

  return {
    postTodo: mutate,
    ...rest,
  };
}

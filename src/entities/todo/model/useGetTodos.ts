import {useSuspenseQuery} from '@tanstack/react-query';
import {todoQueryOptions} from './query-service';

export default function useGetTodos(flag: number) {
  const {data} = useSuspenseQuery(todoQueryOptions.all(flag));

  return data;
}

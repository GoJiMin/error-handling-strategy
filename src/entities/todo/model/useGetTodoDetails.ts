import {useSuspenseQuery} from '@tanstack/react-query';
import {todoQueryOptions} from './query-service';

export default function useGetTodoDetails(id: string) {
  const {data} = useSuspenseQuery(todoQueryOptions.details(id));

  return data;
}

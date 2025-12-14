import {useSuspenseQuery} from '@tanstack/react-query';
import {userQueryOptions} from './query-service';

export default function useGetUserInfo(id: string) {
  const {data} = useSuspenseQuery(userQueryOptions.info(id));

  return data;
}

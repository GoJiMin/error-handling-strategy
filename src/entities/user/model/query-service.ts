import {getUserInfo} from '../api';

export const userQueryKeys = {
  all: ['users'] as const,

  info: (id: string) => [...userQueryKeys.all, id] as const,
};

export const userQueryOptions = {
  info: (id: string) => ({
    queryKey: userQueryKeys.info(id),
    queryFn: () => getUserInfo(id),
  }),
};

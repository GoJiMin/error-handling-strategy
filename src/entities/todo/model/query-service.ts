import {getTodoDetails, getTodos} from '../api';

export const todoQueryKeys = {
  all: ['todos'] as const,

  flag: (flag: number) => [todoQueryKeys.all, flag],
  details: (id: string) => [...todoQueryKeys.all, id] as const,
};

export const todoQueryOptions = {
  all: (flag: number) => ({
    queryKey: todoQueryKeys.flag(flag),
    queryFn: () => getTodos(flag),
  }),

  details: (id: string) => ({
    queryKey: todoQueryKeys.details(id),
    queryFn: () => getTodoDetails(id),
  }),
};

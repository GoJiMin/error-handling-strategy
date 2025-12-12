import {requestGet, requestPost} from '@/shared/apis';
import {Todo, TodoPayload} from '../model/type';

export async function getTodos(flag: number) {
  return await requestGet<Todo[]>({
    endpoint: '/todos',
    queryParams: {
      flag: flag,
    },
  });
}

export async function getTodoDetails(id: string) {
  return await requestGet<Todo>({
    endpoint: `/todos/${id}`,
  });
}

export async function postTodo(payload: TodoPayload) {
  await requestPost({
    endpoint: '/todos',
    body: payload,
  });
}

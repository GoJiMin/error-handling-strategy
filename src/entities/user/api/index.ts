import {requestGet} from '@/shared/apis';
import {User} from '../model/type';

export async function getUserInfo(id: string) {
  return requestGet<User>({
    endpoint: `/users/${id}`,
  });
}

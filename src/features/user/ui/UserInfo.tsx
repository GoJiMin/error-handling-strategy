import UserItem from './UserItem';
import {RQBoundary} from '@/shared/ui';
import UserItemLoading from './UserItemLoading';

export default function UserInfo() {
  return (
    <RQBoundary LoadingFallback={<UserItemLoading />}>
      <UserItem />
    </RQBoundary>
  );
}

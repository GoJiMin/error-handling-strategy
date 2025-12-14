'use client';

import dynamic from 'next/dynamic';
import UserItemLoading from './UserItemLoading';
import {RQBoundary} from '@/shared/ui';

const UserItem = dynamic(() => import('./UserItem'), {
  ssr: false,
  loading: () => <UserItemLoading />,
});

export default function UserInfo() {
  return (
    <RQBoundary LoadingFallback={<UserItemLoading />}>
      <UserItem />
    </RQBoundary>
  );
}

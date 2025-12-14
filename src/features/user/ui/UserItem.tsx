'use client';

import {useGetUserInfo} from '@/entities/user';
import {Item, ItemContent, ItemDescription, ItemTitle, LucideIcon} from '@/shared/ui';

export default function UserItem() {
  const {name, email} = useGetUserInfo('id');

  return (
    <Item>
      <div className="w-16 h-16 bg-muted rounded-lg border flex justify-center items-center">
        <LucideIcon name="UserRound" className="w-12 h-12" />
      </div>
      <ItemContent>
        <ItemTitle className="text-xl">{name}</ItemTitle>
        <ItemDescription className="text-lg">{email}</ItemDescription>
      </ItemContent>
    </Item>
  );
}

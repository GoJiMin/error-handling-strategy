import {Skeleton} from '@/shared/ui/skeleton';

export default function UserItemLoading() {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton className="w-16 h-16 rounded-lg" />
      <div className="flex flex-col justify-between">
        <Skeleton className="w-[100px] h-[25px]" />
        <Skeleton className="w-[160px] h-[20px]" />
      </div>
    </div>
  );
}

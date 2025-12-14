import {Skeleton} from '@/shared/ui/skeleton';

export default function TodoListLoading() {
  return (
    <div className="flex flex-col">
      {Array.from({length: 6}, (_, idx) => (
        <div key={idx} className="flex flex-col gap-4 p-4 border-b">
          <Skeleton className="w-[100px] h-[20px]" />
          <Skeleton className="w-[160px] h-[20px]" />
        </div>
      ))}
    </div>
  );
}

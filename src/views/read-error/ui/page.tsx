import {TodoContainer} from '@/features/todo';

export default function ReadErrorPage() {
  return (
    <section className="flex h-full items-center justify-center">
      <TodoContainer flag={1} />
    </section>
  );
}

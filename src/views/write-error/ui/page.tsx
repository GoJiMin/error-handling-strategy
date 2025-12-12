import {TodoContainer} from '@/features/todo';

export default function WriteErrorPage() {
  return (
    <section className="flex h-full items-center justify-center">
      <TodoContainer flag={0} />
    </section>
  );
}

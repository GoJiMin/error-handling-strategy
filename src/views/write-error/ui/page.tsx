import {TodoContainer} from '@/features/todo';

export default function WriteErrorPage() {
  return (
    <section className="flex flex-col max-w-3xl w-full mx-auto h-full pt-[50px]">
      <TodoContainer flag={0} />
    </section>
  );
}

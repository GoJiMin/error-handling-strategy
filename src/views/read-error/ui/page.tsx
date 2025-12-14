import {UserInfo} from '@/features/user';
import {TodoContainer} from '@/features/todo';

export default function ReadErrorPage() {
  return (
    <section className="flex flex-col max-w-3xl w-full mx-auto h-full">
      <UserInfo />
      <TodoContainer flag={1} />
    </section>
  );
}

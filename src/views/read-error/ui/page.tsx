import {UserInfo} from '@/features/user';
import {TodoContainer} from '@/features/todo';

export default function ReadErrorPage() {
  return (
    <section className="flex flex-col h-full items-center justify-center">
      <UserInfo />
      <TodoContainer flag={1} />
    </section>
  );
}

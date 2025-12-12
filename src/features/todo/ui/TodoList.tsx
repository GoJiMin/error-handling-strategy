import {useGetTodos} from '@/entities/todo';
import TodoItem from './TodoItem';

type Props = {
  flag: number;
};

export default function TodoList({flag}: Props) {
  const todoList = useGetTodos(flag);

  return (
    <>
      {todoList.map(todo => (
        <li key={todo.id} className="border-b w-full">
          <TodoItem todo={todo} />
        </li>
      ))}
    </>
  );
}

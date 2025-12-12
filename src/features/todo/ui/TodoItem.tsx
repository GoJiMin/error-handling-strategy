import {Todo} from '@/entities/todo';
import {Item, ItemContent, ItemDescription, ItemTitle} from '@/shared/ui';

type Props = {
  todo: Todo;
};

export default function TodoItem({todo}: Props) {
  return (
    <Item>
      <ItemContent>
        <ItemTitle className="text-lg">오늘의 할 일</ItemTitle>
        <ItemDescription className="text-lg">{todo.description}</ItemDescription>
        
      </ItemContent>
    </Item>
  );
}

import type { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onUpdate, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return <p>Задачи отсутствуют</p>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;

import { useState } from "react";
import Spinner from "./components/spinner/Spinner";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { useDebounce } from "./hooks/useDebounce";

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos(
    debouncedSearchTerm,
    sortAlphabetically
  );

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="app">
      <h1>Список дел</h1>

      <div className="controls">
        <input
          type="search"
          name="search"
          placeholder="Поиск дел..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSortAlphabetically((prev) => !prev)}>
          {sortAlphabetically
            ? "Отключить сортировку"
            : "Сортировать по алфавиту"}
        </button>
      </div>

      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          name="newTodo"
          placeholder="Новое дело..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>

      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>Ошибка: {error}</h1>
      ) : (
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
};

import React, { useState, useEffect, type FormEvent } from "react";
import Spinner from "./components/spinner/Spinner";
import TodoList from "./components/TodoList";
import { useDebounce } from "./hooks/useDebounce";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./store/actions";
import { useAppDispatch, useAppSelector } from "./store";

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const debounced = useDebounce<string>(searchTerm, 500);

  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todosState);

  useEffect(() => {
    dispatch(fetchTodos(debounced, sortAlpha));
  }, [debounced, sortAlpha, dispatch]);

  const onAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  return (
    <div className="app">
      <h1>Список дел</h1>
      <div className="controls">
        <input
          type="search"
          placeholder="Поиск дел..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSortAlpha((p) => !p)}>
          {sortAlpha ? "Отключить сортировку" : "Сортировать по алфавиту"}
        </button>
      </div>

      <form onSubmit={onAdd} className="add-todo-form">
        <input
          type="text"
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
        <TodoList
          todos={todos}
          onUpdate={(t) => dispatch(updateTodo(t))}
          onDelete={(id) => dispatch(deleteTodo(id))}
        />
      )}
    </div>
  );
};

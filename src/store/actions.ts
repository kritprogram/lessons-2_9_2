import {
  type Todo,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  type TodosAction,
} from "./types";
import type { ThunkAction } from "redux-thunk";
import type { RootState } from "./index";

const API_URL = "http://localhost:3000/todos";

type ThunkResult<R> = ThunkAction<R, RootState, unknown, TodosAction>;

export const fetchTodos =
  (searchTerm = "", sort = false): ThunkResult<void> =>
  async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      const url = new URL(API_URL);
      if (searchTerm) {
        url.searchParams.set("title_like", searchTerm);
      }
      if (sort) {
        url.searchParams.set("_sort", "title");
        url.searchParams.set("_order", "asc");
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Ошибка при загрузке данных");
      const data: Todo[] = await res.json();
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: data });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      dispatch({ type: FETCH_TODOS_FAILURE, payload: message });
    }
  };

export const addTodo =
  (title: string): ThunkResult<void> =>
  async (dispatch) => {
    dispatch({ type: ADD_TODO_REQUEST });
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!res.ok) throw new Error("Ошибка при добавлении");
      const newTodo: Todo = await res.json();
      dispatch({ type: ADD_TODO_SUCCESS, payload: newTodo });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      dispatch({ type: ADD_TODO_FAILURE, payload: message });
    }
  };

export const updateTodo =
  (todo: Todo): ThunkResult<void> =>
  async (dispatch) => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    try {
      const res = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!res.ok) throw new Error("Ошибка при обновлении");
      const updated: Todo = await res.json();
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: updated });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      dispatch({ type: UPDATE_TODO_FAILURE, payload: message });
    }
  };

export const deleteTodo =
  (id: number): ThunkResult<void> =>
  async (dispatch) => {
    dispatch({ type: DELETE_TODO_REQUEST });
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка при удалении");
      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      dispatch({ type: DELETE_TODO_FAILURE, payload: message });
    }
  };

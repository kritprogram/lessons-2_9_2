export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const FETCH_TODOS_REQUEST = "todos/FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "todos/FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "todos/FETCH_TODOS_FAILURE";

export const ADD_TODO_REQUEST = "todos/ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "todos/ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "todos/ADD_TODO_FAILURE";

export const UPDATE_TODO_REQUEST = "todos/UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS = "todos/UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAILURE = "todos/UPDATE_TODO_FAILURE";

export const DELETE_TODO_REQUEST = "todos/DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS = "todos/DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE = "todos/DELETE_TODO_FAILURE";

interface FetchTodosRequestAction {
  type: typeof FETCH_TODOS_REQUEST;
}
interface FetchTodosSuccessAction {
  type: typeof FETCH_TODOS_SUCCESS;
  payload: Todo[];
}
interface FetchTodosFailureAction {
  type: typeof FETCH_TODOS_FAILURE;
  payload: string;
}

interface AddTodoRequestAction {
  type: typeof ADD_TODO_REQUEST;
}
interface AddTodoSuccessAction {
  type: typeof ADD_TODO_SUCCESS;
  payload: Todo;
}
interface AddTodoFailureAction {
  type: typeof ADD_TODO_FAILURE;
  payload: string;
}

interface UpdateTodoRequestAction {
  type: typeof UPDATE_TODO_REQUEST;
}
interface UpdateTodoSuccessAction {
  type: typeof UPDATE_TODO_SUCCESS;
  payload: Todo;
}
interface UpdateTodoFailureAction {
  type: typeof UPDATE_TODO_FAILURE;
  payload: string;
}

interface DeleteTodoRequestAction {
  type: typeof DELETE_TODO_REQUEST;
}
interface DeleteTodoSuccessAction {
  type: typeof DELETE_TODO_SUCCESS;
  payload: number;
}
interface DeleteTodoFailureAction {
  type: typeof DELETE_TODO_FAILURE;
  payload: string;
}

export type TodosAction =
  | FetchTodosRequestAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction
  | AddTodoRequestAction
  | AddTodoSuccessAction
  | AddTodoFailureAction
  | UpdateTodoRequestAction
  | UpdateTodoSuccessAction
  | UpdateTodoFailureAction
  | DeleteTodoRequestAction
  | DeleteTodoSuccessAction
  | DeleteTodoFailureAction;

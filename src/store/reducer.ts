import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_SUCCESS,
  type TodosAction,
  type TodosState,
} from "./types";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};
export const todosReducer = (
  state = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };
    case FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_TODO_SUCCESS:
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
};

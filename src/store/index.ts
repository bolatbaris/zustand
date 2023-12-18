import {create} from 'zustand';
import {createNewTodo, getTodoList, toggleTodo} from '../domain/todos';
import Todo from '../models/todo.model';

type State = {
  todoList: Todo[];
  inputText: string;
  loading?: string;
  error?: string;
};

type Actions = {
  init: () => Promise<void>;
  addTodo: () => Promise<void>;
  toggleTodo: (id: string) => void;
  setInputText: (text: string) => void;
};

const initialState: State = {
  todoList: [],
  inputText: '',
};

const useTodoStore = create<State & Actions>((set, get) => ({
  ...initialState,
  init: async () => {
    set({loading: 'init'});
    const todoList = await getTodoList();
    if (!Array.isArray(todoList)) {
      set({error: 'TODO list empty', loading: undefined});
      return;
    }

    set({todoList, loading: undefined, error: undefined});
  },
  addTodo: async () => {
    if (!get().inputText) {
      return;
    }
    set({loading: 'add'});
    const newTodo = await createNewTodo(get().inputText);
    if (!newTodo) {
      set({error: 'Failed to create new TODO', loading: undefined});
      return;
    }
    set(state => ({
      todoList: [...state.todoList, newTodo],
      inputText: '',
      loading: undefined,
      error: undefined,
    }));
  },
  toggleTodo: async (id: string) => {
    set({loading: id});
    const isSuccess = await toggleTodo(id);
    if (!isSuccess) {
      set({error: 'Failed to toggle TODO', loading: undefined});
      return;
    }
    set(state => ({
      todoList: state.todoList.map(todo =>
        todo.id === id ? {...todo, isDone: !todo.isDone} : todo,
      ),
      loading: undefined,
      error: undefined,
    }));
  },
  setInputText: (inputText: string) => set({inputText}),
}));

export default useTodoStore;

import {read, write} from '../db';
import Todo from '../models/todo.model';
import {sleep} from '../utils';

const DB_KEY = 'todoList';

export async function getTodoList(): Promise<Todo[] | undefined> {
  const random = Math.random() * 3000;
  await sleep(random);
  // if (random < 1400) {
  //   return undefined;
  // }
  return read<Todo[]>(DB_KEY);
}

export async function createNewTodo(title: string): Promise<Todo | undefined> {
  const random = Math.random() * 3000;
  // if (random < 1400) {
  //   return undefined;
  // }
  const newTodo = new Todo();
  newTodo.title = title;
  await sleep(random);
  write(DB_KEY, [...(read<Todo[]>(DB_KEY) || []), newTodo]);
  return newTodo;
}

export async function toggleTodo(id: string): Promise<boolean> {
  const random = Math.random() * 3000;
  // if (random < 1400) {
  //   return false;
  // }
  const todoList = read<Todo[]>(DB_KEY);
  if (!todoList) {
    return false;
  }
  await sleep(random);

  return write(
    DB_KEY,
    todoList.map(todo =>
      todo.id === id ? todo : {...todo, isDone: !todo.isDone},
    ),
  );
}

export default class Todo {
  id: string = `${Math.random()}-${Date.now()}`;
  title: string = '';
  isDone: boolean = false;
  createdAt: Date = new Date();
}

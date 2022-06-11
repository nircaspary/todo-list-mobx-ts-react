import { computed, makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
export interface TodoItem {
  id: number;
  title: string;
  complete: boolean;
}

export class TodoListStore {
  todos: TodoItem[] = [];
  url: string =
    process.env.NODE_ENV === 'production'
      ? 'https://todo-list-mobx-ts-react.herokuapp.com/todos'
      : 'http://localhost:3001/todos';
  actionStatus = 'pending';
  constructor() {
    makeAutoObservable(this, { status: computed });
  }

  getTodos = async (): Promise<void> => {
    this.actionStatus = 'pending';
    try {
      const { data } = await axios.get<TodoItem[]>(this.url);
      runInAction((): void => {
        this.todos = data;
        this.actionStatus = 'done';
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = 'error';
      });
    }
  };

  addTodo = async (title: string): Promise<void> => {
    const item: TodoItem = { id: Date.now(), title, complete: false };
    try {
      const { data } = await axios.post<TodoItem>(this.url, item);
      runInAction((): void => {
        this.todos.push(data);
        this.actionStatus = 'done';
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = 'error';
      });
    }
  };
  deleteTodo = async (id: number) => {
    try {
      await axios.delete<void>(`${this.url}/${id}`);
      runInAction((): void => {
        this.todos = this.todos.filter((item) => item.id !== id);
        this.actionStatus = 'done';
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = 'error';
      });
    }
  };

  toggleTodo = async (id: number) => {
    try {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos[index].complete = !this.todos[index].complete;
      await axios.patch<TodoItem>(`${this.url}/${id}`, { complete: this.todos[index].complete });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = 'error';
      });
    }
  };

  get status() {
    let completed = 0;
    let remaining = 0;
    this.todos.forEach((item) => (item.complete ? completed++ : remaining++));
    return { completed, remaining };
  }
}

export const TodoStore = new TodoListStore();

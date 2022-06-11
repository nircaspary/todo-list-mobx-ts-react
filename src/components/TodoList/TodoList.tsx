import React, { useEffect } from 'react';
import { TodoListStore } from '../../stores/TodoListStore';
import { observer } from 'mobx-react-lite';
import { Todo } from './Todo';
import './todoList.scss';

interface TodoListProps {
  todoStore: TodoListStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  useEffect((): void => {
    todoStore.getTodos();
  }, []);

  return (
    <ul className='todo-item app__flex'>
      {todoStore.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} store={todoStore} />
      ))}
    </ul>
  );
});

export default TodoList;

import React, { useState } from 'react';
import { TodoListStore } from '../../stores/TodoListStore';
import { observer } from 'mobx-react-lite';
import './addTodo.scss';

interface AddTodoProps {
  todoStore: TodoListStore;
}

export const AddTodo: React.FC<AddTodoProps> = observer(({ todoStore }) => {
  const [value, setValue] = useState<string>('');
  return (
    <form
      className='add-todo-container app__flex'
      onSubmit={(e) => {
        e.preventDefault();
        setValue('');
      }}>
      <input required value={value} onChange={(e) => setValue(e.target.value)} type='text' placeholder='Enter Todo' />
      <button
        onClick={(): Promise<void> | void => {
          value && todoStore.addTodo(value);
        }}>
        Submit
      </button>
    </form>
  );
});

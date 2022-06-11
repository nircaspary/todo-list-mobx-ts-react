import './app.scss';

import TodoList from './components/TodoList/TodoList';
import { Stats } from './components/Stats/Stats';
import { TodoStore } from './stores/TodoListStore';
import { AddTodo } from './components/AddTodo/AddTodo';
export const App = () => {
  return (
    <div className='app app__flex'>
      <div className='app-container app__flex'>
        <AddTodo todoStore={TodoStore} />
        <Stats todoStore={TodoStore} />
        <TodoList todoStore={TodoStore} />
      </div>
    </div>
  );
};

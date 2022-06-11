import React, { useState, useEffect, useRef } from 'react';
import { TodoListStore } from '../../stores/TodoListStore';
import { observer } from 'mobx-react-lite';
import CountUp from 'react-countup';
import './stats.scss';

interface StatsProps {
  todoStore: TodoListStore;
}
export const Stats: React.FC<StatsProps> = observer(({ todoStore }) => {
  const { status } = todoStore;
  const { completed, remaining } = status;
  const total = Math.floor((completed / (remaining + completed)) * 100);
  const [precentage, setPercentage] = useState(total);
  const prevPrecentage = useRef(precentage);
  useEffect(() => {
    prevPrecentage.current = precentage;
    setPercentage(total);
  }, [status]);

  return (
    <div className='stats-container app__flex'>
      <div className=' app__flex'>
        <p className='stats-precentage'>{<CountUp start={prevPrecentage.current} end={precentage} />}%</p>
      </div>
      <div className='stats-details app__flex'>
        <p>completed: {status.completed}</p>
        <p>Remaining: {status.remaining}</p>
      </div>
    </div>
  );
});

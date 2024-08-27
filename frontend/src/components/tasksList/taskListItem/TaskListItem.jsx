import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskListItem.module.scss';

const TaskListItem = () => {
  const navigate = useNavigate();

  const openTask = (event) => {
    navigate('/admin/task-info');
  };

  return (
    <div onClick={openTask} className={style["task-list-item"]}>
      <div>Название задачи</div>
      <div>Тип 1</div>
      <div>Иванов</div>
      <div>50%</div>
      <div>28.08.2024</div>
    </div>
  )
}

export default TaskListItem
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskList.module.scss';
import TaskListItem from './taskListItem/TaskListItem';

const TaskList = () => {
  const navigate = useNavigate();

  const createNewTask = (event) => {
    navigate('/admin/create-new-task');
  };

  return (
    <div className={style["task-list-page"]}>
      <div className={style["task-first-str"]}>
        <h3>Список задач</h3>
        <button>Настроить фильтр</button>
        <button onClick={createNewTask}>Создать задачу</button>
      </div>
      <div className={style["task-list"]}>
        <div className={style["task-list-header"]}>
          <p>Название</p>
          <p>Тип</p>
          <p>Исполнитель</p>
          <p>Прогресс</p>
          <p>Сроки</p>
        </div>
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
      </div>
    </div>
  )
}

export default TaskList
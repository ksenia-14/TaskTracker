import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskOpenWorklog.module.scss';
import HomeIcon from '../icons/HomeIcon';
import WorklogItem from './worklogItem/WorklogItem';

const TaskOpenWorklog = () => {
  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/admin/task-list');
  };
  
  return (
    <div className={style["task"]}>
      <div className={style["header"]}>
        <p>Название задачи</p>
        <button onClick={closeTask}>Закрыть</button>
      </div>
      <div className={style["task-info"]}>
        <p>Тип задачи: Task</p>
        <p>Срок выполнения: 28.08.2024</p>
        <p>Статус задачи: В работе</p>
        <p>Дата создания: 28.07.2024</p>
        <p>Исполнитель: Иванов</p>
        <p>Прогресс выполнения: 50%</p>

        <p className={style["description"]}>Описание задачи:</p>
        <p className={style["description"]}>Описание задачи задачи задачи задачи задачи задачи задачи задачи задачи
        задачи задачи задачи задачи задачи задачи задачи
        </p>
      </div>
      <p>Журнал работ</p>
      <div className={style["header-worklog"]}>
        <p>Исполнитель</p>
        <p>Прогресс выполнения</p>
        <p>Дата</p>
      </div>
      <WorklogItem />
      <WorklogItem />
      <WorklogItem />
    </div>
  )
}

export default TaskOpenWorklog
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskInfo.module.scss';

const TaskInfo = () => {
  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/admin/task-list');
  };

  const editTask = (event) => {
    navigate('/admin/task-info-edit');
  };

  const openWorkLog = (event) => {
    navigate('/admin/task-worklog');
  };

  const deleteTask = (event) => {
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
        <div className={style["buttons"]}>
          <button onClick={openWorkLog}>Журнал работ</button>
          <button onClick={editTask}>Редактировать</button>
          <button onClick={deleteTask}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskUserInfo.module.scss';

const TaskUserInfo = () => {
  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/user/task-list');
  };

  const completeTask = (event) => {
    navigate('/user/task-complete');
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
        <p></p>
        <p>Прогресс выполнения: 50%</p>

        <p className={style["description"]}>Описание задачи:</p>
        <p className={style["description"]}>Описание задачи задачи задачи задачи задачи задачи задачи задачи задачи
        задачи задачи задачи задачи задачи задачи задачи
        </p>
        <div className={style["buttons"]}>
          <button onClick={completeTask}>Завершить</button>
        </div>
      </div>
    </div>
  )
}

export default TaskUserInfo
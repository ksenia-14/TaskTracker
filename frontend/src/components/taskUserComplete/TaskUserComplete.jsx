import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskUserComplete.module.scss';

const TaskUserComplete = () => {
  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/user/task-list');
  };

  const changeProgress = (event) => {
    navigate('/user/task-list');
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

        <div className={style["progress"]}>
          <p>Прогресс выполнения: 50%</p>
          <div onClick={changeProgress} className={style["progress-items"]}>
            <button>0%</button>
            <button>25%</button>
            <button>50%</button>
            <button>75%</button>
            <button>100%</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TaskUserComplete
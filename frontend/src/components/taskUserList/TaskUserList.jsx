import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskUserList.module.scss';
import TaskUserListItem from './taskUserListItem/TaskUserListItem';

const TaskUserList = () => {
  const navigate = useNavigate();

  return (
    <div className={style["task-list"]}>
      <div className={style["block"]}>
        <div style={{background: '#FF0000'}}>
          <p>Создана</p>
        </div>
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
      </div>
      <div className={style["block"]}>
        <div style={{background: '#FFEA00'}}>
          <p>В работе</p>
        </div>
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
      </div>
      <div className={style["block"]}>
        <div style={{background: '#2AFF00'}}>
          <p>Завершена</p>
        </div>
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
        <TaskUserListItem name="Название задачи" description="Описание задачи" />
      </div>
    </div>
  )
}

export default TaskUserList
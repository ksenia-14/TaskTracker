import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import style from './taskListItem.module.scss';

const TaskListItem = ({ id, title, type, progress, createdAt, executeAt, user }) => {
  const navigate = useNavigate();

  const openTask = (event) => {
    navigate(`/admin/task-info/${id}`);
  };

  return (
    <div onClick={openTask} className={style["task-list-item"]}>
      <div>{title}</div>
      <div>{type}</div>
      <div>{user}</div>
      <div>{progress}%</div>
      <div>{moment(executeAt).format('DD.MM.YYYY')}</div>
    </div>
  )
}

export default TaskListItem
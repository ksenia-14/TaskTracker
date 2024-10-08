import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskUserListItem.module.scss';

const TaskUserListItem = (props) => {
  const navigate = useNavigate();

  const openTask = (event) => {
    navigate(`/user/task-info/${props.id}`);
  };

  return (
    <div onClick={openTask} className={style["task-list-item"]}>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
    </div>
  )
}

export default TaskUserListItem
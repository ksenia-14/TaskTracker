import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './taskUserInfo.module.scss';
import { ApiContext } from '../contexts/ApiContext';
import moment from 'moment';

const TaskUserInfo = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [taskState, setTaskState] = useState([]);

  const { axiosGetTaskById } = useContext(ApiContext);

  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/user/task-list');
  };

  const completeTask = (event) => {
    navigate(`/user/task-complete/${id}`);
  };

  const getTask = async (id) => {
    const task = await axiosGetTaskById(id)
    setTask(task)
    if (task.progress == 0) {
      setTaskState('Новая')
    } else if (task.progress == 100) {
      setTaskState('Завершена')
    } else {
      setTaskState('В работе')
    }
  }

  React.useEffect(() => {
    getTask(id)
  }, [id])
  
  return (
    <div className={style["task"]}>
      <div className={style["header"]}>
        <p>{task.title}</p>
        <button onClick={closeTask}>Закрыть</button>
      </div>
      <div className={style["task-info"]}>
        <p>Тип задачи: {task.type}</p>
        <p>Срок выполнения: {moment(task.executeAt).format('DD.MM.YYYY')}</p>
        <p>Статус задачи: {taskState}</p>
        <p>Дата создания: {moment(task.createdAt).format('DD.MM.YYYY')}</p>
        <p></p>
        <p>Прогресс выполнения: {task.progress}%</p>

        <p className={style["description"]}>Описание задачи:</p>
        <p className={style["description"]}>{task.description}</p>
        <div className={style["buttons"]}>
          <button onClick={completeTask}>Завершить</button>
        </div>
      </div>
    </div>
  )
}

export default TaskUserInfo
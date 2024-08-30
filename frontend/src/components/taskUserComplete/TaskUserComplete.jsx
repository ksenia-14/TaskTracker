import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './taskUserComplete.module.scss';
import { ApiContext } from '../contexts/ApiContext';
import moment from 'moment';

const TaskUserComplete = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [taskState, setTaskState] = useState([]);

  const progressValues = [0, 25, 50, 75, 100];

  const { axiosGetTaskById, axiosEditTaskById } = useContext(ApiContext);

  const navigate = useNavigate();

  const closeTask = () => {
    navigate('/user/task-list');
  };

  const changeProgress = async (value) => {
    await axiosEditTaskById(id, { progress: value })
    navigate(`/user/task-info/${id}`);
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
        <p>Прогресс выполнения: {task.progress}%</p>

        <div className={style["progress"]}>
          <p>Задать прогресс выполнения: </p>
          <div className={style["progress-items"]}>
            {progressValues.map((value) => (
              <button
                key={value}
                disabled={task.progress >= value}
                value={value}
                onClick={() => changeProgress(value)}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default TaskUserComplete
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import style from './taskInfoEdit.module.scss';
import { ApiContext } from '../contexts/ApiContext';

const TaskInfoEdit = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    type: '',
    progress: 0,
    createdAt: '',
    executeAt: '',
    user: null,
    description: ''
  });
  const [taskState, setTaskState] = useState('new');
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState('');

  const { axiosGetTaskById, axiosGetUsersList, axiosEditTaskById } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [taskData, usersData] = await Promise.all([
        axiosGetTaskById(id),
        axiosGetUsersList()
      ]);
      setTask(taskData);
      setUsersList(usersData);
      checkTaskState(taskData.progress);
    };
    fetchData();
  }, [id, axiosGetTaskById, axiosGetUsersList]);

  const handleChange = (field, value) => {
    setTask(prevTask => ({
      ...prevTask,
      [field]: value
    }));
  };

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setTaskState(newState);
    checkTaskProgress(newState);
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    handleChange('progress', newProgress);
    checkTaskState(newProgress);
  };

  const checkTaskState = (progress) => {
    setTaskState(progress == 0 ? 'new' : progress == 100 ? 'done' : 'in_process');
  };

  const checkTaskProgress = (state) => {
    if (state === 'new') {
      handleChange('progress', 0);
    } else if (state === 'done') {
      handleChange('progress', 100);
    } else if (task.progress == 0 || task.progress == 100) {
      handleChange('progress', 50);
    }
  };

  const saveTask = async (event) => {
    event.preventDefault();
    try {
      const updatedTask = await axiosEditTaskById(id, task);
      navigate(`/admin/task-info/${updatedTask.id}`);
    } catch (error) {
      const errorMessages = error.response.data.message;
      const errorMessage = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
      setError(errorMessage);
    }
  };

  const closeTask = (event) => {
    event.preventDefault();
    navigate(`/admin/task-info/${id}`);
  };

  return (
    <form onSubmit={saveTask} className={style["task"]}>

      <div className={style["header"]}>
        <input 
          onChange={(e) => handleChange('title', e.target.value)} 
          value={task.title}
        ></input>
        <button onClick={closeTask}>Закрыть</button>
      </div>

      <div className={style["task-info"]}>

        <div>
          <span>Тип задачи: </span>
          <select
            name="types"
            id="taskEditType"
            value={task.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="Task">Task</option>
            <option value="Epic">Epic</option>
            <option value="Milestone">Milestone</option>
          </select>
        </div>

        <div>
          <span>Срок выполнения:</span>
          <input
            type="date"
            value={task.executeAt}
            onChange={(e) => handleChange('executeAt', e.target.value)}
          ></input>
        </div>

        <div>
          <span>Статус задачи: </span>
          <select
            name="types"
            id="taskStateType"
            value={taskState}
            onChange={handleStateChange}
          >
            <option value="new">Новая</option>
            <option value="in_process">В работе</option>
            <option value="done">Выполнена</option>
          </select>
        </div>

        <div>
          <span>Дата создания:</span>
          <input
            type="date"
            onChange={(e) => handleChange('createdAt', e.target.value)}
            value={task.createdAt}
          ></input>
        </div>

        <div>
          <span>Исполнитель:</span>
          <select
            name="types"
            id="taskUser"
            value={task.user ? task.user.id : ""}
            onChange={(e) => handleChange('user', e.target.value === "" ? null : e.target.value)}
          >
            <option value="">Не назначен</option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <span>Прогресс выполнения:</span>
          <select
            name="progress"
            id="taskProgress"
            value={task.progress}
            onChange={handleProgressChange}
          >
            <option value="0">0%</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>
        </div>

        <div className={style["description"]}>
          <p>Описание задачи:</p>
          <textarea
            type="textarea"
            value={task.description}
            onChange={(e) => handleChange('description', e.target.value)}
          ></textarea>
        </div>

        <div className={style["buttons"]}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={closeTask}>Отменить</button>
        </div>

        <div className={style.error}>{error}</div>
      </div>
    </form>
  )
}

export default TaskInfoEdit
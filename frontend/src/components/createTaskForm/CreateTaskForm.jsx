import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './createTaskForm.module.scss';
import { ApiContext } from '../contexts/ApiContext';

const CreateTaskForm = () => {
  const [usersList, setUsersList] = useState([]);
  const [task, setTask] = useState({
    title: '',
    type: 'Task',
    progress: 0,
    executeAt: '',
    user: null,
    description: ''
  })

  const { axiosCreateTask, axiosGetUsersList } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [usersData] = await Promise.all([
        axiosGetUsersList()
      ]);
      setUsersList(usersData);
    };
    fetchData();
  }, [axiosGetUsersList]);

  const handleChange = (field, value) => {
    setTask(prevTask => ({
      ...prevTask,
      [field]: value
    }));
  };

  const createTask = async (event) => {
    event.preventDefault();
    await axiosCreateTask(task)
    navigate('/admin/task-list');
  };

  const closeTask = (event) => {
    event.preventDefault();
    navigate('/admin/task-list');
  };

  return (
    <form onSubmit={createTask} className={style["task"]}>

      <div className={style["header"]}>
        <input 
          placeholder='Название задачи'
          onChange={(e) => handleChange('title', e.target.value)} 
          value={task.title}
        ></input>
        <button onClick={closeTask}>Закрыть</button>
      </div>

      <div className={style["form"]}>

        <p>Тип задачи</p>
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

        <p>Срок выполнения</p>
        <input 
          type="date"
          value={task.executeAt}
          onChange={(e) => handleChange('executeAt', e.target.value)}
        ></input>

        <p>Исполнитель</p>
        <select
            name="types"
            value={task.user ? task.user.id : null}
            onChange={(e) => handleChange('user', e.target.value)}
          >
            <option value={null}>Не назначен</option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

        <p>Описание задачи</p>
        <textarea
            type="textarea"
            value={task.description}
            onChange={(e) => handleChange('description', e.target.value)}
          ></textarea>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={closeTask}>Отменить</button>
      </div>

    </form>
  )
}

export default CreateTaskForm
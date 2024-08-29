import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import style from './taskList.module.scss';
import TaskListItem from './taskListItem/TaskListItem';
import { ENDPOINTS } from '../../apiConfig';
import { ApiContext } from '../contexts/ApiContext';

const TaskList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const { axiosGetAllTasks } = useContext(ApiContext);

  const navigate = useNavigate();

  const createNewTask = (event) => {
    navigate('/admin/create-new-task');
  };

  const getTask = async (id) => {
    const tasks = await axiosGetAllTasks(id)
    setTasks(tasks)
  }

  React.useEffect(() => {
    getTask(id)
  }, [id])

  return (
    <div className={style["task-list-page"]}>
      <div className={style["task-first-str"]}>
        <h3>Список задач</h3>
        <button>Настроить фильтр</button>
        <button onClick={createNewTask}>Создать задачу</button>
      </div>
      <div className={style["task-list"]}>
        <div className={style["task-list-header"]}>
          <p>Название</p>
          <p>Тип</p>
          <p>Исполнитель</p>
          <p>Прогресс</p>
          <p>Сроки</p>
        </div>
        {tasks.map((task) => (
        <TaskListItem 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          type={task.type} 
          progress={task.progress} 
          createdAt={task.createdAt} 
          executeAt={task.executeAt} 
          user={task.user ? task.user.login : 'Не назначен'} 
        />
      ))}
      </div>
    </div>
  )
}

export default TaskList
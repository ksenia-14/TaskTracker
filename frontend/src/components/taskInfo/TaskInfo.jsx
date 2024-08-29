import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import style from './taskInfo.module.scss';
import { ENDPOINTS } from '../../apiConfig';
import { ApiContext } from '../contexts/ApiContext';
import { useContext } from 'react';

const TaskInfo = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);

  const { axiosGetTaskById, axiosDeleteTaskById } = useContext(ApiContext);

  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/admin/task-list');
  };

  const editTask = (event) => {
    navigate(`/admin/task-edit/${id}`);
  };

  const openWorkLog = (event) => {
    navigate(`/admin/task-worklog/${id}`);
  };

  const deleteTask = (event) => {
    axiosDeleteTaskById(id)
    navigate('/admin/task-list');
  };

  const getTask = async (id) => {
    const task = await axiosGetTaskById(id)
    setTask(task)
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
        <p>Статус задачи: В работе</p>
        <p>Дата создания: {moment(task.createdAt).format('DD.MM.YYYY')}</p>
        <p>Исполнитель: {task.user ? task.user.login : 'Не назначен'}</p>
        <p>Прогресс выполнения: {task.progress}%</p>

        <p className={style["description"]}>Описание задачи:</p>
        <p className={style["description"]}>{task.description}</p>
        <div className={style["buttons"]}>
          <button onClick={openWorkLog}>Журнал работ</button>
          <button onClick={editTask}>Редактировать</button>
          <button onClick={deleteTask}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './taskOpenWorklog.module.scss';
import HomeIcon from '../icons/HomeIcon';
import WorklogItem from './worklogItem/WorklogItem';
import { ApiContext } from '../contexts/ApiContext';
import moment from 'moment';

const TaskOpenWorklog = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [taskState, setTaskState] = useState([]);
  const [worklog, setWorklog] = useState([]);

  const { axiosGetTaskById, axiosWorklogByTaskId } = useContext(ApiContext);

  const navigate = useNavigate();

  const closeTask = (event) => {
    navigate('/admin/task-list');
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

  const getWorklog = async (id) => {
    const worklogTask = await axiosWorklogByTaskId(id)
    setWorklog(worklogTask)
    console.log(worklogTask)
  }

  React.useEffect(() => {
    getTask(id)
    getWorklog(id)
  }, [id])
  
  return (
    <div className={style["task"]}>
      <div className={style["header"]}>
        <p>{task.title}</p>
        <button onClick={closeTask}>Закрыть</button>
      </div>
      <div className={style["task-info"]}>
        <p>Тип задачи: {task.type}</p>
        <p>Срок выполнения:  {moment(task.executeAt).format('DD.MM.YYYY')}</p>
        <p>Статус задачи: {taskState}</p>
        <p>Дата создания: {moment(task.createdAt).format('DD.MM.YYYY')}</p>
        <p>Исполнитель: {task.user ? task.user.login : 'Не назначен'}</p>
        <p>Прогресс выполнения: {task.progress}%</p>
      </div>
      <p>Журнал работ</p>
      <div className={style["header-worklog"]}>
        <p>Исполнитель</p>
        <p>Прогресс выполнения</p>
        <p>Дата</p>
      </div>
      {worklog.map((worklog_item) => (
        <WorklogItem 
          key={worklog_item.id}  
          user={worklog_item.user ? worklog_item.user.name : ""}  
          progress={worklog_item.progress}  
          date={worklog_item.date}  
        />
      ))}
    </div>
  )
}

export default TaskOpenWorklog
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './taskUserList.module.scss';
import TaskUserListItem from './taskUserListItem/TaskUserListItem';
import { ApiContext } from '../contexts/ApiContext';

const TaskUserList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const { axiosGetAllTasks } = useContext(ApiContext);

  const getTask = async (id) => {
    const tasks = await axiosGetAllTasks(id)
    setTasks(tasks)
  }

  React.useEffect(() => {
    getTask(id)
  }, [id])

  return (
    <div className={style["task-list"]}>
      <div className={style["block"]}>
        <div style={{ background: '#FF0000' }}>
          <p>Создана</p>
        </div>
        {tasks
          .filter((task) => task.progress === 0)
          .map((task) => (
            <TaskUserListItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
      </div>
      <div className={style["block"]}>
        <div style={{ background: '#FFEA00' }}>
          <p>В работе</p>
        </div>
        {tasks
          .filter((task) => task.progress > 0 && task.progress < 100)
          .map((task) => (
            <TaskUserListItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
      </div>
      <div className={style["block"]}>
        <div style={{ background: '#2AFF00' }}>
          <p>Завершена</p>
        </div>
        {tasks
          .filter((task) => task.progress === 100)
          .map((task) => (
            <TaskUserListItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
      </div>
    </div>
  )
}

export default TaskUserList
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import style from './taskList.module.scss';
import TaskListItem from './taskListItem/TaskListItem';
import { ENDPOINTS } from '../../apiConfig';
import { ApiContext } from '../contexts/ApiContext';

const TaskList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState({
    type: "",
    progress: "",
    createdAt: "",
    executeAt: "",
    user_id: "",
  });
  const [usersList, setUsersList] = useState([]);

  const [sort, setSort] = useState({
    field: 'createdAt',
    order: 'DESC',
  });

  const { axiosGetAllTasks,
    axiosGetUsersList,
    axiosGetSortTask,
    axiosSetSortTask,
    axiosFilter,
  } = useContext(ApiContext);

  const navigate = useNavigate();

  const createNewTask = (event) => {
    navigate('/admin/create-new-task');
  };

  const handleSortChange = (field, order) => {
    setSort({ field: field, order: order })
  }

  const handleFilterChange = (field, value) => {
    setTaskFilter(prevTask => ({
      ...prevTask,
      [field]: value
    }));
  };

  const applySortFilter = async (event) => {
    event.preventDefault();
    await axiosSetSortTask(sort)
    // const tasks_filter = await axiosFilter(taskFilter) // not working
    const token = localStorage.getItem('access_token');
    const responce = await axios.get(ENDPOINTS.TASKS_FILTER, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: taskFilter
    })
    const tasks_filter = responce.data
    setTasks(tasks_filter)
    console.log(tasks)
  }

  useEffect(() => {
    const fetchData = async () => {
      const [tasksResponse, sortResponse, usersData] = await Promise.all([
        axiosGetAllTasks(),
        axiosGetSortTask(),
        axiosGetUsersList(),
      ]);
      setTasks(tasksResponse);
      setSort(sortResponse);
      setUsersList(usersData);
    };

    fetchData();
  }, []);

  return (
    <div className={style["task-list-page"]}>
      <div className={style["task-first-str"]}>
        <h3>Список задач</h3>
        <button>Настроить фильтр</button>
        <button onClick={createNewTask}>Создать задачу</button>
      </div>

      <form onSubmit={applySortFilter}>
        <p>Сортировать</p>
        <div className={style["sort"]}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
            </svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
            </svg>
          </div>

          <span>Поле</span>
          <span>Фильтр</span>

          <input
            type="radio"
            name="sort"
            value="type_desc"
            checked={sort.field === 'type' && sort.order === 'DESC'}
            onChange={() => handleSortChange('type', 'DESC')}
          />
          <input
            type="radio"
            name="sort"
            value="type_asc"
            checked={sort.field === 'type' && sort.order === 'ASC'}
            onChange={() => handleSortChange('type', 'ASC')}
          />
          <span>Тип</span>
          <select
            name="types"
            id="taskEditType"
            value={taskFilter.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">-</option>
            <option value="Task">Task</option>
            <option value="Epic">Epic</option>
            <option value="Milestone">Milestone</option>
          </select>

          <input
            type="radio"
            name="sort"
            value="executor_desc"
            checked={sort.field === 'user' && sort.order === 'DESC'}
            onChange={() => handleSortChange('user', 'DESC')}
          />
          <input
            type="radio"
            name="sort"
            value="executor_asc"
            checked={sort.field === 'user' && sort.order === 'ASC'}
            onChange={() => handleSortChange('user', 'ASC')}
          />
          <span>Исполнитель</span>
          <select
            name="types"
            id="taskUser"
            value={taskFilter.user_id}
            onChange={(e) => handleFilterChange('user_id', e.target.value === "" ? null : e.target.value)}
          >
            <option value="">Не назначен</option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          <input
            type="radio"
            name="sort"
            value="progress_desc"
            checked={sort.field === 'progress' && sort.order === 'DESC'}
            onChange={() => handleSortChange('progress', 'DESC')}
          />
          <input
            type="radio"
            name="sort"
            value="progress_asc"
            checked={sort.field === 'progress' && sort.order === 'ASC'}
            onChange={() => handleSortChange('progress', 'ASC')}
          />
          <span>Прогресс</span>
          <select
            name="progress"
            id="taskProgress"
            value={taskFilter.progress}
            onChange={(e) => handleFilterChange('progress', e.target.value)}
          >
            <option value="">-</option>
            <option value="0">0%</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>

          <input
            type="radio"
            name="sort"
            value="created_at_desc"
            checked={sort.field === 'createdAt' && sort.order === 'DESC'}
            onChange={() => handleSortChange('createdAt', 'DESC')}
          />
          <input
            type="radio"
            name="sort"
            value="created_at_asc"
            checked={sort.field === 'createdAt' && sort.order === 'ASC'}
            onChange={() => handleSortChange('createdAt', 'ASC')}
          />
          <span>Дата создания</span>
          <input
            type="date"
            value={taskFilter.createdAt}
            onChange={(e) => handleFilterChange('createdAt', e.target.value)}
          ></input>

          <input
            type="radio"
            name="sort"
            value="due_date_desc"
            checked={sort.field === 'executeAt' && sort.order === 'DESC'}
            onChange={() => handleSortChange('executeAt', 'DESC')}
          />
          <input
            type="radio"
            name="sort"
            value="due_date_asc"
            checked={sort.field === 'executeAt' && sort.order === 'ASC'}
            onChange={() => handleSortChange('executeAt', 'ASC')}
          />
          <span>Срок выполнения</span>
          <input
            type="date"
            value={taskFilter.executeAt}
            onChange={(e) => handleFilterChange('executeAt', e.target.value)}
          ></input>
        </div>

        <button>Применить</button>
      </form>

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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './createTaskForm.module.scss';
import HomeIcon from '../icons/HomeIcon';

const CreateTaskForm = () => {
  const navigate = useNavigate();

  const createTask = (event) => {
    event.preventDefault();
    navigate('/admin/task-list');
  };

  const closeTask = (event) => {
    event.preventDefault();
    navigate('/admin/task-list');
  };
  
  return (
    <div className={style["task"]}>
      <div className={style["header"]}>
        <input placeholder='Название задачи'></input>
        <button onClick={closeTask}>Закрыть</button>
      </div>
      <form onSubmit={createTask} className={style["form"]}>
        <p>Тип задачи</p>
        <select name="types" id="newTaskType">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p>Срок выполнения</p>
        <input type="date"></input>
        <p>Исполнитель</p>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p>Описание задачи</p>
        <input type="text"></input>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={closeTask}>Отменить</button>
      </form>
    </div>
  )
}

export default CreateTaskForm
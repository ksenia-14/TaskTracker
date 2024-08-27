import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './taskInfoEdit.module.scss';
import HomeIcon from '../icons/HomeIcon';

const TaskInfoEdit = () => {
  const navigate = useNavigate();

  const saveTask = (event) => {
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
        <p>Название задачи</p>
        <button onClick={closeTask}>Закрыть</button>
      </div>
      <form onSubmit={saveTask} className={style["task-info"]}>
        <div>
          <span>Тип задачи: </span>
          <select 
            name="types" 
            id="taskEditType"
            // value={selectedType}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <p>Срок выполнения: 28.08.2024</p>
        <div>
          <span>Статус задачи: </span>
          <select 
            name="types" 
            id="taskStateType"
            // value={selectedType}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <p>Дата создания: 28.07.2024</p>
        <p>Исполнитель: Иванов</p>
        <p>Прогресс выполнения: 50%</p>

        <p className={style["description"]}>Описание задачи:</p>
        <p className={style["description"]}>Описание задачи задачи задачи задачи задачи задачи задачи задачи задачи
        задачи задачи задачи задачи задачи задачи задачи
        </p>
        <div className={style["buttons"]}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={closeTask}>Отменить</button>
        </div>
      </form>
    </div>
  )
}

export default TaskInfoEdit
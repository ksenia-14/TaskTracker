import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import style from './editSubtasksForm.module.scss';
import { ApiContext } from '../contexts/ApiContext';
import { useContext } from 'react';
import SubtaskItem from '../subtaskItem/SubtaskItem';

const EditSubtasksForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [selectedSubtaskIds, setSelectedSubtaskIds] = useState({
    subtask_id_array: []
  });

  const { axiosGetTaskById, axiosGetAllTasks, axiosSetSubtasks } = useContext(ApiContext);

  const navigate = useNavigate();

  const closeTask = () => {
    navigate(`/admin/task-info/${id}`);
  };

  const save = () => {
    axiosSetSubtasks(id, selectedSubtaskIds);
    console.log(selectedSubtaskIds.subtask_id_array);
    navigate(`/admin/task-info/${id}`);
  };

  const handleCheckboxChange = (subtaskId) => {
    setSelectedSubtaskIds((prevState) => {
      const subtask_id_array = prevState.subtask_id_array;
      const updatedArray = subtask_id_array.includes(subtaskId)
        ? subtask_id_array.filter((id) => id !== subtaskId)
        : [...subtask_id_array, subtaskId];
      return {
        subtask_id_array: updatedArray
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const task = await axiosGetTaskById(id);
      setTask(task)
  
      let typeSubtasks = ''
      if (task.type === 'Epic') typeSubtasks = 'Task'
      if (task.type === 'Milestone') typeSubtasks = 'Epic'

      const subtasks = await axiosGetAllTasks();
      const filteredSubtasks = subtasks.filter(subtask => {
        if (subtask.type === typeSubtasks)
            return subtask;
      })
      setSubtasks(filteredSubtasks);
  
      const checkedSubtasks = subtasks.filter(subtask => {
        if (subtask.subtask_of)
            return subtask.subtask_of.id;
      })
  
      const ids = checkedSubtasks.map(subtask => subtask.id)
      setSelectedSubtaskIds({ subtask_id_array: ids })
    };
  
    fetchData();
  }, [id, axiosGetTaskById, axiosGetAllTasks]);

  return (
    <div className={style["task"]}>
      <div className={style["header"]}>
        <p>{task.title}</p>
        <button onClick={closeTask}>Закрыть</button>
      </div>

      <div className={style["items"]}>
        {subtasks.map((subtask) => (
          <div key={subtask.id} className={style["with-checkbox"]}>
            <input
              type="checkbox"
              checked={selectedSubtaskIds.subtask_id_array.includes(subtask.id)}
              onChange={() => handleCheckboxChange(subtask.id)}
            />
            <SubtaskItem
              id={subtask.id}
              title={subtask.title}
              type={subtask.type}
              progress={subtask.progress}
              user={subtask.user ? subtask.user.login : 'Не назначен'}
            />
          </div>
        ))
        }
      </div>

      <button className={style["button-save"]} onClick={save}>Применить</button>

    </div>
  )
}

export default EditSubtasksForm
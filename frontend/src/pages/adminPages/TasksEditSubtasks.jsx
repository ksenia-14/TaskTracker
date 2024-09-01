import EditSubtasksForm from "../../components/addSubtaskForm/EditSubtasksForm";
import HomeIcon from "../../components/icons/HomeIcon"
import style from './../pages.module.scss';

const TasksEditSubtasks = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <EditSubtasksForm />
    </div>
  )
}

export default TasksEditSubtasks
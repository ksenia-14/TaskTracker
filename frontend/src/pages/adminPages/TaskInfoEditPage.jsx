import HomeIcon from "../../components/icons/HomeIcon"
import TaskInfoEdit from "../../components/taskInfoEdit/TaskInfoEdit";
import style from './../pages.module.scss';

const TaskInfoEditPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskInfoEdit />
    </div>
  )
}

export default TaskInfoEditPage
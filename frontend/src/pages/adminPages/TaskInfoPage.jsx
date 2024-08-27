import HomeIcon from "../../components/icons/HomeIcon"
import TaskInfo from "../../components/taskInfo/TaskInfo";
import style from './../pages.module.scss';

const TaskInfoPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskInfo />
    </div>
  )
}

export default TaskInfoPage
import HomeIcon from "../../components/icons/HomeIcon"
import TaskUserComplete from "../../components/taskUserComplete/TaskUserComplete";
import style from './../pages.module.scss';

const TaskUserCompletePage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskUserComplete />
    </div>
  )
}

export default TaskUserCompletePage
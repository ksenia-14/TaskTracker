import HomeIcon from "../../components/icons/HomeIcon"
import TaskUserInfo from "../../components/taskUserInfo/TaskUserInfo";
import style from './../pages.module.scss';

const TaskUserInfoPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskUserInfo />
    </div>
  )
}

export default TaskUserInfoPage
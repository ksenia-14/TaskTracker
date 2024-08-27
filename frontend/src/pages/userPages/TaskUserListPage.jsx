import HomeIcon from "../../components/icons/HomeIcon"
import TaskUserList from "../../components/taskUserList/TaskUserList";
import style from './../pages.module.scss';

const TaskUserListPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskUserList />
    </div>
  )
}

export default TaskUserListPage
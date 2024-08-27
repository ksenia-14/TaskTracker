import HomeIcon from "../../components/icons/HomeIcon"
import TaskList from "../../components/tasksList/TasksList"
import style from './../pages.module.scss';

const TaskListPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskList />
    </div>
  )
}

export default TaskListPage
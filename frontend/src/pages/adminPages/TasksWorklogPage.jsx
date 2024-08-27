import HomeIcon from "../../components/icons/HomeIcon"
import TaskOpenWorklog from "../../components/taskOpenWorklog/TaskOpenWorklog";
import TaskList from "../../components/tasksList/TasksList"
import style from './../pages.module.scss';

const TasksWorklogPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <TaskOpenWorklog />
    </div>
  )
}

export default TasksWorklogPage
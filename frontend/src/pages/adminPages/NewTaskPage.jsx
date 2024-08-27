import CreateTaskForm from "../../components/createTaskForm/CreateTaskForm";
import HomeIcon from "../../components/icons/HomeIcon"
import style from './../pages.module.scss';

const NewTaskPage = () => {
  return (
    <div className={style["with-home-icon"]}>
      <HomeIcon />
      <CreateTaskForm />
    </div>
  )
}

export default NewTaskPage
import React from 'react';
import style from './worklogItem.module.scss';

const WorklogItem = () => {
  return (
    <div className={style["item"]}>
      <p>Иванов</p>
      <p>50%</p>
      <p>21.08.2024</p>
    </div>
  )
}

export default WorklogItem
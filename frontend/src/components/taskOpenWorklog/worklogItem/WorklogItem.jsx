import React from 'react';
import style from './worklogItem.module.scss';
import moment from 'moment';

const WorklogItem = ({id, user, progress, date}) => {
  return (
    <div className={style["item"]}>
      <p>{user}</p>
      <p>{progress}%</p>
      <p>{moment(date).format('DD.MM.YYYY')}</p>
    </div>
  )
}

export default WorklogItem
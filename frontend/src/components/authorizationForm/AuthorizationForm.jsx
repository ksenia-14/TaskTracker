import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './authorizationForm.module.scss';

const AuthorizationForm = () => {
  const [role, setRole] = useState('admin');

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (role === 'admin') {
      navigate('/admin/task-list');
    }
    else if (role === 'user') {
      navigate('/user/task-list');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value); // Обновление состояния при изменении выбора
  };

  return (
    <form className={style.auth} onSubmit={handleLogin}>
      <select className={style.select} value={role} onChange={handleRoleChange}>
        <option value='admin'>Администратор</option>
        <option value='user'>Пользователь</option>
      </select>
      <div className={style["auth-window"]}>
        <h2>Авторизация</h2>
        <input
          type="text"
          placeholder="Логин"
          id="login" name="login"></input>
        <input
          type="password"
          placeholder="Пароль"
          id="password" name="password"></input>
        <button type="submit">Войти</button>
      </div>
    </form>
  )
}

export default AuthorizationForm
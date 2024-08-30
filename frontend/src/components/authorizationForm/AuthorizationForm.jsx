import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINTS } from '../../apiConfig';

import style from './authorizationForm.module.scss';

const AuthorizationForm = () => {
  const [role, setRole] = useState('admin');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        login,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('username', login);

        if (role === 'admin') {
          navigate('/admin/task-list');
        } else if (role === 'user') {
          navigate('/user/task-list');
        }
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Некорректные логин или пароль';
      setError(errorMessage);
      console.error('Login failed:', error);
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
          id="login" name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          id="password" name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Войти</button>
      <div className={style.error}>{error}</div>
      </div>
    </form>
  )
}

export default AuthorizationForm
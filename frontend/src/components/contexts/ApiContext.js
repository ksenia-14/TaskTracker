import React, { useContext, useState } from 'react';
import axios from "axios";
import { ENDPOINTS } from '../../apiConfig';

const ApiContext = React.createContext();

const ApiProvider = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const handleRequest = async (method, url, data = null) => {
    try {
      const response = await instance[method](url, data);
      return response.data;
    } catch (error) {
      console.error(`${method.toUpperCase()} request failed:`, error);
      throw error;
    }
  };

  const axiosGetTaskById = (id) => handleRequest('get', ENDPOINTS.TASKS_GET(id));
  const axiosEditTaskById = (id, task) => handleRequest('put', ENDPOINTS.TASKS_EDIT(id), task);
  const axiosDeleteTaskById = (id) => handleRequest('delete', ENDPOINTS.TASKS_DELETE(id));
  
  const axiosCreateTask = (task) => handleRequest('put', ENDPOINTS.TASKS_CREATE, task);
  
  const axiosGetAllTasks = () => handleRequest('get', ENDPOINTS.TASKS_GET_ALL);
  const axiosGetUsersList = () => handleRequest('get', ENDPOINTS.USERS_GET);

  return (
    <ApiContext.Provider value={{
      axiosGetTaskById,
      axiosEditTaskById,
      axiosDeleteTaskById,

      axiosCreateTask,
      
      axiosGetAllTasks,
      axiosGetUsersList,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within a MyProvider');
  }
  return context;
};

export { ApiContext, ApiProvider, useApiContext };

const API_BASE_URL = 'http://localhost/api';

export const ENDPOINTS = {
  TEST: `${API_BASE_URL}/`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  TASKS_GET_ALL: `${API_BASE_URL}/task/get-all`,
  TASKS_CREATE: `${API_BASE_URL}/task/create`,
  TASKS_FILTER: `${API_BASE_URL}/task/filter`,
  TASKS_SORT: `${API_BASE_URL}/task/sort`,
  TASKS_EDIT: (id) => `${API_BASE_URL}/task/edit/${id}`,
  TASKS_DELETE: (id) => `${API_BASE_URL}/task/delete/${id}`,
  TASKS_GET: (id) => `${API_BASE_URL}/task/get/${id}`,

  USERS_GET: `${API_BASE_URL}/user/users-list`,
};
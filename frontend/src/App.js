import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AuthorizationPage from './pages/AuthorizationPage';
import TaskListPage from './pages/adminPages/TasksListPage';
import NewTaskPage from './pages/adminPages/NewTaskPage';
import TaskInfoPage from './pages/adminPages/TaskInfoPage';
import TaskInfoEditPage from './pages/adminPages/TaskInfoEditPage';
import TasksWorklogPage from './pages/adminPages/TasksWorklogPage';
import TaskUserListPage from './pages/userPages/TaskUserListPage';
import TaskUserInfoPage from './pages/userPages/TaskUserInfoPage';
import TaskUserCompletePage from './pages/userPages/TaskUserCompletePage';
import { ApiProvider } from './components/contexts/ApiContext';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="/admin/task-list" element={<TaskListPage />} />
          <Route path="/admin/create-new-task" element={<NewTaskPage />} />
          <Route path="/admin/task-info/:id" element={<TaskInfoPage />} />
          <Route path="/admin/task-edit/:id" element={<TaskInfoEditPage />} />
          <Route path="/admin/task-worklog/:id" element={<TasksWorklogPage />} />
          <Route path="/user/task-list" element={<TaskUserListPage />} />
          <Route path="/user/task-info/:id" element={<TaskUserInfoPage />} />
          <Route path="/user/task-complete/:id" element={<TaskUserCompletePage />} />
          <Route path="/" element={<AuthorizationPage />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;

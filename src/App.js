import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import UserCreatePage from './pages/UserCreatePage';
import UserEditPage from './pages/UserEditPage';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'vikas', email: 'vs.baghel2002@gmail.com', phone: '1234567890', status: true },
    { id: 2, name: 'rohan', email: 'rohan@example.com', phone: '0987654321', status: false },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserListPage users={users} setUsers={setUsers} />} />
        <Route path="/users/create" element={<UserCreatePage users={users} setUsers={setUsers} />} />
        <Route path="/users/edit/:id" element={<UserEditPage users={users} setUsers={setUsers} />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </Router>
  );
}

export default App;

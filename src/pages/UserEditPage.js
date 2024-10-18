import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Container, Typography, Paper } from '@mui/material';
import '../App.css';  // Import the global CSS styles

const UserEditPage = ({ users, setUsers }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [status, setStatus] = useState(user?.status || true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { id: user.id, name, email, phone, status };

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    setUsers(updatedUsers);
    navigate('/users');
  };

  return (
    <Container component={Paper} className="paper-container">
      <Typography variant="h4" gutterBottom className="page-header">
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          select
          label="Status"
          fullWidth
          value={status ? 'true' : 'false'}
          onChange={(e) => setStatus(e.target.value === 'true')}
        >
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: '20px' }}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default UserEditPage;

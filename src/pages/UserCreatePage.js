import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Container, Typography, Paper } from '@mui/material';
import '../App.css';  // Import the global CSS styles

const UserCreatePage = ({ users, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      name,
      email,
      phone,
      status,
    };

    setUsers([...users, newUser]);
    navigate('/users');
  };

  return (
    <Container component={Paper} className="paper-container">
      <Typography variant="h4" gutterBottom className="page-header">
        Create New User
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
          Create
        </Button>
      </form>
    </Container>
  );
};

export default UserCreatePage;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css';

const UserListPage = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtered users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const isMatchingName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingEmail = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingStatus = statusFilter ? (user.status === (statusFilter === 'active')) : true;
    return (isMatchingName || isMatchingEmail) && isMatchingStatus;
  });

  // Pagination handling
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        User Management Dashboard
      </Typography>

      {/* Search and Filter Bar */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <Select
        label="Filter by Status"
        variant="outlined"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: '20px', minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>

      <Link to="/users/create">
        <Button variant="contained" style={{ marginBottom: '20px' }}>
          Create User
        </Button>
      </Link>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Link to={`/users/edit/${user.id}`}>
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <Button variant="outlined" color="secondary" onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
                    if (confirmDelete) {
                      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
                    }
                  }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default UserListPage;

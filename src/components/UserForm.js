import React, { useState } from 'react';

const UserForm = ({ addUser }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', status: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.email.includes('@')) {
      addUser(user);
      setUser({ name: '', email: '', phone: '', status: true });
    } else {
      alert('Please provide a valid name and email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;

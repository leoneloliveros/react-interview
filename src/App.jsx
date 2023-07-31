import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState([])

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event) => {
    const usersUpdate = users.filter((item) => item.name.includes(event.target.value))
    setUsersSearch(usersUpdate);
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        name="nameUser"
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
        onChange={onChange}
      />
      <ul>
        {usersSearch.length != 0 ? usersSearch.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>
        )) : users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
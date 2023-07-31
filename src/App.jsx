import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
      />
      <ul>
        {users.map((user) => (
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


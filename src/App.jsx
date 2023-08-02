import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState();

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

  const handleInputChange = (event)=>{
    setFilterUsers(event.target.value)
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
        onChange={() => handleInputChange(event)}
      />
      <ul>
        {users.map((user) => (
          (!filterUsers ||user.name.toLowerCase().includes(filterUsers.toLowerCase()) || user.email.toLowerCase().includes(filterUsers.toLowerCase())) && (<li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>)
        ))}
      </ul>
    </div>
  );
};

export default App;

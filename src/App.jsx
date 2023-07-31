import { useState, useEffect } from 'react';

const compare = (a, b) => {
  return a.toLowerCase().includes(b.toLowerCase())
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  }

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

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        onChange={(e) => handleInput(e)}
        value={searchValue}
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
      />
      <ul>
        {users.filter((user) => (
          compare(user.name, searchValue) || compare(user.email, searchValue)
        )).map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default App;

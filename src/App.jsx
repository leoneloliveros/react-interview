import { useState, useEffect } from 'react';
const App = () => {
  const [users, setUsers] = useState('');
  const [list, setList] = useState([]);
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
      setList(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlechange = (evento) => {
    setUsers(evento.target.value)
  }
  const filter = users ? list.filter((user) => {
    const search = users.toLowerCase();
    return(
      user.email.toLowerCase().includes(search) ||
      user.name.toLowerCase().includes(search)
    )
  }): list
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
        onChange={handlechange}
      />
      <ul>
        {filter.map((user) => (
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

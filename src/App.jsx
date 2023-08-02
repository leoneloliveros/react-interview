import { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [ filterValue, setFilterValue ] = useState('')

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

  const handleChange = (e) => {
    setFilterValue(e.target.value)
  }

  const filterData = users.filter(user => {
    const inputValueLowerCase = filterValue.toLowerCase() 
    const { name, email } = user
    if (name.toLowerCase().includes(inputValueLowerCase) || email.toLowerCase().includes(inputValueLowerCase)) {
      return user
    } else return
  })

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
        value={filterValue}
        onChange={handleChange}
      />
      <ul>
        {filterData.map((user) => (
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


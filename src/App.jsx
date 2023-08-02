import { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [valueInput, setvalueInput] =useState("");

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
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setvalueInput(event.target.value)
  }

  const filterInfo = users.filter( 
    (find) => 
    find.name.toLowerCase().includes(valueInput.toLowerCase()) ||
    find.email.toLowerCase().includes(valueInput.toLowerCase()) 
  );

  console.log(filterInfo);
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        onChange={handleChange}
        value={valueInput}
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
      />
      <ul>
        {filterInfo.map((user) => (
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


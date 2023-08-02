import { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = (e) => {
    return setValues(e.target.value);
  };
  const filterArray = users.filter(
    (search) =>
      search.name.toLowerCase().includes(values.toLowerCase()) ||
      search.email.toLowerCase().includes(values.toLowerCase())
  );
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input
        onChange={handleFilter}
        type="text"
        placeholder="Buscar por nombre o correo electrónico"
        value={values}
      />
      <ul>
        {filterArray.map((user) => (
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

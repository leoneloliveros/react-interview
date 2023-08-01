import React, { useState, useEffect } from "react";

const App = () => {
   const [users, setUsers] = useState([]);
   const [userSearch, setUserSearch] = useState("");

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

   const handleChange = (event) => {
      const value = event.target.value;
      setUserSearch(value);
   };

   return (
      <div>
         <h1>Lista de Usuarios</h1>
         <input
            value={userSearch}
            type="text"
            placeholder="Buscar por nombre o correo electrónico"
            onChange={handleChange}
         />
         <ul>
            {users
               .filter((user) =>
                  user.name.toLowerCase().includes(userSearch) ||
                  user.email.toLowerCase().includes(userSearch)
                     ? user
                     : null
               )
               .map((user) => (
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

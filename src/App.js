import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [respositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
        title:`Meu projeto ${Date.now()}`,
        url: "http://localhost:3000",
        techs:["React","Vuejs"]
      });

    const respositoryData = response.data;
    setRepositories([...respositories,respositoryData]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const updateRepositories = respositories.filter(respository => respository.id !== id);
    setRepositories(updateRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          respositories.map((repository) =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>    
            
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import Routes from './Routes/Route.js';
import './App.css';
import { useEffect, useState } from 'react';
import { Uid } from './Context/Uid.js';
import axios from 'axios';

function App() {
  const [idUtilisatuerSiConnecter, setidUtilisatuerSiConnecter] = useState(null)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/jwtid`,
      withCredentials: true
    })
      .then(function (response) {
        if (response.data) {
          console.log(response.data)
          setidUtilisatuerSiConnecter(response.data)
        } else {
          console.log("not connecter")
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [idUtilisatuerSiConnecter])

  return (
    <Uid.Provider value={idUtilisatuerSiConnecter} className="App">
      <Routes />
    </Uid.Provider>
  );
}


export default App;

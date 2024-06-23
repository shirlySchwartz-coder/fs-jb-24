import { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import './MainPage.css';
import axios from 'axios';
import { UpdateServer } from '../../pages/UpdateServer/UpdateServer';

type Server = {
  id: number;
  name: string;
  ip: string;
  id_hosting: string;
  stat: boolean;
  start_time: string;
};

function MainPage(): JSX.Element {
  const [servers, setServers] = useState<server[]>([]);
 
 
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/servers')
      .then((response) => response.data)
      .then((data) => setServers(data));
      
  }, []);

 
  
  return (
    <div className='MainPage'>
      {servers.length > 0 &&
        servers.map((item) => (
         <UpdateServer key={item.id} server={item}/>    
        ))}
    </div>
  );
}

export default MainPage;


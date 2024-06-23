import './UpdateServer.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Server from '../../layout/MainPage';

interface SingleServerProps {
    server: typeof Server;
}

export function UpdateServer(props: SingleServerProps): JSX.Element {
  const [serverStatus, setServerStatus] = useState(false);
  const [serverTime, setServerTime] = useState('');

  useEffect(() => {
    if (props.start_time !== null) {
      let time =
        new Date(props.start_time).toLocaleDateString() +
        ' ' +
        new Date(props.start_time).toLocaleTimeString();
      setServerTime(time);
    } else {
      setServerTime('Not Started');
    }
  }, []);

  const changeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newStatus = event.target.checked;
    console.log(newStatus);
    axios
      .post(`http://localhost:8080/api/v1/server/status/${server.id}`, {
        stat: `${newStatus}`,
      })
      .then((response) => {
        <h3>status Changed</h3>;
        console.log('data serverStatus', response.data, serverStatus);
      });
  };
  
  };

  return (
    <div className='UpdateServer'>
      <h1>Update Server</h1>
      <hr />
      <>
        <div className='Box' key={server.id}>
          <h2>{server.name}</h2>
          <br />
          <hr />
          {server.ip}
          <br />
          {server.id_hosting}
          <hr />
          <FormControlLabel
            control={<Switch checked={server.stat} onChange={changeStatus} />}
            label='Server Status'
            labelPlacement='top'
          />
          <br />
          <br />
          {serverTime}
        </div>
      </>
    </div>
  );
}

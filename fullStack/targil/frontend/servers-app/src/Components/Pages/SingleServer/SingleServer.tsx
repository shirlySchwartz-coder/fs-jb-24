import './SingleServer.css';
import { Server } from '../../Models/Server';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

interface SingleServerProps {
  server: Server;
}

export function SingleServer(props: SingleServerProps): JSX.Element {
  const [serverStart, setServerStart] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  
  useEffect(() => {
    if (props.server.server_start !== null) {
      let time =
        new Date(props.server.server_start).toLocaleDateString() +
        ' ' +
        new Date(props.server.server_start).toLocaleTimeString();
      setServerStart(time);
    } else {
      setServerStart('Not Started');
    }

  }, []);

  const changeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    let newStatus = event.target.checked
    console.log(newStatus )
    axios.post(`http://localhost:8080/api/v1/servers/status/${props.server.server_id}`, {
      stat: `${newStatus}`
    })
    .then(response => {
      <h3>status Changed</h3>
      console.log("data serverStatus", response.data, serverStatus)
    });
  };

  return (
    <div className='SingleServer Box'>
      <h1>{props.server.server_name}</h1>
      <hr />
      <i>
        <b>
          {props.server.server_ip}
          <br />
          {props.server.hosting_name}
        </b>
      </i>
      <br />
      <br />
      {serverStart}
      <br />
      <br />
      <hr />
      <FormControlLabel
        control={<Switch checked={props.server.server_status} 
        onChange={changeStatus}
        />}
        label='Server Status'
        labelPlacement='top'
      />
    </div>
  );
}

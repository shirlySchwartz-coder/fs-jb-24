import './VacationList.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Vacation } from '../../models/Vacation';
import { useState } from 'react';
import { VacationItem } from '../VacationItem/VacationItem';



export function VacationList(): JSX.Element {
    const [vacations, setVacations] = useState<Vacation[]>([]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        Vacation List <br />
        {vacations.map((item)=>(
            <VacationItem key={item.vacationId} vacation={item}/>
        ))}
      </Container>
    </React.Fragment>
  );
}

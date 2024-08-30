import './VacationList.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Vacation } from '../../models/Vacation';
import { VacationItem } from '../VacationItem/VacationItem';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';
import { saveVacations } from '../../../redux/VacationReducer';

import vars from '../../utils/Variants';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Get the dispatch function

    (async () => {
      if (!CheckJWT()) {
        navigate('/login');
      } else {
        let token = store.getState().login.jwt;
        try {
          const response = await axios.get(vars.VacationsUrl, {
            headers: { 'Authorization': `${token}` },
          });
          console.log('All vacations:', response.data);
          setVacations(response.data);
          if (vacations && vacations.length >= 1) {
            console.log('pass to redux');
            store.dispatch(saveVacations(vacations));
          } else {
            console.log('There is no vacations at the moment');
          }
        } catch (error) {
          console.error('Fetching vacations failed:', error);
        }
      }
      console.log('start');
    })();
  }, []);
  //React.Fragment
  return (
    <div className='VacationList'>
      <CssBaseline />
      <h2>Vacation List</h2> <br />
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 2,
        }}
      >
        {vacations.map((item) => (
          <VacationItem key={item.vacationId} vacation={item} />
        ))}
      </Box>
    </div>
  );
}

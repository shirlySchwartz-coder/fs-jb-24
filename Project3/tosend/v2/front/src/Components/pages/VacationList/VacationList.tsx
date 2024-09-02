import './VacationList.css';
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
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
import { saveFavorites, saveVacations } from '../../../redux/VacationReducer';

import vars from '../../utils/Variants';
import { Favorite } from '../../models/Favorite';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  //const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();
  const [isLogged, setLogged] = useState(false);
  const [id, setId] = useState<number>();

  store.subscribe(() => {
    setLogged(store.getState().login.jwt.length > 10);
    setId(store.getState().login.userId);
  });
  const fixUserFav = (vacations: Vacation[], favorites: Favorite[]) => {
    let tempVacArray = vacations;
    console.log(vacations, favorites);
    let tempVac = tempVacArray.find(
      (i) => i.vacationId === favorites[0].idVacation
    );
    console.log('tempVac:', tempVac);
  };

  const fetchFavorites = useCallback(async () => {
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }

    let token = store.getState().login.jwt;
    let id = store.getState().login.userId;
    try {
      const favoritesRes = await axios.get(`${vars.FavoritesUrl}${id}`, {
        headers: { 'Authorization': `${token}` },
      });

      //setFavorites(favoritesRes.data);
      console.log('Favorites:', favoritesRes.data);
      store.dispatch(saveFavorites(favoritesRes.data));
      //
      return favoritesRes.data;
      //
    } catch (error) {
      console.error('Fetching favorites failed:', error);
    }
  }, []);

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
           
          }
        } catch (error) {
          console.error('Fetching vacations failed:', error);
        }
        const favorites = await fetchFavorites();
        const storedVac = store.getState().vacations.allVacations;
        if(storedVac.length >0 && favorites.length>0){
           fixUserFav(storedVac, favorites);
        }else{
          console.log('One of the details are missing')
        }
       
      }
      console.log('start');
    })();
  }, []);

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

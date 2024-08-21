import { useEffect, useState } from 'react';
import './VacationList.css';
import axios from 'axios';
import { Vacation } from '../../Models/Vacation';
import SingleVacation from '../SingleVacation/SingleVacation';
import { CheckJWT } from '../../utils/JWT';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../redux/store';
import { Container } from '@mui/material';
import { error } from 'console';
import {
  VacationState,
  VacationAction,
  gelAllVacationsAction,
} from '../../../redux/VacationReducer';
import { getFavoritesAction } from '../../../redux/FavoriteReducer';
import { Favorite } from '../../Models/Favorite';
import { forEachChild } from 'typescript';

//import pathUrl from '../../utils/vars';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [token, setToken] = useState('');
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [id, setId] = useState(store.getState().login.userId);

  // console.log(id);
  const getAllVacationsUrl = `http://localhost:8080/api/v1/vacations/all`;
  const FavoritesUrl = 'http://localhost:8080/api/v1/vacations/favorites/';
  //console.log(getFavoritesUrl)
  const navigate = useNavigate();

  store.subscribe(() => {
    setToken(store.getState().login.jwt);
    setVacations(store.getState().trips.allVacations);
    setFavorites(store.getState().favorites.userFavorites);
  });

  const getFavorites = () => {
    let token = store.getState().login.jwt;
    let id= store.getState().login.userId
    console.log('token, id in get fav:', token, id);
    if (token.length > 10 && id !== 0) {
      axios
        .get(FavoritesUrl + id, {
          headers: { 'Authorization': `${token}` },
        })
        .then((res) => res.data)
        .then((data) => {
          setFavorites(data);
          store.dispatch(getFavoritesAction(data));
          console.log("favorites:",favorites)

          return data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      console.log('need new jwt');
    }
  };
  const vacationsFavorites=()=>{
    const result = vacations.map(vacation => ({
      ...vacation,
      isFavorite: favorites.some(favorite => favorite.idVacation === vacation.vacationId) // Use map to add isFavorite
  }));
  console.log(result);
      //store.dispatch(gelAllVacationsAction(vacations))
    
    
  }
  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
    } else {
      let token = store.getState().login.jwt;
      //console.log('token to send vacations:',token)
      axios
        .get(getAllVacationsUrl, { headers: { 'Authorization': `${token}` } })
        .then((res) => res.data)
        .then(async (data) => {
          console.log('All vacations:', data);
          setVacations(data);
          store.dispatch(gelAllVacationsAction(data));
          let fav: any = await getFavorites();
          vacationsFavorites();
          console.log("newvac:",vacations)
        })
        .catch((error) => {
          console.error(401, error);
        });
    }
  }, []);

  return (
    <Container maxWidth='sm' className='VacationList'>
      {favorites.map((item) => (
        <p>{item.idVacation}</p>
      ))}
      {vacations.map((item) => (
        <SingleVacation key={item.vacationId} vacation={item} />
      ))}
    </Container>
  );
}

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

//import pathUrl from '../../utils/vars';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [token, setToken] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [id, setId] = useState(store.getState().login.userId);

  // console.log(id);
  const getAllVacationsUrl = `http://localhost:8080/api/v1/vacations/all`;
  //const getFavoritesUrl = `http://localhost:8080/api/v1/vacations/favorites/${id}`;
  //console.log(getFavoritesUrl)
  const navigate = useNavigate();

  const getFavorites = () => {
    if (token.length > 10) {
      axios
        .get(`http://localhost:8080/api/v1/vacations/favorites/1`, {
          headers: { 'Authorization': `${token}` },
        })
        .then((res) => res.data)
        .then((data) => {
          //return data;
          setFavorites(data);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      console.log('need new jwt');
    }
  };

  const getVacations = () => {
    if (store.getState().trips.allVacations.length < 1) {
      axios
        .get(getAllVacationsUrl, { headers: { 'Authorization': `${token}` } })
        .then((res) => res.data)
        .then(async (data) => {
          console.log('All vacations:', data);

          if (data.length > 0) {
            setVacations(data);
          }
        })
        .catch((error) => {
          console.log('error', error);
          return error;
        });
    }
  };

  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
    } else {
      setToken(store.getState().login.jwt);
      setId(store.getState().login.userId);
      console.log('token to send vacations:', token);
      let vacsResult = store.getState().trips.allVacations;
      if (vacsResult.length > 0) {
        getVacations();
        if (vacations.length > 0) {
          store.dispatch(gelAllVacationsAction(vacsResult));
        }
      }
      getFavorites()
      if(favorites.length>0){
        //
        setFavorites(favorites)
        store.dispatch(getFavoritesAction(favorites))
      }
      
    }
  }, []);

  return (
    <Container maxWidth='sm' className='VacationList'>
      {favorites ? '${favorites}' : 'none'}
      {vacations.map((item) => (
        <SingleVacation key={item.vacationId} vacation={item} />
      ))}
    </Container>
  );
}

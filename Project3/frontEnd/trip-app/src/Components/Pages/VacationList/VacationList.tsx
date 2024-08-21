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
  updateVacationFunction,
} from '../../../redux/VacationReducer';
import { getFavoritesAction } from '../../../redux/FavoriteReducer';
import { Favorite } from '../../Models/Favorite';

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

  const getFavorites = async () => {
    let token = store.getState().login.jwt;
    let id= store.getState().login.userId
    console.log('token, id in get fav:', token, id);
    if (token.length > 10 && id !== 0) {
     await axios
        .get(FavoritesUrl + id, {
          headers: { 'Authorization': `${token}` },
        })
        .then((res) => res.data)
        .then((data) => {
          setFavorites(data);
          
          store.dispatch(getFavoritesAction(data));
          console.log("favorites:",favorites)
          updateVacationsWithFavorites()

        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      console.log('need new jwt');
    }
  };
  /*const vacationsFavorites=()=>{
    let favorites =store.getState().favorites.userFavorites
    for(let i=0;i<favorites.length; i++){
       let temp = (vacations.filter((vacation)=>vacation.vacationId===favorites[i].idVacation))

       
    }
    //console.log(fav)
  }
*/
  const updateVacationsWithFavorites = () => {
    setVacations(store.getState().trips.allVacations);
    for(let i=0;i<favorites.length;i++){
      for(let j=0; j<vacations.length; j++){
        if(favorites[i].idVacation===vacations[j].vacationId){
          vacations[j].isFavorite=true;
          store.dispatch(updateVacationFunction(vacations[j]))
        }
      }
      //store.dispatch(updateVacationFunction(vacations))
    }
    
  };

  useEffect(() => {
    const checkAndFetchData = async () => {
      if (!CheckJWT()) {
        navigate('/login');
      } else {
        let token = store.getState().login.jwt;
        await axios
          .get(getAllVacationsUrl, { headers: { 'Authorization': `${token}` } })
          .then((res) => res.data)
          .then(async (data) => {
            console.log('All vacations:', data);
            setVacations(data);
           store.dispatch(gelAllVacationsAction(data));
          })
          .catch((error) => {
            console.error(401, error);
          });
          await getFavorites();
          
          // updateVacationFunction();
      }
    };
    //checkAndFetchData();
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

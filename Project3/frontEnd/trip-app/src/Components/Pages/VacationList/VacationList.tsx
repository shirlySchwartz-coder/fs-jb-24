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
//import pathUrl from '../../utils/vars';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [token, setToken] = useState('');
  const [favorites, setFavorites] = useState([]);
  let id = store.getState().login.userId;
  const getAllVacationsUrl = `http://localhost:8080/api/v1/vacations/all`;
  const getFavoritesUrl = `http://localhost:8080/api/v1/vacations/favorites/1`;

  const navigate = useNavigate();

  const getFavorites = () => {
    axios
      .get(getFavoritesUrl, { headers: { 'Authorization': `${token}` } })
      .then((res) => res.data)
      .then((data) => {
        console.log('All favorites:', data);
        return(data);
      }).catch((e)=>{
        console.log(e)
      });
  };

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
           let fav =await getFavorites();
          
        })
        .catch((error) => {
          console.error(401, error);
        });
    }
  }, []);

  return (
    <Container maxWidth='sm' className='VacationList'>  
      {vacations.map((item) => (
        <SingleVacation key={item.vacationId} vacation={item} />
      ))}
    </Container>
  );
}

import './VacationList.css';
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
//import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { Vacation } from '../../models/Vacation';
import { VacationItem } from '../VacationItem/VacationItem';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';
import { saveFavorites, saveVacations } from '../../../redux/VacationReducer';
import vars from '../../utils/Variants';
import { Favorite } from '../../models/Favorite';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  //const [id, setId] = useState<number>();
  const [isAdmin, setIsAdmin] = useState(false);
  //const [isLogged, setLogged] = useState(false);
  //const [token, setToken] = useState<string>();
  const navigate = useNavigate();
  let sxSetting = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
    gap: 2,
  };

  store.subscribe(() => {
    setIsAdmin(store.getState().login.isAdmin);
    //setToken(store.getState().login.jwt);
    setVacations(store.getState().vacations.allVacations);
    setFavorites(store.getState().vacations.userFavorites);
  });

  useEffect(() => {
    const fetchIntialData = async () => {
      if (!CheckJWT()) {
        navigate('/login');
      } else {
        
        await getAllData();
      }
    };
    fetchIntialData();
  }, []);

  const getAllData = async () => {
    const resultVacation = await getVacations();
    const resultFavorites = await getFavorites();
    if (resultVacation.length > 0 && resultFavorites.length > 0) {
      const userVacations = fixUserFav(resultVacation, resultFavorites);
      setVacations(userVacations);
    } else {
      console.log('No Favorites');
    }
  };

  const getVacations = async () => {
    let token = store.getState().login.jwt;
    const resVac = await axios
      .get(vars.VACATIONS_URL, {
        headers: { 'Authorization': `${token}` },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
    store.dispatch(saveVacations(resVac));
    return resVac;
  };
  const getFavorites = async () => {
    let token = store.getState().login.jwt;
    let id = +store.getState().login.userId;
    const resFav = await axios
      .get(`${vars.FAVORITES_URL}${id}`, {
        headers: { 'Authorization': `${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
    console.log(resFav);
    store.dispatch(saveFavorites(resFav));
    return resFav;
  };
  const fixUserFav = (vacations: Vacation[], favorites: Favorite[]) => {
    console.log('call fixUserFav:', vacations, favorites);
    const tempVacArray = vacations.map((vacation) => ({ ...vacation }));

    for (let i = 0; i < favorites.length; i++) {
      tempVacArray.forEach((item) => {
        if (item.vacationId === favorites[i].idVacation) {
          item.isFavorite = true;
        }
      });
    }
    console.log('Yes You got it :', tempVacArray, vacations);
    return tempVacArray;
  };
  //
  const handleLike = async (vacationId: number) => {
    let token = store.getState().login.jwt;
    let userId = +store.getState().login.userId;
    //let vacId = vacationId;
    //let isFav = store.getState().vacations[];
    //
    const vacationItem = vacations.find(
      (vacation) => vacation.vacationId === vacationId
    );
    let isFav = vacationItem?.isFavorite ? vacationItem.isFavorite :false;
    //
    switch (isFav) {
      case true:
        console.log('UnFollow Req');
        const resUnfollow = await axios.delete(
          `${vars.UNFOLLOW_URL}${vacationId}`,
          {
            headers: { 'Authorization': `${token}` },
            data: { userId: +userId },
          }
        );

        if (resUnfollow.status === 204) {
          console.log('unfollow successful!');
         
          //localStorage.setItem('userFavChange', 'vacationId');
        } else {
          throw new Error('unfollow fail!');
        }
        break;

      case false:
        console.log('Follow Req');
        const res = await axios.post(
          `${vars.FOLLOW_URL}${vacationId}`,
          { userId: +userId },
          { headers: { 'Authorization': `${token}` } }
        );
        if (res.status === 201) {
          console.log('follow successful!');
          //localStorage.setItem('userFavChange', 'vacationId');
        } else {
          throw new Error('not working');
        }
        break;
    }
    const updatedFavorites = await getFavorites();
    const updatedVacations = fixUserFav(vacations, updatedFavorites);
    setVacations(updatedVacations);
  };

  //
  const UserList = () => {
    return (
      <>
        {vacations.map((item) => (
          <VacationItem
            key={item.vacationId}
            vacation={item}
            onLike={handleLike}
          />
        ))}
      </>
    );
  };
  //
  const noAction = () => {
    console.log();
  };
  //
  const AdminList = () => {
    return (
      <>
        {vacations.map((item, index) => (
          <VacationItem
            key={item.vacationId}
            vacation={item}
            onLike={noAction}
          />
        ))}
      </>
    );
  };

  return (
    <div className='VacationList'>
      <CssBaseline />
      {isAdmin ? <h2>Admin List</h2> : <h2>Vacation List</h2>}
      <Box sx={sxSetting}>{isAdmin ? AdminList() : UserList()}</Box>
    </div>
  );
}

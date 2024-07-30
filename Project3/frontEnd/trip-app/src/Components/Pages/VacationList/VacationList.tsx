import { useEffect, useState } from 'react';
import './VacationList.css';
import axios from 'axios';
import { SingleVacation } from '../SingleVacation/SingleVacation';
import { Vacation } from '../../Models/Vacation';

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/vacations/all')
      .then((res) => res.data)
      .then((data) => {
        setVacations(data);
        console.log(vacations);
      });
  }, []);

  return (
  <div className='VacationList'>
{vacations.map(
    (item)=> <SingleVacation key={item.vacationId} vacation={item}/>
    )}
  </div>
  );
}

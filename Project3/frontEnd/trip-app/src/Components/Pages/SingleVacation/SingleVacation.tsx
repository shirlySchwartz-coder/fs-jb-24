import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { Vacation } from '../../Models/Vacation';
import './SingleVacation.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CheckJWT } from '../../utils/JWT';
import { useEffect } from 'react';
import { store } from '../../../redux/store';
import axios from 'axios';

interface vacationProps {
  vacation: Vacation;
}
function SingleVacation(props: vacationProps): JSX.Element {
    

  
 
       
            
             
           
              


  return (
    <Card className='SingleVacation Box'>
      <CardHeader
        title={props.vacation.destination}
        subheader={`${props.vacation.price} $`}
      />

      <CardMedia
        component='img'
        height={190}
        image={props.vacation.pictureUrl}
      />

      <CardContent>
        <br />

        <br />
        {props.vacation.vacInfo}
        <br />
        <p>
          Start : {`${props.vacation.startDate}`} <br />
          End : {`${props.vacation.endDate}`}
        </p>
        <br />
      </CardContent>
      <CardActions>
      <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default SingleVacation;

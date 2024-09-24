import './VacationItem.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Vacation } from '../../models/Vacation';
import { store } from '../../../redux/store';
import { toast } from 'react-toastify';
//import axios from 'axios';
//import vars from '../../utils/Variants';

type VacationItemProps = {
  vacation: Vacation;
  onLike: (vacationId: number) => void;
};

export function VacationItem(props: VacationItemProps): JSX.Element {
  const [isAdmin, setIsAdmin] = useState<boolean>();
  //const [isFavChanged, setIsFavChanged] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  /*store.subscribe(() => {
    setIsAdmin(store.getState().login.isAdmin);
    setIsLogged(store.getState().login.isLogged);
  });*/

  const goToEdit = () => {
    console.log('Clicked Edit', props.vacation.vacationId);
    navigate(`/updateVacation/${props.vacation.vacationId}`);
  };
  const goToDelete = () => {
    console.log('Clicked Delete', props.vacation.vacationId);
    toast.warn('You want to Delete?')
  };
  const AdminOptions = () => {
    return (
      <CardActions >
        <Button variant='contained' onClick={(e) => goToEdit()}>
          Edit
        </Button>
        <Button variant='contained' onClick={(e) => goToDelete()}>
          Delete
        </Button>
      </CardActions>
    );
  };

  const UserOptions = () => {
    return (
      <>
        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            color={props.vacation.isFavorite ? 'primary' : 'default'}
            onClick={() => props.onLike(props.vacation.vacationId)}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </>
    );
  };
  useEffect(() => {
    setIsAdmin(store.getState().login.isAdmin);
  }, []);

  return (
    <Card size='lg' variant='outlined' sx={{ maxWidth: 345 }}>
      <CardHeader
        action={<IconButton aria-label='settings'></IconButton>}
        title={`${props.vacation.vacationId}.${props.vacation.destination}`}
      />
      <h4>
        {`${props.vacation.startDate}`} Until {`${props.vacation.endDate}`}
      </h4>
      <CardMedia
        component='img'
        height='194'
        image={props.vacation.pictureUrl}
        alt={props.vacation.destination}
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {props.vacation.vacInfo}
        </Typography>
      </CardContent>
      <div>{isAdmin ? AdminOptions() : UserOptions()}</div>
    </Card>
  );
}

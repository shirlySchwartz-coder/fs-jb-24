import './VacationItem.css';
//
import Card from '@mui/joy/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';

import { Vacation } from '../../models/Vacation';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';


type VacationItemProps = {
  vacation: Vacation;
};

export function VacationItem(props: VacationItemProps): JSX.Element {
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.vacation.destination}
        subheader='September 14, 2016'
      />
      <CardMedia
        component='img'
        height='194'
        image={props.vacation.pictureUrl}
        alt={props.vacation.destination}
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

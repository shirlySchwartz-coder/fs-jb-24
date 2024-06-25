import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Meeting } from '../../modules/Meeting';
import './AddMeeting.css';
import axios from 'axios';

type formInputs = {
  team_id: number;
  start_time: Date;
  end_time: Date;
  details: string;
  room: string;
};

export function AddMeeting(): JSX.Element {
  const [teams, setTeams] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/team/all')
      .then((response) => response.data)
      .then((data) => setTeams(data));
  }, []);

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      let start = new Date(data.start_time).toISOString().slice(0, 19).replace('T', ' ');
      let end = new Date(data.end_time).toISOString().slice(0, 19).replace('T', ' ');

      let newMeeting: Meeting = {
        id: 0,
        team_id: data.team_id,
        start_time: start,
        end_time: end,
        details: data.details,
        room: data.room,
      };
      console.log('New Meeting:', newMeeting);

      const response = await axios.post('http://localhost:8080/api/meetings/add', newMeeting);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding meeting:', error);
    }
  };
  return (
    <div className='AddMeeting'>
      <h1>Add Meeting</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select>
          {teams.map((item) => (
            <option
              key={item['id']}
              value={item['id']}
              {...register('team_id')}
            >
              {item['team_name']}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input
          type='datetime-local'
          placeholder='Start Time'
          {...register('start_time')}
        />
        <br />
        <br />
        <input
          type='datetime-local'
          placeholder='End Time'
          {...register('end_time')}
        />
        <br />
        <br />
        <input type='text' placeholder='details' {...register('details')} />
        <br />
        <input type='text' placeholder='room' {...register('room')} />
        <br />
        <br />

        <input type='submit' value='Add Meeting' />
      </form>
    </div>
  );
}

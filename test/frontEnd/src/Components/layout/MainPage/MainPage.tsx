import { useEffect, useState } from 'react';
import './MainPage.css';
import axios from 'axios';
import { Meeting } from '../../modules/Meeting';
import { SingleMeeting } from '../../pages/SingleMeeting/SingleMeeting';

function MainPage(): JSX.Element {
  const [teams, setTeams] = useState([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/team/all')
      .then((response) => response.data)
      .then((data) => setTeams(data));
  }, []);

  const getTeamMeetings = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let id = event.target.value;
    await axios
      .get(`http://localhost:8080/api/meetings/${id}/all`)
      .then((response) => response.data)
      .then((data) => setMeetings(data));
    console.log(meetings);
  };

  return (
    <div className='MainPage'>
      <div className='Box'>
        <select onChange={getTeamMeetings}>
          {teams.map((item) => (
            <option key={item['id']} value={item['id']}>
              {item['team_name']}
            </option>
          ))}
        </select>
      </div>
      <br />
     
        {meetings.map((item) => 
          <SingleMeeting key= {item.id} meeting={item}/>
       )}
      
    </div>
  );
}

export default MainPage;


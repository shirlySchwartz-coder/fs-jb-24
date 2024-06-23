import { useEffect, useState } from 'react';
import './MainPage.css';
import axios from 'axios';



function MainPage(): JSX.Element {
  const [teams, setTeams] = useState([]);
  const [meetings, setMeetings] = useState([])
  

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/team/all')
      .then((response) => response.data)
      .then((data) => setTeams(data));
     
  }, []);


  const getTeamMeetings = ()=>{
    let id = 
    axios.get("http://localhost:8080/api/meetings/all/${}")
    .then (response => response.data)
    .then (data=>setMeetings(data));
  }
  return (
    <div className='MainPage'>
      <div className='Box'>
        <select onSelect={setId}>
      {teams.map(item=> <option key={item["id"]}>{item["team_name"]}</option>)}
     </select>
    
   
      </div>

     
    </div>
  );
}

export default MainPage;

/*
    	Welcome to our REACT project<br/><br/>
            our best studet is:{bestStudent}  and complicated one is: {complicatedStudent}
            <hr/>
            devices {devices} / total {total}<br/><br/>
            <div className="Box">
                Today we are eating {isWeekend?weekend:normalDay}<br/><br/>
                {isWeekend && weekendMessage}
            </div>
            {isWeekend && <Ofir/>}<br/><br/>
            {studentsInClass.map(item=><span key={item.id}>{item.name} | </span>)}
*/

import dal_mysql from "../DAL/dal_mysql";
import { Meeting } from "../Models/Meeting";


const getAllTeams = async()=>{
    //SQL statement
    const sql = "SELECT * FROM team_group ";
    
    //execute the sql command
    const allTeams = await dal_mysql.execute(sql);
    //return the result
    return allTeams;
}

const getAllTeamsMeetings = async ()=>{
    const sql = "SELECT * FROM meeting_cal ";
    const allTeamsMeetings = await dal_mysql.execute(sql);
    //return the result
    return allTeamsMeetings;
}
const getTeamMeetings = async(id:number)=>{
    //SQL statement
    const sql = `SELECT * FROM team_meetings.meeting_cal
    WHERE id=${id}`;


    // execute the sql
    const teamMeetings = await dal_mysql.execute(sql);
    console.log(teamMeetings)
    return teamMeetings;
}

const addNewMeeting = async (newMeeting: Meeting)=>{
    const sql = `INSERT INTO  team_meetings.meeting_cal (team_id, start_time, end_time, details, room)  
    VALUES (${newMeeting.id}, ${newMeeting.team_id}, ${newMeeting.start_time}, ${newMeeting.end_time},
    '${newMeeting.details}', '${newMeeting.room}')`;
    
    return await dal_mysql.execute(sql);
}


export  {
    getAllTeams,
    getAllTeamsMeetings,
    getTeamMeetings,
    addNewMeeting
}
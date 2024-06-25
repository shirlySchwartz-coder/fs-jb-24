import { Meeting } from "../../modules/Meeting";
import "./SingleMeeting.css";

interface SingleMeetingProps{
    meeting:Meeting
}

export function SingleMeeting(props: SingleMeetingProps): JSX.Element {
    return (
        <div className="SingleMeeting Box">
			 {props.meeting.id}
            <br />
            {new Date(props.meeting.start_time).toLocaleString()}
            <br />
            {new Date(props.meeting.end_time).toLocaleString()}
            <br />
            {props.meeting.details}
            <br />
            <hr/>
        </div>
    );
}

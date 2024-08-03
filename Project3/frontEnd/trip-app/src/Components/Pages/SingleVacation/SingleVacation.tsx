import { Vacation } from "../../Models/Vacation";
import "./SingleVacation.css";

interface vacationProps{
    vacation: Vacation;
}
function SingleVacation(props:vacationProps): JSX.Element {
    let startDate = (props.vacation.startDate);
    let endDate = new Date (props.vacation.endDate)
    console.log("startDate",startDate )
    return (
        <div className="SingleVacation Box">
            <b><span className="vacationTitle">{props.vacation.destination}</span></b><hr/>
            <div className="vacInfo">
                {}<br/>
                {}<br/>
                {props.vacation.vacInfo}<br/>
                <b>{+props.vacation.price}</b><br/>
            </div>
        </div>
    );
}

export default SingleVacation;

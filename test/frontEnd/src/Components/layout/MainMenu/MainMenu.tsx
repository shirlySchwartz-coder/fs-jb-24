import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
   
    return (
        <div className="MainMenu">
            <br/>
			<b>Main menu</b>
            <br/><br/>
            <hr/>
                <NavLink to="/">All Meetings</NavLink><br/><br/>
                <NavLink to="/addMeeting">Add Meeting</NavLink><br/><br/>
               
        </div>
    );
}

export default MainMenu;

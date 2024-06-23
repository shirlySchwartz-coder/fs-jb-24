import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
   
    return (
        <div className="MainMenu">
            <br/>
			<b>Main menu</b>
            <br/><br/>
            <hr/>
                <NavLink to="/servers">Servers List </NavLink><br/><br/>
                <NavLink to="/update">Update Servers</NavLink><br/><br/>
        </div>
    );
}

export default MainMenu;

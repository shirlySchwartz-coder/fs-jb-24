import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Login } from "../../pages/Login/Login";
import { Page404 } from "../../pages/Page404/Page404";
import { Register } from "../../pages/Register/Register";
import { VacationList } from "../../pages/VacationList/VacationList";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path='/'  element={<Login/>}/>
                <Route path='/login'  element={<Login/>}/>
                <Route path='/register'  element={<Register/>}/>
                <Route path='/vacations'  element={<VacationList/>}/>
                <Route path='/*'  element={<Page404/>}/>
            </Routes>
        </div>
    );
}

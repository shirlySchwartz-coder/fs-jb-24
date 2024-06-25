import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import MainPage from "../../layout/MainPage/MainPage";
import { Page404 } from "../../pages/Page404/Page404";
import { AddMeeting } from "../../pages/AddMeeting/AddMeeting";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<MainPage/>}/>
              <Route path="/addMeeting" element={<AddMeeting/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

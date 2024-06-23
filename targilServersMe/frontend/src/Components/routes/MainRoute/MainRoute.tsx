import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import MainPage from "../../layout/MainPage/MainPage";
import { Page404 } from "../../pages/Page404/Page404";
import { UpdateServer } from "../../pages/UpdateServer/UpdateServer";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/servers" element={<MainPage/>}/>
                <Route path="/update" element={<UpdateServer/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

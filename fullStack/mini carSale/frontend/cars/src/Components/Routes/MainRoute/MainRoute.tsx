import { Route, Routes } from "react-router-dom";
import MainPage from "../../Layout/MainPage/MainPage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import Page404 from "../../Pages/page404/page404";
import Login from "../../Pages/login/login";
import Register from "../../Pages/register/register";

function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/search/:vechileType" element={<SearchPage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MainRoute;

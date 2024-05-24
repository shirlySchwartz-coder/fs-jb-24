import { Route , Routes} from "react-router-dom";
import "./MainRoute.css";
import { MainPage } from "../../layout/MainPage/MainPage";
import { Page404 } from "../../Pages/page404/page404";
import { Login } from "../../Pages/login/login";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

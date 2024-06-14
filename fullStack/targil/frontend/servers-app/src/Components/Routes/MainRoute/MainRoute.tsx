import { Routes ,Route} from "react-router-dom";
import "./MainRoute.css";
import { MainPage } from "../../layout/MainPage/MainPage";

import { Page404 } from "../../Pages/Page404/Page404";
import { ServersList } from "../../Pages/ServersList/ServersList";
import { SingleServer } from "../../Pages/SingleServer/SingleServer";


export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
S                <Route path="/" element={<ServersList />} />
                <Route path="/serversList" element={<ServersList />} />
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

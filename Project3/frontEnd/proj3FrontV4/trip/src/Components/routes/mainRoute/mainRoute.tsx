import { Route, Routes } from "react-router-dom";
import "./mainRoute.css";
import { Login } from "../../pages/Login/Login";
import { Page404 } from "../../pages/Page404/Page404";
import { Register } from "../../pages/Register/Register";

export function MainRoute(): JSX.Element {
    return (
        <div className="mainRoute">
			<Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path='*' element={<Page404 />} />
            </Routes>
        </div>
    );
}

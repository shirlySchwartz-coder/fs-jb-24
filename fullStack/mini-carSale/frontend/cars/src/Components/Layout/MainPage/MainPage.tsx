import { CheckJWT } from "../../utils/JWT";
import "./MainPage.css";
import { useEffect } from "react";

function MainPage(): JSX.Element {
useEffect(()=>{
    CheckJWT();
},[])

    return (
        <div className="MainPage">
			<h1>Class 48 - the best that lecturer can get...</h1>
        </div>
    );
}

export default MainPage;

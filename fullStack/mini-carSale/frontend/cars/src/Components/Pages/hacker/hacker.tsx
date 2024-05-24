import { useNavigate } from "react-router-dom";
import "./hacker.css";
import { useEffect } from "react";
import { store } from "../../../redux/store";

export function Hacker(): JSX.Element {
    const navigate= useNavigate()

    useEffect(()=>{
         //go to storage and load the data according to jwt :)
        //then check
        if (store.getState().auth.role!=="Admin"){
            navigate("/login");
        }
    },[])
    return (
        <div className="hacker">
			<h2>This is an authorized area only</h2>
        </div>
    );
}

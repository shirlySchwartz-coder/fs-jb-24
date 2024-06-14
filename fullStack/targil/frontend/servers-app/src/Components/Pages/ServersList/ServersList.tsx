import "./ServersList.css";
import { Server } from "../../Models/Server";
import { useEffect, useState } from "react";
import { SingleServer } from "../SingleServer/SingleServer";

export function ServersList(): JSX.Element {
    const [servers, setServers] = useState<Server[]>([]);
    useEffect(()=>{
        fetch("http://localhost:8080/api/v1/servers/all")
        .then(response=>response.json())
        .then(data=>{
            setServers(data);
            console.log(data);
        });
    },[]);
    return (
        <div className="ServersList">
			<h1>Servers List</h1>
            <hr />
            
            {servers.map((item)=>
            <SingleServer key={item.server_id} server={item}/>)}
           
        </div>
    );
}

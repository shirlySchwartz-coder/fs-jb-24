import cors from "cors";
import express from "express";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import teamRouter from "./Routes/teamRouter";
import meetingsRouter from "./Routes/meetingsRouter";

//import ErrorHandler
//import router 
//import carRouter

//create server
const server = express();
const isAdmin = false;


//cors = cross origin research sharing...
server.use(cors());

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());


//using routes = > http://localhost:8080/api/v1/transport
//http://127.0.0.1:8123/api/v1/transport/cars/6225433
server.use("/api/team", teamRouter);
server.use("/api/meetings", meetingsRouter);
//404 handler
server.use("*",ErrorHandler);

//start the server
server.listen(config.webPort, ()=>{
    console.log (`listing on http://${config.webHost}:${config.webPort}`);
})

//http://localhost:8080/api/meetings/:id/all
//http://localhost:8080/api/team/all
//http://localhost:8080/api/meetings/add
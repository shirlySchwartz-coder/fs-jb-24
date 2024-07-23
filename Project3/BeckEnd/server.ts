
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import loginRouter from "./Routes/login";
import vacationsRouter from "./Routes/vacations";

//import ErrorHandler
//import router 
//import carRouter

//create server
const server = express();
const isAdmin = false;

//configure cors
//origin => מאיפה מגיעה הבקשה
//verbs => GET POST DELETE UPDATE PATCH
//Allowed Headers => Authorization
//Exposed Headers => Authorization
//optionsSuccessStatus => 200,204

//use Cors Option
const corsOptions = {
    origin: "*", //allow any origin
    methods: ["GET","POST"], //which methods i will allow
    allowedHeaders: ["Content-Type","Authorization"], //which headers i will get
    exposedHeaders: ["Authorization"] //which headers i will expose
}

const adminCors = {
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["Content-Type","Authorization"],
    exposedHeaders: ["Authorization"]
}

//cors = cross origin research sharing...
server.use(cors(isAdmin? adminCors:corsOptions));

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//where i will save my files from upload
server.use(express.static("uploads"));

//enable file uploading, and create a path for the files if it no exists
server.use(fileUpload({createParentPath: true}));


server.use("/api/v1/vacations", vacationsRouter);
server.use("/api/v1/login",loginRouter);
//404 handler
server.use("*",ErrorHandler);

//start the server
server.listen(config.webPort, ()=>{
    console.log (`listing on http://${config.webHost}:${config.webPort}`);
})
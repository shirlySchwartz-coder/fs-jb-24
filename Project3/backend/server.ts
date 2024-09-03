import bodyParser from "body-parser"
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/config"
import ErrorHandler from "./MiddleWare/routeNotFound";
import vacationsRouter from "./Routes/vacations";
import loginRouter from "./Routes/login";
import adminRouter from "./Routes/admin";
const multer  = require('multer')

//import ErrorHandler
//import router 
//import carRouter

//create server
const server = express();

//const isAdmin = false;

//configure cors
//origin => מאיפה מגיעה הבקשה
//verbs => GET POST DELETE UPDATE PATCH
//Allowed Headers => Authorization
//Exposed Headers => Authorization
//optionsSuccessStatus => 200,204

//use Cors Option
const corsOptions = {
    origin: "*", //allow any origin
    methods: ['GET','POST','PUT'], //which methods i will allow
    allowedHeaders: ['Content-Type',"Authorization"], //which headers i will get
    exposedHeaders: ["Authorization",'Content-Type'] //which headers i will expose
}



//cors = cross origin research sharing...
server.use(cors(corsOptions));

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//where i will save my files from upload
server.use(express.static("upload"));

//enable file uploading, and create a path for the files if it no exists
//server.use(fileUpload({createParentPath: true}));
server.use(fileUpload());

server.use("/api/v1/vacations", vacationsRouter);
server.use("/api/v1/login",loginRouter);
server.use("/api/v1/dashBoard",adminRouter);

//404 handler
server.use("*",ErrorHandler);

//start the server
server.listen(config.webPort, ()=>{
    console.log (`listing on http://${config.webHost}:${config.webPort}`);
})
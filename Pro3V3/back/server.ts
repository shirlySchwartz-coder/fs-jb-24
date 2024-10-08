import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import config from './Utils/config';
import ErrorHandler from './MiddleWare/routeNotFound';
import vacationsRouter from './Routes/vacations';
import loginRouter from './Routes/login';
import adminRouter from './Routes/admin';

const server = express();

//use Cors Option
const corsOptions = {
  origin: '*', //allow any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], //which methods i will allow
  allowedHeaders: ['Content-Type', 'Authorization'], //which headers i will get
  exposedHeaders: ['Authorization', 'Content-Type'], //which headers i will expose
};

server.use(cors(corsOptions));
server.use('/uploads', express.static('uploads'));
server.use(express.json());

server.use('/api/v1/dashBoard', adminRouter);
server.use('/api/v1/vacations', vacationsRouter);
server.use('/api/v1/login', loginRouter);

//404 handler
server.use('*', ErrorHandler);

//start the server
server.listen(config.webPort, () => {
  console.log(`listing on http://${config.webHost}:${config.webPort}`);
});

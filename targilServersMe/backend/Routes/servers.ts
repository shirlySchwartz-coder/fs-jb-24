//getting the methods we need
import express , {NextFunction,Request,Response} from 'express';
import { getAllServers } from '../logic/serversLogic';

const serverRouter = express.Router();

serverRouter.get(
    "/servers",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{    
        let servers = await getAllServers();
        console.log(servers)
        response
        .status(200)
        .json(servers);
    }
)

serverRouter.get(
    "/server/status",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{    
        let id = +request.params.id;     //+ is for converting to number
        let stat = request.params.stat; 
        await response
        .status(200)
        .json();
    }
)

export default serverRouter;



//getting the methods we need
import express , {NextFunction,Request,Response} from 'express';
import { carInfo } from '../logic/TransportLogic';

const carRouter = express.Router();

carRouter.get(
    "/car/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        response.status(201).json(await carInfo(request.params.id));
    }
)


export default carRouter;
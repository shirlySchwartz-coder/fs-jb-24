import express , {NextFunction,Request,Response} from 'express';
import { getAllTeams } from '../logic/meetingLogic';

const teamRouter = express.Router();
 teamRouter.get(
    "/all",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{  
        const teams = await getAllTeams();   
        console.log(teams)                 
        response
        .status(200)
        .json(teams);
    }
)

export default teamRouter;



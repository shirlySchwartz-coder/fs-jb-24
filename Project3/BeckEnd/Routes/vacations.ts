//getting the methods we need
import express , {NextFunction,Request,Response} from 'express';
import { checkJWT } from '../Utils/jwt';
import { followVacation, getAllVacations } from '../logic/vacationLogic';

const vacationsRouter = express.Router();



vacationsRouter.get(
    "/all",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
       
        console.log("all vacations ");
        response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        //.header("Authorization",jwt)
        .json(await getAllVacations());
    }
)

vacationsRouter.post(
    "/vacation/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        let userId = request.body.userId;
        let vacationId = +request.params.id;
        let isFollowed= request.body.isFollowed;
      
        console.log("vacation follow -userId ,vacationId, isFollowed : ", userId ,vacationId, isFollowed );
        response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        //.header("Authorization",jwt)
        .json(await followVacation(userId,vacationId, isFollowed));
    }
)

export default vacationsRouter;


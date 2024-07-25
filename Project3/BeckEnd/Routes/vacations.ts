//getting the methods we need
import express , {NextFunction,Request,Response} from 'express';
import { checkJWT } from '../Utils/jwt';
import { followVacation, getAllVacations, unFollowVacation } from '../logic/vacationLogic';

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
    "/follow/vacation/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        let userId = +request.body.userId;
        let vacationId = +request.params.id;
       
      
        console.log("vacation follow -userId ,vacationId : ", userId ,vacationId );
        response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        //.header("Authorization",jwt)
        .json(await followVacation(userId,vacationId));
       
    }
)

vacationsRouter.delete(
    "/unfollow/vacation/:id",
    async (request:Request, response:Response, nextFunction:NextFunction)=>{        
        let userId = +request.body.userId;
        let vacationId = +request.params.id;
        console.log("vacation unFollow userId ,vacationId : ", userId ,vacationId );
        response
        .status(204)
        .header('Access-Control-Expose-Headers', 'Authorization')
        //.header("Authorization",jwt)
        .json(await unFollowVacation(userId,vacationId));
       
    }
)

export default vacationsRouter;


//getting the methods we need
import express, { NextFunction, Request, Response } from 'express';
import {
  bikeInfo,
  carInfo,
  truckInfo,
  handicapInfo,
  offroadInfo,
  recallInfo,

  carList,
  bikeList,
  truckList,
  handicapList,
  offroadList,
  recallList
} from '../logic/TransportLogic';
import { checkJWT } from '../Utils/jwt';

const carRouter = express.Router();

carRouter.get(
  "/car/:id",
  async (request:Request, response:Response, nextFunction:NextFunction)=>{        
      const jwt = checkJWT(request.header("Authorization") || "");        
      if (jwt.length>10){
          response
          .status(200)
          .header('Access-Control-Expose-Headers', 'Authorization')
          .header("Authorization",jwt)
          .json(await carInfo(request.params.id));
      } else {
          response.status(401);
      }
  }
)



carRouter.get(
  '/bike/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await bikeInfo(request.params.id));
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/truck/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await truckInfo(request.params.id));
    } else {
        response.status(401)
    }
  }
);

carRouter.get(
  '/handicap/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    //console.log(jwt)
    if (jwt.length > 10) {
        response.status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await handicapInfo(request.params.id)); 
    }else{
        response.status(401)
    }
   
  }
);

carRouter.get(
  '/offroad/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    //console.log(jwt)
    if (jwt.length > 10) {
        response.status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await offroadInfo(request.params.id)); 
    }else{
        response.status(401)
    }
   
  }
);

carRouter.get(
  '/recall/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    //console.log(jwt)
    if (jwt.length > 10) {
        response.status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await recallInfo(request.params.id)); 
    }else{
        response.status(401)
    }
   
  }
);


//
carRouter.get(
  '/cars',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await carList());
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/bikes',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await bikeList());
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/trucks',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await truckList());
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/handicaps',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await handicapList());
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/offroads',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await offroadList());
    } else {
      response.status(401);
    }
  }
);

carRouter.get(
  '/recalls',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await recallList());
    } else {
      response.status(401);
    }
  }
);



//
export default carRouter;

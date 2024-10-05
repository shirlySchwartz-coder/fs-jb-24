//getting the methods we need
import express, { NextFunction, Request, Response } from 'express';
import { checkJWT } from '../Utils/jwt';
import {
  followVacation,
  getAllVacations,
  getFavoritesByUser,
  getVacationById,
  unFollowVacation,
} from '../logic/vacationLogic';
const jwt = require('jsonwebtoken');

const vacationsRouter = express.Router();

vacationsRouter.get(
  '/all',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await getAllVacations());
    } else {
      response.status(401);
    }
  }
);

vacationsRouter.get(
  '/vacation/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      let vacationId = +request.params.id;
      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await getVacationById(vacationId));
    } else {
      response.status(401);
    }
  }
);

vacationsRouter.post(
  '/follow/vacation/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      let vacationId = +request.params.id;
      let userId = +request.body.userId;

      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await followVacation(userId, vacationId));
    } else {
      response.status(401);
    }
  }
);

vacationsRouter.delete(
  '/unfollow/vacation/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      let userId = +request.body.userId;
      let vacationId = +request.params.id;

      response
        .status(204)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await unFollowVacation(userId, vacationId));
    } else {
      response.status(401);
    }
  }
);

vacationsRouter.get(
  '/favorites/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userId = +request.params.id;
    const jwt = checkJWT(request.header('Authorization') || '');
   
    if (jwt.length > 10) {
      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await getFavoritesByUser(userId));
    } else {
      response.status(401);
    }
  }
);

export default vacationsRouter;

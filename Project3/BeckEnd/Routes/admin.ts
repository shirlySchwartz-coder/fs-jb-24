//adminRouter
import express, { NextFunction, Request, Response } from 'express';
import { Vacation } from '../Models/Vacation';
import { addNewVacation } from '../logic/adminLogic';

const adminRouter = express.Router();

adminRouter.post(
  '/addVacation ',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
      console.log('admin add vacation');
      const newVacation = new Vacation(
        request.body.vacationId,
        request.body.destination,
        request.body.vacInfo,
        request.body.startDate,
        request.body.endDate,
        request.body.price,
        request.body.pictureUrl
      );
      const addedVacation = await addNewVacation(newVacation);
      console.log('addedVacation', addedVacation);
      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization') //do i really need it????
        //.header('Authorization', userData['jwt'])
        .json(addedVacation);
    } catch (err) {
      nextFunction(err);
    }
  }
);

export default adminRouter;

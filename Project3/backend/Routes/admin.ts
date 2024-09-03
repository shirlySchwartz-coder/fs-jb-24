import { ResultSetHeader } from 'mysql2';
//adminRouter
import express, { NextFunction, Request, Response, request } from 'express';
import multer from 'multer';

import { Vacation } from '../Models/Vacation';
import {
  addNewVacation,
  deleteVacation,
  getReports,
  updateVacation,
} from '../logic/adminLogic';
import { getAllVacations } from '../logic/vacationLogic';
import { checkJWT } from '../Utils/jwt';

const adminRouter = express.Router();
const upload = multer({ dest: 'tmp/uploads/' });

adminRouter.get(
  '/all',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log('Admin get all vacations ');
    response
      .status(200)
      .header('Access-Control-Expose-Headers', 'Authorization')
      //.header("Authorization",jwt)
      .json(await getAllVacations());
  }
);

adminRouter.post(
  '/addVacation',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log('addVacation', request.body);
    const jwt = checkJWT(request.header('Authorization') || '');
    //console.log("all vacations-  jwt:",jwt);
    if (jwt.length > 10) {
      // Ensure request.body is properly structured
      if (!request.body || !request.body.destination) {
        return response.status(400).json({ msg: 'Invalid request data' });
      }
      console.log('admin request fileUpload: ', request.files);
      let result = await addNewVacation(request.body);
      if (!result.errno) {
        response
          .status(201)
          .header('Access-Control-Expose-Headers', 'Authorization')
          .header('Authorization', jwt)
          .json({ msg: 'created' });
      } else {
        response.status(400).json({ msg: result.sqlMessage });
      }
    } else {
      response.status(401);
    }
  }
);

adminRouter.post(
  '/uploadPicture',
  upload.single('file'),
  async (request: Request, response: Response) => {
    console.log('hay');
    const jwt = checkJWT(request.header('Authorization') || '');
    console.log('jwt', jwt);
    if (jwt.length > 10) {
      console.log('uploadPicture start');
      console.log(request.file);

      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json({ myResponse: 'File uploaded successfully' });
    } else {
      response.status(401).json({ msg: 'upload filed' });
    }
  }
);

adminRouter.put(
  '/updateVacation/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log('updateVacation ', request.params.id, request.body);
    let toUpdateVac = new Vacation(
      request.body.vacationId,
      request.body.destination,
      request.body.vacInfo,
      new Date(request.body.startDate),
      new Date(request.body.endDate),
      request.body.price,
      request.body.pictureUrl
    );
    let updatedVac = await updateVacation(+request.params.id, toUpdateVac);
    if (!updatedVac.errno) {
      response.status(201).json({ msg: 'created' });
    } else {
      response.status(400).json({ msg: updatedVac.sqlMessage });
    }
  }
);

adminRouter.delete(
  '/deleteVacation/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(`deleting ${request.params.id}`);
    let data = await deleteVacation(+request.params.id);

    if (data.affectedRows) {
      response.status(200).json({ msg: 'Vacation was deleted successfully' });
    } else {
      response.status(400).json({ msg: 'Vacation was not found' });
    }
  }
);

adminRouter.get(
  '/reports',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    await response.status(200).json(await getReports());
  }
);

adminRouter.get(
  '/test',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    await response.status(200).json({ tex: 'this is working' });
  }
);
export default adminRouter;

import { ResultSetHeader } from 'mysql2';
import express, { NextFunction, Request, Response, request } from 'express';
import { Vacation } from '../Models/Vacation';
import {
  addNewVacation,
  deleteVacation,
  getReports,
  updateVacation,
  uploadPicture,
} from '../logic/adminLogic';
import { getAllVacations, getVacationById } from '../logic/vacationLogic';

import { checkJWT } from '../Utils/jwt';
const adminRouter = express.Router();
const upload = require('../Utils/upload.ts');

adminRouter.post(
  '/uploadPicture/:id',
  upload.single('imageFile'),
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const id = +request.params.id;
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      console.log('uploadPicture start');

      const result = await uploadPicture(request.file, id);

      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json({
          myResponse: 'File uploaded successfully',
          result,
          image_url: `http://localhost:8080/images/${request.file?.fieldname}`,
        });
    } else {
      response.status(401).json({ msg: 'upload filed' });
    }
  }
);
adminRouter.get(
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

adminRouter.post(
  '/addVacation',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      if (!request.body || !request.body.destination) {
        return response.status(400).json({ msg: 'Invalid request data' });
      }

      let result = await addNewVacation(request.body);

      if (!result.errno) {
        response
          .status(201)
          .header('Access-Control-Expose-Headers', 'Authorization')
          .header('Authorization', jwt)
          .json({ result });
      } else {
        response.status(400).json({ msg: result.sqlMessage });
      }
    } else {
      response.status(401);
    }
  }
);
adminRouter.get(
  '/edit/:id',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const id = +request.params.id;
    const jwt = checkJWT(request.header('Authorization') || '');

    if (jwt.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await getVacationById(id));
    } else {
      response.status(401);
    }
  }
);
adminRouter.post(
  '/updateVacation/:id',
  upload.single('image'),
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    let url = '';
    if (jwt.length > 10) {
      const { body, file } = request;
     

      const vacationId = +request.body.vacationId;
      const destination = request.body.destination;
      const vacInfo = request.body.vacInfo;
      const startDate = request.body.startDate;
      const endDate = request.body.endDate;
      const price = +request.body.price;

      if (!request.file?.path) {
        throw new Error('file not saved');
      } else {
        url = `http://localhost:8080/${request.file?.destination}/${request.file.filename}`;
      }

      let toUpdateVac = new Vacation(
        vacationId,
        destination,
        vacInfo,
        startDate,
        endDate,
        price,
        url
      );
     
      let updatedVac = await updateVacation(vacationId, toUpdateVac);
      if (!updatedVac.errno) {
        response
          .status(201)
          .header('Access-Control-Expose-Headers', 'Authorization')
          .header('Authorization', jwt)
          .json({ msg: `created new vacation:${updatedVac}` });
      } else {
        response.status(400).json({ msg: updatedVac.sqlMessage });
      }
    } else {
      response.status(401).json({ msg: 'Unauthorized' });
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
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
       response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json(await getReports());
    } else {
      response.status(401);
    }
  }
);

adminRouter.get(
  '/test',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    await response.status(200).json({ tex: 'this is working' });
  }
);
export default adminRouter;

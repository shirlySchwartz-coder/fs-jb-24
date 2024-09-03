import { ResultSetHeader } from 'mysql2';
//adminRouter
import express, { NextFunction, request, Request, Response } from 'express';
import multer from 'multer';
import fileUpload from 'express-fileupload';
import fs from 'fs';


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
    const jwt = checkJWT(request.header('Authorization') || '');
    //console.log("all vacations-  jwt:",jwt);
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
    console.log('addVacation', request.body);
    const jwt = checkJWT(request.header('Authorization') || '');
    if (jwt.length > 10) {
      // Ensure request.body is properly structured
      if (!request.body || !request.body.destination) {
        return response.status(400).json({ msg: 'Invalid request data' });
      }

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
/*
adminRouter.post(
  '/uploadPicture',
  upload.single('vacPicFile'),
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const jwt = checkJWT(request.header('Authorization') || '');
    console.log('hay', request.files);
    if (jwt.length < 10) {
      return response.status(400).send('You need to log in.');
    }

    console.log('uploadPicture start:', request.file);
    const vacPicFile = request.file;
    if (!vacPicFile) {
      return response.status(400).send('No file was uploaded.');
    }
    const uploadPath = __dirname + '/../temp/uploads/' + vacPicFile.originalname; // Corrected path
    console.log('vacPicFile:', vacPicFile, 'uploadPath:', uploadPath);

    // Save the file to the specified path
    fs.rename(vacPicFile.path, uploadPath, (err) => {
      if (err) {
        console.error('File upload failed:', err); // Log the error
        return response.status(500).send('File upload failed.');
      }

      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', jwt)
        .json({ myResponse: 'File uploaded successfully' });
    });
  }
);
*/
adminRouter.post('/uploadPicture', 
  async(request: Request, response: Response, nextFunction: NextFunction)=>{
    console.log('hay', request.files);
})
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

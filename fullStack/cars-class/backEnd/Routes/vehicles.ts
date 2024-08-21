import express, { Request, Response } from 'express';
import axios from "axios";

const CAR_URL =
  'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=';

const carRouter = express.Router();

carRouter.get('/car/:id', async (request: Request, response: Response) => {
  const id = +request.params.id;
  const carInfo = (await axios.get(CAR_URL + id)).data.result.records;
  console.log('car info', carInfo);
  response
    .status(200)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json(carInfo);
});
export default carRouter;
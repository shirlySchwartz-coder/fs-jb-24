import { AccountModel } from './Models/AccountOperations';
import express, { Request, Response } from 'express';

import dal_mongodb from './Mongo/dal_mongodb';
import ErrorHandler from './MiddleWare/routeNotFound';
import config from './Utils/config';

const server = express();
server.use(express.json());
server.use('*', ErrorHandler);

dal_mongodb.connect();

server.get(
  '/api/accounts/:accountNumber/operations',
  async (request: Request, response: Response) => {
    const operations = await AccountModel.find({
      accountNumber: request.params.accountNumber,
    });
    console.log(operations)
    response.json(operations);
  }
);

server.post(
  '/api/accounts/operations',
  async (request: Request, response: Response) => {
    const operation = new AccountModel(request.body);
    await operation.save();
    response.status(201).json(operation);
  }
);

server.listen(config.webPort, () => {
  console.log(`listing on http://${config.webHost}:${config.webPort}`);
});

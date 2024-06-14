import { Servers } from './../Models/Servers';
import express, { NextFunction, Request, Response } from 'express';
import {getAllHosting} from '../Logic/HostingLogic'
import { addNewServer, changStatus, getAllServers } from '../Logic/ServersLogic';
const serversRouter = express.Router();
const hostsRouter = express.Router();

//author , get all authors
//books, get all books, add new book, delete book

serversRouter.get(
  '/all',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const servers = await getAllServers();
      console.log(servers)
      response.status(200).json(servers);
    } catch (err) {
      next(err);
    }
  }
);

hostsRouter.get(
  '/all',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const hosting = await getAllHosting();
      response.status(200).json(hosting);
    } catch (err) {
      next(err);
    }
  }
);

serversRouter.post(
  '/add',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newServer = new Servers(
        request.body.server_id,
        request.body.server_name,
        request.body.server_ip,
        request.body.hosting_id,
        request.body.server_status,
        request.body.server_start
      );
      const addedServer = await addNewServer(newServer);
      response.status(201).json(addedServer);
    } catch (err) {
      next(err);
    }
  }
);

serversRouter.post(
  '/status/:id',
  async (request: Request, response: Response, next: NextFunction) => {
try {
  const serverChanged = await changStatus(+request.params.id , request.body.stat)
  response.status(202).json(serverChanged)
  
} catch (error) {
  next(error)
}
  })
export { serversRouter, hostsRouter };

import express, { NextFunction, Request, Response } from 'express';
import {
  addNewMeeting,
  getAllTeamsMeetings,
  getTeamMeetings,
} from '../logic/meetingLogic';
import { Meeting } from '../Models/Meeting';

const meetingsRouter = express.Router();

meetingsRouter.get(
  '/all',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    const teams = await getAllTeamsMeetings();

    await response.status(200).json(teams);
  }
);
meetingsRouter.get(
  '/:id/all',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let id = +request.params.id;
    const teams = await getTeamMeetings(id);

    await response.status(200).json(teams);
  }
);

meetingsRouter.post(
  '/add',
  async (request: Request, response: Response, next: NextFunction) => {
    let start = new Date(request.body.start_time);
    let end = new Date(request.body.end_time);
    try {
      const newMeeting = new Meeting(
        request.body.id,
        request.body.team_id,
        start,
        end,
        request.body.details,
        request.body.room
      );

      console.log('newMeeting:', newMeeting);
      const addedMeeting = await addNewMeeting(newMeeting);
      response.status(201).json(addedMeeting);
    } catch (err) {
      next(err);
    }
  }
);

export default meetingsRouter;

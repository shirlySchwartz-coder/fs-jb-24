import express, { NextFunction, Request, Response } from 'express';
import { forgotPassword, loginUser, registerUser } from '../logic/UserLogic';
import { checkJWT, createJWT } from '../Utils/jwt';


const loginRouter = express.Router();

//login methods: loginUser, registerUser, forgotPassword
export type userCred = {
  name: string;
  email: string;
  role: string;
  jwt: string;
};
//loginUser
loginRouter.post(
  '/loginUser',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userCred = request.body;
    const userData = loginUser(userCred);

    //need to expose headers
    if (userData !== undefined && userData['jwt'].length > 10) {
      console.log(userData);
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', userData['jwt'])
        .json(userData);
    } else {
      response.status(401).json({ msg: 'bad password :(' });
    }
  }
);

loginRouter.post(
  '/registerUser',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userCred = request.body;

    const myJWT = registerUser(userCred);
    console.log('register request in Route -myJWT:', myJWT);
    if (myJWT.length > 10) {
      response
        .status(201)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', myJWT)

        .json({ msg: 'user was created' });
    } else {
      response.status(400).json({ msg: 'user already exists' });
    }
  }
);

//forget password.....
loginRouter.get(
  '/forgotPassword/:userName',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userName = request.params.userName;
    let myJWT = forgotPassword(userName);
    console.log(myJWT);

    if (myJWT.length > 10) {
      response
        .status(200)
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', myJWT)
        .json({ password: myJWT });
    } else {
      response.status(400).json({ msg: 'user not found' });
    }
  }
);

loginRouter.post(
  '/getJWT',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userData = request.body;
    response.status(200).json({ jwt: createJWT(userData) });
  }
);

loginRouter.get(
  '/checkJWT/:token',
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log('token: ', request.params.token);
    if (checkJWT(request.params.token)) {
      response.status(200).json({ msg: 'all ok' });
    } else {
      response.status(401).json({ msg: 'token is invalid' });
    }
  }
);
export default loginRouter;

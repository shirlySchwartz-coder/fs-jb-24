import express,{NextFunction, Request, Response} from 'express'

const loginRouter= express.Router();

loginRouter.post(
    "createAdmin", 
    async(request: Request, response:Response, nextFunction:NextFunction) => {
        await response.status(201).json({msg:"Admin was created"})
    }
)

export default loginRouter
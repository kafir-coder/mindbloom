import express, { Request, Response } from 'express'
import { authSvc } from '..';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    const token = await authSvc.login(email, password)
    if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
    }else {
        res.json({ token });
    }
}

export const authRouter = express.Router()

authRouter.post("/login", login)
import { NextFunction, Request, Response } from "express";
import { userSvc } from "..";
import express from 'express';
import { CreateKidDto, CreateUserDto } from "../entities/user";
import { Kid } from "../database/entities/kid";

export const createUsers = async (req: Request, res: Response, next: NextFunction) => {
   try {
        const dto = req.body as CreateUserDto
        const result = await  userSvc.createUser(dto)
        res.status(201).json(result)
   } catch (error) {
    console.log(error)
    
    next(error)
   }
}

export const createKids = async (req: Request, res: Response) => {

    const dto = req.body as CreateKidDto
    const result = await userSvc.createKid(dto)

    res.status(201).json(result)
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await userSvc.getUser(id)
    res.status(200).json(result)
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const dto = req.body as Partial<CreateUserDto>; // assuming a partial update
        const result = await userSvc.updateUser(id, dto);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getUsers = async (req: Request, res: Response) => {

        const { page = "1", limit = "10", email, name, role } = req.query;

        const users = await userSvc.getUsers(
            Number(page),
            Number(limit),
            { email: email as string, name: name as string, role: role as string }
        );

        res.status(200).json(users);
}

export const getKid = async (req: Request, res: Response) => {
    const { kid } = req.params
    const result = await userSvc.getKid(kid)
    res.status(200).json(result)
}

const getKids = async (req: Request, res: Response) => {
   
        const parentId = req.params['id']
        const { page = "1", limit = "10", name, all } = req.query;

        const kids = await userSvc.getKids(
            Number(page),
            Number(limit),
            parentId,
            { name: name as string, all: all as unknown as boolean}
        );

        res.status(200).json(kids);
    
}

const updateKid = async (req: Request, res: Response) => {

        const { kid } = req.params
        const dto = req.body as Kid
        const result = await  userSvc.updateKid(kid, dto)
        res.status(201).json(result)

}

export const rateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

      

        const result = await userSvc.addUserRating(id, rating);
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const usersRouter = express.Router()

usersRouter.post("", createUsers)
usersRouter.get("/:id", getUser)
usersRouter.patch("/:id", updateUser);
usersRouter.get("/", getUsers)
usersRouter.post("/:id/rating", rateUser);
usersRouter.post("/:id/kids", createKids)
usersRouter.get("/:id/kids/:kid", getKid)
usersRouter.get("/:id/kids", getKids)
usersRouter.patch("/:id/kids/:kid", updateKid)

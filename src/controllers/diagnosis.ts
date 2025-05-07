import { Request, Response } from "express";
import { diagnosisSvc } from "..";
import express from 'express';
import { TestEntry } from "../entities/diagnosis";
import { authenticateJWT } from "../use-cases/authentication/auth.middleware";

export const getADHDQuestions = async (req: Request, res: Response) => {
    const questions= await diagnosisSvc.getADHDTestQuestions()
    res.status(200).json(questions)
}

export const getASDQuestions = async (req: Request, res: Response) => {
    const questions = await diagnosisSvc.getASDTestQuestions()
    res.status(200).json(questions)
}

export const generateASDTestResults = async (req: Request, res: Response) => {
    const kid_id  = req.query.kid_id as string
    const answers = req.body as TestEntry[]
    const result = await diagnosisSvc.generateASDTestResult(kid_id, answers)
    res.status(200).json(result)
}

export const generateADHDTestResults = async (req: Request, res: Response) => {
    const kid_id  = req.query.kid_id as string
    const answers = req.body as TestEntry[]
    const result = await diagnosisSvc.generateADHDTestResult(kid_id, answers)
    res.status(200).json(result)
}


export const listASD = async (req: Request, res: Response)=> {
    const { page = "1", limit = "10", severityLevel } = req.query;

        const diagnosis = await diagnosisSvc.listASDDIagnosis(
            Number(page),
            Number(limit),
            { severityLevel: severityLevel as string}
        );

        res.status(200).json(diagnosis);
}
export const listADHD = async (req: Request, res: Response) => {
    const { page = "1", limit = "10", severityLevel } = req.query;

        const diagnosis = await diagnosisSvc.listAdhdDiagnosis(
            Number(page),
            Number(limit),
            { severityLevel: severityLevel as string}
        );

        res.status(200).json(diagnosis);
}

export const diagnosisRouter = express.Router()

diagnosisRouter.get("/adhd-questions", getADHDQuestions)
diagnosisRouter.get("/asd-questions", getASDQuestions)
diagnosisRouter.post("/generate-asd", authenticateJWT, authenticateJWT, generateASDTestResults)
diagnosisRouter.post("/generate-adhd", authenticateJWT, generateADHDTestResults)
diagnosisRouter.get("/list-asd", authenticateJWT, listASD)
diagnosisRouter.get('/list-adhd', authenticateJWT, listADHD)
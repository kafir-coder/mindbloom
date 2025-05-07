import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
}
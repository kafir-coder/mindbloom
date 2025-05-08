import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/errors";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Log for debugging
  
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.log(err)
  
    res.status(status).json({
      error: {
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  }
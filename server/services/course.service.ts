import { NextFunction, Response } from "express";
import CourseModel from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsynErrorHandler } from "../utils/asynErrorHandler";

// create course
export const createCourse = CatchAsynErrorHandler(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const course = await CourseModel.create(data);
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

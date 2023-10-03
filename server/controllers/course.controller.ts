import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import CourseModel from "../models/course.model";
import { createCourse } from "../services/course.service";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsynErrorHandler } from "../utils/asynErrorHandler";
import { redis } from "../utils/redis";

// upload course
export const uploadCourse = CatchAsynErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit a course
export const editCourse = CatchAsynErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get single course - without purchasing
export const getSingleCourse = CatchAsynErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCachExists = await redis.get(courseId);

      if (isCachExists) {
        return res.status(200).json({
          success: true,
          course: JSON.parse(isCachExists),
        });
      } else {
        const course = await CourseModel.findById(courseId).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links "
        );

        await redis.set(courseId, JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all courses - without purchasing
export const getAllCourses = CatchAsynErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCachExists = await redis.get("courses");

      if (isCachExists) {
        return res.status(200).json({
          success: true,
          courses: JSON.parse(isCachExists),
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links "
        );
        await redis.set("courses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

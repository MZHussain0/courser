import express from "express";
import {
  editCourse,
  getAllCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorisedRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorisedRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorisedRoles("admin"),
  editCourse
);

courseRouter.get("/course/:id", getSingleCourse);

courseRouter.get("/courses", getAllCourses);

export default courseRouter;

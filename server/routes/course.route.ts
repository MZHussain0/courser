import express from "express";
import { uploadCourse } from "../controllers/course.controller";
import { authorisedRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorisedRoles("admin"),
  uploadCourse
);

export default courseRouter;

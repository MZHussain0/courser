import express from "express";
import { editCourse, uploadCourse } from "../controllers/course.controller";
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

export default courseRouter;

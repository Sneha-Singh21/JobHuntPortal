import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
  deleteApplication, // Import the delete controller
} from "../controllers/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/apply/:id", isAuthenticated, applyJob);
applicationRouter.get("/get", isAuthenticated, getAppliedJobs);
applicationRouter.get("/:id/applicants", isAuthenticated, getApplicants);
applicationRouter.put("/status/:id/update", isAuthenticated, updateStatus);

// Add delete application route
applicationRouter.delete("/delete/:id", isAuthenticated, deleteApplication);

export default applicationRouter;

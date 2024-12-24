import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobsById,
  postJob,
  deleteJob,
} from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/getalljobs", isAuthenticated, getAllJobs);
jobRouter.get("/getadminjobs", isAuthenticated, getAdminJobs);
jobRouter.get("/get/:id", isAuthenticated, getJobsById);
jobRouter.delete("/delete/:id", isAuthenticated, deleteJob);

export default jobRouter;

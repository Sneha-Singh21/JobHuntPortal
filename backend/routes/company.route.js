import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
  deleteCompany,  // Import deleteCompany controller
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticated, registerCompany);
companyRouter.get("/get", isAuthenticated, getCompany);
companyRouter.get("/get/:id", isAuthenticated, getCompanyById);
companyRouter.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

// Add DELETE route for company deletion
companyRouter.delete("/delete/:id", isAuthenticated, deleteCompany);

export default companyRouter;

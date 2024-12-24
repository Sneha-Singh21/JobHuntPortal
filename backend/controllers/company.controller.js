import { Company } from "../models/company.model.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";


// register company controller
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Company name is required." });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "You can't register the same company",
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      success: true,
      company,
      message: "Company registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in registering the company",
    });
  }
};

// get company details created by particular user who is logged in
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        success: false,
        message: "Companies not found",
      });
    }

    return res.status(200).json({
        success:true,
        companies,
    })
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in finding the companies",
    });
  }
};

// finding company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({ // Correct status code
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ // Internal server error for unexpected issues
      success: false,
      message: "Error in finding the company",
    });
  }
};


// updating companies details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // here the cloudinary logic will come
    const file = req.file;
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
        success: true,
        company,
        message: "Company information updated successfully",
      });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error in updating company details"});
  }
};

// delete company controller
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find and delete the company by ID
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting the company",
    });
  }
};

import { Job } from "../models/job.model.js";

// job posting controller
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Something is missing." });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res
      .status(201)
      .json({ success: true, message: "New job created successfully.", job });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error in posting a job." });
  }
};

// controller for finding all the jobs available for particular role
export const getAllJobs = async (req, res) => {
  try {
    // here we will apply filter as well like for finding particular jobs
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, 
        { description: { $regex: keyword, $options: "i" } }, 
      ],
    };

    // here we will use the populate method to get the details of the user and the company 
    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1});
    
    if (!jobs) {
      return res
        .status(404)
        .json({ success: false, message: "Jobs not found." });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error in finding job." });
  }
};

// controller finding jobs by id
export const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error in finding job by id." });
  }
};

// find or get jobs created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    // console.log("Admin ID:", adminId); 

    const jobs = await Job.find({ created_by: (adminId) }).populate({
      path:'company',
      createdAt:-1,
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found.",
      });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    // console.error("Error in getAdminJobs:", error);
    return res.status(500).json({
      success: false,
      message: "Error in finding admin jobs.",
    });
  }
};


// deleting a job by id
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

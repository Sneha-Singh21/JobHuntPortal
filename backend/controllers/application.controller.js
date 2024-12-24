import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// apply for job controller
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job id is required" });
    }

    // check if the user alresdy exist or not
    const existingApplicant = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplicant) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // check if the jobs exist or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ success: true, message: "Job applied successfully." });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in applying for a job.",
    });
  }
};

// get all jobs applied by user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "No Application found" });
    }

    return res.status(200).json({ success: true, application });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in getting applied jobs.",
    });
  }
};

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in getting applicants.",
    });
  }
};

// updating the status of job applications
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "status is required",
      });
    }

    // find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!status) {
      return res.status(404).json({
        status: false,
        message: "Application not found",
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in updating applications.",
    });
  }
};

// Delete application by ID
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting application",
    });
  }
};


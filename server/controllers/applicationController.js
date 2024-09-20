import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
import extractTopicsFromResume from "../model.cjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("File Required!", 400));
  }

  const { resume } = req.files;

  // Generate a file name and save the file
  const fileName = `${Date.now()}-${resume.name}`;
  const filePath = path.join(__dirname, '../uploads', fileName);

  resume.mv(filePath, (err) => {
    if (err) {
      return next(new ErrorHandler("Failed to upload file.", 500));
    }
  });

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: fileName,
      url: filePath,
    },
  });

  extractTopicsFromResume(path.join(__dirname, '../uploads', fileName))

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });


});

export const fileName = () => {
  return fileName;
};



export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const deleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role, _id } = req.user;
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }

    // Check if the user is either the job seeker who applied or the employer who received the application
    if (
      (role === "Job Seeker" && application.applicantID.user.toString() !== _id.toString()) ||
      (role === "Employer" && application.employerID.user.toString() !== _id.toString())
    ) {
      return next(new ErrorHandler("Not authorized to delete this application", 403));
    }

    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);


export const acceptApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Check authorization - Only employer can accept applications
  if (req.user.role !== 'Employer') {
    return next(new ErrorHandler("You are not authorized to perform this action", 403));
  }

  application.status = 'accepted'; // Update status to accepted
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application Accepted!",
    application,
  });
});

export const rejectApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Check authorization - Only employer can reject applications
  if (req.user.role !== 'Employer') {
    return next(new ErrorHandler("You are not authorized to perform this action", 403));
  }

  application.status = 'rejected'; // Update status to rejected
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application Rejected!",
    application,
  });
});

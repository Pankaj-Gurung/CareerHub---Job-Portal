import mongoose from 'mongoose';
import { Application } from './models/applicationSchema.js'; // Adjust the path as necessary
import extractTopicsFromResume from './model.cjs';

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/MERN_JOB_SEEKING_WEBAPP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getResumeData = async () => {
  try {
    // Find all applications and project only the resume field
    const applications = await Application.find({}, 'resume');

    // Log the results
    console.log('Resumes:', applications);

    return applications;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};

// Process resumes
const processResumes = async () => {
  try {
    // Get resumes data
    const applications = await getResumeData();

    // Extract the resume URLs and iterate over them
    applications.forEach(async application => {
      const resumes = application.resume;

      // Check if resumes is an array
      if (Array.isArray(resumes)) {
        resumes.forEach(async resume => {
          const resumeUrl = resume.url;
          console.log('Processing resume:', resumeUrl);

          // Example operation: extract topics from resume
          try {
            const topics = await extractTopicsFromResume(resumeUrl);
            console.log('Topics extracted from resume:', topics);
            // You can perform further operations with the extracted topics here
            application.topics = topics;
            await application.save();

            console.log('Topics inserted into application document.');
          } catch (error) {
            console.error('Error extracting topics from resume:', error);
          }
        });
      } else {
        console.error('Resumes is not an array:', resumes);
      }
    });
  } catch (error) {
    console.error('Error processing resumes:', error);
  }
};

processResumes()
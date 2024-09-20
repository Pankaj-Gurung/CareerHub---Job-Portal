import React, { useContext } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const Resumes = () => {
  const { acceptedResumes } = useContext(Context);  

  const navigateTo = useNavigate();

  if (!acceptedResumes || acceptedResumes.length === 0) {
    return <h4>No Accepted Resumes</h4>;
  }

  return (
    <div className="accepted_resumes page">
      <h1>Accepted Resumes</h1>
      {acceptedResumes.map((resume, index) => (
        <div key={index} className="resume_card">
          <p><span>Name:</span> {resume.name}</p>
          <p><span>Email:</span> {resume.email}</p>
          <p><span>Phone:</span> {resume.phone}</p>
          <p><span>Address:</span> {resume.address}</p>
          <p><span>CoverLetter:</span> {resume.coverLetter}</p>
          <div className="resume">
            <img src={resume.resume.url} alt="resume" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resumes;

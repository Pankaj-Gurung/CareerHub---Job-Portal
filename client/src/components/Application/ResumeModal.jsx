import React from "react";
import PropTypes from 'prop-types';

const ResumeModal = ({ pdfFileName, onClose }) => {
  // Assuming the PDF files are stored in the /uploads folder
  const pdfUrl = `/uploads/${pdfFileName}`;

  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <iframe src={pdfUrl} title="Resume" width="100%" height="500px"></iframe>
      </div>
    </div>
  );
};

ResumeModal.propTypes = {
  pdfFileName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResumeModal;

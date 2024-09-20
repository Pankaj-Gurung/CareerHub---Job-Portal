import React from 'react';
import { Link } from 'react-router-dom';
import './adminmainpage.css';

const Adminpage = () => {
  return (
    <div className='adminkomainpage'>
      <div className='sidepanelkolagi'>
        <ul className='bothmanage'>
          <li>
            <Link to="/manage-recruiters">Manage Recruiters</Link>
          </li>
          <li>
            <Link to="/manage-seekers">Manage Job Seekers</Link>
          </li>
        </ul>
      </div>
      <div className = "welcometoadmin">Welcome to ADMIN PAGE</div>
    </div>
  );
};

export default Adminpage;

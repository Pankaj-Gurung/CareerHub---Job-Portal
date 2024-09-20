import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import './cssforpostjob.css'

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    let payload;

    if (salaryType === "Fixed Salary" && fixedSalary) {
      payload = {
        title,
        description,
        category,
        jobtype,
        country,
        city,
        location,
        fixedSalary,
      };
    } else if (salaryType === "Ranged Salary" && salaryFrom && salaryTo) {
      payload = {
        title,
        description,
        category,
        jobtype,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
      };
    } else {
      toast.error("Please either provide fixed salary or ranged salary.");
      return;
    }

    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="postjobmaindiv">
        <div className="job_post1">
          <div className="container1">
            <h3>POST NEW JOB</h3>
            <form onSubmit={handleJobPost}>
              <div className="wrapper1">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="Frontend Web Development">
                    Frontend Web Development
                  </option>
                  <option value="MERN Stack Development">
                    MERN STACK Development
                  </option>
                  <option value="Account & Finance">Account & Finance</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Video Animation">Video Animation</option>
                  <option value="MEAN Stack Development">
                    MEAN STACK Development
                  </option>
                  <option value="MERN Stack Development">
                    MERN STACK Development
                  </option>
                  <option value="Data Entry Operator">Data Entry Operator</option>
                </select>
              </div>
              <div className="jobtypebox">
                <select value={jobtype}
                  onChange={(e) => setJobtype(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Intern">Intern</option>
                    <option value="Part-Time">Part-Time</option>
                </select>
              </div>
              <div className="wrapper2">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location" 
              />
              <div className="salary_wrapper3">
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                >
                  <option value="default">Select Salary Type</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
                <div>
                  {salaryType === "default" ? (
                    <p>Please provide Salary Type *</p>
                  ) : salaryType === "Fixed Salary" ? (
                    <input
                      type="number"
                      placeholder="Enter Fixed Salary"
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(Math.max(0,e.target.value))}
                    />
                  ) : (
                    <div className="ranged_salary">
                      <input
                        type="number"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(Math.max(0,e.target.value))}
                        min="0"
                      />
                      <input
                        type="number"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(Math.max(0,e.target.value))}
                      />
                    </div>
                  )}
                </div>
              </div>
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
              />
              <button type="submit" className="createkobutton">Create Job</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJob;

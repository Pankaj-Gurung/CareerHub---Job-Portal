import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import './jobs.css'

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs5">
      <div className="container5">
        <h1 className="all">ALL AVAILABLE JOBS</h1>
        <div className="banner5">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card5" key={element._id}>
                  <p className="titlename">Job Title: {element.title}</p>
                  <p className="jobtypename">{element.jobtype}</p>
                  <p className="countryname">Country: {element.country}</p>
                  <p className="categoryname">Salary: {element.fixedSalary}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;

import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import Resumes from "./components/Application/Resume";
import Admin from "./components/Dashboard/Admin";

import Adminpage from "./components/Dashboard/Adminpage";
import ManageRecruiter from './components/Dashboard/ManageRecruiter';
import ManageSeeker from './components/Dashboard/ManageSeeker';
import "./App.css";


const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin"|| location.pathname === "/adminpage"||location.pathname==="/manage-recruiters"||location.pathname==="/manage-seekers";


  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
   )
};



const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/job/getall" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/applications/me" element={<MyApplications />} />
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/job/me" element={<MyJobs />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminpage" element={<Adminpage/>}></Route>
            <Route path="/manage-recruiters" element={<ManageRecruiter />} />
          <Route path="/manage-seekers" element={<ManageSeeker />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
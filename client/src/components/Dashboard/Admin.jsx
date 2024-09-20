import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';
import toast from 'react-hot-toast';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        toast.success("Succesfully logged in! Welcome admin!")
      navigate('/adminpage');
    } else {
      toast.error("You don't seem to be an admin! Input correct credentials!")
    }
  };

  return (
    <div className='mainadminlogindiv'>
      <div className="adminlogin">
        <div className="mainloginform">
        <h3 className="logincharacter">Login</h3>
          <input
            type="text"
            placeholder="username"
            className="usernamekobox"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="password"
            className="passwordkobox"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="buttonforadminlogin" onClick={handleLogin}>
            Login
          </button >
        </div>
      </div>
    </div>
  );
};

export default Admin;
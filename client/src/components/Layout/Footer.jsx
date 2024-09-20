import React, { useContext } from "react";
import { Context } from "../../main";
import './Footer.css'

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <div className="footermain">
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
    </footer>
    </div>
  );
};

export default Footer;

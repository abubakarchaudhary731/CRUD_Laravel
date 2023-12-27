import React from 'react';
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import './Style.css';

const Icons = () => {
  return (
    <>
    <div className="social-container">
        <a className="social">
          <FaFacebookF />
        </a>
        <a className="social">
          <FaGoogle />
        </a>
        <a className="social">
          <FaTwitter />
        </a>
    </div>
    </>
  )
}

export default Icons
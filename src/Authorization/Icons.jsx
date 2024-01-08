import React from 'react';
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import './Style.css';

const Icons = () => {
  return (
    <>
    <div className="social-container">
        <a className="social tw-cursor-pointer tw-text-blue-600">
          <FaFacebookF />
        </a>
        <a className="social tw-cursor-pointer tw-text-red-500">
          <FaGoogle />
        </a>
        <a className="social tw-cursor-pointer tw-text-blue-600">
          <FaTwitter />
        </a>
    </div>
    </>
  )
}

export default Icons
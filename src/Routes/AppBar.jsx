import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';


const NavBar = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className='tw-z-20 tw-fixed tw-top-0 tw-right-0 tw-left-0'>
      <nav className="tw-flex tw-justify-between tw-bg-gray-50 tw-max-h-20 tw-border-b-2 
      tw-border-gray-300 tw-bg-primary-bg tw-px-12">

     
      <div className='tw-flex tw-gap-0  tw-font-bold tw-text-2xl sm:tw-text-3xl tw-text-black tw-py-2 tw-cursor-pointer'
      style={{alignItems: "center"}} onClick={()=> navigate("/")}>
        REDUX_TOOLKIT
        <svg width="25" height="24" viewBox="0 0 23 21" className="tw-my-2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_525_4295)">
            <path d="M10.4385 19.7206C16.1048 19.7206 19.5635 15.545 19.5635 10.5776C19.5635 5.57413 16.1048 1.47058 10.4385 1.47058C4.77215 1.47058 1.31348 5.57413 1.31348 10.5776C1.31348 15.545 4.77215 19.7206 10.4385 19.7206ZM10.4385 16.3729C7.16378 16.3729 5.32406 13.6732 5.32406 10.5776C5.32406 7.51792 7.16378 4.81822 10.4385 4.81822C13.75 4.81822 15.5529 7.51792 15.5529 10.5776C15.5529 13.6732 13.75 16.3729 10.4385 16.3729Z" stroke="#FA7317" strokeWidth="1.5"/>
            </g> 
            <defs>
            <clipPath id="clip0_525_4295">
            <rect width="22" height="20" fill="white" transform="translate(0.0634766 0.470581)"/>
            </clipPath>
            </defs>
          </svg>
      </div>
    

        <ul className='tw-flex tw-flex-end tw-gap-10'>
          <li className='tw-cursor-pointer tw-text-black tw-my-auto' onClick={()=> navigate("/")}> Home </li>
          <li className='tw-cursor-pointer tw-text-black tw-my-auto' onClick={()=> navigate("/company")}> Company List</li>
          <li className='tw-cursor-pointer tw-text-black tw-my-auto' onClick={()=> navigate("employee")}> Employee List </li>

        </ul>
      </nav>
      </div>
      <div className='tw-pt-20 tw-min-h-screen tw-w-auto'>
        <Outlet />
      </div>
    </>
  )
}

export default NavBar
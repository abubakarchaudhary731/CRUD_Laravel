import React from 'react';
import { Link } from 'react-router-dom';


const Error = () => {
  return (
    <div>
      <div className="tw-text-center tw-mt-32">
        <img src="/images/error.avif" alt="Error" className='tw-w-96 tw-h-96 tw-m-auto'
          style={{ maxWidth: "100%", height: "auto" }} /> <br />
        <Link to={'/'}>
          <button className='tw-text-black tw-p-5 tw-px-10
            tw-rounded-xl tw-font-bold'> Go Back </button>
        </Link>
      </div>
    </div>
  )
}

export default Error
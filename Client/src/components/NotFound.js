import React from 'react'
import { ImShocked } from "react-icons/im";

const NotFound = () => {
  return (
    <div>
      <div className='notFound'>
        <div className='emoji'><span> <ImShocked/> OOPS. . .</span></div>
        <div className='code'><h1 data-text = "404">404</h1></div>
        <div className='page'><h1><span>P</span>age <span>N</span>ot <span>F</span>ound</h1></div>

      </div>
    </div>
  )
}

export default NotFound
import React from 'react'
import { CiMail } from "react-icons/ci";

const Contact = () => {
  return (
    <div>
    <div className='contactContainer'>
        <div className="contact">
        <h1>Contact Us</h1>
        </div>
        <div className='contactDetails'>
            <h2>NextBlog</h2>
        <p>Feel free to reach out to us through the contact form below.</p>
        <p>Contact Us :<span onClick={() => window.location.href = 'mailto:nextblog123@gmail.com'}> <CiMail/> nextblog123@gmail.com</span></p>
        </div>
    
    </div>
    </div>
  )
}

export default Contact
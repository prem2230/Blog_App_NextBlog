import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Header = ({setIsAuthenticate}) => {
  const navigate = useNavigate() 
  const [ menuOpen,setMenuOpen] = useState(false)
  const menuClick = (path) => {
    setMenuOpen(false); 
    navigate(path); 
  };
  const toggleMenu = ()=>{
    setMenuOpen(!menuOpen)
    document.body.classList.toggle('menuLocked', !menuOpen);
  }
  const handleLogout = ()=>{
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('userdata')
    setIsAuthenticate(false)
    navigate('/login')

  }
  return (
    <>
    <div className="navHeader">
        <div><h2 data-text = "NextBlog">NextBlog </h2></div>
        <div className="menuIcon" onClick={()=>toggleMenu()}><MdMenu /></div>
    </div>
    <div className={`navBar ${menuOpen? 'menuOpen':''}`}>
        <nav>
            <ul>
            <div className="cancelIcon" onClick={()=>toggleMenu()}>
              <FaTimes />
            </div>
                <li onClick={()=>menuClick('/')}> <Link to='/'>Home</Link> </li>
                <li onClick={()=>menuClick('/about')}> <Link to='/about'>About</Link></li>
                <li onClick={()=>menuClick('/contact')}> <Link to='/contact'>Contact</Link></li>
                <li onClick={()=>handleLogout()}> <Link to='/login'>LogOut</Link></li>
            </ul>
        </nav> 
    </div>
    </>
  )
}

export default Header
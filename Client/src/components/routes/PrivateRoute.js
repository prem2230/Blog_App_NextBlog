import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'

const PrivateRoute = ({token,isAuthenticate,setIsAuthenticate}) => {
    const isAuthenticated = token!==null 
  return (<>
    {isAuthenticated ?
    
    <>
    <Header setIsAuthenticate={setIsAuthenticate}/>
    <Outlet />
    </>
    :
    <Navigate to = '/login' />
    }

  </>)
}

export default PrivateRoute
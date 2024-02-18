import React, { useContext, useEffect, useState } from 'react'
import apiRequest from './api/apiRequest'
import DataContext from"./context/DataContext"
import { useNavigate } from 'react-router-dom'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = ({ setIsAuthenticate }) => {
    const API_URL = 'http://localhost:4000/'
    const [account,setAccount] = useState('login')
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [fetchError, setFetchError] = useState(null);
    const [showPassword,setShowPassword] = useState(false)
    const {setAccountDetails} = useContext(DataContext)
    const navigate = useNavigate()

    useEffect(() => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('userData')
      setIsAuthenticate(false);
  }, [setIsAuthenticate]);


    const handleAccount = ()=>{
      setFetchError(null)
        account==='signup'? setAccount('login'):setAccount('signup')
    }
    const handleVisible=()=>{
      setShowPassword(!showPassword)
    }
    const handleSignUp=async(e)=>{
        e.preventDefault()
        if (!email || !username || !password) {
          setFetchError("Please fill in all fields");
          return;
        }
        const addUser = {
            email:email,
            username:username,
            password:password
        }

        const postOptions = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(addUser)
        }
        try{
        const result = await apiRequest(`${API_URL}signup`,postOptions)
        if(result.error){
          setFetchError(result.error)
          return
        }
        setEmail('')
        setPassword('')
        setUsername('')
        setShowPassword(false)
        navigate('/')
    }catch(error){
      console.error('Error during Sign Up:', error.message);

    }
  }

  const handleLogIn = async () => {
    if (!username || !password) {
      setFetchError("Please Enter Username and Password");
      return;
    }
    
    const loginUser = {
      username: username,
      password: password,
    };
    
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    };
    
    try {
      const response = await apiRequest(`${API_URL}login`, postOptions);
      
      if (response.error) {
        setFetchError(response.error)
      } else {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        sessionStorage.setItem('userData', JSON.stringify({ username: response.data.username, email: response.data.email }));
        setAccountDetails({username: response.data.username, email: response.data.email});
        setIsAuthenticate(true)
        navigate('/')
      }
    } catch (error) {
      console.error('Error during Login:', error.message);
      setFetchError("Error during login. Please try again later.");
    }
    
    setEmail('');
    setPassword('');
    setUsername('');
    setShowPassword(false);
  };
      
  return (
    <div>
        <div className="header">
          <h2 data-text = "NextBlog">NextBlog </h2></div>
       
        <div className="container">
            {account==='login' ?
           <>  
           <input 
           type="text" 
           value={username} 
           onChange={(e) => setUsername(e.target.value)} 
           placeholder='Username' 
           name='username'  
           required 
           />
           <div className='pwd'>
            <input 
            type={showPassword ? "text":"password" }
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
            name='password' 
            required />
            <button className='eyeBtn' type='button' onClick={()=>handleVisible()}>{showPassword?<IoIosEye/>:<IoIosEyeOff/>}</button>
            </div>
            {fetchError && <div className="fetch-error"> {fetchError} !!!</div>}
            
            <button onClick={()=>handleLogIn()} className='login'>Login</button>
           <p> Don't have an account ?</p>
            <button onClick={()=>handleAccount()} className='signup'>Register Here !!</button> 
            </>
            :
            <>
                <input 
                type="email" 
                placeholder='Email id' 
                name='email' value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required />
                <input 
                type="text" 
                placeholder='Username' 
                name='username'
                value={username}
                onChange={(e)=>setUsername(e.target.value)} 
                required />
            <div className="pwd">
               <input 
                 type={showPassword ? "text":"password" }
                placeholder='Password' 
                name='password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                required />
                <button className='eyeBtn' type='button' onClick={()=>handleVisible()}>{showPassword?<IoIosEye/>:<IoIosEyeOff/>}</button>
            </div>
                {fetchError && <div className="fetch-error"> {fetchError} !!!</div>}
            <button onClick={(e)=>handleSignUp(e)} className='signup'>Sign Up</button>
            <p>Already have an account !!</p>
            <button type='submit' onClick={()=>handleAccount()} className='login'>Login</button>
            </>
            } 
        </div>
    </div>
  )
}

export default Login
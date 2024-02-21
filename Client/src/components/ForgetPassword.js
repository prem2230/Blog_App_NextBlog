import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


const ForgetPassword = () => {
    const API_URL = 'https://blog-app-nextblog.onrender.com/'
    const [email,setEmail] =useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')  
    const [fetchError,setFetchError] = useState(null)
    const [emailExist,setEmailExist] = useState(false)
    const [success,setSuccess] = useState(null)
    const navigate = useNavigate()
    const [showPassword,setShowPassword] =useState(false)

    const handleVisible=()=>{
      setShowPassword(!showPassword)
    }
    
    const handleCheckEmail = async()=>{
        if(!email){
            setFetchError('Please enter registered email')
            return
        }
        const data = {
            email:email
        }
        const postOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        try {
          const result = await fetch(`${API_URL}forgotpassword`, postOptions);
          const response = await result.json();
          
          if (response.success) {
              setSuccess(response.message);
              setEmailExist(true);
              setFetchError(null);
          } else {
              setEmailExist(false);
              setSuccess('');
              setFetchError(response.message || 'Email not found');
          }
      } catch (error) {
          console.error('Error verifying email', error.message);
          setFetchError("Error verifying email. Please try again later.");
          setSuccess(null)
      }

    }
    const handleResetPassword = async()=>{
        if(!newPassword && !confirmPassword){
          setSuccess('')
          setFetchError('Please enter Passwords')
          return
        }
        if(newPassword !==confirmPassword){
          setSuccess('')
          setFetchError('Passwords Does not match')
          return
        }
        const data = {
          email: email,
          newPassword: newPassword
        }
        const patchOptions = {
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(data)
        }
        try{
          const result = await fetch(`${API_URL}resetpassword`,patchOptions)
          const response = await result.json()
          if (!result.ok) {
            setFetchError( response.message || 'Failed to reset password');
            setSuccess(null)
        } else {
            setSuccess('Password successfully reset');
            setFetchError(null)

            setTimeout(() => {
              navigate('/login')
            }, 3000);
        }
         
            
        }catch(error){
          console.error('Error resetting password',error)
          setFetchError('Error resetting password, Try Again?')
          setSuccess(null);
        }
    }

    
  return (
    <div>
        <div className="header">
          <h2 data-text = "NextBlog">NextBlog </h2></div>
        <div className="forgotContainer">
            <>
            <h1>Forgot Password</h1>
            <input 
            type="email"
            placeholder='Enter Your Email ID'
            name = 'email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
             />
             {emailExist &&
             <>
             {/* <input 
             type="password"
             required
             placeholder='Enter new password '
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
              /> */}
            <div className='pwd'>
                <input 
                type={showPassword ? "text":"password" }
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder='Enter New Password' 
                name='password' 
                required />
                <button className='eyeBtn' type='button' onClick={()=>handleVisible()}>{showPassword?<IoIosEye/>:<IoIosEyeOff/>}</button>
            </div>
              {/* <input 
              type="password"
              required
              placeholder='Re-Type new password '
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
               /> */}
            <div className='pwd'>
                <input 
                type={showPassword ? "text":"password" }
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder='Re-Type New Password' 
                name='password' 
                required />
                <button className='eyeBtn' type='button' onClick={()=>handleVisible()}>{showPassword?<IoIosEye/>:<IoIosEyeOff/>}</button>
            </div>
               </>
             }
             {success && <div className='success'>{success}</div>}
             {fetchError && <div className='error'>{fetchError}</div>}
              <div className="btn">
                <button className='verify' onClick={()=>handleCheckEmail()}>Verify</button>
                <button className='change' onClick={()=>handleResetPassword()}>Change</button>
              </div>
              </>
        </div>
    </div>
  )
}

export default ForgetPassword

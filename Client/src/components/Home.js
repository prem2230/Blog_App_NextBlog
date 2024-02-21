import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'
import { PiHandsClappingDuotone } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa6";


const Home = () => {
  const API_URL = 'https://blog-app-nextblog.onrender.com/'
  const [posts,setPosts]=useState([])
  const [fetchError, setFetchError] = useState(null);
  const {accountDetails} = useContext(DataContext)
  const [isLoading,setIsLoading] = useState(true)


  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const response = await fetch(`${API_URL}getposts`)
        const data = await response.json()
        setPosts(data)
      }catch(error){
        setFetchError('Failed to fetch posts. Please refresh the page.');
      }finally{
        setIsLoading(false)
      }
    }
    fetchPosts()
  },[])

  const formatCreatedAt = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (secondsDifference < 60) {
      return `${secondsDifference} second${secondsDifference > 1 ? 's' : ''} ago`;
    } 
    else if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } 
    else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } 
    else if (daysDifference === 1) {
      return 'yesterday';
    } 
    else {
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    }
  };
  return (
    <div>
        <div className="homeContainer">
            <div className='content'>
                <h1><span>Next</span>Blog</h1>
                <h4>"Embrace the NextBlog journey – where words meet the world."</h4>
            </div>
        </div>
       
            <div className="posts">
                  <div className='userGreet'>
                    <span className='icon'><PiHandsClappingDuotone/></span>
                    <h3>  
                        Hey <span className='user'> {accountDetails.username}</span> !! Welcome to NextBlog . . .
                    </h3>
                  </div>
                  <div className="createBtn">
                    <Link to='/createpost'><button>Create Blog</button></Link>
                  </div>
                   <h2>Latest Posts </h2>
                   {isLoading && <p className='noPost'>Loading...</p>}
              {fetchError ? (
                  <div className='fetchError'>
                    <p>{fetchError}</p>
                  </div>
        ) : (
                <div className="postContainer">
                  {posts&&posts.length>0 ?posts.map((post)=>(
                    
                  <div className="post" key={post._id}>
                    <img src={`${API_URL}getimage/${post.picture}?${Date.now()}`} alt="post" />
                    <div className="postDetail">
                      <h3>{post.title}</h3>
                      <div className='view'> <Link key={post._id} to={`/post/${post._id}`}><button>View Blog</button> </Link></div>
                    </div>
                    <div className="postFooter">
                      <h5> <FaUserCheck/> {post.username}</h5>
                      <small>{formatCreatedAt(post.createdAt)}</small>
                    </div>
                  </div>
                  )): (
                  <div className='noPost'> <p>No Posts Available</p></div>
                  )}
                </div>
        )}
            </div>
    </div>
  )
}

export default Home

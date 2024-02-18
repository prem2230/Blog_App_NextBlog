  import React, { useContext, useState } from 'react'
  import { CiCirclePlus } from "react-icons/ci";
  import postImg from '../assets/pngegg.png';
  import DataContext from './context/DataContext';
  import { useNavigate } from 'react-router-dom';



  const CreatePost = () => {
  
    const API_URL = 'http://localhost:4000/'
    const [ title,setTitle] = useState('')
    const [ story,setStory] = useState('')
    const [file,setFile] = useState(null)
    const [fetchError,setFetchError] = useState(null)
    const {accountDetails} = useContext(DataContext)
    const [img ,setImg] = useState(postImg) 
    const navigate = useNavigate()


    
    const handlePublish = async(e)=>{
      e.preventDefault()
      if(title.length > 50){
        setFetchError('Title is too big')
        return
      }

      try{
      
        const formData = new FormData();
        formData.append('name',file? file.name:'')
        formData.append('file',file)

        const imageResponse = await fetch(`${API_URL}upload`,{
          method:'POST',
          body: formData
        })
        const imageData = await imageResponse.json()

        const addPost = {
          title:title,
          story:story,
          username:accountDetails.username,
          picture:imageData._id
        }
        const postOptions = {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(addPost)
        }
        const result = await fetch(`${API_URL}createpost`,postOptions)
        const postData = await result.json()
        if (!result.ok) {
          setFetchError(postData.error)
        }else{
        setTitle('')
        setStory('')
        setFile(null)
        navigate('/')
        setFetchError(null)
        }
      }catch(error){
        setFetchError('Failed to create post. Please try again.')
      }

    }
    const handleTitle=(e)=>{
      setTitle(e.target.value)
      setFetchError(null)
    }
    const handleStory=(e)=>{
      setStory(e.target.value)
      setFetchError(null)
    }
    const handleImage=(e)=>{
      const selectedFile = e.target.files[0]
      if(selectedFile){
      setFile(selectedFile)
      setImg(URL.createObjectURL(selectedFile))
      setFetchError(null)
      }
      
    }
    
  
    return (
      <div>
        <form onSubmit={(e)=>handlePublish(e)}>
        <div className="createPostContainer">
          <div className="postImg" >
            <img src={img} alt="posts" />          
          </div>
          <div className="fileInput">
            <label htmlFor="file"><CiCirclePlus/><br /><p>Add Image</p></label>
            <input 
            type="file" 
            accept='image/' 
            id='file'
            onChange={(e)=>handleImage(e)}
            />
          </div>
          
          <div className="text">
            <input 
            type="text" 
            name="title" 
            placeholder='Your Title !!'
            value={title}
            onChange={(e)=>handleTitle(e)}
            />
            <textarea 
            placeholder='Share your story here....' 
            cols="30" 
            rows="10"
            value={story}
            onChange={(e)=>handleStory(e)}
            ></textarea>
          </div>
          <div className='error'>
        {fetchError && <div>{fetchError}</div>}
        </div>
          <div className="publishBtn">
            <button type='submit'>Publish Post</button>
          </div>
        </div>
        </form>
      </div>
    )
  }

  export default CreatePost
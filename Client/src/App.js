import { useContext, useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login'
import DataContext from './components/context/DataContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import EditPost from './components/EditPost';
import Contact from './components/Contact';
import About from './components/About';
import NotFound from './components/NotFound';
import ForgetPassword from './components/ForgetPassword';

function App() {

  const [ isAuthenticate,setIsAuthenticate] = useState(false)
  const token = sessionStorage.getItem('accessToken');
  const {setAccountDetails} = useContext(DataContext)

  useEffect(() => {
    if (token) {
      setIsAuthenticate(true);
      const userData = sessionStorage.getItem('userData');
      if (userData) {
        const { username, email } = JSON.parse(userData);
        setAccountDetails({ username, email });
    }
  }
  }, [token,setAccountDetails]);
  return (
    <div className="App">
   
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
          <Route path='/forgetpassword' element={ <ForgetPassword />} />

          <Route path='/' element= {<PrivateRoute isAuthenticate = {isAuthenticate}  setIsAuthenticate={setIsAuthenticate}   token = {token} />}>
            <Route path='/' element = {<Home/>} />
          </Route>

          <Route path='/createpost' element= {<PrivateRoute isAuthenticate = {isAuthenticate} setIsAuthenticate={setIsAuthenticate}  token = {token} />}>
            <Route path='/createpost' element = {<CreatePost />} />
          </Route>

          <Route path='/post/:id' element= {<PrivateRoute isAuthenticate = {isAuthenticate} setIsAuthenticate={setIsAuthenticate}  token = {token} />}>
            <Route path='/post/:id' element = {<Post />} />
          </Route>

          <Route path='/editpost/:id' element= {<PrivateRoute isAuthenticate = {isAuthenticate} setIsAuthenticate={setIsAuthenticate}  token = {token} />}>
            <Route path='/editpost/:id' element = {<EditPost />} />
          </Route>

          <Route path='/about' element= {<PrivateRoute isAuthenticate = {isAuthenticate} setIsAuthenticate={setIsAuthenticate}  token = {token} />}>
            <Route path='/about' element = {<About />} />
          </Route>

          <Route path='/contact' element= {<PrivateRoute isAuthenticate = {isAuthenticate} setIsAuthenticate={setIsAuthenticate}  token = {token} />}>
            <Route path='/contact' element = {<Contact />} />
          </Route>

          <Route path='*' element= {<NotFound/>} />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

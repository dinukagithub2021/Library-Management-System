import './Styles/index.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import User from './Pages/User';
import { Routes,Route, Navigate} from 'react-router-dom';
import Books from './Pages/Books';
import LibrarianLogin from './Pages/LibrarianLogin';
import PreOrders from './Pages/preOrders';
import { useAuthContext } from './hooks/useAuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const {user} = useAuthContext()
  const [hasEmail, setHasEmail] = useState()
  useEffect(() => {
    if(user && !user.email){
      //username
      setHasEmail(false)
    }
    if(user && user.email){
      setHasEmail(true)
    }
  }, [])

  return (
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={user ? <Navigate to = '/user'></Navigate>:<Register/>}></Route>
            <Route path='/contact' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/user' element={<User/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/librarian/login' element={<LibrarianLogin/>}></Route>
            <Route path="/librarian/preorders" element={<PreOrders/>}></Route>
          </Routes>
      </div> 
      /*
      <div className = "Home-BG">
        <div className = "Details">
          <div className = "Name">LibrarianX</div>
          <div className = "Description">Your virtual librarian for a seamless book discovery journey......</div>
        </div>
      </div>
      <Contact/> */
  );
}

export default App;

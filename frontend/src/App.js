import './Styles/index.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import User from './Pages/User';
import { Routes,Route} from 'react-router-dom';
function App() {
  return (
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/signin' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/contact' element={<Home/>}></Route>
            <Route path='/home' element={<User/>}></Route>
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

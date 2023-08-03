import './Styles/index.css';
import Home from './Pages/Home';
import NavBarHome from './Components/NavBarHome';
import Register from './Pages/Register';
import Contact from './Components/Contact';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
        <div className="App">
          <Home/>
            {/* <Routes>
              <Route exact path='/'><Home/></Route>
              <Route exact path='/login'><Login/></Route>
              <Route exact path='/register'><Register/></Route>
            </Routes> */}
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

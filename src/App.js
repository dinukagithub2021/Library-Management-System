import './Styles/index.css';
import NavBarHome from './Components/NavBarHome';
import Register from './Pages/register';
import Contact from './Components/Contact';

function App() {
  return (
    <div className="App">
      <NavBarHome/>
        <Register/>
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

import logo from './logo.svg';
import './App.css';
import NavBarHome from './Components/NavBarHome';
import Contact from './Components/Contact';

function App() {
  return (
    <div className="App">
      <NavBarHome/>
      <div className = "Home-BG">
        <div className = "Details">
          <div className = "Name">LibrarianX</div>
          <div className = "Description">Your virtual librarian for a seamless book discovery journey......</div>
        </div>
      </div>
      <Contact/>
    </div>
  );
}

export default App;

import Contact from "../Components/Contact";
import NavBarHome from "../Components/NavBarHome";
import '../Styles/home.css';
import '../img/Home-BG.avif';
import About from "../Components/About";

function Home() {
    return (
        <div className="home">
            <NavBarHome/>
            <div className="Home-BG">
                <div className="Details">
                    <div className="Name">LibrarianX</div>
                    <div className="Description">Your virtual librarian for a seamless book discovery journey...</div>
                </div>
            </div>
            <About/>
            <Contact/>
        </div>
    );
}
 
export default Home;
import '../Styles/Navbarhome.css';
import '../Styles/index.css';
import { Link } from 'react-router-dom';

function NavBarHome() {


    function navChange(){
        var Nav = document.querySelector(".Navbar");
        Nav.classList.toggle("change");
    }

    return (
        <div className="Navbar">
            <div className='Menu' onClick={navChange}>
                <div className='bar1'> </div>
                <div className='bar2'> </div>
                <div className='bar3'> </div>
            </div>
            <ul>
                <li><div className='Logo'></div></li>
                <Link to='/'><li>Home</li></Link>
                <Link to ="/#about" onClick={navChange}><li>About</li></Link>
                <Link to ="/#contact" onClick={navChange}><li>Contact</li></Link>
                <Link to='/signin'><li>Sign In</li></Link>
            </ul>
            <button className='button-primary navbar-button'><a href="/register" className='register'><Link to='/register'>Register</Link></a></button>
        </div>
    );
}
 
export default NavBarHome;
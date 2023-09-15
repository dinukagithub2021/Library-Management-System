import '../Styles/Navbarhome.css';
import '../Styles/index.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from "../img/logo.jpg"

function NavBarHome() {
    const {logOut} = useLogout()
    const {user} = useAuthContext()
    const [selectedPage, setSelectedPage] = useState('');

    const handleLogOutClick = () => {
        logOut()
        navigate("/login")
    }

    const navChange = () => {
        var Nav = document.querySelector(".Navbar");
        Nav.classList.toggle("change")
    }

    const pages = [
        { name: 'Student', path: '/login' },
        { name: 'Librarian', path: '/librarian/login' },
      ];
    const navigate = useNavigate();
    
      const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPage(selectedValue);

        if (selectedValue) {
          const selectedPage = pages.find((page) => page.name === selectedValue);
          if (selectedPage) {
            navigate(selectedPage.path);
          }
        }
      };


    return (
        <div className="Navbar">
            <div className='Menu' onClick={navChange}>
                <div className='bar1'> </div>
                <div className='bar2'> </div>
                <div className='bar3'> </div>
            </div>
            <ul>
                <li className='logo-li'><img src={logo}></img></li>
                {/* <Link to='/'><li><img src={logo}></img></li></Link> */}

                {!user && (
                    <Link to ="/#about" onClick={() =>navChange}><li>About</li></Link>
                )}
                {!user && (
                    <Link to ="/#contact" onClick={() =>navChange}><li>Contact</li></Link>
                )}
                {user ? (
                    <li><div>{user.username || user.email}</div></li>
                    ) : (
                    <li className='select'>
                        <select value={selectedPage} onChange={handleSelectChange}>
                            <option>Sign In</option>
                            {pages.map((page) => (
                                <option key={page.path}>
                                    <Link to={page.path}>{page.name}</Link>
                                </option>
                            ))}
                        </select>
                    </li>
                )}
            </ul>
                {!user && 
                    <button className='button-primary navbar-button'><a href="/register" className='register'><Link to='/register'>Register</Link></a></button>
                }
                {user && 
                <button className='button-primary navbar-button' onClick={handleLogOutClick}>Log Out</button>
                }
        </div>
    );
}
 
export default NavBarHome;
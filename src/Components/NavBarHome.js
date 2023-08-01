import '../Styles/Navbarhome.css'

function NavBarHome() {
    return (
        <div className="Navbar">
            <ul>
                <li><div className='Logo'></div></li>
                <li><a href="/home">Home</a></li>
                <li><a href="/news">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/about">Sign In</a></li>
            </ul>
            <button><a href="/register" className='register'>Register</a></button>
        </div>
    );
}
 
export default NavBarHome;
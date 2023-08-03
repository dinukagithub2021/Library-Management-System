import '../Styles/login.css'
import '../Components/NavBarHome';
import NavBarHome from '../Components/NavBarHome';

function login() {
    return (
        <div className='login'>
            <div className='login-page'>
                <form>
                    <h2 className='title'>Login</h2>
                    <div className='email'>Email:<br/><input type='email'></input></div>
                    <div className='password'>Password:<br/><input type="password"></input></div>
                    <button className='login-button'>Login</button>
                </form>
            </div>
        </div>

    );
}
 
export default login;
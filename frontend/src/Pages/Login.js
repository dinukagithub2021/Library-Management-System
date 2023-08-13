import NavBarHome from '../Components/NavBarHome';
import '../Styles/login.css'


function login() {
    return (
        <div className='login'>
            <NavBarHome/>
            <div className='login-form'>
                <div className='login-page'>
                    <form>
                        <h2 className='title'>Login</h2>
                        <div className='email'>Email:<br/><input type='email'></input></div>
                        <div className='password'>Password:<br/><input type="password"></input></div>
                        <button className='login-button button-primary'>Login</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
 
export default login;
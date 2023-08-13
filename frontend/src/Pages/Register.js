import NavBarHome from '../Components/NavBarHome';
import '../Styles/register.css'

function Register() {
    return (
        <div className="Register">
            <NavBarHome/>
            <div className='register-form'>
                <div className='register-page'>
                    <form>
                        <h2 className='title'>Register With Us!</h2>
                        <div className='name'>Name:<br/><input type='text'></input></div>
                        <div className='age'>Age:<br/><input type='number'></input></div>
                        <div className='telephone-no'>Telephone No:<br/><input type='text'></input></div>
                        <div className='birthday'>Birthday: <br/><input type="date"></input></div>
                        <div className='admission-no'>Admission No:(Avoid Slashes)<br/><input type='tnumber'></input></div>
                        <div className='city'>City:<br/><input type='text'></input></div>
                        <div className='district'>District:<br/><input type='text'></input></div>
                        <div className='province'>Province:<br/><input type='text'></input></div>
                        <div className='email'>Email:<br/><input type='email'></input></div>
                        <div className='password'>Password:<br/><input type="password"></input></div>
                        <div className='confirm-password'>Confirm Password:<br/><input type="password"></input></div>
                        <button className='register-button button-primary'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Register;
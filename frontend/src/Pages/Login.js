import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarHome from '../Components/NavBarHome';
import '../Styles/login.css'
import { useLogin } from '../hooks/useLogin';


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const {logIn, error, isLoading} = useLogin()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await logIn(email,password)
        navigate("/user")
    }


    return (
        <div className='login'>
            <NavBarHome/>
            <div className='login-form' onSubmit={handleSubmit}>
                <div className='login-page'>
                    <form>
                        <h2 className='title'>Login</h2>
                        <div className='email'>Email:<br/><input type='email' onChange={(e) => {setEmail(e.target.value)}}></input></div>
                        <div className='password'>Password:<br/><input type="password" onChange={(e) => {setPassword(e.target.value)}}></input></div>
                        <button className='login-button button-primary' disabled={isLoading}>Login</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
        </div>

    );
}
 
export default Login;
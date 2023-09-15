import { useState } from 'react';
import "../index.css"
import { useNavigate } from 'react-router-dom';
import {useLibrarianLogin} from '../hooks/useLibrarianLogin'
import NavBarHome from '../Components/NavBarHome';
import "../Styles/login.css"

function LibrarianLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {librarianLogIn, error, isLoading} = useLibrarianLogin()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await librarianLogIn(username,password)
        navigate("/librarian/preorders")
    }

    return (
        <div className="login">
            <NavBarHome/>
             <div className='login-form'>
             <div className='login-page'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='title'>Login</h2>
                        <div className='username'>Username:<br/><input type='username' onChange={(e) => {setUsername(e.target.value)}}></input></div>
                        <div className='password'>Password:<br/><input type="password" onChange={(e) => {setPassword(e.target.value)}}></input></div>
                        <button className='login-button button-primary' disabled={isLoading}>Login</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
             </div>
        </div>
    );
}
 
export default LibrarianLogin;
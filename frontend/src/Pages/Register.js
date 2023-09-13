import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import NavBarHome from '../Components/NavBarHome';
import '../Styles/register.css'
import { useRegister } from '../hooks/useRegister';

function Register() {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [telephone, setTelephone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [admissionNo, setadmissionNo] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {signUp, error, isLoading} = useRegister()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signUp(name,age,telephone,birthday,admissionNo,address,email,password)
        setIsLoggedIn(true)
        navigate("/books")
    }

    return (
        <div className="Register">
            <NavBarHome/>
            <div className='register-form'>
                <div className='register-page'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='title'>Register With Us!</h2>
                        <div className='name'>Name:<br/><input type='text' onChange={(e) => setName(e.target.value)}></input></div>
                        <div className='age'>Age:<br/><input type='number' onChange={(e) => setAge(e.target.value)}></input></div>
                        <div className='telephone-no'>Telephone No:<br/><input type='text' onChange={(e) => setTelephone(e.target.value)}></input></div>
                        <div className='birthday'>Birthday: <br/><input type="date" onChange={(e) => setBirthday(e.target.value)}></input></div>
                        <div className='admission-no'>Admission No:<br/><input type='tnumber' onChange={(e) => setadmissionNo(e.target.value)}></input></div>
                        <div className='address'><br/>Address<input type='text' onChange={(e) => setAddress(e.target.value)}></input></div>
                        <div className='email'>Email:<br/><input type='email' onChange={(e) => setEmail(e.target.value)}></input></div>
                        <div className='password'>Password:<br/><input type="password" onChange={(e) => setPassword(e.target.value)}></input></div>
                        {/* <div className='confirm-password'>Confirm Password:<br/><input type="password" onChange={(e) => setConfirmPassword(e.target.value)}></input></div> */}
                        {error && <div className='error'>{error}</div>}
                        <button className='register-button button-primary' disabled={isLoading}>Register</button>
        
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Register;
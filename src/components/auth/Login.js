import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import checkGuest from './checkGuest';

function Login() {
    var [email,setEmail] = useState('');
    var [password,setPassword] = useState('');
    var [errorMessage,setErrorMessage] = useState('')
    var dispatch = useDispatch()
    function loginAttempt(){
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password,
        }).then(response=>{
            setErrorMessage('')
            console.log(response.data);
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user))
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }
            else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }
            else{
                setErrorMessage('unable to login..pls contact admin')
            }
        })

    }
  return (
    <div>
        <Navbar></Navbar>
    <div className='container'>
       <div className='card'>
        <h1>Login Page</h1>
        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div>:''}
        <div className='card-body'>
            <label>Email:</label><br />
            <input type="email"  placeholder='email....' onChange={(e)=>{setEmail(e.target.value)}} /><br />
            <label>Password:</label><br />
            <input type="password"  placeholder='password....' onChange={(e)=>{setPassword(e.target.value)}} /><br /><br />
            <button onClick={loginAttempt} className='btn btn-info'>Login</button>
        </div>
       </div>
    </div>
    </div>
  )
}

export default checkGuest(Login);

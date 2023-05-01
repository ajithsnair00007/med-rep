import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function Register() {
    var [name,setName] = useState('');
    var [email,setEmail] = useState('');
    var [password,setPassword] = useState('');
    var [password_2,setPassword_2] = useState('')
    var [errorMessage,setErrorMessage] = useState('');
    var navigate = useNavigate();

    function submitUser(){
        var user = {
            name:name,
            email:email,
            password:password,
            password_confirmation:password_2

        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('')
            navigate('/login')
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }
            else{
                setErrorMessage('failed to connect to api')
            }
        })
    }
  return (
    <div>
        <Navbar></Navbar>
    <div className='container'>
        <div className='card'>
            <div>Register User</div><br /><br />
            <div className='card-body'>
                {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:''}
             <div className='form-control'>
                <label>Name: </label><br />
                <input type="text" value={name} placeholder='enter your name' onChange={(e)=>{setName(e.target.value)}
                } /> <br />
                <label>Email: </label><br />
                <input type="email" value={email} placeholder='enter your email' onChange={(e)=>{setEmail(e.target.value)}
                } /> <br />
                <label>Password: </label><br />
                <input type="password" placeholder='enter correct password' onChange={(e)=>{setPassword(e.target.value)}
                } /> <br />
                <label>Password Confirmation: </label><br />
                <input type="password" placeholder='re-enter your password ' onChange={(e)=>{setPassword_2(e.target.value)}
                } /> <br /><br />
                <button onClick={submitUser} className='btn btn-primary'>Register</button>
             </div>
             </div> 
        </div>
      
    </div>
    </div>
  )
}

export default Register

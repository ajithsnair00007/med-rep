import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';
import checkAuth from './auth/checkAuth';
import { useSelector } from 'react-redux';



function Create() {
    var [name,setName] = useState('');
    var [company,setCompany] = useState('');
    var [expiry_date,setExpiry_date] = useState('');
    var navigate =useNavigate();
    var user = useSelector(store=>store.auth.user)
    function addMedicine(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name:name,
            company:company,
            expiry_date:expiry_date
        },{headers: {'Authorization':'Bearer '+user.token}}).then(response=>{
            console.log(response.data);
            navigate('/medicalstore/medicine')
            alert(response.data.message)
        })
    }
  return (
    <div>
      <Navbar></Navbar>
      <h1>Create Post</h1>
      <div className='form-group'>
        <label >NameOfMedicine</label><br />
        <input type="text" placeholder='enter medicine name' onChange={(e)=>{setName(e.target.value)}} /><br />
        <label >NameOfCompany</label><br />
        <input type="text" placeholder='enter company name' onChange={(e)=>{setCompany(e.target.value)}} /><br />
        <label >Expiry_date</label><br />
        <input type="date" placeholder='enter expiry date' onChange={(e)=>{setExpiry_date(e.target.value)}} /><br /><br />
        <button type='submit'  className='btn btn-success' onClick={addMedicine} >Create</button>
      </div>
    </div>
  )
}

export default checkAuth(Create)

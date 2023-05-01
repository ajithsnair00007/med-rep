import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import checkAuth from './auth/checkAuth';
import { useSelector } from 'react-redux';


function Update() {
    var {medicineId} = useParams();
    var [name,setName] = useState('');
    var [company,setCompany] = useState('')
    var [expiry_date,setExpiry_date] = useState('')
    var user = useSelector(store=>store.auth.user)
    var navigate = useNavigate()
    useEffect(()=>{
      if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
          headers: {'Authorization':'Bearer '+user.token}
           }).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date)
            
        })
      }
    },[medicineId,user])

    function updateMedicine(){
      
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
            name:name,
            company:company,
            expiry_date:expiry_date
        },{
          headers: {'Authorization':'Bearer '+user.token}
        }).then(response=>{
            alert(response.data.message)
            navigate('/medicalstore/medicine')
        })
    }
  
  return (
    <div>
        <Navbar></Navbar>
      <h1>Edit Post</h1>
      <div className='form-group'>
        <label >NameOfMedicine</label><br />
        <input type="text" placeholder='enter medicine name' value={name} onChange={(e)=>{setName(e.target.value)}} /><br />
        <label >NameOfCompany</label><br />
        <input type="text" placeholder='enter company name' value={company} onChange={(e)=>{setCompany(e.target.value)}} /><br />
        <label >Expiry_date</label><br />
        <input type="date" placeholder='enter expiry date' value={expiry_date} onChange={(e)=>{setExpiry_date(e.target.value)}} /><br /><br />
        <button type='submit' className='btn btn-warning' onClick={updateMedicine}>Edit</button>
      </div>
      
    </div>
  )
}

export default checkAuth(Update)

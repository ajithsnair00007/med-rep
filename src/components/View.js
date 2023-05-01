import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import checkAuth from './auth/checkAuth';
import { useSelector } from 'react-redux';

function View() {
    var {medicineId} = useParams();
    var [medicine,setMedicine] = useState({name:'',company:'',expiry_date:''})
    var user = useSelector(store=>store.auth.user)
    useEffect(()=>{
      if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
          headers: {'Authorization':'Bearer '+user.token}
        }).then(response=>{
            setMedicine(response.data)
        })
      }
    },[medicineId,user])
  return (
    <div>
        <Navbar></Navbar>
        <div className='card'>
           <div className='card-header'>
                {medicine.name}
           </div>
           <div className='card-body'>
                {medicine.company}
           </div>
           <div className='card-footer'>
                {medicine.expiry_date}
           </div>
        </div>
      
    </div>
  )
}

export default checkAuth(View)

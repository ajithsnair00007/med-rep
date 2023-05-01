import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import checkAuth from './auth/checkAuth';
import { useSelector } from 'react-redux';

function List() {
  var user = useSelector(store=>store.auth.user)
    const deleteMedicine=(id)=>{
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/'+id,{
          headers: {'Authorization':'Bearer '+user.token}
        }).then(response=>{
          fetchMedicines();
          alert(response.data.message);
        })
    }
    var [medicines,setMedicines] = useState([]);
    var navigate = useNavigate();
    function fetchMedicines(){
        axios.get('https://medicalstore.mashupstack.com/api/medicine',{
          headers: {'Authorization':'Bearer '+user.token}
        }).then(response=>{
            setMedicines(response.data)
        })
    }
    useEffect(()=>{
      if(user){
        fetchMedicines()
      }
    },)

  return (
    <div>
      <Navbar></Navbar>
      {medicines.map((medicine)=>(
        <div key={medicine.id} className='card'>
          <div className='card-body'>
            {medicine.name},
            {medicine.company}
            <button  type='submit' className='btn btn-primary float-right' onClick={()=>navigate('/medicalstore/medicine/'+medicine.id+'/update')}>Update</button>
            <button  type='submit' className='btn btn-success float-right' onClick={()=>navigate('/medicalstore/medicine/'+medicine.id)}>View</button>
            <button  type='submit' className='btn btn-danger float-right' onClick={()=>deleteMedicine(medicine.id)}>Delete</button>
          </div>
          

        </div>
      ))}
    </div>
  )
}

export default checkAuth(List);

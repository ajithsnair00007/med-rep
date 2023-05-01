import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Create from './Create'
import List from './List'
import View from './View'
import Update from './update'
import Register from './auth/Register'
import Login from './auth/Login'


const router = createBrowserRouter([
    {path:'',element:<App/>},
    {path:'medicalstore/medicine', element:<List/>},
    {path:'medicalstore/medicine/create', element:<Create/>},
    {path:'medicalstore/medicine/:medicineId', element:<View/>},
    {path:'medicalstore/medicine/:medicineId/update', element:<Update/>},
    {path:'register', element:<Register/>},
    {path:'login' , element:<Login/>}

]) 
  

export default router

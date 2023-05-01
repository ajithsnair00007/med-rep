import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { removeUser } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

    function Navbar() {
        var dispatch = useDispatch();
        var navigate = useNavigate();
        var user = useSelector(store=>store.auth.user)
        function logout(){
            if(user){
                axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                    headers:{'Authorization':'Bearer '+user.token}
                });
                dispatch(removeUser());
                navigate('/login')
            }
        }
        return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>MedicalStore</h4>
            </div>
            <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
            className="collapse navbar-collapse mr-auto"
            id="navbarNav"
            style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                    <NavLink to={"/"} >
                        Home
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/medicalstore/medicine"} >
                       List
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/medicalstore/medicine/create"} >
                        Add
                    </NavLink>
                    </li>
                    {user?
                    <li className="nav-item">
                        <span className="nav-link" onClick={logout}>Logout</span>
                    </li>:
                    <li className="nav-item">
                    <NavLink 
                    to={"/login"} 
                    className={
                        'nav-link '+
                        (status => status.isActive ? 'active' : '')
                    } 
                    >
                        Login
                    </NavLink>
                    </li>
                }

                </ul>
            </div>
        </nav>;
    }
    
    export default Navbar;
 


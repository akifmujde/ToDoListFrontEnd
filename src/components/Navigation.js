import React from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
    return(

        <ul class="topnav">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            
            <li class="right">
                <NavLink to="/registration">Registration</NavLink>
            </li>
            <li class="right">
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    );
}

export default Navigation;
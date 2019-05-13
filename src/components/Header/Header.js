import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import './Header.css'

class Header extends Component{

    constructor(){
        super();
    }

    deleteToken(){

        
        axios.post("http://localhost:8080/exit",{
            token: localStorage.getItem('token')
        }).then((response) => {
            if(response.data.result){
                localStorage.removeItem('token');
                window.location.reload();
            }
        })
        
    }

    render(){

        if(localStorage.getItem('token')){
            return(
                <ul class="topnav">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li class="right">
                        <NavLink to="/" onClick={this.deleteToken}>Exit</NavLink>
                    </li>
                    <li class="right">
                        <NavLink to="/todolist" >My Lists</NavLink>
                    </li>
                </ul>
            );
        }

        return(
            <ul class="topnav">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li class="right">
                    <NavLink to="/registration" >Registration</NavLink>
                </li>
                <li class="right">
                    <NavLink to="/login" >Login</NavLink>
                </li>
            </ul>
        );
    }
}

export default Header;
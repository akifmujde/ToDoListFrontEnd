import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './Registration.css'

class Registration extends Component{

    constructor(){
        super();

        this.state = {
            name: '',
            mail: '',
            password: '',
            redirectToReferrer: false
           };
       
           this.register = this.register.bind(this);
           this.onChange = this.onChange.bind(this);
       
    }
       
         
       
    register() {
        
        if(this.state.name && this.state.mail && this.state.password){
            axios.post('http://localhost:8080/registration',this.state).then((response) => {
                if(response.data.result){
                    localStorage.setItem('token', response.data.token);
                    this.setState({redirectToReferrer: true});
                    window.location.reload();
                }
                else{
                    alert(response.data.message);
                }
            });
        }
        else{
            alert("Please fill the area.");
        }
    
    }

    onChange(e){
    this.setState({[e.target.name]:e.target.value});
    }
    render(){

        if(localStorage.getItem('token')){
            return (<Redirect to={''}/>);
        }

        return(
            <div className="container">
            <h3>Register</h3>
            <hr />
            <label for="name">Full Name:</label>
            <input type="text" class="form-control" id="name" name="name" onChange={this.onChange}/>
            <hr />
            <label for="mail">E-Mail:</label>
            <input type="email" class="form-control" id="mail" name="mail" onChange={this.onChange}/>
            <hr />
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" name="password" onChange={this.onChange}/>
            <hr />
            <br/>
            <input type="button" className="btn btn-success" value="Register" onClick={this.register}/>
        </div>
        );
    }
}

export default Registration;
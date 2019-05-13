import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './Login.css'

class Login extends Component {

    constructor(){
      super();
     
      this.state = {
       mail: '',
       password: '',
       redirectToReferrer: false
      };
  
      this.login = this.login.bind(this);
      this.onChange = this.onChange.bind(this);
  
    }
  
    
  
    login() {
        
        if(this.state.mail && this.state.password){
            axios.post('http://localhost:8080/login',this.state).then((response) => {
                if(response.data.result){
                    localStorage.setItem('token', response.data.token);
                    this.setState({redirectToReferrer: true});
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
  
    
    
  
    render() {
  
    if (this.state.redirectToReferrer) {
        window.location.reload();
        return (<Redirect to={'/'}/>);
    }
     
    if(localStorage.getItem('token')){
        return (<Redirect to={'/'}/>);
    }
  
    return (
        <div className="container">
            <h3>Login</h3>
            
            <label for="mail">E-Mail:</label>
            <input type="email" class="form-control" id="mail" name="mail" onChange={this.onChange}/>
            <br />
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" name="password" onChange={this.onChange}/>
            <br/>
            <input type="button" className="btn btn-success" value="Login" onClick={this.login}/>
        </div>
      );
    }
  }
  
  export default Login;

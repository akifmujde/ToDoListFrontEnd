import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Error from "./components/Error"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Registration from "./components/Resigstration/Registration"
import Header from './components/Header/Header'
import ToDoList from './components/ToDoList/ToDoList'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component ={Home} exact/>
          <Route path="/login" component ={Login} exact/>
          <Route path="/registration" component ={Registration} exact/>
          <Route path="/todolist" component ={ToDoList} exact/>
          <Route component ={Error}/>
        </Switch>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
